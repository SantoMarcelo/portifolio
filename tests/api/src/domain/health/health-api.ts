import { AxiosRequestConfig } from "axios";
import { config } from "../../config/config";
import { HealthEndpoints } from "../../shared/endpoints";
import { HttpClientAdapter } from "../../shared/http-client-adapter";
import { anyStatus, NO_AUTH } from "../../shared/request-options";
import { HealthResponseType } from "./health-types";

export class HealthApi {
  /** `GET /api/health` — public, served outside the versioned API prefix. */
  static check(options?: AxiosRequestConfig) {
    return HttpClientAdapter.get<HealthResponseType>(
      `${config.serverURL}${HealthEndpoints.HEALTH}`,
      anyStatus({ ...NO_AUTH, ...options }),
    );
  }
}
