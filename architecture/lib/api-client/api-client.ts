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

export const AXIOS_INSTANCE = Axios.create();

async function handleRequestSuccess(request: InternalAxiosRequestConfig) {
  request.headers["Content-Type"] = "application/json";
  request.headers["Timezone"] = getTimezone();

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
