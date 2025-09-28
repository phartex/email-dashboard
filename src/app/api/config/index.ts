interface ConfigData {
  NEXT_PUBLIC_API_BASE_URL: string;
}
 
 
const fetchRuntimeConfig = async (): Promise<ConfigData> => {
  let url: string;
 
  if (typeof window === "undefined") {
    // On the server, use an absolute URL provided via an environment variable.
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
      if (process.env.NODE_ENV === "production") {
        throw new Error("NEXT_PUBLIC_BASE_URL must be set in production");
      } else {
        console.warn("NEXT_PUBLIC_BASE_URL is not set in development. Falling back to default local URL.");
        url = "http://localhost:3000/api/config";  // Fallback URL for local development
      }
    } else {
      url = `${baseUrl}/api/config`;
    }
  } else {
    // On the client, a relative URL works fine.
    url = "/api/config";
  }
 
  const response = await fetch(url);
 
  if (!response.ok) {
    throw new Error(`Failed to fetch config from ${url}: ${response.statusText}`);
  }
 
  const data: ConfigData = await response.json();
 
  if (!data.NEXT_PUBLIC_API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is missing from the configuration.");
  }
 
  return {
    NEXT_PUBLIC_API_BASE_URL: data.NEXT_PUBLIC_API_BASE_URL || ""
  };
};
 
export default fetchRuntimeConfig;
 