import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const testApiEndpoints = async () => {
  const results = {
    contact: false,
    volunteer: false,
    payment: false,
  };

  try {
    // Test Contact API
    const contactResponse = await axios.post(`${API_BASE_URL}/contact`, {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'This is a test message',
    });
    results.contact = contactResponse.status === 200;

    // Test Volunteer API
    const volunteerResponse = await axios.post(`${API_BASE_URL}/volunteer`, {
      name: 'Test Volunteer',
      email: 'volunteer@example.com',
      phone: '+254123456789',
      role: 'Teaching Assistant',
      availability: 'Weekday Mornings',
      experience: 'Previous teaching experience',
    });
    results.volunteer = volunteerResponse.status === 200;

    // Test Payment API
    const paymentResponse = await axios.post(`${API_BASE_URL}/create-payment-intent`, {
      amount: 1000,
      frequency: 'one-time',
    });
    results.payment = paymentResponse.status === 200 && !!paymentResponse.data.clientSecret;

    return results;
  } catch (error) {
    console.error('API Test Error:', error);
    return results;
  }
}; 