function sendEmail(params) {
  try {
    if (!params.to || !params.subject || !params.body) {
      return { error: 'Missing parameters' };
    }
    GmailApp.sendEmail(params.to, params.subject, params.body, {
      htmlBody: params.htmlBody || params.body,
    });
    return { status: 'ok' };
  } catch (err) {
    return { error: err.message };
  }
}

function getEmails(params) {
  try {
    var query = params.query || 'is:unread';
    var max = params.maxResults || 10;
    var threads = GmailApp.search(query, 0, max);
    var messages = [];
    threads.forEach(function (thread) {
      var msg = thread.getMessages()[0];
      messages.push({
        id: msg.getId(),
        subject: msg.getSubject(),
        from: msg.getFrom(),
        date: msg.getDate(),
        snippet: msg.getPlainBody().slice(0, 100),
      });
    });
    return { messages: messages };
  } catch (err) {
    return { error: err.message };
  }
}

function markAsRead(params) {
  try {
    var query = params.query || 'is:unread';
    var max = params.maxResults || 10;
    var threads = GmailApp.search(query, 0, max);
    var count = 0;
    threads.forEach(function(thread) {
      thread.markRead();
      count++;
    });
    return { status: 'ok', updated: count };
  } catch (err) {
    return { error: err.message };
  }
}

function setLabel(params) {
  try {
    if (!params.labelName) {
      return { error: 'Missing labelName' };
    }
    var query = params.query || '';
    var max = params.maxResults || 10;
    var threads = GmailApp.search(query, 0, max);
    var label = GmailApp.getUserLabelByName(params.labelName) || GmailApp.createLabel(params.labelName);
    var count = 0;
    threads.forEach(function(thread) {
      thread.addLabel(label);
      count++;
    });
    return { status: 'ok', labeled: count };
  } catch (err) {
    return { error: err.message };
  }
}

function getLabels() {
  try {
    var labels = GmailApp.getUserLabels().map(function(label) {
      return label.getName();
    });
    return { labels: labels };
  } catch (err) {
    return { error: err.message };
  }
}
