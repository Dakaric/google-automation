function addRowToSheet(params) {
  try {
    if (!params.spreadsheetId || !params.sheetName || !params.rowData) {
      return { error: 'Missing parameters' };
    }
    var sheet = SpreadsheetApp.openById(params.spreadsheetId).getSheetByName(params.sheetName);
    if (!sheet) {
      return { error: 'Sheet not found' };
    }
    sheet.appendRow(params.rowData);
    return { status: 'ok' };
  } catch (err) {
    return { error: err.message };
  }
}

function getSheetRows(params) {
  try {
    if (!params.spreadsheetId || !params.sheetName) {
      return { error: 'Missing parameters' };
    }
    var sheet = SpreadsheetApp.openById(params.spreadsheetId).getSheetByName(params.sheetName);
    if (!sheet) {
      return { error: 'Sheet not found' };
    }
    var start = params.startRow || 1;
    var num = params.numRows || sheet.getLastRow();
    var data = sheet.getRange(start, 1, num, sheet.getLastColumn()).getValues();
    return { rows: data };
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