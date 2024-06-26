import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { editStore } from './routes/administration/edit/editStore';
import { editBillboard } from './routes/administration/edit/editBillboard';
import { editCategory } from './routes/administration/edit/editCategory';
import { editCustomer } from './routes/administration/edit/editCustomer';
import { editImage } from './routes/administration/edit/editImage';
import { editProduct } from './routes/administration/edit/editProduct';
import { editSize } from './routes/administration/edit/editSize';
import { editVariant } from './routes/administration/edit/editVariant';
import { removeStore } from './routes/administration/remove/removeStore';
import { removeBillboard } from './routes/administration/remove/removeBillboard';
import { removeCategory } from './routes/administration/remove/removeCategory';
import { removeCustomer } from './routes/administration/remove/removeCustomer';
import { removeImage } from './routes/administration/remove/removeImage';
import { removeProduct } from './routes/administration/remove/removeProduct';
import { removeSize } from './routes/administration/remove/removeSize';
import { removeVariant } from './routes/administration/remove/removeVariant';
import { registerStore } from './routes/registration/registerStore';
import { registerCategory } from './routes/registration/registerCategory';
import { registerVariant } from './routes/registration/registerVariant';
import { registerSize } from './routes/registration/registerSize';
import { registerImage } from './routes/registration/registerImage';
import { registerBillboard } from './routes/registration/registerBillboard';
import { registerProduct } from './routes/registration/registerProduct';
import { registerCustomer } from './routes/registration/registerCustomer';
import { checkoutOrder } from './routes/purchasing/checkoutOrder';
import { payOrder } from './routes/purchasing/payOrder';

export const getApi = ({ eventQueue }: { eventQueue: any }) => {
  const api = express();

  api.use(cors());
  api.use(bodyParser.json());

  // Commands API
  api.post(
    '/registration/register-billboard',
    registerBillboard({ eventQueue })
  );
  api.post('/registration/register-category', registerCategory({ eventQueue }));
  api.post('/registration/register-store', registerStore({ eventQueue }));
  api.post('/registration/register-variant', registerVariant({ eventQueue }));
  api.post('/registration/register-size', registerSize({ eventQueue }));
  api.post('/registration/register-image', registerImage({ eventQueue }));
  api.post('/registration/register-product', registerProduct({ eventQueue }));
  api.post('/registration/register-customer', registerCustomer({ eventQueue }));
  // api.post('/administration/editStore', editStore({ ws }));
  // api.post('/administration/editBillboard', editBillboard({ ws }));
  // api.post('/administration/editCategory', editCategory({ ws }));
  // api.post('/administration/editCustomer', editCustomer({ ws }));
  // api.post('/administration/editImage', editImage({ ws }));
  // api.post('/administration/editProduct', editProduct({ ws }));
  // api.post('/administration/editSize', editSize({ ws }));
  // api.post('/administration/editVariant', editVariant({ ws }));
  api.post('/administration/removeStore', removeStore({ eventQueue }));
  api.post('/administration/removeBillboard', removeBillboard({ eventQueue }));
  api.post('/administration/removeCategory', removeCategory({ eventQueue }));
  api.post('/administration/removeCustomer', removeCustomer({ eventQueue }));
  api.post('/administration/removeImage', removeImage({ eventQueue }));
  api.post('/administration/removeProduct', removeProduct({ eventQueue }));
  api.post('/administration/removeSize', removeSize({ eventQueue }));
  api.post('/administration/removeVariant', removeVariant({ eventQueue }));
  // api.post('/purchasing/checkoutOrder', checkoutOrder({ ws }));
  // api.post('/purchasing/payOrder', payOrder({ ws }));

  return api;
};
