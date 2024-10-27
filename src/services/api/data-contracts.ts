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

export interface ApiAuthDaoAuthResponse {
  expirationDurationSeconds?: number;
}

export interface ApiAuthDaoLoginDao {
  email?: string;
  password?: string;
}

export interface ApiAuthDaoRegisterDao {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
}

export interface ApiModelOrganizations {
  created_at?: string;
  description?: string;
  id?: string;
  name?: string;
  owner_id?: string;
  slug?: string;
  updated_at?: string;
}

export interface ApiModelTeams {
  created_at?: string;
  description?: string;
  id?: string;
  name?: string;
  organization_id?: string;
  slug?: string;
  updated_at?: string;
}

export interface ApiModelUsers {
  created_at?: string;
  email?: string;
  first_name?: string;
  id?: string;
  last_name?: string;
  password?: string;
  password_reset_at?: string;
  updated_at?: string;
  username?: string;
  verified_at?: string;
}

export interface ApiOrganizationDaoOrganizationInput {
  description?: string;
  name: string;
  owner_id: string;
  slug: string;
}

export interface ApiResponseErrorResponseString {
  error?: string;
}

export interface ApiResponseSuccessDataResponseArrayModelOrganizations {
  data?: ApiModelOrganizations[];
}

export interface ApiResponseSuccessDataResponseArrayModelTeams {
  data?: ApiModelTeams[];
}

export interface ApiResponseSuccessDataResponseModelOrganizations {
  data?: ApiModelOrganizations;
}

export interface ApiResponseSuccessDataResponseModelTeams {
  data?: ApiModelTeams;
}

export interface ApiResponseSuccessDataResponseModelUsers {
  data?: ApiModelUsers;
}

export interface ApiTeamsDaoCreateTeamInput {
  description?: string;
  name: string;
  slug: string;
}
