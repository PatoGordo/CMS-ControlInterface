import axios, { AxiosError } from "axios";

const token = localStorage.getItem("app-auth-token");

const baseURL = "https://cms-back-end.vercel.app/";

export const api = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export function handleAxiosError(err: Error | AxiosError | unknown): void {
  return alert(
    ((err as AxiosError).response as { data: { message: string } })?.data
      .message
  );
}
