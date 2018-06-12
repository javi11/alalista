/* global fetch */
import Expo from 'expo';
import jwtDecode from 'jwt-decode';
import settings from '../../config/settings';
import { SESSION_KEY } from '../../config/constants';

function onSignOut() {
  return Expo.SecureStore.removeItemAsync(SESSION_KEY);
}

async function isLoggedIn() {
  let isLogged = false;
  const session = await Expo.SecureStore.getItemAsync(SESSION_KEY);
  if (session && session.expires_in && session.access_token) {
    const now = Date.now();
    const { exp } = jwtDecode.decode(session.access_token);
    isLogged = now < exp;
  }

  return isLogged;
}

async function onSignIn(email, password) {
  const response = await fetch(`${settings.API_URL}/oauth2/token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: email, password, grant_type: 'password' })
  });
  const body = await response.json();

  if (body.statusCode > 300) {
    throw body;
  }

  await Expo.SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(body));

  return body;
}

export { onSignIn, isLoggedIn, onSignOut };
