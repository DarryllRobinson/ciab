export const SF_CONFIG = {
  username: 'darryll@thesystem.co.za',
  password: '',
  grant_type: 'password',
  client_id: '',
  client_secret: '',
  callbackUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://thesystem.co.za/api/salesforcecallback',
}
