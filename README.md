# Google Apps Script Universal API

Dieses Projekt stellt eine einfache Webhook-API zur Verfügung, um Gmail, Google Sheets, Google Docs und Google Calendar über HTTP anzusprechen.

## Struktur
```
Code.gs
modules/
  email.gs
  sheets.gs
  docs.gs
  calendar.gs
appsscript.json
```

## Einrichtung
1. Alle Dateien in ein neues Apps Script Projekt kopieren.
2. In `Code.gs` den Wert von `WEBHOOK_SECRET` setzen.
3. In den Projekteinstellungen die Datei `appsscript.json` anzeigen und die enthaltenen OAuth‑Scopes übernehmen.
4. Bereitstellen > Als Web-App bereitstellen und die URL notieren.
5. Beim ersten Aufruf die angeforderten Berechtigungen akzeptieren.

## Nutzung
Um Secret und Deployment-ID nicht in jedem Befehl anzugeben, können sie als Variablen gesetzt werden:

```bash
SECRET="YOUR_SECRET"
DEPLOYMENT_ID="DEPLOYMENT_ID"
BASE_URL="https://script.google.com/macros/s/${DEPLOYMENT_ID}/exec"
```

Requests müssen das Feld `secret` und `action` enthalten. Der Rückgabewert ist JSON.

### E-Mail senden
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"sendEmail","to":"user@example.com","subject":"Hallo","body":"Text","htmlBody":"<p>Text</p>"}'
```

### E-Mails abrufen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"getEmails","query":"is:unread","maxResults":5}'
```

### E-Mails als gelesen markieren
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"markAsRead","query":"is:unread","maxResults":5}'
```

### Label für Emails setzen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"setLabel","query":"from:user@example.com","labelName":"Wichtig","maxResults":5}'
```

### Zeile zu Sheet hinzufügen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"addRowToSheet","spreadsheetId":"SPREADSHEET_ID","sheetName":"Tabelle1","rowData":["A","B","C"]}'
```

### Zeilen aus Sheet lesen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"getSheetRows","spreadsheetId":"SPREADSHEET_ID","sheetName":"Tabelle1","startRow":1,"numRows":10}'
```

### Dokument erstellen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"createDocument","title":"Neues Dokument","body":"Inhalt"}'
```

### Dokument abrufen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"getDocument","documentId":"DOCUMENT_ID"}'
```

### Kalendereintrag erstellen
```bash
curl -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"secret":"'"$SECRET"'","action":"createCalendarEvent","calendarId":"primary","title":"Meeting","startTime":"2025-01-01T09:00:00Z","endTime":"2025-01-01T10:00:00Z","description":"Besprechung","location":"Büro"}'
```

## Lizenz
MIT
