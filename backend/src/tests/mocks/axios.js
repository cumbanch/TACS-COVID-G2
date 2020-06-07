jest.mock('axios');
const axios = require('axios');

exports.mockCorrectGetMethod = userData => axios.get.mockResolvedValueOnce(userData);

exports.mockFailGetMethod = () =>
  axios.get.mockRejectedValueOnce({
    message: 'Error validating access token: The session is invalid because the user logged out.',
    type: 'OAuthException',
    code: 190,
    error_subcode: 467,
    fbtrace_id: 'AZA6oNBkq45zA655t5IMI9H'
  });
