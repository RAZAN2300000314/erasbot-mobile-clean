import {
  getRemoteConfig,
  fetchAndActivate,
  getBoolean,
  setLogLevel,
} from 'firebase/remote-config';
import { firebaseApp } from '../firebase/firebaseConfig';

const remoteConfig = getRemoteConfig(firebaseApp);
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
  fetchTimeoutMillis: 10000,
};

remoteConfig.defaultConfig = {
  yelp_api_enabled: true,
  tripadvisor_api_enabled: true,
  weather_api_enabled: true,
  google_maps_api_enabled: true,
};

export const fetchRemoteConfig = async () => {
  try {
    await fetchAndActivate(remoteConfig);
    return {
      yelp: getBoolean(remoteConfig, 'yelp_api_enabled'),
      tripadvisor: getBoolean(remoteConfig, 'tripadvisor_api_enabled'),
      weather: getBoolean(remoteConfig, 'weather_api_enabled'),
      maps: getBoolean(remoteConfig, 'google_maps_api_enabled'),
    };
  } catch (err) {
    console.error('[Remote Config Error]', err);
    return {
      yelp: true,
      tripadvisor: true,
      weather: true,
      maps: true,
    };
  }
};
