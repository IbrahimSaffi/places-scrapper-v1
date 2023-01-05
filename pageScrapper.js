const UserAgent = require('user-agents');
const scraperObject = {
    async scraper(browser) {
        let page = await browser.newPage();
        await page.setUserAgent(UserAgent.random().toString())
        let places = JSON.parse(localStorage.getItem("places")).results
        console.log(places)
        let placesData = []
        for (let i = 0; i < 2; i++) {
            let placeItem = {}
            placeItem.name = places[i].name
            placeItem.address = places[i].formatted_address
            placeItem.rating = places[i].rating
            await page.goto(`https://www.google.com/search?q=${placeItem.name.split(" ").join("%20")}`)
            const [link] = await page.$x("//a[contains(., 'Google reviews')]");
            if (link) {
                await link.click();
            }
            await page.waitForSelector('#reviewSort')
            console.log("here12")
            let section = page.$("#reviewSort")
             await page.keyboard.down();
             delay(2000)
            //  review-dialog-list.s
            // let reviewTags = await page.$$(".gws-localreviews__google-review span span")
             let reviewTags= await page.$$(".review-dialog-list span[tabindex='-1']")
             console.log(reviewTags)
             let reviews = [] 
            //  gws-localreviews
            
             for(let j = 0;j<reviewTags.length;j++){
                 let review = await (await reviewTags[j].getProperty("innerText")).jsonValue()
                 if(review.length>0&&!review.includes("Service")&&!review.includes("More")&&!review.includes("...")){
                  reviews.push(review)
                 }
                
             }
             placeItem.reviews = reviews
            // console.log(await page.$('[data-async-trigger:"reviewDialog"]'))
            placesData.push(placeItem)
        }
        console.log(placesData)
        //     console.log(`https://www.google.com/search?q=tattoos%20shop...`);
        //     await page.goto("https://www.google.com/search?q=tattoos%20shop");
        //   let buttonTag = await page.$('g-more-link')
        //    let linkTag =    await buttonTag.$('a')
        //    let link = await (await linkTag.getProperty("href")).jsonValue()
        //    await page.goto(link)
        // let categoriesObj = {}
        // let itemsObj = []
        // for (let i = 0; i < categories.length; i++) {
        //     let categoryLink = await categories[i].$('a')
        //     let link = await (await categoryLink.getProperty("href")).jsonValue()
        //     let nameOfCategory = await (await categoryLink.getProperty("innerText")).jsonValue()
        //     categoriesObj[nameOfCategory] = link
        // }
        // for (let key in categoriesObj) {
        //    await page.goto(categoriesObj[key]);
        //     async function autoScroll(page){
        //         await page.evaluate(async () => {
        //             await new Promise((resolve) => {
        //                 var totalHeight = 0;
        //                 var distance = 100;
        //                 var timer = setInterval(() => {
        //                     var scrollHeight = document.body.scrollHeight;
        //                     window.scrollBy(0, distance);
        //                     totalHeight += distance;

        //                     if(totalHeight >= scrollHeight - window.innerHeight){
        //                         clearInterval(timer);
        //                         resolve();
        //                     }
        //                 }, 50);
        //             });

        //         });
        //     }
        // //    await autoScroll(page)
        //     let items = await page.$$('.product-tile__upper-section')
        //     console.log(items)
        //     categoriesObj[key] = []
        //     for (let j = 0; j < items.length; j++) {
        //         let itemLinkTag = await items[j].$('a')
        //         if(itemLinkTag!==null){
        //         let itemlink = await (await itemLinkTag.getProperty("href")).jsonValue()
        //         console.log(itemlink)
        //         categoriesObj[key].push(itemlink)

        //         }
        //         if(categoriesObj[key].length===5){
        //             break
        //         }
        //     }
        //     console.log(key,categoriesObj[key].length)
        // }
        // for (let key in categoriesObj){
        //     for(let k =0;k<categoriesObj[key].length;k++){
        //         await page.goto(categoriesObj[key][k]);
        //         let itemObj ={}
        //         itemObj.category = key
        //         let nameTag = await page.$('.product-name')
        //         let name = await (await nameTag.getProperty("innerText")).jsonValue()
        //         itemObj.name= name
        //         let reviewTag = await page.$('.pdp_reviews__score')
        //         if(reviewTag!==null){
        //             let review = await (await reviewTag.getProperty("title")).jsonValue()
        //             itemObj.review= review
        //         }
        //         let priceTag = await page.$('.sales')
        //         let price = await (await priceTag.getProperty("innerText")).jsonValue()
        //         price = price.replace(/\s/g, '')
        //         itemObj.price= price
        //         let features = await page.$$('.js-attr-box .row')
        //         for(let l=0;l<features.length;l++){
        //             let featureTag = await features[l].$('.attr-label')
        //             if(featureTag!==null){
        //                 let featuresLabel = await (await featureTag.getProperty("innerText")).jsonValue()
        //                 let label = featuresLabel.split(":")[0].toLowerCase()
        //                 itemObj[label] = "No Data Added"
        //                 if(featuresLabel.includes("COLOR")){
        //                     itemObj[label] = []
        //                     let imgs = await page.$$(".select-color img")
        //                     for(let img =0 ;img<imgs.length;img++){
        //                         itemObj[label].push((await (await imgs[img].getProperty("title")).jsonValue()))
        //                     }
        //                 }
        //             }

        //         }

        //       itemsObj.push(itemObj)
        //     }
        // }
        //   (async () => {
        //     const csv = new ObjectsToCsv(itemsObj);

        //     await csv.toDisk('./items.csv');

        //     console.log(await csv.toString());
        //   })();
        // console.log(itemsObj)
        // browser.close()
    }
}
module.exports = scraperObject;