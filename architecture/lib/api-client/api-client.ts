import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { format } from "date-fns";

export interface ApiErrorResponse {
  message: string;
  method: string;
  path: string;
  statusCode: number;
  timestamp: string;
}

function getTimezone() {
  const now = new Date();

  const timezoneOffset = format(now, "XXX");

  return `UTC${timezoneOffset}`;
}

// AXIOS INSTANCE
// ==========================================
export const AXIOS_INSTANCE = Axios.create({
  baseURL: typeof window === "undefined" 
    ? (process.env.NEXT_PUBLIC_INTERNAL_API_URL || "http://localhost:3030") 
    : "",
});

// ==========================================
// INTERCEPTOR: Request Success
// ==========================================
async function handleRequestSuccess(request: InternalAxiosRequestConfig) {
  request.headers["Content-Type"] = "application/json";
  request.headers["Timezone"] = getTimezone();

  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = cookies();
      const allCookies = cookieStore.toString();

      console.log("=== COOKIES ===");
      console.log("All cookies string:", allCookies);

      if (allCookies) {
        request.headers["Cookie"] = allCookies;
        console.log("=== COOKIE HEADER SET ===");
        console.log("Cookie:", request.headers.get("Cookie"));
      }
    } catch (e) {
      console.error("Error getting cookies:", e);
    }
  }

  return request;
}

// ==========================================
// INTERCEPTOR: Request Error
// ==========================================
function handleRequestError(error: AxiosError): Promise<AxiosError> {
  console.error("=== AXIOS REQUEST ERROR ===");
  console.error("URL:", error.config?.url);
  console.error("Method:", error.config?.method);
  console.error("Error:", error.message);
  console.error("Code:", error.code);
  
  return Promise.reject(error);
}

// ==========================================
// INTERCEPTOR: Response Success
// ==========================================
function handleResponseSuccess(response: AxiosResponse) {
  console.log("=== AXIOS RESPONSE SUCCESS ===");
  console.log("URL:", response.config.url);
  console.log("Status:", response.status);
  
  return response;
}

// ==========================================
// INTERCEPTOR: Response Error
// ==========================================
async function handleResponseError(error: AxiosError): Promise<AxiosError> {
  console.error("=== AXIOS RESPONSE ERROR ===");
  console.error("URL:", error.config?.url);
  console.error("Status:", error.response?.status);
  console.error("Error:", error.message);
  console.error("Code:", error.code);
  console.error("Cause:", error.cause);
  
  // Información adicional de debug
  if (error.config) {
    console.error("Full config:", {
      baseURL: error.config.baseURL,
      url: error.config.url,
      method: error.config.method,
      headers: error.config.headers,
    });
  }

  return Promise.reject(error);
}

AXIOS_INSTANCE.interceptors.request.use(
  handleRequestSuccess,
  handleRequestError
);

AXIOS_INSTANCE.interceptors.response.use(
  handleResponseSuccess,
  handleResponseError
);

export const apiClient = <T>(
  url: string,
  options: AxiosRequestConfig & { body?: any }
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const { body, ...rest } = options;

  const promise = AXIOS_INSTANCE({
    url,
    ...rest,
    data: body || rest.data,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};
export default apiClient;

export interface ErrorType<Error> extends AxiosError<Error> {}

export type BodyType<BodyData> = BodyData;
