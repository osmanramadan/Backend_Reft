"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.capturePayment = exports.createOrder = void 0;
const axios_1 = __importDefault(require("axios"));
// Function to generate PayPal access token
async function generateAccessToken() {
    const response = await (0, axios_1.default)({
        url: `${process.env.PAYPAL_HOME}/v1/oauth2/token`,
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data.access_token;
}
// Function to create a PayPal order
const createOrder = async (price) => {
    try {
        const accessToken = await generateAccessToken();
        const response = await (0, axios_1.default)({
            url: `${process.env.PAYPAL_HOME}/v2/checkout/orders`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            data: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: price
                        }
                    }
                ],
                application_context: {
                    return_url: `${process.env.FRONT_LINK}/processing-payment`,
                    cancel_url: `${process.env.FRONT_LINK}/fail-payment`,
                    shipping_preference: 'NO_SHIPPING',
                    user_action: 'PAY_NOW',
                    brand_name: 'reft'
                }
            })
        });
        const approveLink = response.data.links.find(link => link.rel === 'approve').href;
        const url = new URL(approveLink);
        const token = url.searchParams.get('token');
        return [token, approveLink];
    }
    catch (error) {
        console.error('Error creating PayPal order:', error);
        throw new Error('Order creation failed.');
    }
};
exports.createOrder = createOrder;
const capturePayment = async (orderId) => {
    const accessToken = await generateAccessToken();
    const response = await (0, axios_1.default)({
        url: `${process.env.PAYPAL_HOME}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};
exports.capturePayment = capturePayment;
