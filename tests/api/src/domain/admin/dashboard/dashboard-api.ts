import { AxiosRequestConfig } from "axios";
import { config } from "../../../config/config";
import { AdminDashboardEndpoints } from "../../../shared/endpoints";
import { HttpClientAdapter } from "../../../shared/http-client-adapter";
import { anyStatus } from "../../../shared/request-options";
import { DashboardType } from "./dashboard-types";

export class AdminDashboardApi {
  static get(options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<DashboardType>(
      `${config.baseURL}${AdminDashboardEndpoints.DASHBOARD}`,
      anyStatus(options),
    );
  }
}
