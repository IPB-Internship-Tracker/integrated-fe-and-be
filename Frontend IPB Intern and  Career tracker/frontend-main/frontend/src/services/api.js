const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const AUTH_TOKEN_KEYS = ["access_token", "token"];

export const getApiBaseUrl = () => API_BASE_URL.replace(/\/$/, "");

export const getStoredToken = () => {
  for (const key of AUTH_TOKEN_KEYS) {
    const token = localStorage.getItem(key) || sessionStorage.getItem(key);
    if (token) return token;
  }
  return null;
};

export const saveAuthSession = (auth) => {
  if (!auth?.access_token) return;

  localStorage.setItem("access_token", auth.access_token);
  localStorage.setItem("token_type", auth.token_type || "bearer");
  localStorage.setItem("role", auth.role || "");
  localStorage.setItem("user_id", String(auth.user_id || ""));
};

export const clearAuthSession = () => {
  ["access_token", "token", "token_type", "role", "user_id"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

export const toApiAssetUrl = (path, fallback = "") => {
  if (!path) return fallback;
  if (path instanceof File) return URL.createObjectURL(path);
  if (/^(https?:|blob:|data:)/.test(path)) return path;
  if (path.startsWith("/")) return `${getApiBaseUrl()}${path}`;
  return path;
};

const buildUrl = (path, query) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getApiBaseUrl()}${normalizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
};

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();
    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) {
      return data.detail
        .map((item) => item.msg || item.detail || JSON.stringify(item))
        .join("\n");
    }
    if (data.message) return data.message;
    return JSON.stringify(data);
  } catch {
    return response.statusText || "Terjadi kesalahan saat menghubungi server.";
  }
};

export const apiRequest = async (
  path,
  {
    method = "GET",
    body,
    headers = {},
    auth = true,
    query,
  } = {}
) => {
  const requestHeaders = { ...headers };
  const isFormData = body instanceof FormData;

  if (body !== undefined && !isFormData && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getStoredToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: requestHeaders,
    body: isFormData || body === undefined ? body : JSON.stringify(body),
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearAuthSession();
    }
    throw new Error(await getErrorMessage(response));
  }

  if (response.status === 204) return null;
  return response.json();
};
