import axios from "axios"
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"

const BASE_URL = 'http://localhost:8090/api'

export const AxiosInstanceProvider = ({ config: {}, requestInterceptors = [], responseInterceptors = [], children,}) => {
  const instanceRef = useRef(axios.create(config));
  const AxiosContext = createContext(null);


  return (
    <AxiosContext.Provider>
      {children}
    </AxiosContext.Provider>
  );
};


export function useAPI(uri, method, payload) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const contextInstance = useContext(AxiosContext);
    const instance = useMemo(() => {
        return contextInstance || axios;
    }, [contextInstance]);
  
    const controller = new AbortController()

    const cancel = () => {
        controller.abort()
    }


    useEffect(() => {
        (
            async () => {
                try {
                    setLoading(true)
                    const response = await instance.request(
                        {
                            method: method,
                            data: payload,
                            url: uri,
                            signal: controller.signal
                        })
                    setData(response.data)
                } catch (e) {
                    setError(e)
                } finally {
                    setLoading(false)
                }
            }
        )()
        return () => cancel()
    }, [])

    return [data, error, loading]
}