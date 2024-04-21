import {
  StorefrontPayload,
  StorefrontPayloadProduct,
} from "@/src/storefront/storefront.type.ts";
import { Reducer } from "react";
import { Sort } from "@/src/helpers/sorter.helper.ts";

export enum ActionType {
  INIT = "init",
  RESET = "reset",
  SORT_BY_ASCENDING = "sort_by_ascending",
  SORT_BY_DESCENDING = "sort_by_descending",
}

type ReducerState = StorefrontPayload | null;
type SortingPayload = {
  key: keyof StorefrontPayloadProduct;
};

type ReducerAction =
  | {
      type: ActionType.INIT;
      payload: StorefrontPayload;
    }
  | {
      type: ActionType.SORT_BY_ASCENDING | ActionType.SORT_BY_DESCENDING;
      payload: SortingPayload;
    }
  | {
      type: ActionType.RESET;
    };

let initialState: ReducerState = null;

export const reducer: Reducer<ReducerState, ReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ActionType.INIT:
      initialState = structuredClone(action.payload);
      return action.payload;

    case ActionType.RESET:
      return initialState;

    case ActionType.SORT_BY_ASCENDING:
      if (!state) return state;
      return {
        ...state,
        products: Sort.byAscending(state.products, action.payload.key),
      };

    case ActionType.SORT_BY_DESCENDING:
      if (!state) return state;
      return {
        ...state,
        products: Sort.byDescending(state.products, action.payload.key),
      };

    default:
      return state;
  }
};
