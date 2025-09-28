import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import fetchRuntimeConfig from "@/config";
   
  type ConfigType = {
    TRANSPORT_SWITCH_END_POINT: string;
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