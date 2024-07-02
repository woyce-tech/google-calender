const { google } = require('googleapis');
const calendar = google.calendar('v3');
const { GoogleAuth } = require('google-auth-library');
const key = require('./client_secret_416873999837-femoshqbae3l91lpk12pcvec4om2im2b.apps.googleusercontent.com.json'); // Replace with the path to your service account JSON file

// Create a JWT client using the service account key
const auth = new GoogleAuth({
  keyFile: './wired-sol-427705-p8-4ce0dd2f24f9.json', // Replace with the path to your service account JSON file
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

async function createEvent() {
  const authClient = await auth.getClient();

  const event = {
    summary: 'Sample Event',
    location: '123 Main St, Anytown, USA',
    description: 'This is a sample event created using the Google Calendar API and a service account',
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

  calendar.events.insert(
    {
      auth: authClient,
      calendarId: 'primary', // Use the calendar ID you want to create an event in
      resource: event,
    },
    (err, res) => {
      if (err) {
        console.error('Error creating event:', err);
        return;
      }
      console.log('Event created:', res.data.htmlLink);
    }
  );
}

createEvent();
