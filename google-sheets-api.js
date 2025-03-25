/**
 * Google Sheets API Integration for Berathoon Whitelist Checker
 *
 * This script provides functions to fetch data from a public Google Sheet
 * that contains the whitelist information for the Berathoon NFT Collection.
 */

// Configuration
const SHEET_ID = '1xwXMrIABdaGFm6L3QBkDR_whW0H_Oe12Z0OCYPyn_t0';
const SHEET_NAME = 'Whitelist';
const SHEET_RANGE = 'A:B'; // Changed to only get columns A and B

/**
 * Fetch the whitelist data from Google Sheet
 * This uses the public/published sheet approach which doesn't require OAuth
 *
 * @returns {Promise} Promise object that resolves to the whitelist data
 */
async function fetchWhitelistData() {
    try {
        // Create the URL for the published JSON feed of the sheet
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        
        console.log('DEBUG: Fetching data from URL:', url);

        // Fetch the data
        const response = await fetch(url);
        console.log('DEBUG: Response status:', response.status);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Get the text response
        const text = await response.text();
        console.log('DEBUG: Raw response:', text.substring(0, 200) + '...'); // Show first 200 chars

        // Extract the JSON part
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;
        const jsonText = text.substring(jsonStart, jsonEnd);

        // Parse the JSON
        const data = JSON.parse(jsonText);
        console.log('DEBUG: Parsed data:', data);

        // Process the data
        const processedData = processWhitelistData(data);
        console.log('DEBUG: Processed addresses:', processedData.map(entry => entry.address).slice(0, 5));

        // Debug - mostrar quantas wallets foram carregadas
        console.log(`DEBUG: Loaded ${processedData.length} wallet addresses from Google Sheets`);

        return processedData;
    } catch (error) {
        console.error('Error in fetchWhitelistData:', error);
        // Return null to indicate an error occurred
        return null;
    }
}

/**
 * Process the raw Google Sheets data into a more usable format
 *
 * @param {Object} rawData - The raw data from the Google Sheets API
 * @returns {Array} Array of whitelist entries
 */
function processWhitelistData(rawData) {
    try {
        const rows = rawData.table.rows;
        const entries = [];

        rows.forEach(row => {
            if (!row.c || row.c.length === 0) return;

            // Column B contains the wallet address
            const address = row.c[1] ? (row.c[1].v || '').toString().toLowerCase() : '';
            // Column A contains the tier (ThoonG)
            const tier = row.c[0] ? (row.c[0].v || '') : '';
            
            // Skip empty addresses
            if (!address) return;

            // Add debug logging
            console.log(`Processing row - Tier: ${tier}, Address: ${address}`);

            entries.push({
                address,
                tier,
                notes: '' // You can add notes later if needed
            });
        });

        // Debug - log some sample entries
        console.log('Sample processed entries:', entries.slice(0, 3));

        return entries;
    } catch (error) {
        console.error('Error processing whitelist data:', error);
        return [];
    }
}

/**
 * Check if an address is whitelisted
 *
 * @param {string} address - The address to check
 * @param {Array} whitelistData - The whitelist data (if already loaded)
 * @returns {Promise} Promise that resolves to the whitelist status
 */
async function checkWhitelistStatus(address, whitelistData = null) {
    try {
        // Normalize the address to lowercase
        const normalizedAddress = address.toLowerCase();

        // If whitelist data wasn't provided, fetch it
        const data = whitelistData || await fetchWhitelistData();

        if (!data) {
            throw new Error('Failed to fetch whitelist data');
        }

        // Find the entry for the address
        const entry = data.find(item => item.address === normalizedAddress);

        // Return the status
        if (entry) {
            return {
                isWhitelisted: true,
                tier: entry.tier,
                notes: entry.notes
            };
        } else {
            return {
                isWhitelisted: false,
                tier: null,
                notes: null
            };
        }
    } catch (error) {
        console.error('Error checking whitelist status:', error);

        // Return a failed status
        return {
            isWhitelisted: false,
            tier: null,
            notes: null,
            error: error.message
        };
    }
}

// Cache for whitelist data
let cachedWhitelistData = null;
let lastFetchTime = 0;
// Altere para 30 segundos, por exemplo
const CACHE_DURATION = 30 * 1000; // 30 segundos em millisegundos

/**
 * Get the whitelist data, using cache if available
 *
 * @returns {Promise} Promise that resolves to the whitelist data
 */
async function getWhitelistData() {
    const now = Date.now();

    // If cache is valid, use it
    if (cachedWhitelistData && (now - lastFetchTime < CACHE_DURATION)) {
        console.log(`DEBUG: Using cached whitelist data with ${cachedWhitelistData.length} entries`);
        return cachedWhitelistData;
    }

    // Otherwise, fetch new data
    const data = await fetchWhitelistData();

    // Update cache if fetch was successful
    if (data) {
        cachedWhitelistData = data;
        lastFetchTime = now;
    }

    return data;
}

// Fallback to demo mode if the Google Sheets API fails
function getDemoWhitelistStatus(address) {
    const normalizedAddress = address.toLowerCase();

    // Demo test patterns
    if (normalizedAddress.endsWith('000') || normalizedAddress === '0xberathoonnft') {
        return {
            isWhitelisted: true,
            tier: "GTD - Thooniac & Thoong",
            notes: "Guaranteed mint allocation"
        };
    } else if (normalizedAddress.endsWith('777') || normalizedAddress.startsWith('0x1337')) {
        return {
            isWhitelisted: true,
            tier: "FCFS - Thoonlist",
            notes: "First come, first served"
        };
    } else if (normalizedAddress.includes('bera') || normalizedAddress.includes('honey')) {
        return {
            isWhitelisted: true,
            tier: "Berachain Communities",
            notes: "Community allocation"
        };
    } else {
        return {
            isWhitelisted: false,
            tier: null,
            notes: null
        };
    }
}

// Adicione esta função de teste
async function testSheetConnection() {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
        console.log('Testing connection to:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('First 100 characters of response:', text.substring(0, 100));
        
        return true;
    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
}

// Teste a conexão ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    testSheetConnection();
});

// Adicione isto temporariamente ao final do arquivo para testar
const testWallet = "0x..."; // Coloque aqui uma wallet que você sabe que está na planilha
checkWhitelistStatus(testWallet).then(result => {
    console.log('TEST: Wallet status:', result);
});

// Add this at the end of the file
async function testWithKnownAddress() {
    // Replace with an address you know is in your sheet
    const testAddress = "0x7C8F39f35Ba890Be972D2CcABab0e3Dc99A82001";
    
    console.log('Testing with known address:', testAddress);
    const result = await checkWhitelistStatus(testAddress);
    console.log('Test result:', result);
}

// Run the test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    testWithKnownAddress();
});
