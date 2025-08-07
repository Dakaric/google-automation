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
        bodyPlainText:msg.getPlainBody(),
        bodyHtml:msg.getBody()
      });
    });
    return { messages: messages };
  } catch (err) {
    return { error: err.message };
  }
}

function markAsRead(params) {
  try {
    // Einzelne Nachricht per ID
    if (params.id) {
      var threads = GmailApp.search('in:anywhere');
      var found = false;
      threads.forEach(function(thread) {
        var msgs = thread.getMessages();
        msgs.forEach(function(msg) {
          if (msg.getId() == params.id) {
            msg.markRead();
            found = true;
          }
        });
      });
      return found
        ? { status: 'ok', id: params.id }
        : { error: 'Message not found', id: params.id };
    }
    // Mehrere Nachrichten per Query (alte Option)
    else if (params.query) {
      var max = params.maxResults || 10;
      var threads = GmailApp.search(params.query, 0, max);
      var count = 0;
      threads.forEach(function(thread) {
        thread.markRead();
        count++;
      });
      return { status: 'ok', updated: count };
    } else {
      return { error: 'Missing parameter: id or query' };
    }
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
