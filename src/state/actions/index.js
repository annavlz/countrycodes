import {
  APP_INITIALISED,
  EXTERNAL_DATA_LOAD_FAILED,
  EXTERNAL_DATA_LOADED,
  FILTERS_UPDATED
} from "../constants";

export const appInitialised = () => ({
  type: APP_INITIALISED
});

export const externalDataLoaded = externalData => ({
  type: EXTERNAL_DATA_LOADED,
  payload: {
    externalData
  }
});

export const externalDataLoadFailed = externalDataLoadError => ({
  type: EXTERNAL_DATA_LOAD_FAILED,
  payload: {
    externalDataLoadError
  }
});

export const updateFilters = activeFilter => ({
  type: FILTERS_UPDATED,
  payload: {
    activeFilter
  }
});
