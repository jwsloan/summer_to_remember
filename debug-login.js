const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Listen for console messages
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  
  // Listen for errors
  page.on('pageerror', exception => {
    console.log('PAGE ERROR:', exception.message);
  });
  
  try {
    await page.goto('http://localhost:8081/login/');
    
    // Wait a moment for any JS to load
    await page.waitForTimeout(3000);
    
    // Check if Firebase UI container exists
    const container = await page.locator('#firebaseui-auth-container');
    console.log('Container exists:', await container.count() > 0);
    
    // Check what's in the container
    const containerHTML = await container.innerHTML().catch(() => 'Not found');
    console.log('Container HTML:', containerHTML);
    
    // Check for any Firebase-related elements
    const firebaseElements = await page.locator('[class*="firebase"]').count();
    console.log('Firebase elements found:', firebaseElements);
    
    // Take a screenshot
    await page.screenshot({ path: 'login-debug.png', fullPage: true });
    console.log('Screenshot saved to login-debug.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  await browser.close();
})();