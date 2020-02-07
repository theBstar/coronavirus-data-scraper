const {
  ERROR_MESSAGE,
  ERROR_RESPONSE,
  SUCCESS_STATUS,
  SUCCESS_MESSAGE,
  LATEST_VALID_DATA_FETCH_TIME,
} = require('./constants');

function InMemoryCacheBuilder() {
  const cache = new WeakMap();
  return new (class Cache {
    constructor(data) {
      this.setData(data);
    }

    isDataExpired(data) {
      if (data && data.fetchTime) {
        return data.fetchTime < LATEST_VALID_DATA_FETCH_TIME;
      }
      return true;
    }

    getData() {
      const dataFromCache = cache.get(this);
      if (dataFromCache && !this.isDataExpired(dataFromCache)) {
        return dataFromCache;
      }
      return ERROR_RESPONSE;
    }

    setData(data) {
      if (!data) return;
      if (data.rows.length === 0 || data.columns.length === 0) throw Error(ERROR_MESSAGE);
      const currentTime = Date.now();
      const dataWithTime = {
        status: SUCCESS_STATUS,
        message: SUCCESS_MESSAGE,
        fetchTime: currentTime,
        data,
      };
      cache.set(this, dataWithTime);
    }
  });
};

module.exports = InMemoryCacheBuilder();
