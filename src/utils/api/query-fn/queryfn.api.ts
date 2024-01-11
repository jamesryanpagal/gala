import { LoginFormValues } from "../../../screens/login/Login";
import { SignupFormValues } from "../../../screens/signup/Signup";
import { ApiResponse, apiPaginatedRequest, apiRequest } from "../axios.api";
import { unAuthRequest } from "../base-request.api";
import API_URL from "../url.api";

export type LoginSignupResponse = {
  token: string;
  firstname: string;
  middle: string;
  lastname: string;
  birthdate: string;
  address: string;
  cellphoneNum: string;
  username: string;
  email: string;
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
};

export type PaginateProvince = Paginate & {
  regionCode?: string;
};

export type PaginateCityOrMunicipality = PaginateProvince & {
  provinceCode?: string;
};

// onboarding
export const loginFn = apiRequest<LoginFormValues, LoginSignupResponse>(
  params => unAuthRequest.post(API_URL.LOGIN, params),
);

export const signupFn = async (
  props: SignupFormValues,
): Promise<ApiResponse<LoginSignupResponse>> => {
  return await unAuthRequest.post(API_URL.SIGN_UP, props);
};

// ph-places - region
export const phRegionFn = apiPaginatedRequest<Paginate, Region[]>(params =>
  unAuthRequest.get(API_URL.PH_REGION, { params }),
);

// ph-places - province
export const phProvinceFn = apiPaginatedRequest<PaginateProvince, Province[]>(
  params => unAuthRequest.get(API_URL.PH_PROVINCE, { params }),
);

// ph-places - cities and municipalities
export const phCitiesAndMunicipalitiesFn = apiPaginatedRequest<
  PaginateCityOrMunicipality,
  CityOrMunicipality[]
>(params => unAuthRequest.get(API_URL.PH_CITYORMUNICIPALITY, { params }));
