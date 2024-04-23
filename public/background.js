/*global chrome*/
console.log("Service Worker Live");
const linkedInAccountURL = "https://www.linkedin.com/in/";

const scrapeProfile = () => {
  const profileContainer = window.document.querySelector(
    `.scaffold-layout__main`
  )
  console.log(profileContainer)
  const profile = profileContainer.textContent;
  const cleanedProfile = profile.replace(/\s\s+/g, " ");
  return cleanedProfile;
};



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Event Listener Triggered");
  console.log(tab.url);
  if (
    changeInfo.status === "complete" &&
    tab.active &&
    tab.url?.startsWith(linkedInAccountURL)
  ) {
    console.log("Correct URL");

    chrome.scripting
      .executeScript({
        target: { tabId },
        function: scrapeProfile,
        args: [],
      })
      .then((queryResult) => {
        chrome.storage.local.set({ profileText: queryResult[0].result });
      });
  }
});
