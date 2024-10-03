const puppeteer = require("puppeteer");

async function printPDF(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const title = await page.title();
  const fileName = title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

  await page.pdf({ path: fileName, format: "A4" });

  await browser.close();
}

const url = "https://example.com";

printPDF(url).catch(console.error);
