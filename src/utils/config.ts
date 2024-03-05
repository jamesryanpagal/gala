import {
  ENVIRONMENT,
  LOGIN_EP,
  SIGNUP_EP,
  PH_REGION_EP,
  PH_PROVINCE_EP,
  PH_CITYORMUNICIPALITY_EP,

  // DEV
  DEV_BASE_URL,

  // PROD
  PROD_BASE_URL,
} from "@env";

export const enum ENV {
  DEV = "DEV",
  PROD = "PROD",
}

export type ConfigProps = {
  baseUrl: string;
  loginEP: string;
  signupEP: string;
  phRegionEP: string;
  phProvinceEP: string;
  phCityOrMunicipalityEP: string;
};

const Config: Record<string, ConfigProps> = {
  [ENV.DEV]: {
    baseUrl: DEV_BASE_URL,
    loginEP: LOGIN_EP,
    signupEP: SIGNUP_EP,
    phRegionEP: PH_REGION_EP,
    phProvinceEP: PH_PROVINCE_EP,
    phCityOrMunicipalityEP: PH_CITYORMUNICIPALITY_EP,
  },
  [ENV.PROD]: {
    baseUrl: PROD_BASE_URL,
    loginEP: LOGIN_EP,
    signupEP: SIGNUP_EP,
    phRegionEP: PH_REGION_EP,
    phProvinceEP: PH_PROVINCE_EP,
    phCityOrMunicipalityEP: PH_CITYORMUNICIPALITY_EP,
  },
};

export default Config[ENVIRONMENT];
