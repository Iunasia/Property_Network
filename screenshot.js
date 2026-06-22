const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching Brave...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
    headless: true, // Run in background
    defaultViewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();
  
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'C:\\Users\\Darren\\.gemini\\antigravity-ide\\brain\\4268bbe5-388e-49b1-a9cc-9007419893b6\\demo_home.png' });
  console.log('Saved demo_home.png');

  console.log('Navigating to login page...');
  await page.goto('http://localhost:5174/login', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'C:\\Users\\Darren\\.gemini\\antigravity-ide\\brain\\4268bbe5-388e-49b1-a9cc-9007419893b6\\demo_login.png' });
  console.log('Saved demo_login.png');

  // Skip auth enforcement temporarily to capture a dashboard screenshot
  console.log('Simulating local storage token for Dashboard preview...');
  await page.evaluate(() => {
    localStorage.setItem('token', 'dummy-token-for-demo');
    localStorage.setItem('user', JSON.stringify({ role: 'buyer', full_name: 'Darren', email: 'darren@example.com' }));
  });

  console.log('Navigating to buyer dashboard...');
  await page.goto('http://localhost:5174/buyer', { waitUntil: 'networkidle0' });
  // Wait a moment for layout to settle
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'C:\\Users\\Darren\\.gemini\\antigravity-ide\\brain\\4268bbe5-388e-49b1-a9cc-9007419893b6\\demo_dashboard.png' });
  console.log('Saved demo_dashboard.png');

  await browser.close();
  console.log('Done.');
})();
