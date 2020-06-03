jest.mock('axios');
const axios = require('axios');
const { moment } = require('../../app/utils/moment');

const limit = 1001;

const getRandomNumber = (maxRange = limit) => Math.floor(Math.random() * maxRange);

const getRandomLatest = confirmed => ({
  confirmed: confirmed || getRandomNumber(),
  deaths: getRandomNumber(),
  recovered: getRandomNumber()
});

const mockSuccessGetAll = () =>
  axios.all.mockImplementationOnce(requests =>
    Promise.all(requests).then(latest => latest.map(result => ({ data: result })))
  );

const failSuccessGetAll = () => axios.all.mockImplementationOnce(requests => Promise.all(requests));

const mockSuccessLatest = ([firstValueMock, secondValueMock]) => {
  mockSuccessGetAll();
  axios.get
    .mockResolvedValueOnce({ data: [firstValueMock] })
    .mockResolvedValueOnce({ data: [secondValueMock] })
    .mockResolvedValueOnce({ data: [] });
};

const mockSuccessHistory = ([firstIso2, secondIso2], [firstValueMock, secondValueMock]) => {
  mockSuccessGetAll();
  axios.get
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...firstValueMock, countrycode: { iso2: firstIso2 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...secondValueMock, countrycode: { iso2: secondIso2 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([]))
    );
};

exports.mockSuccessGetLatest = isocodes => {
  mockSuccessLatest(isocodes, [getRandomLatest(), getRandomLatest()]);
};

exports.mockFailCovid = () => {
  failSuccessGetAll();
  axios.get.mockRejectedValueOnce({ message: 'Default error covid api' });
};

exports.mockSuccessGetHistory = isocodes => {
  mockSuccessHistory(isocodes, [
    {
      timeseries: {
        '4/21/20': getRandomLatest(1),
        '4/22/20': getRandomLatest(1),
        '4/23/20': getRandomLatest(1)
      }
    },
    {
      timeseries: {
        '4/21/20': getRandomLatest(1),
        '4/22/20': getRandomLatest(1),
        '4/23/20': getRandomLatest(1)
      }
    }
  ]);
};

exports.mockSuccessGetHistory5LastDays = isocodes => {
  mockSuccessHistory(isocodes, [
    {
      timeseries: {
        [moment().format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest()
      }
    },
    {
      timeseries: {
        [moment().format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest()
      }
    }
  ]);
};

exports.mockSuccessGetHistory5LastDays = isocodes => {
  mockSuccessHistory(isocodes, [
    {
      timeseries: {
        [moment().format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest()
      }
    },
    {
      timeseries: {
        [moment().format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest()
      }
    }
  ]);
};

exports.mockSuccessLatestCountry = () => axios.get.mockResolvedValueOnce({ data: [getRandomLatest()] });

exports.mockSuccessEmptyLatestCountry = () => axios.get.mockResolvedValueOnce({ data: [] });
