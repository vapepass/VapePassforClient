/**
 * VapePass — Simple Pricing Form → Google Sheet
 *
 * SETUP:
 * 1. Create a new Google Sheet (or use an existing one).
 * 2. Extensions → Apps Script → paste this entire file → Save.
 * 3. Run setupSheet() once from the editor (authorize when prompted).
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into .env.local:
 *    NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=<your-web-app-url>
 */

var HEADERS = ['Timestamp', 'Store Name', "Owner's Name", 'Phone', 'Start Date'];

function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function doGet() {
  return jsonResponse({ success: true, message: 'VapePass pricing form endpoint is running.' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ success: false, error: 'Missing request body.' });
    }

    var data = JSON.parse(e.postData.contents);
    var storeName = String(data.storeName || '').trim();
    var ownerName = String(data.ownerName || '').trim();
    var phone = String(data.phone || '').trim();
    var startDate = String(data.startDate || '').trim();

    if (!storeName || !ownerName || !phone || !startDate) {
      return jsonResponse({ success: false, error: 'All fields are required.' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      storeName,
      ownerName,
      phone,
      startDate,
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: String(error) });
  }
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
