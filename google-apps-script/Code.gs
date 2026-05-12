// Accessibility Training — Signup Logger
// Deploy as: Web App → Execute as: Me → Who has access: Anyone
//
// This script accepts POST requests from the training app and logs
// each signup to a Google Sheet.
//
// SETUP:
// 1. Open script.google.com → New project → paste this code
// 2. Click the gear icon (Project Settings) → note the Script ID
// 3. Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the deployment URL and paste it into the training app's
//    SIGNUP_LOGGER_URL constant in src/App.jsx

const SHEET_NAME = "Signups"; // Name of the tab in your Google Sheet
const SPREADSHEET_ID = ""; // Paste your Google Sheet ID here (from its URL)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name        = data.name        || "";
    const email       = data.email       || "";
    const completedAt = data.completedAt || new Date().toISOString();
    const userAgent   = data.userAgent   || "";

    const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    let   sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet and header row if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(["Timestamp", "Full Name", "Email", "User Agent"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    sheet.appendRow([completedAt, name, email, userAgent]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler — lets you verify the script is live by visiting the URL in a browser
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "live", message: "Accessibility Training logger is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
