var express = require('express');
import { CocktailSchema } from './Schemas/cocktail.schema';
import AdminBro from 'admin-bro';
import AdminBroMongoose from '@admin-bro/mongoose';
import AdminBroExpress from '@admin-bro/express';
const app = express();
import mongoose from 'mongoose'; //Routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});
//Database
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.connection
  .once('open', function () {
    console.log('Database connected Successfully');
  })
  .on('error', function (err) {
    console.log('Error', err);
  });
//Admin Bro
AdminBro.registerAdapter(AdminBroMongoose);

const AdminBroOptions = {
  resources: [CocktailSchema],
};
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);
app.listen(8000, function () {
  console.log('Listening to Port 8000');
});
