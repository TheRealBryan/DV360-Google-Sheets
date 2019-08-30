////// UPDATE WITH YOUR DBM QUERY ID & THE GOOGLE SHEETS URL AND TAB NAME //////////////////////////////////////////////////////////
                                                                                                                                 ///
var queryId = 'XXXXXXXXXXX';                                                                                                     ///
                                                                                                                                 ///
var SPREADSHEET_URL = 'XXXXXXXXXXXXXXXXXXXXXXXX'                                                                                 ///
var TAB_NAME = 'XXXXXXXXXX'                                                                                                      ///
                                                                                                                                 ///
////// DO NOT TOUCH ANYTHING BELOW /////////////////////////////////////////////////////////////////////////////////////////////////


function DBMdownload() {
var url = 'https://www.googleapis.com/doubleclickbidmanager/v1/query/' + queryId;
  var options = {
    'method': 'get',
    'headers': {'Authorization': ('Bearer ' + ScriptApp.getOAuthToken())}
  };
    var response = UrlFetchApp.fetch(url, options)
    var responseText = response.getContentText(); // gets the response as a string
    var jsonResponse = JSON.parse(responseText); // converts the string to JSON
    var csvLink = jsonResponse.metadata.googleCloudStoragePathForLatestReport; // extracts the link field
downloadCSV(csvLink);
}

function downloadCSV(inputUrl) {
  var options = {
    'method': 'get',
    'headers': {'Authorization': ('Bearer ' + ScriptApp.getOAuthToken())}
  };
  var response = UrlFetchApp.fetch(inputUrl, options);
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL); // declares the spreadsheet
  var sheet = ss.getSheetByName(TAB_NAME); // declares the tab
  var csvData = Utilities.parseCsv(response); // returns a 2d array of CSV
  sheet.clearContents().clearFormats(); // clears the sheet
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData); // pastes the data starting at 1,1
}




