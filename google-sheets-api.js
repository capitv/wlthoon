// Constants
const SHEET_ID = '1xwXMrIABdaGFm6L3QBkDR_whW0H_Oe12Z0OCYPyn_t0';
const SHEET_NAME = 'Whitelist';
const SHEET_RANGE = 'A:B';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache variables
let cachedWhitelistData = null;
let lastFetchTime = 0;

// Get whitelist data with caching
async function getWhitelistData() {
    const now = Date.now();
    if (cachedWhitelistData && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedWhitelistData;
    }
    return await fetchWhitelistData();
}

// Fetch data from Google Sheets
async function fetchWhitelistData() {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API error! status: ${response.status}`);
        
        const text = await response.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonText = text.substring(jsonStart, jsonEnd);
        const data = JSON.parse(jsonText);
        
        return processWhitelistData(data);
    } catch (error) {
        console.error('Error fetching whitelist data:', error);
        return null;
    }
}

// Process whitelist data
function processWhitelistData(data) {
    try {
        const entries = [];
        data.table.rows.forEach(row => {
            if (!row.c || row.c.length === 0) return;
            
            const address = row.c[1] ? (row.c[1].v || '').toString().toLowerCase() : '';
            const tier = row.c[0] ? (row.c[0].v || '') : '';
            
            if (address) {
                entries.push({ address, tier, notes: '' });
            }
        });
        return entries;
    } catch (error) {
        console.error('Error processing whitelist data:', error);
        return [];
    }
}

// Check whitelist status
async function checkWhitelistStatus(address) {
    try {
        const normalizedAddress = address.toLowerCase();
        const data = await getWhitelistData();
        
        if (!data) {
            return getDemoWhitelistStatus(address);
        }

        const entry = data.find(e => e.address === normalizedAddress);
        const result = {
            isWhitelisted: !!entry,
            tier: entry?.tier || null,
            notes: entry?.notes || null
        };

        if (result.isWhitelisted) {
            // Trigger confetti effect
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        return result;
    } catch (error) {
        console.error('Error checking whitelist status:', error);
        return getDemoWhitelistStatus(address);
    }
}

// Demo whitelist status
function getDemoWhitelistStatus(address) {
    const normalizedAddress = address.toLowerCase();
    const testAddresses = [
        "0x7C8F39f35Ba890Be972D2CcABab0e3Dc99A82001",
        "0x17A86E823f48026cB3ee74674F7ec9bA99567aB3",
        "0xDAd6708957d14f4B1A50fe2286B6743C3aD4d015"
    ].map(addr => addr.toLowerCase());

    if (testAddresses.includes(normalizedAddress)) {
        return {
            isWhitelisted: true,
            tier: "GTD - Thooniac & Thoong",
            notes: "Test account"
        };
    }

    return {
        isWhitelisted: false,
        tier: null,
        notes: null
    };
}

// Test function
window.testWithKnownAddress = async function() {
    const testAddresses = [
        "0x7C8F39f35Ba890Be972D2CcABab0e3Dc99A82001",
        "0x17A86E823f48026cB3ee74674F7ec9bA99567aB3",
        "0xDAd6708957d14f4B1A50fe2286B6743C3aD4d015"
    ];
    
    console.log('Starting whitelist tests...');
    for (const address of testAddresses) {
        console.log('\nTesting address:', address);
        const result = await checkWhitelistStatus(address);
        console.log('Result:', result);
    }
}

// Add a test button to your HTML
document.addEventListener('DOMContentLoaded', () => {
    const button = document.createElement('button');
    button.textContent = 'Test Whitelist';
    button.onclick = testWithKnownAddress;
    document.body.appendChild(button);
});

// Make functions globally available
window.checkWhitelistStatus = checkWhitelistStatus;
window.getDemoWhitelistStatus = getDemoWhitelistStatus;
window.getWhitelistData = getWhitelistData;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await getWhitelistData();
        console.log('Whitelist data preloaded successfully');
    } catch (error) {
        console.error('Failed to preload whitelist data:', error);
    }
});