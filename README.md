# Scalable-NodeJS-Web-Crawler

A NodeJS based web-Crawler which can scale on the go!

  - Support both Static & Dynamic Page Crawling

## Pre-requisite:

  - Linux (Ubuntu)
  - Redis
  - Nodejs

## Installation:
  - Install project dependencies. In the root directory of the project execute the following command:
    ```sh
        $ npm install
    ```
## Usage:
  - First run the test using : `npm test`
```sh
    $ npm start
```
 - In Above Example, A web-server will be hosted on port `3000`. Visit: https://127.0.0.1:3000.
 - To test URL crawling, Do POST Request on `http://127.0.0.1:3000/api/getLinks` with JSON request as given below :
 ```
    {
	    "urls" : ["http://your-url-com" ]
    }
 ```
