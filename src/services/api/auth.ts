/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  ApiAuthDaoAuthResponse,
  ApiAuthDaoLoginDao,
  ApiAuthDaoRegisterDao,
  ApiResponseErrorResponseString,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description User login route
   *
   * @tags Auth
   * @name LoginCreate
   * @summary Login user
   * @request POST:/auth/login
   */
  loginCreate = (body: ApiAuthDaoLoginDao, params: RequestParams = {}) =>
    this.http.request<ApiAuthDaoAuthResponse, ApiResponseErrorResponseString>({
      path: `/auth/login`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description User logout route
   *
   * @tags Auth
   * @name LogoutList
   * @summary Logout user
   * @request GET:/auth/logout
   */
  logoutList = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/auth/logout`,
      method: "GET",
      ...params,
    });
  /**
   * @description Refresh access token route
   *
   * @tags Auth
   * @name RefreshList
   * @summary Refresh access token
   * @request GET:/auth/refresh
   */
  refreshList = (params: RequestParams = {}) =>
    this.http.request<ApiAuthDaoAuthResponse, ApiResponseErrorResponseString>({
      path: `/auth/refresh`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description User registration route
   *
   * @tags Auth
   * @name RegisterCreate
   * @summary Register user
   * @request POST:/auth/register
   */
  registerCreate = (body: ApiAuthDaoRegisterDao, params: RequestParams = {}) =>
    this.http.request<ApiAuthDaoAuthResponse, ApiResponseErrorResponseString>({
      path: `/auth/register`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
