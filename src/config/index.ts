// const config = {
//   SMART_MOVE_ENDPOINT: process.env.NEXT_PUBLIC_SMART_MOVE_API_URL,
// };
// export default config;


// const fetchRuntimeConfig = async () => {
//   let url: string;
 
//   if (typeof window === "undefined") {
//     // On the server, use an absolute URL provided via an environment variable.
//     if (!process.env.NEXT_PUBLIC_BASE_URL) {
//       throw new Error("NEXT_PUBLIC_BASE_URL must be set in production");
//     }
//     url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/config`;
//   } else {
//     // On the client, a relative URL works fine.
//     url = "/api/config";
//   }
 
//   const response = await fetch(url);
//   const data = await response.json();
//   return {
//     TRANSPORT_SWITCH_END_POINT: data.TRANSPORT_SWITCH_END_POINT || "",
//   };
// };
 
// export default fetchRuntimeConfig;

interface ConfigData {
  TRANSPORT_SWITCH_END_POINT: string;
  TRANSPORT_SWITCH_MAP_API_KEY: string
}


const fetchRuntimeConfig = async (): Promise<ConfigData> => {
  let url: string;
  
  if (typeof window === "undefined") {
    // On the server, use an absolute URL provided via an environment variable.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
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
  
  if (!data.TRANSPORT_SWITCH_END_POINT) {
    throw new Error("TRANSPORT_SWITCH_END_POINT is missing from the configuration.");
  }
  
  return {
    TRANSPORT_SWITCH_END_POINT: data.TRANSPORT_SWITCH_END_POINT || "",
    TRANSPORT_SWITCH_MAP_API_KEY: data.TRANSPORT_SWITCH_MAP_API_KEY ?? "",
  };
};

export default fetchRuntimeConfig;

