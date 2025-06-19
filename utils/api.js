import Config from '../config';
import * as SecureStore from 'expo-secure-store';

// Helper to get tokens from SecureStore
async function getTokens() {
  const access = await SecureStore.getItemAsync('accessToken');
  const refresh = await SecureStore.getItemAsync('refreshToken');
  return { access, refresh };
}

// Helper to save tokens to SecureStore
async function saveTokens({ access, refresh }) {
  if (access) await SecureStore.setItemAsync('accessToken', access);
  if (refresh) await SecureStore.setItemAsync('refreshToken', refresh);
}

// Helper to remove tokens from SecureStore
async function removeTokens() {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
}

// Refresh the access token using the refresh token
async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${Config.BACKEND_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.access) {
      await saveTokens({ access: data.access, refresh: refreshToken });
      return data.access;
    }
  }
  await removeTokens();
  throw new Error('Unable to refresh token');
}

// Main fetch function with automatic token refresh
export async function authFetch(url, options = {}) {
  let { access, refresh } = await getTokens();
  let response;

  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${access}`,
    'Content-Type': options.headers?.['Content-Type'] || 'application/json',
  };

  response = await fetch(`${Config.BACKEND_URL}${url}`, options);

  // If token expired, try to refresh and retry once
  if (response.status === 401 && refresh) {
    try {
      access = await refreshAccessToken(refresh);
      options.headers.Authorization = `Bearer ${access}`;
      response = await fetch(`${Config.BACKEND_URL}${url}`, options);
    } catch (e) {
      await removeTokens();
      throw new Error('Session expired. Please log in again.');
    }
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    // Try to get error message from response
    console.log('API Error:', data);
    const errorMsg =
      data?.detail ||
      data?.message ||
      (Array.isArray(data?.non_field_errors) ? data.non_field_errors.join(', ') : undefined) ||
      'Unknown error';
    throw new Error(errorMsg);
  }

  return data;
}