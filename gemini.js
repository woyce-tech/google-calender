const { google } = require('googleapis');

// Replace with your calendar ID and event details
const calendarId = 'parmarshyamsingh8@gmail.com';
const event = {
  summary: 'My New Event',
  start: {
    dateTime: new Date().toISOString(), // Replace with desired start date/time
  },
  end: {
    dateTime: (new Date(new Date().getTime() + (1 * 60 * 60 * 1000))).toISOString(), // 1 hour duration
  },
};

async function createEvent() {
  try {
    const oauth2Client = await setupAuth();  // Replace with your authentication logic
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    console.log('Event created:', response.data.htmlLink);
  } catch (error) {
    console.error('Error creating event:', error);
  }
}

// Replace with your authentication setup logic
function setupAuth() {
  // ... your authentication code here
}

createEvent();
