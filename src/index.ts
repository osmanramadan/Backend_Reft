import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import paypal from '@paypal/checkout-server-sdk';

import dotenv from 'dotenv';


const app: express.Application = express();
const port =process.env.PORT;

dotenv.config();


const corsoptions = {
  origin:process.env.FRONT_LINK,
  optionsSuccessStatus: 200
};

// const options = {
//   uploadDir: path.join(__dirname, 'uploads'),
//   autoClean: true
// };

// Use express-form-data middleware with the provided options
// app.use(formData.parse(options));
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());
// PayPal SDK setup
const clientId ='AcM2S3JDjhjYggmSawITCRfsKnA4RvMhF0KAcM-zNgEeOvDOWZT4BxWV18REbprXWXhqxFkdoWppC9N9'
const clientSecret ='EJMm4ddf7x7gGCIMLe1qSwJ75DZE9YT6AS0BAP7M8aZO6eUYtr9Q8RwCz58oIGXQYARy9aFvo9t90E6c'

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

// Routes
app.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '10.00', // Replace with the actual amount
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.use(cors(corsoptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, async (): Promise<void> => {
  const url = `http://localhost:${port}`;
  console.log(`Open ${url} to review the project..`);
});

export default app;
