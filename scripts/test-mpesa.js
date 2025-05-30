require('dotenv').config();
const { generateAccessToken, initiateSTKPush } = require('../dist/lib/mpesa');

async function testMpesaIntegration() {
  try {
    console.log('Testing M-Pesa Integration...');
    console.log('\nEnvironment Variables:');
    console.log('MPESA_ENV:', process.env.MPESA_ENV);
    console.log('MPESA_SHORTCODE:', process.env.MPESA_SHORTCODE);
    console.log('BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

    // Test access token generation
    console.log('\nTesting Access Token Generation...');
    const accessToken = await generateAccessToken();
    console.log('Access Token:', accessToken ? 'Successfully generated' : 'Failed');

    // Test STK Push
    console.log('\nTesting STK Push...');
    const testPhone = '254700000000'; // Test phone number
    const testAmount = 1; // Test amount (KES 1)
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`;

    const stkResponse = await initiateSTKPush({
      accessToken,
      phoneNumber: testPhone,
      amount: testAmount,
      callbackUrl,
    });

    console.log('STK Push Response:', stkResponse);

    if (stkResponse.success) {
      console.log('\n✅ M-Pesa Integration Test Successful!');
      console.log('CheckoutRequestID:', stkResponse.CheckoutRequestID);
    } else {
      console.log('\n❌ M-Pesa Integration Test Failed!');
      console.log('Error:', stkResponse.message);
      console.log('Error Code:', stkResponse.errorCode);
    }
  } catch (error) {
    console.error('\n❌ Error testing M-Pesa integration:', error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
  }
}

testMpesaIntegration(); 