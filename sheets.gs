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
