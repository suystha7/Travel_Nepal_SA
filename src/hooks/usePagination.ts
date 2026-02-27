import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { OnChangeFn, PaginationState } from "@tanstack/react-table";

const PAGE = "page";
const PAGE_SIZE = "perPage";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Math.max(Number(searchParams.get(PAGE) || 1) - 1, 0);
  const initialPageSize = Number(searchParams.get(PAGE_SIZE) || 5);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPage,
    pageSize: initialPageSize,
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination) : updater;

    setPagination(newPagination);

    setSearchParams((prev) => {
      prev.set(PAGE, (newPagination.pageIndex + 1).toString());
      prev.set(PAGE_SIZE, newPagination.pageSize.toString());
      return prev;
    });
  };

  useEffect(() => {
    const page = Math.max(Number(searchParams.get(PAGE) || 1) - 1, 0);
    const pageSize = Number(searchParams.get(PAGE_SIZE) || 5);

    setPagination({
      pageIndex: page,
      pageSize,
    });
  }, [searchParams]);

  return { pagination, handlePaginationChange };
};