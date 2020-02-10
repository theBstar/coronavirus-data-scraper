const express = require('express');
const httpRequest = require('request-promise');

const { PORT } = require('./config');
const { scrapeDataFromHTML } = require('./scraper');
const InMemoryCache = require('./InMemoryCache');
const { makeSuccessfullResponse, isDataExpired } = require('./utils');
const {
  DATA_URL,
  ERROR_RESPONSE,
} = require('./constants');

const app = express();

function buildSuccessResponder(response) {
  return function sendSuccessResponse(data) {
    const result = makeSuccessfullResponse(data);
    response.status(200).json(result);
  }
}


app.get('/', async (request, response) => {
  const sendSuccessResponse = buildSuccessResponder(response);
  const resultFromCache = InMemoryCache.getData();
  if (resultFromCache && !isDataExpired(resultFromCache)) {
    sendSuccessResponse(resultFromCache);
    return;
  }

  httpRequest(DATA_URL)
    .then(function (html) {
      const resultSet = scrapeDataFromHTML(html);
      if (!resultSet) throw Error('Could not scrape the data');
      InMemoryCache.setData(resultSet);
      sendSuccessResponse(InMemoryCache.getData());
      return;
    })
    .catch(function (e) {
      const resultFromCache = InMemoryCache.getData();
      if (resultFromCache) {
        sendSuccessResponse(resultFromCache);
        return;
      }
      response.status(500).json(ERROR_RESPONSE);
      return;
    });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
})