/*global chrome*/
console.log("Service Worker Live");
const linkedInListViewURL = "https://www.linkedin.com/jobs/collections";
const linkedInDetailViewURL = "https://www.linkedin.com/jobs/view";

const scrapeJobDescription = () => {
  const jobDetailsContainer = document.body.querySelector(
    `.jobs-description-content__text`
  );
  const jobDetails = jobDetailsContainer.textContent;
  const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " ");
  return cleanedJobDetails;
};

const scrapeJobTitle = () => {
    console.log("Running Title Scraper")
  const jobTitleContainer = document.body.querySelector(
    `.job-details-jobs-unified-top-card__job-title`
  );
  const jobTitle = jobTitleContainer.textContent;
  const cleanedJobTitle = jobTitle.replace(/\s\s+/g, " ");
  console.log(cleanedJobTitle);
  return cleanedJobTitle;
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Event Listener Triggered");
  if (
    changeInfo.status === "complete" &&
    tab.active &&
    (tab.url?.startsWith(linkedInListViewURL) ||
      tab.url?.startsWith(linkedInDetailViewURL))
  ) {
    console.log("Correct URL")

    chrome.scripting
      .executeScript({
        target: { tabId },
        function: scrapeJobDescription,
        args: []
      })
      .then((queryResult) => {
        chrome.storage.local.set({ jobDescription: queryResult[0].result });
      });

    chrome.scripting
      .executeScript({
        target: { tabId },
        function: scrapeJobTitle,
        args: []
      })
      .then((queryResult) => {
        chrome.storage.local.set({ jobTitle: queryResult[0].result });
      });
  }
});
