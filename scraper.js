const cheerio = require('cheerio');

function getTableRows($) {
  const tableContent = $('table > tbody')[0];
  return $(tableContent).find('tr');
}

function getCellText($, td) {
  let text = $(td).text();
  if (!text) {
    text = $(td).find('div').text();
  }
  return text;
}

function getColumnHeaders($, columns) {
  const columnHeaders = [];
  columns.each(function () {
    let text = getCellText($, this);
    columnHeaders.push(text);
  });
  return columnHeaders;
}

function getRowData($, columnHeaders, columns) {
  let columnIndex = 0;
  const row = {};
  columns.each(function () {
    let text = getCellText($, this);
    row[columnHeaders[columnIndex]] = text;
    columnIndex++;
  });
  return row;
}

function scrapeDataFromHTML(html) {
  const $ = cheerio.load(html);
  const data = {
    columns: [],
    rows: [],
  };
  const tableRows = getTableRows($);
  let isHeaderRow = true;

  tableRows.each(function () {
    const columns = $(this).find('td');
    if (isHeaderRow) {
      data.columns = getColumnHeaders($, columns);
      isHeaderRow = false;
    } else {
      const row = getRowData($, data.columns, columns);
      data.rows.push(row);
    }
  });
  return data;
}

module.exports = { scrapeDataFromHTML };
