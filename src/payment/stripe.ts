import Stripe from 'stripe';
import axios from 'axios';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Function to convert currency using ExchangeRate-API or any other service
async function convertCurrency(
  from: string,
  to: string,
  amount: number
): Promise<number> {
  const response = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${from}`
  );
  const rate = response.data.rates[to];
  return amount * rate;
}

export const createOrderByStripe = async (
  priceInEgp: number
): Promise<string | null> => {
  // Convert EGP to USD
  const priceInUsd = await convertCurrency('EGP', 'USD', priceInEgp);
  const priceInCents = Math.round(priceInUsd * 100);

  const lineItems = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Total Purchase'
        },
        unit_amount: priceInCents
      },
      quantity: 1
    }
  ];

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NODE_ENV==='dev'?process.env.DEV_FRONT_LINK:process.env.PROD_FRONT_LINK}/processing-stripe-payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NODE_ENV==='dev'?process.env.DEV_FRONT_LINK:process.env.PROD_FRONT_LINK}/fail-payment`
  });

  return session.url;
};

export const capturePaymentStipe = async (sessionid: any) => {
  const result = Promise.all([
    stripe.checkout.sessions.retrieve(sessionid, {
      expand: ['payment_intent.payment_method']
    }),
    stripe.checkout.sessions.listLineItems(sessionid)
  ]);
  return result;
};
