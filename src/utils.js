const { LATEST_VALID_DATA_FETCH_TIME, SUCCESS_MESSAGE, SUCCESS_STATUS } = require('./constants');

function isDataExpired(data) {
  if (data && data.fetchTime) {
    return data.fetchTime < LATEST_VALID_DATA_FETCH_TIME;
  }
  return true;
}

function makeSuccessfullResponse(data) {
  return {
    status: SUCCESS_STATUS,
    message: SUCCESS_MESSAGE,
    data,
  };
}

module.exports = {
  isDataExpired,
  makeSuccessfullResponse,
};