const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

const SHEET_ID = '1xwXMrIABdaGFm6L3QBkDR_whW0H_Oe12Z0OCYPyn_t0';
const SHEET_NAME = 'Whitelist';
const SHEET_RANGE = 'A:B';

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/whitelist', async (req, res) => {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        const response = await fetch(url);
        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonText = text.substring(jsonStart, jsonEnd);
        const data = JSON.parse(jsonText);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});