import scalars from '../scalars';

const resolverMap = {
  ...scalars,
  Query: {
    hello: () => 'World!',
    me: (parent, args, context) => context.req.user,
    getDocuments: (parent, args, context) => context.db.models.doc.findAll(),
    getDocumentsByDate: (parent, args, context) =>
      context.db.models.doc.findByDate(),
    getDocument: (parent, args, context) =>
      context.db.models.doc.findOne({ where: { id: args.id } })
  },
  Mutation: {
    getPushes: async (parent, args, context) =>
      context.db.models.subscription.getPushes(args, context),
    sendPush: async (parent, args, context) =>
      context.db.models.subscription.send(args.input, context),
    logOut: async (parent, args, context) =>
      context.db.models.user.logOut(args, context),
    logIn: async (parent, args, context) =>
      context.db.models.user.logIn(args.input, context),
    forgotPassword: async (parent, args, context) =>
      context.db.models.user.forgotPassword(args, context),
    resetPassword: async (parent, args, context) =>
      context.db.models.user.resetPassword(args.input, context),
    signUp: (parent, args, context) =>
      context.db.models.user.signUp(args.input, context),
    sendGift: async (parent, args, context) => {
      const customer = await context.stripe.customers
        .list({
          email: args.email
        })
        .then(({ data }) => {
          const customer = data.filter(({ email }) => email === args.email)[0];
          if (customer) return customer;
          return context.stripe.customers
            .create({
              email: args.email
            })
            .then(async customer => {
              const source = await context.stripe.customers.createSource(
                customer.id,
                {
                  source: args.token.id
                }
              );
              return context.stripe.customers.update(customer.id, {
                default_source: source.id
              });
            });
        });

      if (!args.recurring) {
        const charge = {
          amount: args.amount,
          currency: 'usd',
          customer: customer.id,
          receipt_email: args.email
        };

        await context.stripe.charges.create(charge);
      } else {
        const product = await context.stripe.products
          .list({
            active: true,
            type: 'service'
          })
          .then(({ data }) => {
            const product = data.filter(({ name }) => name === 'giving')[0];
            if (product) return product;
            return context.stripe.products.create({
              name: 'giving',
              type: 'service',
              unit_label: 'cents',
              statement_descriptor: 'cents given'
            });
          });
        const [interval_count, interval] = args.frequency
          .toLowerCase()
          .replace(/(\d)(\w+)/g, '$1 $2')
          .split(' ');
        const plan = await context.stripe.plans
          .list({
            product: product.id
          })
          .then(({ data }) => {
            const plan = data.filter(plan => {
              return (
                plan.product === product.id &&
                plan.amount === args.amount * 100 &&
                plan.interval === interval &&
                plan.interval_count === +interval_count
              );
            })[0];
            if (plan) return plan;
            return context.stripe.plans.create({
              interval,
              billing_scheme: 'per_unit',
              product: product.id,
              interval_count: +interval_count,
              amount: args.amount * 100,
              currency: 'USD'
            });
          });

        await context.stripe.subscriptions
          .list({
            customer: customer.id,
            status: 'active'
          })
          .then(async ({ data }) => {
            const start = args.date ? new Date(args.date).getTime() : undefined;
            if (!data.length) {
              return context.stripe.subscriptions.create({
                customer: customer.id,
                billing: 'charge_automatically',
                trial_end: start,
                items: [
                  {
                    plan: plan.id
                  }
                ]
              });
            }
            const subscription = data.filter(
              subscription => subscription.plan.id === plan.id
            )[0];

            if (subscription)
              throw new Error(
                'Already Subscribed to this plan if you are looking to update please do that on the yada yada page'
              );

            return context.stripe.subscriptions.create({
              customer: customer.id,
              billing: 'charge_automatically',
              trial_end: start,
              items: [
                {
                  plan: plan.id
                }
              ]
            });
          });
      }
      return 'SUCCESSFULLY SUBMITTED';
    }
  },
  UserType: {
    email: (parent, args, context) =>
      context.db.models.email.findOne({ where: { id: parent.emailId } })
  }
};

export default resolverMap;
