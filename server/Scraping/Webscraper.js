const request = require("request")
// const cheerio = require("cheerio")
// const fs = require("fs")
// const writeStream = fs.createWriteStream("post.csv")


// request("https://shop.rema1000.dk/avisvarer", (error, response, html) => {
//     if(!error && response.statusCode == 200){
//         const $ = cheerio.load(html);
//         const title = $(".title");
//         console.log(title.html())

//         $(".product-wrap").each((i,el)=> {
//             const name = $(el).find(".info");
//             const price = $(el).find("span").text();
//             const source = $(el).find("img").attr("src");

//             console.log(name, price, source)
//             // writeStream.write(`${name}, ${price} ${source}`)

//         })
//         console.log("Scraping done")
//     }
// })


const puppeteer = require('puppeteer');

async function scrapeProductInfo(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const cookies = [
    {
      "name": "_ALGOLIA",
      "value": "anonymous-1ce41870-3f95-4ec7-8071-6d2322af5df6",
      "domain": "shop.rema1000.dk",
      "path": "/",
      "httpOnly": false,
      "secure": false
    }, 
    {
        "name": "CookieInformationConsent",
        "value": "%7B%22website_uuid%22%3A%223a35884e-8bf9-403b-9a1c-9516d0c26091%22%2C%22timestamp%22%3A%222023-02-04T13%3A22%3A04.542Z%22%2C%22consent_url%22%3A%22https%3A%2F%2Frema1000.dk%2F%22%2C%22consent_website%22%3A%22rema1000.dk%22%2C%22consent_domain%22%3A%22rema1000.dk%22%2C%22user_uid%22%3A%221cc7205a-8bb4-4e4f-af94-b948f9ecf7a8%22%2C%22consents_approved%22%3A%5B%22cookie_cat_necessary%22%5D%2C%22consents_denied%22%3A%5B%22cookie_cat_functional%22%2C%22cookie_cat_statistic%22%2C%22cookie_cat_marketing%22%2C%22cookie_cat_unclassified%22%5D%2C%22user_agent%22%3A%22Mozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F109.0.0.0%20Safari%2F537.36%22%7D",
        "domain": "shop.rema1000.dk	",
        "path": "/",
        "httpOnly": false,
        "secure": true
      },
      {
        "name": "XSRF-TOKEN	",
        "value": "eyJpdiI6IjdTb3lcL3FkenFSbVJ4Mzh0NURDUE9RPT0iLCJ2YWx1ZSI6IncyZ2Z3YjRhSjlVMGVwMHA4U2xJd3p1ZzhcL0NkWTZTWFh6RStpVVNyYTlNQVJmaHBJbVB6bGxtNHY5NTBITnVsOXFsODl4c3pld1Y4c2VhWnh0ZXE3eEhwdE51VmdmeEU1OXlycWx3RDkyT0FaSDUzdCtoS24rbTNNXC9CMFZqQ0siLCJtYWMiOiIyZjc2ZjhkNmQ5MTY0ZTRkNDg0NGVkZjdmZmQ3NDExOGMwOTc1OTY1MTc4ZmJiYTUyNWNmYTQzYjhiZTcyNjU2In0",
        "domain": ".rema1000.dk	",
        "path": "/",
        "httpOnly": false,
        "secure": false
      },
      {
        "name": "shop_session",
        "value": "eyJpdiI6ImIwQ2lxMDllZElhNHFUdVQyMDk3Q2c9PSIsInZhbHVlIjoiNkluNnh0aXRJb0lOUDFlVHV6WXJqaTRQR3BHdVU1Z21TYlhqTnR1cXRhT2kyeE1Sb1RMTlVIdUEzOXd5QnJQV3pvc0ZWMjhjMFFwejF2cmFcLzJtNU1XV2FcLzBncmtQNFMzdjhNY1ZJSXpXNlJkZjY5SEdYOW1UZXNHMnQwXC9jcGwiLCJtYWMiOiI4YmVlMmY5NDEwOWVjZmI0MzRkN2E4MTViNWFlNGVhOTM4NWRlMDFhYWJjNTEwZmM2OWZjMjMzNjYyM2Y0NGZlIn0",
        "domain": ".rema1000.dk",
        "path": "/",
        "httpOnly": true,
        "secure": false
      }];
  
    await page.setCookie(...cookies);
    await page.goto(url);
    
  // Wait for the dynamic content to load
  const nte = await page.waitForSelector('.price');
  console.log(nte)

  // Extract the product information

  const productName = await page.$eval('span', el => el.textContent);
//   const productPrice = await page.$eval('.product-price', el => el.textContent);
  console.log(productName + "hej")
  
  // Close the browser
  await browser.close();

  return { productName };
}




scrapeProductInfo('https://shop.rema1000.dk/avisvarer')
  .then(productInfo => console.log(productInfo))
  .catch(err => console.error(err));
