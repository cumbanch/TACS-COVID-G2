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

const mockSuccessHistoryForCloser = (
  [iso2_1, iso2_2, iso2_3, iso2_4, iso2_5],
  [valueMock_1, valueMock_2, valueMock_3, valueMock_4, valueMock_5]
) => {
  mockSuccessGetAll();
  axios.get
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...valueMock_1, countrycode: { iso2: iso2_1 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...valueMock_2, countrycode: { iso2: iso2_2 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...valueMock_3, countrycode: { iso2: iso2_3 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...valueMock_4, countrycode: { iso2: iso2_4 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([{ ...valueMock_5, countrycode: { iso2: iso2_5 } }]))
    )
    .mockImplementationOnce((_, { transformResponse: [transformFunction] }) =>
      transformFunction(JSON.stringify([]))
    );
};

exports.mockSuccessGetHistoryForCloser = isocodes => {
  mockSuccessGetAll();
  const valueMocks = [];
  isocodes.forEach(() =>
    valueMocks.push({
      timeseries: {
        '4/21/20': getRandomLatest(1),
        '4/22/20': getRandomLatest(1),
        '4/23/20': getRandomLatest(1)
      }
    })
  );
  mockSuccessHistoryForCloser(isocodes, valueMocks);
};

exports.mockSuccessGetHistory5LastDays = isocodes => {
  mockSuccessHistory(isocodes, [
    {
      timeseries: {
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment().format('M/D/YY')]: getRandomLatest()
      }
    },
    {
      timeseries: {
        [moment()
          .subtract(6, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(5, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(4, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(3, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(2, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment()
          .subtract(1, 'days')
          .format('M/D/YY')]: getRandomLatest(),
        [moment().format('M/D/YY')]: getRandomLatest()
      }
    }
  ]);
};

exports.mockSuccessLatestCountry = () => axios.get.mockResolvedValueOnce({ data: [getRandomLatest()] });

exports.mockSuccessEmptyLatestCountry = () => axios.get.mockResolvedValueOnce({ data: [] });
