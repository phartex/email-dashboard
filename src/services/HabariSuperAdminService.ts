import { post } from "@/app/api/config/api-client/habari-admin";
import { emailServiceUrls } from "@/constants/apiURls/email";



export const HabariSuperAdminService = {

    register: async (payload: any): Promise<any> => {
        try {

            const response = await post(`${emailServiceUrls.register}`,  payload );
            return response;

           
        } catch (error) {
            console.error("registration failed:", error);
            throw error;
        }
    },
    login: async (payload: any): Promise<any> => {
        try {

            const response = await post(`${emailServiceUrls.login}`, payload );
            return response;

           
        } catch (error) {
            console.error("login failed:", error);
            throw error;
        }
    },



}