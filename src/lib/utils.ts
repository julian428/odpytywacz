import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTimeAgo(timestamp: number) {
  const now = Date.now();
  const elapsed = now - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (elapsed < minute) {
    return "dodano teraz";
  } else if (elapsed < hour) {
    return Math.floor(elapsed / minute) + " minut temu";
  } else if (elapsed < day) {
    return Math.floor(elapsed / hour) + " godzin temu";
  } else if (elapsed < week) {
    return Math.floor(elapsed / day) + " dni temu";
  } else if (elapsed < month) {
    return Math.floor(elapsed / week) + " tygodni temu";
  } else if (elapsed < year) {
    return Math.floor(elapsed / month) + " miesięcy temu";
  } else {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }
}

export function getTimeUpdateFrequency(timestamp: number) {
  const now = Date.now();
  const elapsed = now - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (elapsed < hour) return 60000;
  else if (elapsed < day) return 360000;
  else return null;
}

export function getSearchParams(url: string) {
  const searchString = url.split("?");
  if (searchString.length < 2) return null;
  const rawParams = searchString[1].split("&");
  const parsedParams: { [index: string]: string } = {};
  rawParams.map((param) => {
    const splitParam = param.split("=");
    parsedParams[splitParam[0]] = splitParam[1];
  });
  return parsedParams;
}

export function getSearchParamsString(
  params: { [index: string]: string },
  modifiers?: {
    blacklist?: string[];
    replace?: [string, string][];
  }
) {
  let searchString = "";
  Object.entries(params).map((value) => {
    if (
      modifiers &&
      modifiers.blacklist &&
      modifiers.blacklist.includes(value[0])
    ) {
      return;
    }
    let modifiedValue = value;

    if (
      modifiers &&
      modifiers.replace &&
      modifiers.replace.map((val) => val[0]).includes(value[0])
    ) {
      modifiedValue = modifiers.replace.filter((val) => val[0] === value[0])[0];
    }

    searchString += `${modifiedValue[0]}=${modifiedValue[1]}&`;
  });
  return searchString;
}
