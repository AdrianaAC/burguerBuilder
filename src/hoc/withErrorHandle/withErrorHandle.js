import React, { useState, useEffect } from "react";
import Model from "../../components/UI/Model/Model";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (resp) => resp,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.responset.eject(responseInterceptor);
      };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null)
    };

    return (
      <Aux>
        <Model show={error} modelClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Model>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
