// utils/cookie.ts
interface CookieOptions {
  cookieName: string;
  value: string;
  expiresIn: number; // in seconds
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

// Set a cookie
export const setCookie = ({
  cookieName,
  value,
  expiresIn,
  path = '/',
  secure = false,
  sameSite = 'Lax',
}: CookieOptions) => {
  const cookieValue = encodeURIComponent(value);
  let cookieStr = `${cookieName}=${cookieValue}; max-age=${expiresIn}; path=${path}; SameSite=${sameSite}`;
  if (secure) cookieStr += '; Secure';
  document.cookie = cookieStr;
};

// Get a cookie by name
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

// Clear a specific cookie
export const clearCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};

// Clear all cookies
export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; max-age=0; path=/`;
  });
};
