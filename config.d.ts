declare module "@env" {
  export const ENVIRONMENT: string;
  export const LOGIN_EP: string;
  export const SIGNUP_EP: string;
  export const PH_REGION_EP: string;
  export const PH_PROVINCE_EP: string;
  export const PH_CITYORMUNICIPALITY_EP: string;

  // DEV
  export const DEV_BASE_URL: string;

  // PROD
  export const PROD_BASE_URL: string;
}
