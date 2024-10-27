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
  ApiOrganizationDaoOrganizationInput,
  ApiResponseErrorResponseString,
  ApiResponseSuccessDataResponseArrayModelOrganizations,
  ApiResponseSuccessDataResponseArrayModelTeams,
  ApiResponseSuccessDataResponseModelOrganizations,
  ApiResponseSuccessDataResponseModelTeams,
  ApiTeamsDaoCreateTeamInput,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Organizations<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Create organization route
   *
   * @tags Organizations
   * @name OrganizationsCreate
   * @summary Create organization
   * @request POST:/organizations
   */
  organizationsCreate = (body: ApiOrganizationDaoOrganizationInput, params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseModelOrganizations, ApiResponseErrorResponseString>({
      path: `/organizations`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get organization by slug
   *
   * @tags Organizations
   * @name OrganizationsDetail
   * @summary Get organization
   * @request GET:/organizations/{orgId}
   */
  organizationsDetail = (orgId: string, params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseModelOrganizations, ApiResponseErrorResponseString>({
      path: `/organizations/${orgId}`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description List organizations route
   *
   * @tags Organizations
   * @name OrganizationsList
   * @summary List organizations
   * @request GET:/organizations
   */
  organizationsList = (params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseArrayModelOrganizations, ApiResponseErrorResponseString>({
      path: `/organizations`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Create a team
   *
   * @tags Teams
   * @name TeamsCreate
   * @summary Create a team
   * @request POST:/organizations/{orgSlug}/teams
   */
  teamsCreate = (orgSlug: string, body: ApiTeamsDaoCreateTeamInput, params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseModelTeams, ApiResponseErrorResponseString>({
      path: `/organizations/${orgSlug}/teams`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Get list of teams
   *
   * @tags Teams
   * @name TeamsDetail
   * @summary Get list of teams
   * @request GET:/organizations/{orgSlug}/teams
   */
  teamsDetail = (orgSlug: string, params: RequestParams = {}) =>
    this.http.request<ApiResponseSuccessDataResponseArrayModelTeams, ApiResponseErrorResponseString>({
      path: `/organizations/${orgSlug}/teams`,
      method: "GET",
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
