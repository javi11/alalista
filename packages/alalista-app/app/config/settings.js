// If you're running on a device or in the Android simulator be sure to change

import { DEV_API_URL } from './constants';

let apiUrl = DEV_API_URL;
if (process.env.NODE_ENV === 'production') {
  apiUrl = ''; // your production server url
}

const settings = {
  env: process.env.NODE_ENV,
  API_URL: apiUrl
};

export default settings;
