import { InfiniteQueryOptions, useInfiniteQuery } from "./useRQ";
import {
  CityOrMunicipality,
  Paginate,
  PaginateCityOrMunicipality,
  PaginateProvince,
  Province,
  Region,
  phCitiesAndMunicipalitiesFn,
  phProvinceFn,
  phRegionFn,
} from "../../api/query-fn/queryfn.api";
import { ResponseInfinite } from "../../api/axios.api";
import { DEFUALTS } from "../../constants/values";
import { getNextPageParam } from "../../helpers/infiniteQuery";

export const useRegion = (
  request?: Paginate,
  options?: InfiniteQueryOptions<ResponseInfinite<Region[]>>,
) => {
  const { size, search, page } = request || {};
  return useInfiniteQuery({
    ...options,
    queryKey: ["region", request],
    queryFn: ({ pageParam = page || DEFUALTS.initialPage }) => {
      return phRegionFn({
        page: pageParam,
        size: size || DEFUALTS.pageSize,
        search: search || "",
      });
    },
    getNextPageParam,
    initialPageParam: request?.page || DEFUALTS.initialPage,
  });
};

export const useProvince = (
  request?: PaginateProvince,
  options?: InfiniteQueryOptions<ResponseInfinite<Province[]>>,
) => {
  const { size, search, page, regionCode } = request || {};

  return useInfiniteQuery({
    ...options,
    queryKey: ["province", request],
    queryFn: ({ pageParam = page || DEFUALTS.initialPage }) => {
      return phProvinceFn({
        page: pageParam,
        size: size || DEFUALTS.pageSize,
        search: search || "",
        regionCode: regionCode || "",
      });
    },
    getNextPageParam,
    initialPageParam: request?.page || DEFUALTS.initialPage,
  });
};

export const useCityOrMunicipality = (
  request?: PaginateCityOrMunicipality,
  options?: InfiniteQueryOptions<ResponseInfinite<CityOrMunicipality[]>>,
) => {
  const { size, search, page, regionCode, provinceCode } = request || {};
  return useInfiniteQuery({
    ...options,
    queryKey: ["cityormunicipality", request],
    queryFn: ({ pageParam = page || DEFUALTS.initialPage }) => {
      return phCitiesAndMunicipalitiesFn({
        page: pageParam,
        size: size || DEFUALTS.pageSize,
        search: search || "",
        regionCode: regionCode || "",
        provinceCode: provinceCode || "",
      });
    },
    getNextPageParam,
    initialPageParam: request?.page || DEFUALTS.initialPage,
  });
};
