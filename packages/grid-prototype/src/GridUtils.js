import { pickBy, includes, keyBy, keys, mapValues } from "lodash";

export const getSelectedIds = gridState => {
  const { selectedStatusesById } = gridState;
  return keys(pickBy(selectedStatusesById));
};

export const getSelectedItemCount = (totalResults, selectionCriteria) =>
  selectionCriteria.inclusiveSelection
    ? selectionCriteria.ids.length
    : totalResults - selectionCriteria.ids.length;

export const getCurrentPageData = gridState => {
  const { currentPageIds, dataById } = gridState;
  return currentPageIds.map(id => dataById[id]);
};

export const concatClassNames = classNames => {
  if (!classNames || !Array.isArray(classNames)) return "";

  return classNames.reduce((prev, curr) => `${prev} ${curr}`, "");
};

export const updateSelectionCriteria = (
  itemId,
  selectionState,
  currentSelectionCriteria
) => {
  const newIds =
    selectionState === currentSelectionCriteria.inclusiveSelection
      ? [...currentSelectionCriteria.ids, itemId]
      : currentSelectionCriteria.ids.filter(id => id !== itemId);

  const newSelectionCriteria = {
    ...currentSelectionCriteria,
    ids: newIds
  };

  return newSelectionCriteria;
};

export const createGridState = (
  searchCriteria,
  selectionCriteria,
  isBusy,
  fetchedDataItems,
  itemIdSelector,
  totalResults
) => {
  const fetchedItemsById = keyBy(fetchedDataItems, itemIdSelector);
  const selectedStatusesById = mapValues(
    fetchedItemsById,
    item =>
      includes(selectionCriteria.ids, itemIdSelector(item)) &&
      selectionCriteria.inclusiveSelection
  );

  const returnValue = {
    currentPageIds: keys(fetchedItemsById),
    dataById: fetchedItemsById,
    isBusy,
    searchCriteria,
    selectedStatusesById,
    totalItems: totalResults
  };

  return returnValue;
};

/**
 * Concatenates Policy Central base url and policy quote id to give you the unique url for a policy
 * on Policy Central.
 * @param {string} baseURL Generic part of Policy Central URL
 * @param {string} quoteNumber Unique quote number for a policy
 * @return {string} Returns Policy Central URL for policy
 */
export const getPolicyCentralUrlForPolicy = (baseURL, quoteNumber) =>
  `${baseURL}/${quoteNumber}`;

export const isItemSelected = (itemId, selectionCriteria) =>
  selectionCriteria.inclusiveSelection
    ? selectionCriteria.ids
        .map(id => id.toLowerCase())
        .includes(itemId.toLowerCase())
    : !selectionCriteria.ids
        .map(id => id.toLowerCase())
        .includes(itemId.toLowerCase());
