


export type LoginData = {
    email: string;
    password: string;
};


export type AuthResponseData = {
    data: AuthResponseInnerData

};
export type AuthResponseInnerData = {
    accessToken: string;
    tokenType: string | null;
    refreshToken: string;
    expires: string;
    user: UserDetail;
}
export interface AuthResponse {
    data: AuthResponseData
    status: string

}

export interface OperatorSearchParams {
  searchQuery: string;
  schemeCode?: string;
}

export type GetSummaryResponse = {
    data: {
      totalRequests: number;
      pendingRequests: number;
      approvedRequests: number;
      declinedRequests: number;
    }
  };


interface UserDetail {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    userStatus: string;
    userType: string;
    schemeName: string | null;
    schemeCode: string | null;
    operatorName: string | null;
    operatorCode: string | null;
    dateCreated: string;
    dateModified: string | null;
    role: string;
}

export type schemeFilters = {
    status?: string;
    page?: number;
    searchQuery?: string;

};


export interface Scheme {
    name: string;
    code: string;
    merchantCode: string;
    createdBy: string;
    dateCreated: string;
    dateModified: string | null;
    status: string;
    state: string
}


export type CreateSchemeData = {
    name: string;
    schemeCode: string;
    logo: string[];
    status: string;
    states: string[];
    country: string;
    qtbCode: string;
    dateCreated: string;
};

export type CreateSchemeApiResponse = {
    data: CreateSchemeData;
    status: string;
};

export type createSchemePayload = {
    qtbCode: string;
    fileMetaData : any
}
export type bulkUploadPayload = {
    fileMetaData : any
}

export type CreateOperatorPayload = {
    qtbCode: string;
    transportMode: string;
    fileMetaData?:File | UploadedFileResponse | null;
    schemeCode?:string | null
}
export type CreatePartnerPayload = {
    qtbCode: string;  
    operatorCode?:string | null
}
export type UpdateOperatorPayload = {
    transportMode: string;
    fileMetaData?:File | UploadedFileResponse | null;
    operatorCode?:string | null
}
export type UpdateSchemePayload = {
    fileMetaData?:File | UploadedFileResponse | null;
    qtbCode?:string | null
}

export type UploadedFileResponse = {
    fileName: string;
    fileType: string;
    fileSize: number; // Size in MB
    fileUrl: string;
    key: string;
  }

  // types/settlement.ts
export interface SettlementDataItem {
  batchId: string;
  operatorName: string;
  amount: number;
  transactionDate: string;
  batchStatus: string;
}

export interface SettlementSummary {
  totalOperators: number;
  totalTransactionAmount: number;
  data: SettlementDataItem[];
}
