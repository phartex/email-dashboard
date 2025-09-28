import { SECTION_TITLES } from "@/constants/device-mgts";


/** ============================
 *  Enums
 *  ============================
 */
export enum ApprovalEnum {
  Total = "Total Devices",
  Assigned = "Assigned Devices",
  Unassigned = "Unassigned Devices",
}


export type ApprovalStatus =
  | ApprovalEnum.Assigned
  | ApprovalEnum.Unassigned


export enum SchemeEnum {
  All = "All Schemes",
  Active = "Active Schemes",
  Disabled = "Disabled Schemes",
}

export enum OperatorEnum {
  All = "All Operators",
  Active = "Active Operators",
  Disabled = "Disabled Operators",
}
export enum UsersEnum {
  All = "All Users",
  Active = "Active Users",
  Disabled = "Disabled Users",
}

export enum PartnerEnum {
  All = "All partners",
  Active = "Active partners",
  Disabled = "Disabled partners",
}
export enum FaresEnum {
  All = "All fares",
  Active = "Active fares",
  Disabled = "Disabled fares",
}
export enum FeesEnum {
  All = "All fees",
  Active = "Active fees",
  Disabled = "Disabled fees",
}

export enum GeneralEnum {
  All = "All partners",
  Active = "Active partners",
  Disabled = "Disabled partners",
}
export enum DriversEnum {
  All = "All Drivers",
  Active = "Active Drivers",
  Disabled = "Disabled Drivers",
}
export enum RoutesEnum {
  All = "All Routes",
  Active = "Active Routes",
  Disabled = "Inactive Routes",
}
export enum DevicesEnum {
  All = "Total Devices",
  Active = "Assigned Devices",
  Disabled = "Unassigned Devices",
}

export enum PlansEnum {
  All = "Total Plans",
  Active = "Active Plans",
  Disabled = "Disabled Plans",
}
export enum VehicleEnum {
  All = "Total Vehicles",
  Active = "Active Vehicles",
  Disabled = "Inactive Vehicles",
}



export type SectionTitle = keyof typeof SECTION_TITLES;


export type DEVICEFilters = {
  status?: string;
  page?: number;
  size?: number;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
};

export type deviceTable = {
  id: number;
  dateReceived: string;
  dateAssignedd: string;
  deviceType: string;
  deviceId: string;
  scheme: string;
  status: string;
};

export interface Scheme {
  name: string;
  schemeCode: string;
  merchantCode: string;
  createdBy: string;
  dateCreated: string;
  dateModified: string | null;
  status: string;
  operatorCode: string;
  state: string;
}

export interface SchemeDetails {
  schemes: Scheme[];
  page: number;
  size: number;
  totalSchemes: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  activeCount: number;
  inactiveCount: number;
}



// export interface SchemeApiResponse {
//   data: innerData
// }

export interface SchemeApiResponse {
  data: SchemeDetails;
  status: string;
}
export type createPlanPayload = {
  routeId: number;
  vehicleId: number;
  driverId: number;
  schedule?: number;
  operatorCode?: any;
}
export type updatePlanPayload = {
  routeId: number;
  vehicleId: number;
  driverId: number;
  schedule?: number;
  operatorCode?: any;
  id: number;
}

export type Partner = {
  dateCreated: string;
  partnerCode: string;
  qtbCode: string;
  name: string;
  status: string;
}

export interface StopPoint {
  stopName: string;
  stopOrder: number;
}

export interface Route {
  stopCount: any;
  routeName: string;
  routeCode: string;
  startPoint: string;
  destination: string;
  status: 'active' | 'inactive'; // assuming status can have these values
  createdBy: string;
  stops: number;
  stopPoints: StopPoint[];
  dateCreated: string;
  dateModified: string | null;
  message: string;
}

export type Vehicle = {
  id:string;
  capacity: string;
  plateNumber: string;
  deviceCode: string;
  deviceType: string;
  color: string;
  dateCreated: string;
  dateModified: string;
  status: string

}

export type StepperStep = {
  id: number;
  label: string;
  completed: boolean;
  current: boolean;
};

export interface PersonalInfoFormData {
  kinName: string;
  kinRelationship: string;
  kinPhone: string;
  kinState: string;
  kinLga: string;
  kinAddress: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  gender: string;
  residentialAddressStreet: string;
  residentialAddressState: string
  residentialAddressLga: string
}

export type FileMeta = {
  key: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
};
export interface PersonalIdFormData {
  idNumber: any;
  expiryDate: any;
  driverLicensePhoto?: FileMeta;
  passportPhoto?: FileMeta;
}


export interface PaymentInfoFormData {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  // Additional fields as needed
}

export type FormData = {
  personalInfo: PersonalInfoFormData;
  personalId: PersonalIdFormData;
  paymentInfo: PaymentInfoFormData;
};



export interface FareSetupFormData {
  fareName: string;
  fareAmount: string;
  fareType: string;

}
export type FareSharingFormData = {
 schemeName: string;
 schemeNamePercentage: string;
 OperatorName: string;
 OperatorNamePercentage: string;
 PartnerName: string;
 PartnerNamePercentage: string;
 Partner: string;
 PartnerPercentage: string;
 additionalPartners : string;
};

export type FareFormData = {
  fareSetup: FareSetupFormData;
  fareSharing: FareSharingFormData;
  
};





export interface FeeRange {
  amountFrom: number;
  amountTo: number;
  feeCharge: number;
}

export interface FeeSetupFormData {
  feeName: string;
  feeRanges: FeeRange[];
}





// export interface FeeSetupFormData {
//   feeName: string;
//   feeAmount: string;
  

// }
export type FeeSharingFormData = {
 schemeName: string;
 schemeNamePercentage: string;
 OperatorName: string;
 OperatorNamePercentage: string;
 PartnerName: string;
 PartnerNamePercentage: string;
 Partner: string;
 PartnerPercentage: string;
 additionalPartners : string;
};

export type FeeFormData = {
  feeSetup: FeeSetupFormData;
  feeSharing: FeeSharingFormData;
  
};

