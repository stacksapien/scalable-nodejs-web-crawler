const Queue = require('bee-queue');
let utility = require('../utility/strings')
let Urls = require('../models/urls');
let webCrawler = require('../crawl/crawler.js')

function startCrawling(url, queueName, domain, path) {
  const queue = new Queue(queueName);
  let urls = new Urls();
  urls.addToValidUrlSet(url);
  createJob(url, queue, urls, domain, path);
  // Process jobs from as many servers or processes as you like
  queue.process(function (job, done) {
    
    webCrawler.crawl(job.data.url)
      .then((links) => {
        console.log(links);
        
        done(null, links);
      })
      .catch((err) => {
        done(err);
      })
  });
}

function createJob(url, queue, urls, domain, path) {

  const job = queue.createJob({ url: url });
  job.save();

  job.on('succeeded', (links) => {
    // Write in memory
    links.forEach(link => {
      if (utility.isContains(link, domain)) {
        // Check if it's already in Valid URL Set
        if (!urls.isContains(urls.getValidUrlSet(),link)) {
          // create the job
          createJob(link, queue, urls, domain);
          utility.writeToFile(`${path}/valid-urls.txt`, `${link}\n`, 'utf8')
          
        }
        urls.addToValidUrlSet(link);      
      }
      else {
        // It's a external link
       
        if (!urls.isContains(urls.getExternalUrlSet(),link)) {
          
          utility.writeToFile(`${path}/external-urls.txt`, `${link}\n`, 'utf8')
          
        }
        urls.addToExternalUrlSet(link);
        
      }
    });
  });

  job.on('failed', (err) => {
    if (!urls.isContains(urls.getInvalidUrlSet()).has(job.data.url)) {
      // create the job
      urls.addToInvalidUrlSet(job.data.url);
      utility.writeToFile(`${path}/invalid-urls.txt`, `${job.data.url}\n`, 'utf8')

    }
  });
  job.on('progress', (progress) => {

    console.log(`Job ${job.id} reported progress: ${progress}%`);

  });
}



startCrawling("https://stacksapien.com",'Violent', "https://stacksapien.com",'..')




