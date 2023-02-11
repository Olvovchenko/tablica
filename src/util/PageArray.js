import React from "react";
import { useMemo } from "react";

export const usePageArray = (totalCount, limit) => {
  const getPagesQuont = (totalCount, limit) => {
    return Math.ceil(totalCount / limit);
  };
  const pagesQuont = getPagesQuont(totalCount, limit);

  const getPageArray = (pagesQuont) => {
    const result = [];
    for (let i = 1; i < pagesQuont + 1; i++) {
      result.push(i);
    }
    return result;
  };
  const pageArray = useMemo(() => getPageArray(pagesQuont), [pagesQuont]);
  return pageArray;
};
