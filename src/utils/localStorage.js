/*global chrome*/

export const saveData = (key, data) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.set({ [key]: data });
    } catch (error) {
      console.error("Error saving to local state");
      console.error(error);
    }
  } else {
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
  }
};

export const loadData = (key) => {
  if (isChromeExtension()) {
    try {
      return chrome.storage.local.get(key).then((data) => data[key]);
    } catch (error) {
      console.error("Error loading from local state");
      console.error(error);
    }
  } else {
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
};

const isChromeExtension = () => !!chrome?.storage;
