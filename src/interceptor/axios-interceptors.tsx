import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { triggerLogout } from "../redux/store/features/authSlice";
import { store } from "../redux/store/store";
import { baseUrl } from "../utils/url";

function useCustomNavigate() {
  const navigate = useNavigate();
  return navigate;
}


axios.interceptors.request.use(
  (config) => {
    // console.log("asdsa");
    let accesstoken = null;
    const accesstokenLocal = localStorage.getItem("mimoToken");

    if (accesstokenLocal !== null) {
      accesstoken = JSON.parse(accesstokenLocal);
    }
    // console.log(accesstoken);
    // const jwttoken = JSON.parse(localStorage.getItem("jwttoken"));
    if (accesstoken && !config.headers.ignoreInterceptor) {
      config.headers["Authorization"] = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(

  (response: AxiosResponse) => {
    return response;
  },

  (error) => {
    if (
      error?.response?.request?.responseURL?.includes("/Auth/RefreshToken")
      //  && error?.response?.status === 400
    ) {
      // console.log("reflesh error");
      localStorage.removeItem("mimoToken");
      localStorage.removeItem("mimoRefreshToken");
      // console.log("asdasdasdasdadsadadsasdassdasdas-da-ds-asd-ad-a---------");
      // window.location.replace("/");
      return Promise.reject(error);
    }

    if (error.response.config.headers.ignoreInterceptor) {
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      return new Promise((resolve) => {
        const originalRequest = error.config;

        let refreshToken = null;
        const refreshTokenLocal = localStorage.getItem(
          "mimoRefreshToken"
        );
        if (refreshTokenLocal !== null) {
          refreshToken = JSON.parse(refreshTokenLocal);
        }
        // console.log(refreshToken, "refreshToken");
        if (originalRequest.url.indexOf("Auth/RefreshToken") > -1) {
          const { dispatch } = store;

          const navigate = useCustomNavigate();

          dispatch(triggerLogout(refreshToken));

          return Promise.reject(error);
        }
        // console.log(originalRequest.url);
        if (!originalRequest._retry) {
          // console.log("first");
          originalRequest._retry = true;

          let response = axios
            .post(
              baseUrl + "Auth/RefreshToken",
              {
                refreshToken: refreshToken,
              },
              {
                headers: {
                  ignoreInterceptor: false,
                },
              }
            )
            .then((response) => {
              localStorage.setItem(
                "mimoToken",
                JSON.stringify(response.data.accessToken)
              );

              localStorage.setItem(
                "mimoRefreshToken",
                JSON.stringify(response.data.refreshToken)
              );
              // console.log(originalRequest);
              return axios(originalRequest);
            });

          resolve(response);
        }

        return Promise.reject(error);
      });
    }
    else if (error.response.status === 400) {
      message.error(
          <div className="alert alert-danger m-3">
            {error.response.data?.Failures ? Object.values(error.response.data.Failures).map((message: any) => (
                <p className="mb-0">{message.ErrorMessage}</p>
            )) : <p>{error.response.data?.Detail}</p>  }

          </div>
      );
    }
    else if (error.response.status === 403) {
      const originalRequest = error.config;

      let refreshToken = null;
      const refreshTokenLocal = localStorage.getItem(
          "mimoRefreshToken"
      );
      if (originalRequest.url.indexOf("Auth/RefreshToken") > -1) {
        return new Promise((resolve) => {
          const originalRequest = error.config;

          let refreshToken = null;
          const refreshTokenLocal = localStorage.getItem(
              "mimoRefreshToken"
          );
          if (refreshTokenLocal !== null) {
            refreshToken = JSON.parse(refreshTokenLocal);
          }
          // console.log(refreshToken, "refreshToken");
          if (originalRequest.url.indexOf("Auth/RefreshToken") > -1) {
            const { dispatch } = store;

            const navigate = useCustomNavigate();

            dispatch(triggerLogout(refreshToken));

            return Promise.reject(error);
          }
          // console.log(originalRequest.url);
          if (!originalRequest._retry) {
            // console.log("first");
            originalRequest._retry = true;

            let response = axios
                .post(
                    baseUrl + "Auth/RefreshToken",
                    {
                      refreshToken: refreshToken,
                    },
                    {
                      headers: {
                        ignoreInterceptor: false,
                      },
                    }
                )
                .then((response) => {
                  localStorage.setItem(
                      "mimoToken",
                      JSON.stringify(response.data.accessToken)
                  );

                  localStorage.setItem(
                      "mimoRefreshToken",
                      JSON.stringify(response.data.refreshToken)
                  );
                  // console.log(originalRequest);
                  return axios(originalRequest);
                });

            resolve(response);
          }

          return Promise.reject(error);
        });
      }
    }
    else {
      message.error(
        <div className="alert alert-danger m-3">
          {/* <h5>{error.response.data.message}!</h5> */}
          <p>{error.response.data.Detail}</p>
          {/* <p>{error.response.data.Failures[0].ErrorMessage}</p> */}
          {/* {Object.values(error.response.data.Detail).map((message) => (
            <p className="mb-0">{message}</p>
          ))} */}
        </div>
      );
    }
  }

);
