const DATA_URL = 'https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?sle=true';
const SUCCESS_STATUS = 'Success';
const SUCCESS_MESSAGE = 'Successfully loaded data';
const ERROR_STATUS = 'Failed';
const ERROR_MESSAGE = 'Could not load the data, Please try again!';

const ERROR_RESPONSE = {
  status: ERROR_STATUS,
  message: ERROR_MESSAGE,
};

const LATEST_VALID_DATA_FETCH_TIME = Date.now() - (60 * 1000 * 20);

module.exports = {
  DATA_URL,
  SUCCESS_STATUS,
  SUCCESS_MESSAGE,
  ERROR_STATUS,
  ERROR_MESSAGE,
  ERROR_RESPONSE,
  LATEST_VALID_DATA_FETCH_TIME,
};
