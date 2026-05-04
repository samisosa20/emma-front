import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { format } from "date-fns";
import http from "http";

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

export const AXIOS_INSTANCE = Axios.create({
  baseURL: typeof window !== "undefined"
    ? ""
    : (process.env.NEXT_PUBLIC_INTERNAL_API_URL || "http://localhost:3030"),
});

async function handleRequestSuccess(request: InternalAxiosRequestConfig) {
  request.headers["Content-Type"] = "application/json";
  request.headers["Timezone"] = getTimezone();

  if (typeof window === "undefined") {
    request.headers.delete("host");
    
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const allCookies = cookieStore.toString();

      if (allCookies) {
        request.headers["Cookie"] = allCookies;
      }
    } catch (e) {
      console.warn("No se pudieron obtener cookies en el servidor");
    }
  }

  return request;
}
function handleRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function handleResponseSuccess(response: AxiosResponse) {
  return response;
}

async function handleResponseError(error: AxiosError<ApiErrorResponse>) {
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
