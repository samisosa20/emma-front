import axios from "axios";
import { useEffect } from "react";
import { AxiosResponse, AxiosError } from "axios";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const useInterceptor = () => {
  const router = useRouter();

  const handleRequestSuccess = (request: any) => {
    const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : null;
    if (user) {
      const token = user.token;
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  };

  const callErrorToast = (text = "") => {
    toast.error(text);
  };

  const handleRequestError = (error: AxiosError) => {
    console.error(`REQUEST ERROR! => ${error}`);
  };

  const handleResponseSuccess = (response: AxiosResponse) => {
    return response;
  };

  const handleResponseError = (error: any) => {
    switch (error.response.status) {
      case 401:
        if (error.response.data.message) {
          callErrorToast(error.response.data.message);
        }
        localStorage.clear();
        router.push("/");
        break;
      default:
        if (error.response.data.message) {
          callErrorToast(error.response.data.message);
        }
        return;
    }
    throw error;
  };

  useEffect(() => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;
