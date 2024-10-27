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

import { ApiResponseErrorResponseString, ApiResponseSuccessDataResponseModelUsers } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Get user info
   *
   * @tags User
   * @name GetUser
   * @summary Get user info
   * @request GET:/user/me
   */
  getUser = (params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseModelUsers, ApiResponseErrorResponseString>({
      path: `/user/me`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
