import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import fetchRuntimeConfig from "@/app/api/config";
   
  type ConfigType = {
    NEXT_PUBLIC_BACK_OFFICE_BASE_URL: string;
  } | null;
   
  const ConfigContext = createContext<ConfigType>(null);
   
  export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<ConfigType>(null);
   
    useEffect(() => {
      fetchRuntimeConfig().then(setConfig).catch(console.error);
    }, []);
   
    return (
      <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
    );
  };
   
  export const useConfig = () => useContext(ConfigContext);