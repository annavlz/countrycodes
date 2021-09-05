import { keys, fromPairs, pipe, tail, map, concat, assoc } from "ramda";
import {
  EXTERNAL_DATA_LOAD_FAILED,
  EXTERNAL_DATA_LOADED,
  FILTERS_UPDATED
} from "../constants";

const initialState = {};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case EXTERNAL_DATA_LOAD_FAILED: {
      return {
        ...state,
        externalDataLoadError: action.payload.externalDataLoadError
      };
    }
    case EXTERNAL_DATA_LOADED: {
      return {
        ...state,
        externalData: action.payload.externalData,
        filters: setupFilters(action.payload.externalData)
      };
    }
    case FILTERS_UPDATED: {
      return {
        ...state,
        filters: updateFilters(state.filters, action.payload.activeFilter)
      };
    }
    default: {
      return state;
    }
  }
};

//This function can be moved into a separate file when the app is bigger
const setupFilters = data => {
  if (data) {
    const fields = keys(data[0]); // here should be a data schema used
    const filters = pipe(
      map(field => [field, { isActive: false, direction: "down" }]),
      concat([[fields[0], { isActive: true, direction: "down" }]]),
      fromPairs
    )(tail(fields));
    return filters;
  }
  return [];
};

const updateFilters = (filters, activeFilterName) => {
  const fields = keys(filters);
  return reduce((updatedFilters, field) => {
    const filter = filters[field];
    const updatedFilter =
      field === activeFilterName
        ? assoc("isActive", true, filter)
        : assoc("isActive", false, filter);
    return assoc(field, updatedFilter, updatedFilters);
  })(filters, fields);
};

export default reducer;
