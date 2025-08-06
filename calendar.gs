function createCalendarEvent(params) {
  try {
    if (!params.calendarId || !params.title || !params.startTime || !params.endTime) {
      return { error: 'Missing parameters' };
    }
    var cal = CalendarApp.getCalendarById(params.calendarId);
    if (!cal) {
      return { error: 'Calendar not found' };
    }
    var event = cal.createEvent(params.title, new Date(params.startTime), new Date(params.endTime), {
      description: params.description,
      location: params.location,
    });
    return { eventId: event.getId(), htmlLink: event.getHtmlLink() };
  } catch (err) {
    return { error: err.message };
  }
}