import { HabariSuperAdminService } from "./HabariSuperAdminService";

const activeRequests = new Map();

const HabariSuperAuthService = {

  

    registerUser: async (payload:any) => {
        const rawData = await HabariSuperAdminService.register(payload);
        return rawData.data;
    },
    login: async (payload:any) => {
        const rawData = await HabariSuperAdminService.login(payload);
       
        return rawData;
    },





}

export default HabariSuperAuthService