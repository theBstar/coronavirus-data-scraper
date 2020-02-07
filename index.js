const express = require('express');
const rp = require('request-promise');

const { PORT } = require('./config');
const { scrapeDataFromHTML } = require('./scraper');
const InMemoryCache = require('./InMemoryCache');
const {
  DATA_URL,
  SUCCESS_STATUS,
} = require('./constants');


const app = express();

app.get('/', async (request, response) => {
  const resultFromCache = InMemoryCache.getData();

  if (resultFromCache.status === SUCCESS_STATUS) {
    response.status(200).json(resultFromCache);
    return;
  }

  rp(DATA_URL)
    .then(function (html) {
      const resultSet = scrapeDataFromHTML(html);
      InMemoryCache.setData(resultSet);
      response.status(200).json(InMemoryCache.getData());
      return;
    })
    .catch(function (e) {
      response.status(500).json(InMemoryCache.getData());
      return;
    });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})