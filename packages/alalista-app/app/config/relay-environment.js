/* global fetch */
import { installRelayDevTools } from 'relay-devtools';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import Expo from 'expo';
import { SESSION_KEY } from './constants';
import settings from './settings';

installRelayDevTools();

async function fetchQuery(operation, variables) {
  const { access_token: accessToken } = JSON.parse(await Expo.SecureStore.getItemAsync(SESSION_KEY));

  return fetch(`${settings.API_URL}/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json());
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store
});

export default env;
