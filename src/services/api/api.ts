import { Env } from "@/collections/env";
import { Auth } from "./Auth";
import { HttpClient } from "./http-client";
import { Organizations } from "./Organizations";
import { User } from "./User";

class ApiService {
  auth: Auth;
  user: User;
  organizations: Organizations;

  constructor() {
    const httpClient = new HttpClient({
      baseURL: Env.API_URI,
      withCredentials: true,
      responseType: "json",
    });
    this.auth = new Auth(httpClient);
    this.user = new User(httpClient);
    this.organizations = new Organizations(httpClient);
  }
}

export const apiService = new ApiService();