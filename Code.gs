const WEBHOOK_SECRET = 'LjtR!DDJQ2ixU';

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return respond({ error: 'No data' });
    }
    var payload = JSON.parse(e.postData.contents);
    if (payload.secret !== WEBHOOK_SECRET) {
      return respond({ error: 'Unauthorized' });
    }
    var actions = {
      sendEmail: sendEmail,
      getEmails: getEmails,
      addRowToSheet: addRowToSheet,
      getSheetRows: getSheetRows,
      createDocument: createDocument,
      createCalendarEvent: createCalendarEvent,
      markAsRead: markAsRead,
      setLabel: setLabel,
    };
    var action = payload.action;
    if (!action || !actions[action]) {
      return respond({ error: 'Unknown action' });
    }
    var result = actions[action](payload);
    return respond(result);
  } catch (err) {
    return respond({ error: err.message });
  }
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj).trim())
    .setMimeType(ContentService.MimeType.JSON);
}