import { LoginFormValues } from "../../../screens/login/Login";
import { SignupForm } from "../../../screens/signup/Signup";
import { apiPaginatedRequest, apiRequest } from "../axios.api";
import { unAuthRequest } from "../base-request.api";
import config from "../../config";

export type UserResponse = {
  userid: string;
  firstname: string;
  middle: string;
  lastname: string;
  birthdate: string;
  region: Pick<Region, "region" | "regionname" | "digitcode">;
  province: Pick<Province, "province" | "digitcode">;
  cityormunicipality: Pick<
    CityOrMunicipality,
    "cityormunicipality" | "digitcode"
  >;
  cellphoneNum: string;
  username: string;
  email: string;
};

export type LoginSignupResponse = {
  token: string;
  user: UserResponse;
};

export type Region = {
  code: string;
  region: string;
  regionname: string;
  islandgroupcode: string;
  digitcode: string;
};

export type Province = Pick<
  Region,
  "code" | "islandgroupcode" | "digitcode"
> & {
  province: string;
  regioncode: string;
};

export type CityOrMunicipality = Pick<
  Province,
  "code" | "regioncode" | "islandgroupcode" | "digitcode"
> & {
  cityormunicipality: string;
  oldname: string;
  iscapital: boolean;
  districtcode: boolean;
  provincecode: string;
};

export type Paginate = {
  page?: any;
  size?: number;
  search?: string;
  initialCode?: string;
};

export type PaginateProvince = Paginate & {
  regionCode?: string;
};

export type PaginateCityOrMunicipality = PaginateProvince & {
  provinceCode?: string;
};

// onboarding
export const loginFn = apiRequest<LoginFormValues, LoginSignupResponse>(
  params => {
    return unAuthRequest.post(config.loginEP, params);
  },
);

export const signupFn = apiRequest<SignupForm, LoginSignupResponse>(params => {
  return unAuthRequest.post(config.signupEP, params);
});

// ph-places - region
export const phRegionFn = apiPaginatedRequest<Paginate, Region[]>(params => {
  return unAuthRequest.get(config.phRegionEP, { params });
});

// ph-places - province
export const phProvinceFn = apiPaginatedRequest<PaginateProvince, Province[]>(
  params => {
    return unAuthRequest.get(config.phProvinceEP, { params });
  },
);

// ph-places - cities and municipalities
export const phCitiesAndMunicipalitiesFn = apiPaginatedRequest<
  PaginateCityOrMunicipality,
  CityOrMunicipality[]
>(params => {
  return unAuthRequest.get(config.phCityOrMunicipalityEP, { params });
});
