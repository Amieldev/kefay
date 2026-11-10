# Kefay

Verify payment screenshots instantly

---

## Installation

```bash
npm install kefay
```

## Usage

```ts
import kefay from "kefay";

async function main() {
  try {
    const output = await kefay({
      src: "./screenshot.jpg",
      amount: 5000,
      receiverAccounts: [
        {
          bank: "CBE",
          receiverName: "John Doe Smith",
          receiverAccountNumber: "1000*****",
        },
      ],
    });

    console.log(output);
  } catch (error) {
    console.log(error);
  }
}

main();
```

## Output

```ts
{
    verified:true,
    kefayID:"89sad78f0a9d8f0a9d8f",
	  transactionDetails:{
	    bank:"CBE",
	    senderName:"Rip Van Winkle",
	    senderAccountNumber:"1000*****",
	    receiverName:"John Doe Smith",
	    receiverAccountNumber:"1000*****",
	    date:"Nov 02, 2026, 4:36 PM",
	    transactionID:"FM43812X",
	    amount:5000,
	}
}
```

## How it works

Kefay scans the QrCode present on the screenshot and navigates to the official website of the bank to extract transaction details.
After the details are extracted it simply compares the values provided by the developer with the ones retrieved from the website.
Finally, deming the transaction as verified or not depending on the similarity of the two values.

## Why use Kefay

Kefay does **NOT** simply extract the transaction details from the image using OCR scanning, But rather
it retrieves them directly from the official site of the bank using web scrapping.
This makes it very reliable and impossible to trick with fake or edited screenshots.

## Duplicate Receipts

This library does **NOT** detect duplicate transactions nor does it keep a record of previous transactions.
It is up to the developer to store a history of **kefayID**s (which are unique IDs given to each transaction by the library) and compare new receipts in order to detect duplicates.

## Supported Banks

![Commercial Bank of Ethiopia](/assets/cbe.jpg)

## Disclaimer

This is **NOT** an official library published by any of the banks supported.

## License

This project is licensed under the **MIT License**.
