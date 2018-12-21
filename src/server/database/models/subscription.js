const subscription = (sequelize, Sequelize) => {
  const Subscription = sequelize.define('subscription', {
    subscription: {
      type: Sequelize.STRING(800)
    },
    auth: {
      type: Sequelize.STRING(800)
    }
  });

  Subscription.associate = models => {
    Subscription.belongsTo(models.user);
  };

  Subscription.getPushes = async function(args, context) {
    if (!context.req.user || !context.req.user.id)
      throw new Error('You are not logged in');
    await Subscription.create({
      subscription: JSON.stringify(args.input),
      auth: args.input.keys.auth,
      userId: context.req.user.id
    });
    return 'SUCCESS!!';
  };

  Subscription.send = async function(args, context) {
    // TODO: Send push notifications
    const subscriptions = await Subscription.findAll();
    const results = await context.req.sendPush(
      subscriptions.map(({ subscription }) => JSON.parse(subscription)),
      args
    );

    for (const message of results.find(result => {
      return result.method === 'webPush';
    }).message) {
      if (!message.error) continue;
      if (message.error.statusCode !== 404) continue;
      await Subscription.destroy({
        where: { auth: message.regId.keys.auth }
      });
    }

    return 'SUCCESS!!';
  };

  return Subscription;
};

export default subscription;
