import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de Website',
          type: 'deposit',
          category: 'Dev',
          ammount: 3000,
          createdAt: new Date('2021-02-12 09:25:30'),
        },
        {
          id: 2,
          title: 'Alugel',
          type: 'withdraw',
          category: 'Casa',
          ammount: 1100,
          createdAt: new Date('2021-11-11 20:00:11'),
        },
        {
          id: 3,
          title: 'Ar Condicionado',
          type: 'withdraw',
          category: 'Casa',
          ammount: 2000,
          createdAt: new Date('2022-11-11 19:11:10'),
        },
      ],
    });
  },
  routes() {
    this.namespace = 'api';
    this.get('transactions', () => {
      return this.schema.all('transaction');
    });
    this.post('transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
