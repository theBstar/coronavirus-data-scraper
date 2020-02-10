
function InMemoryCacheBuilder() {
  const cache = new WeakMap();
  return new (class Cache {
    constructor(data) {
      this.setData(data);
    }

    getData() {
      const dataFromCache = cache.get(this);
      if (dataFromCache) {
        return dataFromCache;
      }
      return null;
    }

    setData(data) {
      if (!data || data.rows.length === 0 || data.columns.length === 0) return;
      const currentTime = Date.now();
      const dataWithTime = {
        fetchTime: currentTime,
        data,
      };
      cache.set(this, dataWithTime);
    }
  });
};

module.exports = InMemoryCacheBuilder();
