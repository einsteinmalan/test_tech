
const { program } = require('commander');
var request = require('request');
var Scraper = require("image-scraper");
const cheerio = require('cheerio');






program
  .name('fredcrawlercli')
  .description('CLI Crawler to harvest images from website on specific depth')
  .version('1.0.0')
  .argument('<start_url>', 'Url to crawl')
  .argument('<depth>', 'Number of depth to visit each link')
  .action((start_url, depth)  => {
    console.log('start_url:', start_url);
    console.log('depth:', depth);
    var allLinks = [];

     request(start_url, function(err, resp, body){ 
        $ = cheerio.load(body);
        links = $('a'); 
        $(links).each(function(i, link){
           
         // console.log( $(link).attr('href'));

         var scraper = new Scraper(`${ $(link).attr('href')}`);
         scraper.scrape(function(image) { 

            const info = {
                imageUrl: image.address,
                sourceUrl: image.fromAddress,
                depth:1
            }
         

             allLinks.push(info);
             console.log(image.address);
            
           
        });

       
        });
      });

     var finaData = {
         result: allLinks,
     }

      



    






  });

program.parse();