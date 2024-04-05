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

import puppeteer from "puppeteer";
import fs from "fs";

const downloadImage = async (url, filepath) => {
  console.log(url);
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });
  const page = await browser.newPage();
  let viewSource = await page.goto(`${url}`, {
    waitUntil: "load",
  });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  viewSource = await page.reload({ waitUntil: "load" });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const buffer = await viewSource?.buffer();
  fs.writeFile(`${filepath}`, buffer, () => {
    console.log("Image downloaded successfully!");
  });
  await browser.close();
};

export { downloadImage };
