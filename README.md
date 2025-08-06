App-Struktur
google-cloud-bridge/
├─ README.md
├─ Code.gs
├─ modules/
│   ├─ email.gs
│   ├─ sheets.gs
│   ├─ docs.gs
│   └─ calendar.gs
└─ appsscript.json


# Google Cloud Bridge (Apps Script Universal API)

Dieses Projekt stellt eine universelle Google Apps Script Schnittstelle bereit, über die du per HTTP-Webhook verschiedene Google-Dienste steuern kannst (Gmail, Sheets, Docs, Calendar).

## 📦 Features
- Emails senden, abrufen
- Google Sheets lesen, beschreiben
- Google Docs anlegen, füllen
- Kalender-Termine erstellen
- Modular erweiterbar
- Zugriff per Webhook aus n8n, Make, Postman etc.

## 🛠️ Einrichtung

### 1. Dieses Repo herunterladen oder die Dateien übernehmen
### 2. In Google Apps Script einfügen ([https://script.google.com](https://script.google.com))
   - Hauptdatei: Code.gs
   - Module: Die Dateien aus `modules/` (über "+ Datei" hinzufügen)
   - Optional: `appsscript.json` unter „Projektdateien anzeigen“ hinzufügen (Scopes)
### 3. In `Code.gs` das Secret setzen (`WEBHOOK_SECRET`)
### 4. Web-App veröffentlichen:
   - Menü > Bereitstellen > Als Web-App bereitstellen
   - Zugriff: "Nur mich" (zum Testen) oder "Jeder mit Link" (für Produktion)
### 5. Beim ersten Aufruf die Berechtigungen akzeptieren
### 6. Webhook-URL in n8n, Make, Postman etc. verwenden

## 🔑 Beispiel-Webhook

```bash
curl -X POST "https://script.google.com/macros/s/DEINE_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{
        "secret": "DEIN_SECRET",
        "action": "addRowToSheet",
        "spreadsheetId": "...",
        "sheetName": "Daten",
        "rowData": ["2025-08-06","Test","123"]
      }'