import type { SetURLSearchParams } from 'react-router-dom';

export function updateSearchParams(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  newParams: Record<string, string>
) {
  const currentParams = Object.fromEntries(searchParams.entries());
  setSearchParams({ ...currentParams, ...newParams });
}

export function deleteSearchParams(
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
  keysToDelete: string[]
) {
  const currentParams = Object.fromEntries(searchParams.entries());
  keysToDelete.forEach(key => {
    delete currentParams[key];
  });
  setSearchParams(currentParams);
}
