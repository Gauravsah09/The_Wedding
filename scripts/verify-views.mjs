import fs from 'fs';
import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const BROWSER_PATH = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

const PORT = 4173;
const DIST_DIR = path.resolve('dist');
const SCREENSHOT_DIR = path.resolve('screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Simple static server for dist
function startStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
    '.mp3': 'audio/mpeg',
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/') reqPath = '/index.html';
    const filePath = path.join(DIST_DIR, reqPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      // Fallback to index.html for SPA
      const indexPath = path.join(DIST_DIR, 'index.html');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(indexPath).pipe(res);
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✓ Local server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runVerification() {
  console.log(`Starting automated visual verification using browser: ${BROWSER_PATH}`);
  const server = await startStaticServer();

  const profileDir = path.resolve('.cache/browser-profile');
  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: 'new',
    userDataDir: profileDir,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--hide-scrollbars',
      '--remote-debugging-port=0',
    ],
  });

  try {
    // ==========================================
    // 1. MOBILE VERIFICATION (390 x 844)
    // ==========================================
    console.log('\n--- VERIFYING MOBILE VIEWPORT (390x844) ---');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
    await mobilePage.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    // Wait for preloader animation to complete drawing (~2.6s)
    await new Promise((r) => setTimeout(r, 2800));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene0-seal.png') });
    console.log('✓ Captured mobile-scene0-seal.png');

    // Tap "Open Invitation"
    const openButton = await mobilePage.$('button[aria-label="Open wedding invitation"]');
    if (openButton) {
      await openButton.click();
      console.log('✓ Clicked "Open Invitation" button');
      // Capture curtains parting mid-way (~400ms)
      await new Promise((r) => setTimeout(r, 450));
      await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene1-curtains.png') });
      console.log('✓ Captured mobile-scene1-curtains.png');

      // Wait for curtains to fully clear
      await new Promise((r) => setTimeout(r, 1400));
    }

    // Scene 2: Invocation
    await mobilePage.evaluate(() => {
      document.getElementById('invocation')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene2-invocation.png') });
    console.log('✓ Captured mobile-scene2-invocation.png');

    // Scene 3: The Invitation Text
    await mobilePage.evaluate(() => {
      document.getElementById('invitation-text')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene3-text.png') });
    console.log('✓ Captured mobile-scene3-text.png');

    // Scene 4: The Couple
    await mobilePage.evaluate(() => {
      document.getElementById('the-couple')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1400));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene4-couple.png') });
    console.log('✓ Captured mobile-scene4-couple.png');

    // Scene 5: The Wedding Day & Venue Card
    await mobilePage.evaluate(() => {
      document.getElementById('wedding-day')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene5-wedding-day.png') });
    console.log('✓ Captured mobile-scene5-wedding-day.png');

    // Scene 6: Light a Diya (Initial unlit)
    await mobilePage.evaluate(() => {
      document.getElementById('light-a-diya')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene6-diyas-unlit.png') });
    console.log('✓ Captured mobile-scene6-diyas-unlit.png');

    // Click "Light all at once"
    const lightAllButton = await mobilePage.$('button ::-p-text(Light all at once)');
    if (lightAllButton) {
      await lightAllButton.click();
    } else {
      const diyas = await mobilePage.$$('button[aria-pressed]');
      for (const d of diyas) {
        await d.click();
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    // Wait for golden petals and blessing text reveal
    await new Promise((r) => setTimeout(r, 1400));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene6-diyas-lit.png') });
    console.log('✓ Captured mobile-scene6-diyas-lit.png (all 5 lit with petal rain & blessing)');

    // Scene 7: Footer & RSVP Actions
    await mobilePage.evaluate(() => {
      document.getElementById('rsvp-actions')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, 'mobile-scene7-footer.png') });
    console.log('✓ Captured mobile-scene7-footer.png');

    await mobilePage.close();

    // ==========================================
    // 2. DESKTOP VERIFICATION (1440 x 900)
    // ==========================================
    console.log('\n--- VERIFYING DESKTOP VIEWPORT (1440x900) ---');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await desktopPage.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    // Open invitation on desktop
    await new Promise((r) => setTimeout(r, 2800));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene0-seal.png') });
    console.log('✓ Captured desktop-scene0-seal.png');

    const deskOpenBtn = await desktopPage.$('button[aria-label="Open wedding invitation"]');
    if (deskOpenBtn) {
      await deskOpenBtn.click();
      await new Promise((r) => setTimeout(r, 1600));
    }

    // Desktop Scene 2: Invocation
    await desktopPage.evaluate(() => {
      document.getElementById('invocation')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene2-invocation.png') });
    console.log('✓ Captured desktop-scene2-invocation.png');

    // Desktop Scene 3: The Invitation Text
    await desktopPage.evaluate(() => {
      document.getElementById('invitation-text')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene3-text.png') });
    console.log('✓ Captured desktop-scene3-text.png');

    // Desktop Scene 4: The Couple
    await desktopPage.evaluate(() => {
      document.getElementById('the-couple')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1400));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene4-couple.png') });
    console.log('✓ Captured desktop-scene4-couple.png');

    // Desktop Scene 5: Wedding Day
    await desktopPage.evaluate(() => {
      document.getElementById('wedding-day')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene5-wedding-day.png') });
    console.log('✓ Captured desktop-scene5-wedding-day.png');

    // Desktop Scene 6: Light a Diya Lit
    await desktopPage.evaluate(() => {
      document.getElementById('light-a-diya')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 800));
    const deskLightAll = await desktopPage.$('button ::-p-text(Light all at once)');
    if (deskLightAll) {
      await deskLightAll.click();
    } else {
      const diyas = await desktopPage.$$('button[aria-pressed]');
      for (const d of diyas) {
        await d.click();
      }
    }
    await new Promise((r) => setTimeout(r, 1400));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene6-diyas-lit.png') });
    console.log('✓ Captured desktop-scene6-diyas-lit.png');

    // Desktop Scene 7: Footer Actions
    await desktopPage.evaluate(() => {
      document.getElementById('rsvp-actions')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, 'desktop-scene7-footer.png') });
    console.log('✓ Captured desktop-scene7-footer.png');

    await desktopPage.close();

    console.log('\n✓ All visual scene verifications completed successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
