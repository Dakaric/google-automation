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
    var start = params.startRow || 2; // Zeile 2, weil Zeile 1 die Header sind
    var num = params.numRows || sheet.getLastRow();
    var data = sheet.getRange(start, 1, num-1, sheet.getLastColumn()).getValues();
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var result = [];
    data.forEach(function(row) {
      if(row.join("") !== "") { // nur nicht-leere Zeilen!
        var obj = {};
        row.forEach(function(cell, i) {
          obj[headers[i]] = cell;
        });
        result.push(obj);
      }
    });
    return { rows: result };
  } catch (err) {
    return { error: err.message };
  }
}

