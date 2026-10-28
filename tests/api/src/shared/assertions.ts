import { AxiosResponse } from "axios";

/** Asserts the status and the `{ error: { code } }` envelope of a failed response. */
export function expectApiError(
  response: AxiosResponse,
  status: number,
  code?: string,
) {
  expect(response.status).toBe(status);
  if (code) {
    expect(response.data?.error?.code).toBe(code);
  }
}
