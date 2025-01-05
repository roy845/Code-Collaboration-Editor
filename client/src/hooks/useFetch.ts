import { useState, useEffect } from "react";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ErrorEnum } from "../constants/errorConstants";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

interface UseFetchState<T> {
  data: T | null;
  error: any;
  isLoading: boolean;
  setState?: React.Dispatch<React.SetStateAction<UseFetchState<T>>>;
}

function useFetch<T>(
  url: string,
  queryParams?: Record<string, string>,
  config?: AxiosRequestConfig
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  useEffect(() => {
    let isMounted: boolean = true;
    const fetchData = async () => {
      setState({ data: null, error: null, isLoading: true });

      try {
        let fullUrl: string = url;

        if (queryParams && Object.keys(queryParams).length > 0) {
          const queryString = new URLSearchParams(queryParams).toString();
          fullUrl = `${url}?${queryString}`;
        }

        const response: AxiosResponse<T> = await axiosPrivate(fullUrl, config);

        isMounted &&
          setState({
            data: response.data,
            error: null,
            isLoading: false,
          });
      } catch (error: any) {
        if (error?.message === ErrorEnum.NETWORK_ERROR) {
          toast.error(error?.message);
        }

        setState({ data: null, error: error, isLoading: false });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(queryParams), config]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    setState,
  };
}

export default useFetch;
