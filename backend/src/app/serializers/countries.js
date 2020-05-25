exports.getLatestCountrySerializer = data =>
  data.length
    ? { confirmed: data[0].confirmed, deaths: data[0].deaths, recovered: data[0].recovered }
    : { confirmed: 0, deaths: 0, recovered: 0 };
