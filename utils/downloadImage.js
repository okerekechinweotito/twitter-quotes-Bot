// Use this scraping script when image cant be downloaded with fetch
/* 
import puppeteer from 'puppeteer';
import fs from 'fs';

const downloadImage = async (url, filepath) => {
  console.log(url);
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const viewSource = await page.goto(`${url}`, {
    waitUntil: 'domcontentloaded',
  });

  const buffer = await viewSource.buffer();

  fs.writeFile(`${filepath}`, buffer, () => {
    console.log('Image downloaded successfully!');
  });

  await browser.close();
};

export { downloadImage };
 */
import fs from "fs";
import fetch from "node-fetch";

const downloadImage = async (url, filepath) => {
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFile(filepath, buffer, () => {
    console.log("Image downloaded successfully!");
  });
};

export { downloadImage };
