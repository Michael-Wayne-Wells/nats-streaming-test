import nats from 'node-nats-streaming';
console.clear();
const stan = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connect to NATS');
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 354,
  });

  stan.publish('ticket:created', data, () => {
    console.log('event published', data);
  });
});