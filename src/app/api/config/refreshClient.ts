import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable.");
}

const refreshClient = axios.create({
  baseURL,
  withCredentials: true, // send cookies
  headers: { "Content-Type": "application/json" },
});

export default refreshClient;
