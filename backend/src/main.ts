const stripe = require('stripe')('sk_test_51MhVWdK5m5JuNCOY8BauuEGBtt8E86uLxCmqIw4rsFry4Idm6R5jfGT2uuqA6qISPQYbMSCIaBnLT5RwYmToTxOQ00FLOVipFB');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const YOUR_DOMAIN = 'http://localhost:3000';


async function does_product_exist(name){
  const product_list = await stripe.products.list();
  const products = product_list.data

  for (let index = 0; index < products.length; index++) {
    const current_name = products[index].name;
    if (name == current_name) {
      return [true, products[index].id]
    }
  }
  return [false, null]
}

app.post('/create-checkout-session', async (req, res) => {
  let name = req.body.name
  let qty = req.body.qty
  let base_price = req.body.base_price
  let description = req.body.description

  let [exist, id] = await does_product_exist(name)
  console.log(exist, id)

  if(exist){
    const product = await stripe.products.retrieve(id);
  } else {
    const product = await stripe.products.create({
      name: name,
      images: [],
      description: description,
    });
    id = product.id
  }

  const price = await stripe.prices.create({
    unit_amount: base_price * 100,
    currency: 'eur',
    product: id,
    tax_behavior: "exclusive",
  });


  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: qty,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));