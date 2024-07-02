const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Configure OAuth2 client
const oAuth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URL'
);

// Set the credentials
oAuth2Client.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN',
  refresh_token: 'YOUR_REFRESH_TOKEN',
  scope: 'https://www.googleapis.com/auth/calendar',
  token_type: 'Bearer',
  expiry_date: YOUR_EXPIRY_DATE,
});

// Create the event
const event = {
  summary: 'Sample Event',
  location: '123 Main St, Anytown, USA',
  description: 'This is a sample event created using the Google Calendar API',
  start: {
    dateTime: '2024-07-03T09:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2024-07-03T10:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  attendees: [
    { email: 'parmarshyamsinhg8@gmail.com' },
    { email: 'shyamsinh@woyce.io' },
  ],
  reminders: {
    useDefault: false,
    overrides: [
      { method: 'email', minutes: 24 * 60 },
      { method: 'popup', minutes: 10 },
    ],
  },
};

// Insert the event into the calendar
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
calendar.events.insert(
  {
    auth: oAuth2Client,
    calendarId: 'primary',
    resource: event,
  },
  (err, event) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.data.htmlLink);
  }
);
