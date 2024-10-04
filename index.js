const puppeteer = require("puppeteer");

async function printPDF(url, fileName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const title = await page.title();
  const titleString = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();

  await page.pdf({
    path: (fileName || titleString) + ".pdf",
    format: "A4",
  });

  await browser.close();
}

const url = process.argv[2];
const fileName = process.argv[3];

if (!url) {
  console.error("Please provide a URL as an argument");
  process.exit(1);
}

printPDF(url, fileName).catch((error) => {
  console.error(error);
  process.exit(1);
});
