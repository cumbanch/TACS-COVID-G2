jest.mock('axios');
const axios = require('axios');

const limit = 1001;

const getRandomNumber = (maxRange = limit) => Math.floor(Math.random() * maxRange);

const getRandomLatest = () => ({
  confirmed: getRandomNumber(),
  deaths: getRandomNumber(),
  recovered: getRandomNumber()
});

const mockSuccessGetAll = () =>
  axios.all.mockImplementationOnce(requests =>
    Promise.all(requests).then(latest => latest.map(result => ({ data: result })))
  );

const failSuccessGetAll = () => axios.all.mockImplementationOnce(requests => Promise.all(requests));

const mockSuccess = ([firstIso2, secondIso2], [firstValueMock, secondValueMock]) => {
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
  mockSuccess(isocodes, [getRandomLatest(), getRandomLatest()]);
};

exports.mockFailCovid = () => {
  failSuccessGetAll();
  axios.get.mockRejectedValueOnce({ message: 'Default error covid api' });
};

exports.mockSuccessGetHistory = isocodes => {
  mockSuccess(isocodes, [
    {
      timeseries: {
        '4/23/20': getRandomLatest(),
        '4/22/20': getRandomLatest(),
        '4/21/20': getRandomLatest()
      }
    },
    {
      timeseries: {
        '3/23/20': getRandomLatest(),
        '4/22/20': getRandomLatest(),
        '4/21/20': getRandomLatest()
      }
    }
  ]);
};
