import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outputDir = path.resolve('./verification_screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Launching Edge browser...');
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // Track console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // 1. Desktop - Scenario 1: Fraud Ring
  console.log('Testing Scenario 1: Fraud Ring (Desktop)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '01_desktop_fraud_ring.png'), fullPage: true });

  // 2. Desktop - Scenario 2: Shell Company Layering
  console.log('Testing Scenario 2: Shell Company Layering (Desktop)...');
  // Click on scenario 2 button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Shell Company')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '02_desktop_shell_company.png'), fullPage: true });

  // 3. Desktop - Scenario 3: Smurfing & Structuring
  console.log('Testing Scenario 3: Smurfing & Structuring (Desktop)...');
  const buttons3 = await page.$$('button');
  for (const btn of buttons3) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Structuring')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '03_desktop_structuring.png'), fullPage: true });

  // 4. Mobile - Scenario 1: Fraud Ring
  console.log('Testing Scenario 1: Fraud Ring (Mobile 390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true });
  // Switch back to fraud ring
  const buttonsMob = await page.$$('button');
  for (const btn of buttonsMob) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Mule Fraud Ring')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '04_mobile_fraud_ring.png'), fullPage: true });

  // 5. Mobile - Scenario 2: Shell Company Layering
  console.log('Testing Scenario 2: Shell Company Layering (Mobile)...');
  const buttonsMob2 = await page.$$('button');
  for (const btn of buttonsMob2) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Shell Company')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '05_mobile_shell_company.png'), fullPage: true });

  // 6. Mobile - Scenario 3: Structuring
  console.log('Testing Scenario 3: Structuring (Mobile)...');
  const buttonsMob3 = await page.$$('button');
  for (const btn of buttonsMob3) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Structuring')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outputDir, '06_mobile_structuring.png'), fullPage: true });

  await browser.close();

  console.log('Verification Complete.');
  console.log('Console Errors:', consoleErrors.length > 0 ? consoleErrors : 'NONE (0 errors)');
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
