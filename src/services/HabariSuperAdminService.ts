import { post } from "@/app/api/config/api-client/habari-admin";
import { emailServiceUrls } from "@/constants/apiURls/email";



export const HabariSuperAdminService = {

    register: async (payload: any): Promise<any> => {
        try {

            const response = await post(`${emailServiceUrls.register}`, { payload });
            return response;

            // return {
            //     "success": true,
            //     "data": {
            //         "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
            //         "expiresIn": 900,
            //         "tokenType": "Bearer",
            //         "user": {
            //             "id": "550e8400-e29b-41d4-a716-446655440000",
            //             "email": "user@organization.com",
            //             "name": "fateru oluwatobi",
            //             "microsoftId": "00000000-0000-0000-0000-000000000000"
            //         }
            //     }
            // }
        } catch (error) {
            console.error("registration failed:", error);
            throw error;
        }
    },



}