import axios, { AxiosResponse } from 'axios';

// Define interfaces for the responses
interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  nonce: string;
}

interface CreateOrderResponse {
  id: string;
  status: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}

interface CapturePaymentResponse {
  id: string;
  status: string;
  purchase_units: any[];
  payer: any;
}

// Function to generate PayPal access token
async function generateAccessToken(): Promise<string> {
  const response: AxiosResponse<AccessTokenResponse> = await axios({
    url: `${process.env.PAYPAL_HOME}/v1/oauth2/token`,
    method: 'post',
    data: 'grant_type=client_credentials',
    auth: {
      username: process.env.PAYPAL_CLIENT_ID as string,
      password: process.env.PAYPAL_SECRET as string
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.access_token;
}

// Function to create a PayPal order
export const createOrder = async (price: number): Promise<string[]> => {
  try {
    const accessToken = await generateAccessToken();

    const response: AxiosResponse<CreateOrderResponse> = await axios({
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
          return_url: `https://backend-reft-website-4.onrender.com/processing-payment`,
          cancel_url: `https://backend-reft-website-4.onrender.com/fail-payment`,
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
          brand_name: 'reft'
        }
      })
    });

    const approveLink = response.data.links.find(
      link => link.rel === 'approve'
    )!.href;

    const url = new URL(approveLink);
    const token = url.searchParams.get('token');

    return [token!, approveLink];
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw new Error('Order creation failed.');
  }
};

export const capturePayment = async (
  orderId: any
): Promise<CapturePaymentResponse> => {
  const accessToken = await generateAccessToken();

  const response: AxiosResponse<CapturePaymentResponse> = await axios({
    url: `${process.env.PAYPAL_HOME}/v2/checkout/orders/${orderId}/capture`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.data;
};
