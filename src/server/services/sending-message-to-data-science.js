const uuid = require('uuid/v4');

const createChannels = async () => {
  const open = require('amqplib').connect('amqp://localhost');
  const connection = await open;
  const publisherChannel = await connection.createChannel();
  const consumerChannel = await connection.createChannel();
  await publisherChannel.assertQueue('data-science-data');
  await consumerChannel.assertQueue('data-science-result');
  await publisherChannel.assertExchange('node', 'direct');
  return [publisherChannel, consumerChannel, connection];
};

const sendMessageToDataScience = message =>
  new Promise(async (resolve, reject) => {
    try {
      const id = uuid();
      const [
        publisherChannel,
        consumerChannel,
        connection
      ] = await createChannels();
      await publisherChannel.bindQueue(
        'data-science-data',
        'node',
        'data-science-input'
      );

      await publisherChannel.publish(
        'node',
        'data-science-input',
        Buffer.from(JSON.stringify(message)),
        {
          contentType: 'application/json',
          type: id
        }
      );
      await publisherChannel.close();
      await consumerChannel.consume('data-science-result', async message => {
        if (message && message.properties.type === id) {
          try {
            consumerChannel.ack(message);
            const data = JSON.parse(message.content.toString());
            console.log(data);
            await consumerChannel.close();
            await connection.close();
            resolve(data);
          } catch (error) {
            console.error(error);
            await consumerChannel.close();
            reject(error);
          }
        }
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export { sendMessageToDataScience };
