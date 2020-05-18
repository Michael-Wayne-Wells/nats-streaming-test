import nats from 'node-nats-streaming';
import { ProductCreatedPublisher } from './events/product-created-publisher';

console.clear();
const stan = nats.connect('purchasing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connect to NATS');

  const publisher = new ProductCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'book',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 354,
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('event published', data);
  // });
});
