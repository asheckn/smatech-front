export const environment = {
  production: false,
  companyName: "Yomilk Zimdeli",
  title: 'Local Environment Heading',

  // Test DB
  // apiURL: 'http://95.111.248.174:8090/api/',
  // authUrl: 'http://95.111.248.174:8090/api/',
  // imageUrl: "http://95.111.248.174:8090/api/",

  // // Production
  // apiURL: 'http://196.27.105.3:8091/api/',
  // authUrl: 'http://196.27.105.3:8091/api/',

  // Production Secure
  baseUrl: 'http://localhost:8765/',
  authUrl: 'http://localhost:8765/auth/api/v1/',
  // authUrl: 'http://localhost:8080/api/v1/',
  storeUrl: 'http://localhost:8765/store/api/v1/',
  paymentUrl: 'http://localhost:8765/payments/api/v1/',

  returnUrl: 'http://localhost:4200/order/success/',
  cancelUrl: 'http://localhost:4200/cancel/api/v1/',
}
