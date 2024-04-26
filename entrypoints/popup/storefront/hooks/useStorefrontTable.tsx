import { useEffect, useReducer } from "react";
import { ActionType, reducer } from "@/src/storefront/storefront.reducer.ts";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_KEY } from "@/src/storefront/constants.ts";
import {
  StorefrontPayload,
  StorefrontPayloadProduct,
} from "@/src/storefront/storefront.type.ts";
import { SessionStorageService } from "@/src/services/storage/session.storage-service.ts";

export type SortMethod = (key: keyof StorefrontPayloadProduct) => void;
export type ResetMethod = () => void;

const sessionStorageService = new SessionStorageService(storage);

export const useStorefrontTable = () => {
  const [table, dispatchTable] = useReducer(reducer, null);
  const storefront = useQuery({
    queryKey: [STOREFRONT_KEY],
    queryFn: () => sessionStorageService.get<StorefrontPayload>(STOREFRONT_KEY),
  });

  useEffect(() => {
    if (storefront.data) {
      dispatchTable({ type: ActionType.INIT, payload: storefront.data });
    }
  }, [storefront.data]);

  const handleSearch = (search: string) => {
    if (!storefront.data) return;
    dispatchTable({
      type: ActionType.SEARCH,
      payload: { defaultState: storefront.data, search },
    });
  };

  const handleSortDesc: SortMethod = (key: keyof StorefrontPayloadProduct) => {
    dispatchTable({
      type: ActionType.SORT_BY_DESCENDING,
      payload: { key },
    });
  };

  const handleSortAsc: SortMethod = (key: keyof StorefrontPayloadProduct) => {
    dispatchTable({
      type: ActionType.SORT_BY_ASCENDING,
      payload: { key },
    });
  };

  const handleSortReset: ResetMethod = () => {
    dispatchTable({
      type: ActionType.RESET,
    });
  };

  return {
    data: table,
    isLoading: storefront.isLoading,
    isError: storefront.isError,
    handleSortDesc,
    handleSortAsc,
    handleSortReset,
    handleSearch,
  };
};
