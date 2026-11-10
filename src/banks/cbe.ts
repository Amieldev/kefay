import puppeteer from "puppeteer";
import Transaction from "../types/transaction.js";
import type { Receipt } from "../utils/validator.js";
import hash from "../utils/hasher.js";

export default async function checkCBE(
  url: string,
  receipt: Receipt,
): Promise<Transaction> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.waitForSelector(
    ".md\\:text-lg.text-sm.font-semibold.py-1.md\\:py-2.px-4.text-center.border-b.m-0",
    { visible: true, timeout: 10000 },
  );

  const selector = await page.$$eval(
    `.text-black.text-right.md\\:text-sm.md\\:col-span-1`,
    (elements) => elements.map((el) => el.textContent?.trim() ?? ""),
  );

  const bank = "CBE";
  const senderName = selector[0];
  const senderAccountNumber = selector[1];
  const receiverName = selector[2];
  const receiverAccountNumber = selector[3];
  const date = selector[5];
  const referenceNumber = selector[6];
  const amount = parseFloat(selector[8]);

  await browser.close();

  const kefayID = hash(bank, referenceNumber);
  let verified = false;

  for (let i = 0; i < receipt.receiverAccounts.length; i++) {
    if (receipt.receiverAccounts[i].bank === "CBE") {
      if (
        receipt.amount === amount &&
        receipt.receiverAccounts[i].receiverAccountNumber.slice(-4) ===
          receiverAccountNumber.slice(-4) &&
        receipt.receiverAccounts[i].receiverName === receiverName
      ) {
        verified = true;
      }
    }
  }

  const transaction: Transaction = {
    verified,
    transaction: {
      bank,
      senderName,
      senderAccountNumber,
      receiverName,
      receiverAccountNumber,
      date,
      referenceNumber,
      amount,
      kefayID,
    },
  };

  return transaction;
}
