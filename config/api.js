import Constants from 'expo-constants';

/**
 * Safe dev IP detection for Expo
 */
function getDevServerIp() {
  // Works reliably in Expo Go
  const debuggerHost = Constants.manifest?.debuggerHost;

  if (!debuggerHost) return null;

  return debuggerHost.split(':')[0];
}

const DEV_IP = getDevServerIp();

export const API_URL = DEV_IP
  ? `http://${DEV_IP}:5000`
  : 'https://server-for-aquafarm-ai-production.up.railway.app';
