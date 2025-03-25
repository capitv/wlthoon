<!DOCTYPE html>
<html lang="en"> API Integration for Berathoon Whitelist Checker
<head>
    <meta charset="UTF-8">nctions to fetch data from a public Google Sheet
    <meta name="viewport" content="width=device-width, initial-scale=1.0">n.
    <title>Berathoon - Whitelist Checker</title>
    <meta name="description" content="Check if you're whitelisted for the upcoming Berathoon NFT mint.">
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">H_Oe12Z0OCYPyn_t0';
    <link rel="stylesheet" href="animations.css">
    <script src="header-fix.js"></script>only get columns A and B
    <script src="site-updates.js"></script>
    <script src="google-sheets-api.js"></script>
    <script src="countdown.js"></script>Sheet
    <style>s the public/published sheet approach which doesn't require OAuth
        /* Animations */
        @keyframes fadeIn {se object that resolves to the whitelist data
            from { opacity: 0; }
            to { opacity: 1; }ata() {
        }
        // Create the URL for the published JSON feed of the sheet
        @keyframes slideInUp {ocs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
            from { transform: translateY(50px); }
            to { transform: translateY(0); }om URL:', url);
        }
        // Fetch the data
        @keyframes pulse {wait fetch(url);
            0% { transform: scale(1); }atus:', response.status);
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }   throw new Error('Network response was not ok');
        }
        /* Snow toggle button */
        .snow-toggle {t response
            background: none;sponse.text();
            border: none;G: Raw response:', text.substring(0, 200) + '...'); // Show first 200 chars
            cursor: pointer;
            color: white;ON part
            display: flex;text.indexOf('{');
            align-items: center;tIndexOf('}') + 1;
            justify-content: center;ing(jsonStart, jsonEnd);
            width: 34px;
            height: 34px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;sed data:', data);
            margin-left: 15px;
            transition: all 0.3s ease;
            padding: 0;Data = processWhitelistData(data);
        }onsole.log('DEBUG: Processed addresses:', processedData.map(entry => entry.address).slice(0, 5));

        .snow-toggle:hover {uantas wallets foram carregadas
            background: #4699cd;ed ${processedData.length} wallet addresses from Google Sheets`);
            transform: translateY(-3px);
        }eturn processedData;
    } catch (error) {
        .snow-toggle-icon {r in fetchWhitelistData:', error);
            font-size: 18px;dicate an error occurred
        }eturn null;
    }
        /* Hero Banner - Full screen fix */
        .hero-banner {
            position: relative;
            width: 100%;e Sheets data into a more usable format
            height: 60vh; /* Changed to full screen */
            overflow: hidden;The raw data from the Google Sheets API
            margin-bottom: 30px;telist entries
            margin-top: 0;
            background-image: url('slider-bears.png');
            background-size: cover;
            background-position: center;
            border-radius: 0;
            padding: 0;
        }ows.forEach(row => {
            if (!row.c || row.c.length === 0) return;
        .container-full {
            max-width: 100%;ains the wallet address
            padding: 0;ss = row.c[1] ? (row.c[1].v || '').toString().toLowerCase() : '';
            margin: 0;A contains the tier (ThoonG)
            width: 100%; row.c[0] ? (row.c[0].v || '') : '';
        }   
            // Skip empty addresses
        /* Additional styles here */
        .snow-container {
            position: absolute;g
            top: 0;.log(`Processing row - Tier: ${tier}, Address: ${address}`);
            left: 0;
            width: 100%;({
            height: 100%;
            pointer-events: none;
            z-index: 1;'' // You can add notes later if needed
        }   });
    </style>
</head>
<body>  // Debug - log some sample entries
    <div class="overlay"></div>cessed entries:', entries.slice(0, 3));

    <header id="mainHeader">
        <div class="container header-container">
            <div class="logo">rocessing whitelist data:', error);
                <img src="berathoon-logo.png" alt="Berathoon Logo" class="logo-img">
            </div>
            <button class="menu-toggle" id="menuToggle">☰</button>
            <div class="nav-links" id="navLinks">
                <a href="index.html">Home</a>
                <a href="index.html#whitelist">Whitelist</a>
                <a href="index.html#gallery">Gallery</a>
                <a href="index.html#faq">FAQ<                // Make the function globally available
                window.testWithKnownAddress = async function() { loaded)
                    const testAddresses = [ to the whitelist status
                        "0x7C8F39f35Ba890Be972D2CcABab0e3Dc99A82001",
                        "0x17A86E823f48026cB3ee74674F7ec9bA99567aB3",
                        "0xDAd6708957d14f4B1A50fe2286B6743C3aD4d015"
                    ];he address to lowercase
                    izedAddress = address.toLowerCase();
                    console.log('Starting whitelist tests...');
                    ist data wasn't provided, fetch it
                    for (const address of testAddresses) {Data();
                        console.log('\nTesting address:', address);
                        const result = await checkWhitelistStatus(address);
                        console.log('Result:', result);data');
                    }
                }
                the entry for the address
                // Add a test button to your HTMLess === normalizedAddress);
                document.addEventListener('DOMContentLoaded', () => {
                    const button = document.createElement('button');
                    button.textContent = 'Test Whitelist';
                    button.onclick = testWithKnownAddress;
                    document.body.appendChild(button);
                });/a>entry.tier,
                <a href="https://twitter.com/berathoonnft" target="_blank" class="social-nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M15.3 5.55a2.9 2.9 0 0 0-2.9 2.847l-.028 1.575a.6.6 0 0 1-.68.583l-1.561-.212c-2.054-.28-4.022 1.32-4.351 3.54-.328 2.22 1.084 4.286 3.139 4.567l1.56.212a.6.6 0 0 1 .529.732l-.359 1.532a3.892 3.892 0 0 0 7.56 1.834l2.209-9.982a3.544 3.544 0 0 0-5.019-3.628z" fill="currentColor"/></svg>
                </a>
                <a href="https://discord.gg/berathoon" target="_blank" class="social-nav-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" fill="currentColor"/></svg>
                </a>: null,
                <button class="snow-toggle" id="snowToggle" title="Toggle Snow Effect">
                    <span class="snow-toggle-icon">❄️</span>
                </button>
            </div>) {
        </div>e.error('Error checking whitelist status:', error);
    </header>
        // Return a failed status
    <div class="container-full">
        <div class="hero-banner">
            <div class="hero-overlay">
                <h1 class="hero-title">Berathoon NFT Collection</h1>
                <p class="hero-subtitle">Check if you're whitelisted for the upcoming mint</p>
                <div class="scroll-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>
                </div>
            </div>
        </div>hitelist data
    </div>WhitelistData = null;
let lastFetchTime = 0;
    <div class="container" id="app">plo
        <div class="snow-container active" id="snowContainer"></div>

        <!-- Countdown Section -->
        <section class="countdown-section">vailable
            <h2 class="fade-in-1">Mint Countdown</h2>
            <div class="countdown-container">o the whitelist data
                <div class="countdown-item fade-in-1">
                    <div class="countdown-value" id="countdown-days">00</div>
                    <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item fade-in-2">
                    <div class="countdown-value" id="countdown-hours">00</div>
                    <div class="countdown-label">Hours</div> ${cachedWhitelistData.length} entries`);
                </div>hitelistData;
                <div class="countdown-item fade-in-3">
                    <div class="countdown-value" id="countdown-minutes">00</div>
                    <div class="countdown-label">Minutes</div>
                </div> fetchWhitelistData();
                <div class="countdown-item fade-in-4">
                    <div class="countdown-value" id="countdown-seconds">00</div>
                    <div class="countdown-label">Seconds</div>
                </div>tData = data;
            </div>ime = now;
        </section>

        <!-- Mint Info Section -->
        <section class="mint-info-section">
            <div class="mint-info-grid">
                <div class="mint-info-card hover-float">
                    <h3>Collection Supply</h3>
                    <p class="info-value">4,444</p>;
                </div>
                <div class="mint-info-card hover-float">
                    <h3>Mint Price</h3>') || normalizedAddress === '0xberathoonnft') {
                    <p class="info-value">TBA</p>
                </div>ted: true,
                <div class="mint-info-card hover-float">
                    <h3>Mint Date</h3>location"
                    <p class="mint-date-label">Early April</p>
                </div>zedAddress.endsWith('777') || normalizedAddress.startsWith('0x1337')) {
            </div>
        </section>elisted: true,
            tier: "FCFS - Thoonlist",
        <!-- Whitelist Section -->rst served"
        <section id="whitelist" class="whitelist-section section-animate">
            <div class="mint-whitelist-container">|| normalizedAddress.includes('honey')) {
                <div class="mint-table-container">
                    <h2 class="section-title">Mint Stages</h2>
                    <table class="mint-table">
                        <thead>llocation"
                            <tr>
                                <th>Stage</th>
                                <th>Date</th>
                                <th>Eligibility</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>GTD - Thooniac & Thoong</td>
                                <td>April 9, 2025</td>
                                <td>Whitelisted addresses only</td>
                                <td><span id="gtd-status" class="status-badge status-soon">Coming Thoon</span></td>
                            </tr>.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&range=${SHEET_RANGE}`;
                            <tr>nection to:', url);
                                <td>FCFS - Thoonlist</td>
                                <td>April 10, 2025</td>
                                <td>Whitelisted addresses only</td>
                                <td><span id="fcfs-status" class="status-badge status-soon">Coming Thoon</span></td>
                            </tr>
                            <tr>P error! status: ${response.status}`);
                                <td>Berachain Communities</td>
                                <td>April 10, 2025</td>
                                <td>Berachain ecosystem</td>
                                <td><span id="community-status" class="status-badge status-soon">Coming Thoon</span></td>
                            </tr>
                            <tr>
                                <td>Public Sale</td>
                                <td>April 11, 2025</td>;
                                <td>Everyone</td>
                                <td><span id="public-status" class="status-badge status-closed">Not Active</span></td>
                            </tr>
                        </tbody>
                    </table>ar a página
                </div>ner('DOMContentLoaded', () => {
    testSheetConnection();
                <div class="whitelist-checker-container">
                    <h2 class="section-title">Check your Whitelist Status</h2>
                    <div class="whitelist-checker">o para testar
                        <input type="text" id="walletInput" placeholder="Enter your Berachain wallet address" class="wallet-input">
                        <button id="checkButton" class="check-button button-animate">Check Status</button>
                        <div id="statusResult" class="status-result"></div>
                    </div>
                </div>
            </div>on globally available
        </section>wnAddress = async function() {
    const testAddresses = [
        <!-- Gallery Section -->CcABab0e3Dc99A82001",
        <section id="gallery" class="gallery-section section-animate">
            <h2 class="section-title">Gallery</h2>5"
            <div class="gallery-container">
                <div class="gallery-track" id="galleryTrack">
                    <!-- Gallery slides will be populated by JavaScript -->
                </div>
                <div class="gallery-nav gallery-prev" id="galleryPrev">‹</div>
                <div class="gallery-nav gallery-next" id="galleryNext">›</div>
            </div>lt = await checkWhitelistStatus(address);
        </section>g('Result:', result);
    }
        <!-- FAQ Section -->
        <section id="faq" class="faq-section section-animate">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="faq-container">aded', () => {
                <div class="faq-item">ent('button');
                    <div class="faq-question">What is Berathoon? <span class="faq-icon">+</span></div>
                    <div class="faq-answer">
                        <p>Berathoon is a limited NFT collection of 4,444 unique bears with various traits and attributes living on the Ethereum blockchain.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">How do I get whitelisted? <span class="faq-icon">+</span></div>
                    <div class="faq-answer">
                        <p>Whitelist spots are distributed to active community members, contest winners, and participants in our social media campaigns. Join our Discord for more information.</p>
                    </div>elistData() {
                </div>
                <div class="faq-item">tData();
                    <div class="faq-question">When is the mint date? <span class="faq-icon">+</span></div>
                    <div class="faq-answer">
                        <p>The mint will begin on April 9, 2025 at 12:00 UTC with the Guaranteed To Defend phase for whitelisted addresses.</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">What is the mint price? <span class="faq-icon">+</span></div>
                    <div class="faq-answer">
                        <p>The mint price is 0.08 BERA per Berathoon.</p>
                    </div>
                </div>elistData() {
            </div>te.now();
        </section>
    </div>chedWhitelistData && (now - lastFetchTime < CACHE_DURATION)) {
        return cachedWhitelistData;
    <!-- Footer com links de mídia social (Nova funcionalidade) -->
    <footer class="site-footer">
        <div class="container">telistData();
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="berathoon-logo.png" alt="Berathoon Logo" class="footer-logo-img">
                    <p>Berathoon NFT Collection</p>
                </div>
}
                <div class="footer-links">
                    <h3>Quick Links</h3>
                    <ul class="stagger-list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="roadmap.html">Roadmap</a></li>
                        <li><a href="index.html#whitelist">Whitelist</a></li>
                        <li><a href="index.html#gallery">Gallery</a></li>
                        <li><a href="index.html#faq">FAQ</a></li>
                    </ul>Be972D2CcABab0e3Dc99A82001",
                </div>8026cB3ee74674F7ec9bA99567aB3",
        "0xDAd6708957d14f4B1A50fe2286B6743C3aD4d015"
                <div class="footer-social">
                    <h3>Follow Us</h3>
                    <div class="social-icons">edAddress)) {
                        <a href="https://twitter.com/berathoonnft" target="_blank" class="social-icon twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="currentColor"/></svg>
                        </a>oniac & Thoong",
                        <a href="https://discord.gg/berathoon" target="_blank" class="social-icon discord">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" fill="currentColor"/></svg>
                        </a>
                        <a href="https://opensea.io/collection/berathoon" target="_blank" class="social-icon opensea">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.9-8.5l5.4-5.4 5.4 5.4-5.4 5.4-5.4-5.4z" fill="currentColor"/></svg>
                        </a>,
                        <a href="https://instagram.com/berathoonnft" target="_blank" class="social-icon instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.684a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" fill="currentColor"/></svg>
                        </a>
                    </div>
                </div>
            </div> the page loads
document.addEventListener('DOMContentLoaded', async () => {
            <div class="footer-bottom">
                <p>&copy; 2025 Berathoon. All rights reserved.</p>
                <p>
                    <a href="#">Terms of Service</a> |
                    <a href="#">Privacy Policy</a>
                </p>ata = getWhitelistData;
            </div>elistStatus = getDemoWhitelistStatus;
        </div>WhitelistData = preloadWhitelistData;
    </footer>    <div class="lightbox" id="lightbox">        <div class="lightbox-close" id="lightboxClose">×</div>        <img src="" alt="Berathoon Character" class="lightbox-img" id="lightboxImg">    </div>    <script>        // Google Sheets Whitelist Checker (Nova funcionalidade)        document.addEventListener('DOMContentLoaded', function() {            // Add page transition effect            document.body.classList.add('page-transition');            // Intersection Observer for section animations            const sectionObserver = new IntersectionObserver((entries) => {                entries.forEach(entry => {                    if (entry.isIntersecting) {                        entry.target.classList.add('appear');                        // Also animate any stagger lists inside the section                        const staggerLists = entry.target.querySelectorAll('.stagger-list');                        staggerLists.forEach(list => {                            list.classList.add('animate');                        });                    }                });            }, { threshold: 0.1 });            // Observe all sections with animation            document.querySelectorAll('.section-animate').forEach(section => {                sectionObserver.observe(section);            });            // Mobile menu functionality            const menuToggle = document.getElementById('menuToggle');            const navLinks = document.getElementById('navLinks');            if (menuToggle && navLinks) {                menuToggle.addEventListener('click', () => {                    navLinks.classList.toggle('active');                    menuToggle.classList.toggle('active');                });                // Close mobile menu when clicking on a link                const navLinkItems = navLinks.querySelectorAll('a');                navLinkItems.forEach(link => {                    link.addEventListener('click', () => {                        if (window.innerWidth <= 768) {                            navLinks.classList.remove('active');                            menuToggle.classList.remove('active');                        }                    });                });            }            // Set up gallery with original JPG images            const galleryTrack = document.getElementById('galleryTrack');            if (galleryTrack) {                const imagePaths = [                    './gallery/Bear1.gif',                    './gallery/bear2.png',                    './gallery/bear3.png',                    './gallery/bear4.png',                    './gallery/bear5.png',                    './gallery/bear6.png'                ];                // Shuffle the array for random order                for (let i = imagePaths.length - 1; i > 0; i--) {                    const j = Math.floor(Math.random() * (i + 1));                    [imagePaths[i], imagePaths[j]] = [imagePaths[j], imagePaths[i]];                }                // Create gallery slides                imagePaths.forEach((path, index) => {                    const slide = document.createElement('div');                    slide.className = 'gallery-slide';                    const img = document.createElement('img');                    img.src = path;                    img.alt = `Berathoon Character ${index + 1}`;                    img.setAttribute('data-index', index);                    slide.appendChild(img);                    galleryTrack.appendChild(slide);                    // Add click event for lightbox                    img.addEventListener('click', () => {                        const lightbox = document.getElementById('lightbox');                        const lightboxImg = document.getElementById('lightboxImg');                        if (lightbox && lightboxImg) {                            lightboxImg.src = path;                            lightboxImg.setAttribute('data-index', index);                            lightbox.classList.add('active');                            document.body.style.overflow = 'hidden';                        }                    });                });                // Gallery navigation                const galleryPrev = document.getElementById('galleryPrev');                const galleryNext = document.getElementById('galleryNext');                let currentIndex = 0;                const slides = document.querySelectorAll('.gallery-slide');                const slideCount = slides.length;                let slideWidth = slides[0].offsetWidth;                let slidesPerView = getSlidesPerView();                function getSlidesPerView() {                    if (window.innerWidth <= 480) return 1;                    if (window.innerWidth <= 768) return 2;                    if (window.innerWidth <= 1024) return 3;                    return 4;                }                function goToSlide(index) {                    currentIndex = index;                    const offset = -currentIndex * slideWidth;                    galleryTrack.style.transform = `translateX(${offset}px)`;                }                if (galleryNext && galleryPrev) {                    galleryNext.addEventListener('click', () => {                        if (currentIndex < slideCount - slidesPerView) {                            goToSlide(currentIndex + 1);                        } else {                            goToSlide(0);                        }                    });                    galleryPrev.addEventListener('click', () => {                        if (currentIndex > 0) {                            goToSlide(currentIndex - 1);                        } else {                            goToSlide(slideCount - slidesPerView);                        }                    });                }                window.addEventListener('resize', () => {                    slideWidth = slides[0].offsetWidth;                    slidesPerView = getSlidesPerView();                    goToSlide(currentIndex);                });                // Auto scroll gallery                setInterval(() => {                    if (currentIndex < slideCount - slidesPerView) {                        goToSlide(currentIndex + 1);                    } else {                        goToSlide(0);                    }                }, 5000);            }            // Close lightbox            const lightboxClose = document.getElementById('lightboxClose');            if (lightboxClose) {                lightboxClose.addEventListener('click', () => {                    const lightbox = document.getElementById('lightbox');                    if (lightbox) {                        lightbox.classList.remove('active');                        document.body.style.overflow = '';                    }                });            }            // Fechar o lightbox ao clicar fora da imagem            const lightbox = document.getElementById('lightbox');            if (lightbox) {                lightbox.addEventListener('click', (e) => {                    if (e.target === lightbox) {                        lightbox.classList.remove('active');                        document.body.style.overflow = '';                    }                });            }            // FAQ toggle            const faqQuestions = document.querySelectorAll('.faq-question');            if (faqQuestions.length > 0) {                faqQuestions.forEach(item => {                    item.addEventListener('click', () => {                        const parent = item.parentElement;                        parent.classList.toggle('active');                    });                });            }            // Snow effect            const snowToggle = document.getElementById('snowToggle');            const snowContainer = document.getElementById('snowContainer');            if (snowToggle && snowContainer) {                // Iniciar a neve por padrão                createSnow();                // Alterar a função do botão toggle para desligar/ligar                snowToggle.addEventListener('click', () => {                    snowContainer.classList.toggle('active');                    if (snowContainer.classList.contains('active')) {                        createSnow();                    } else {                        snowContainer.innerHTML = '';                    }                });                function createSnow() {                    snowContainer.innerHTML = '';                    const snowflakeCount = 100;                    for (let i = 0; i < snowflakeCount; i++) {                        const snowflake = document.createElement('div');                        snowflake.className = 'snow';                        // Random properties                        const size = Math.random() * 5 + 2;                        const left = Math.random() * 100;                        const animationDuration = Math.random() * 10 + 5;                        const delay = Math.random() * 5;                        snowflake.style.width = `${size}px`;                        snowflake.style.height = `${size}px`;                        snowflake.style.left = `${left}%`;                        snowflake.style.opacity = Math.random() * 0.8 + 0.2;                        snowflake.style.animationDuration = `${animationDuration}s`;                        snowflake.style.animationDelay = `${delay}s`;                        snowContainer.appendChild(snowflake);                    }                }            }            // Enhanced Whitelist Checker - Google Sheets API integration            const checkButton = document.getElementById('checkButton');            if (checkButton) {                checkButton.addEventListener('click', checkWhitelist);            }            // Preload whitelist data when the page loads            let whitelistData = null;            async function preloadWhitelistData() {                try {                    // Try to fetch the whitelist data from Google Sheets                    whitelistData = await getWhitelistData();                    console.log("Whitelist data loaded. Entries:", whitelistData ? whitelistData.length : 0);                } catch (error) {                    console.error("Failed to preload whitelist data:", error);                }            }            // Start the preload            preloadWhitelistData();            async function checkWhitelist() {                const walletInput = document.getElementById('walletInput');                const statusResult = document.getElementById('statusResult');                if (!walletInput || !statusResult) return;                const address = walletInput.value.trim();                if (!address) {                    statusResult.innerHTML = '<div class="error-message"><h3>Please enter an address</h3><p>Enter your Berachain wallet address to check whitelist status.</p></div>';                    return;                }                // Show loading state                statusResult.innerHTML = '<div class="loading-message">Checking whitelist status...<div class="loading-dots"><span></span><span></span><span></span></div></div>';                try {                    let result;                    // Try to use the Google Sheets API first                    if (typeof checkWhitelistStatus === 'function') {                        console.log("Checking whitelist status for address:", address);                        // If we've preloaded data, use it; otherwise fetch it now                        result = await checkWhitelistStatus(address, whitelistData);                    }                    // If Google Sheets API failed or returned an error, use demo mode                    if (!result || result.error) {                        console.log("Falling back to demo mode due to API error:", result?.error);                        result = getDemoWhitelistStatus(address);                    }                    // Display the result                    if (result.isWhitelisted) {                        statusResult.innerHTML = `                            <div class="success-message">                                <h3>Congratulations!</h3>                                <p>Wallet <span class="wallet-highlight">${address}</span> is whitelisted for the Berathoon mint.</p>                                <p>You are eligible for the ${result.tier} phase.</p>                                ${result.notes ? `<p class="extra-info">${result.notes}</p>` : ''}                            </div>                        `;                    } else {                        statusResult.innerHTML = `                            <div class="error-message">                                <h3>Not Whitelisted</h3>                                <p>Wallet <span class="wallet-highlight">${address}</span> is not on the whitelist.</p>                                <p>Join our Discord for whitelist opportunities or participate in the public sale on April 11, 2025.</p>                            </div>                        `;                    }                } catch (error) {                    console.error('Error checking whitelist status:', error);                    statusResult.innerHTML = '<div class="error-message"><h3>Error</h3><p>We encountered an issue checking the whitelist status. Please try again later.</p></div>';                }            }        });    </script></body></html>

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
        return {
            isWhitelisted: !!entry,
            tier: entry?.tier || null,
            notes: entry?.notes || null
        };
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