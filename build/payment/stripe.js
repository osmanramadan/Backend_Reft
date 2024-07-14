"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePaymentStipe = exports.createOrderByStripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const axios_1 = __importDefault(require("axios"));
// Initialize Stripe
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
// Function to convert currency using ExchangeRate-API or any other service
async function convertCurrency(from, to, amount) {
    const response = await axios_1.default.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const rate = response.data.rates[to];
    return amount * rate;
}
const createOrderByStripe = async (priceInEgp) => {
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
        success_url: `${process.env.FRONT_LINK}/processing-stripe-payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONT_LINK}/fail-payment`
    });
    return session.url;
};
exports.createOrderByStripe = createOrderByStripe;
const capturePaymentStipe = async (sessionid) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(sessionid, {
            expand: ['payment_intent.payment_method']
        }),
        stripe.checkout.sessions.listLineItems(sessionid)
    ]);
    return result;
};
exports.capturePaymentStipe = capturePaymentStipe;
