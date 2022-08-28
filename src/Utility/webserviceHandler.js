import ENV from './Eniviroment';

const axios = require('axios');

export async function callRemoteMethod(
  endpoint,
  type = 'GET',
  data,
  successKey = true,
) {
  // console.log(`data: ${data} \n URL: ${endpoint} sunny`);

  const method = type.toLowerCase();
  try {
    let options = {
      method: method,
      url: endpoint,
      headers: await getRequestHeader(),
    };
    (type === 'POST' ||
      type === 'PUT' ||
      type === 'PATCH' ||
      type === 'DELETE') &&
      (options.data = data);

    if (!ENV.IS_LIVE || __DEV__) {
      console.log('REQUEST: ', JSON.stringify(options));
      console.log('logging in webservicehandler');
    }

    const response = await axios(options);
    console.log(response.status, 'response.status');
    if (response.status === 200) {
      if (successKey) {
        if (response.data) {
          if (!ENV.IS_LIVE || __DEV__) {
            console.log('RESPONSE!', JSON.stringify(response.data));
          }
          return response.data ? response.data : response;
        }
      }
    } else {
      throw {response: response};
    }
  } catch (err) {
    if (err.response && err.response.status) {
      handleStatus(err.response);
    }
  }
}

function handleStatus(response) {
  console.log(
    'ERROR!',
    JSON.stringify(response.data?.message),
    response.status,
  );

  switch (response.status) {
    case 400:
      console.warn('Bad request', response.data.error);
      break;
    case 401:
      console.warn('Unauthorized Access');
      break;
    case 403:
      console.warn('Forbidden Access');
      break;
    case 404:
      console.log(response.data.message);
      break;
    case 500:
      console.warn('Internal Server Error');
      break;
    default:
      console.warn('Something went wrong! Please try again later.');
  }
}

async function getRequestHeader() {
  var header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return header;
}
