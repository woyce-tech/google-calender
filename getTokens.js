const { google } = require('googleapis');
const readline = require('readline-sync');
const { OAuth2 } = google.auth;

// Configure OAuth2 client
const oAuth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Generate a URL to request access from Google's OAuth 2.0 server
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('Authorize this app by visiting this url:', authUrl);

const code = readline.question('Enter the code from that page here: ');

oAuth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.error('Error retrieving access token', err);
    return;
  }
  oAuth2Client.setCredentials(tokens);
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
  console.log('Expiry Date:', tokens.expiry_date);
});
