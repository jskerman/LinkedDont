/*global chrome*/
console.log("Service Worker Live");
const linkedInAccountURL = "https://www.linkedin.com/in/";


const scrapeProfile = () => {
  // TODO: this stuff needs to be in the function scope in extensions, should be able to pass in below
  const NAME_PATH = "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[1]/span[1]/a/h1"
  const TITLE_PATH = "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[1]/div[2]/div[2]/div[1]/div[2]"
  const ABOUT_PATH = "/html/body/div[6]/div[3]/div/div/div[2]/div/div/main/section[3]/div[3]/div/div/div"
  const CURRENT_EXPERIENCE_PATH = "/html/body/div[5]/div[3]/div/div/div[2]/div/div/main/section[5]/div[3]/ul/li[1]/div/div[2]"
  const getElementByXpath = (path) => document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // </stuff>

  const name = getElementByXpath(NAME_PATH) 
  const title = getElementByXpath(TITLE_PATH)
  const about = getElementByXpath(ABOUT_PATH)
  const currentExperience = getElementByXpath(CURRENT_EXPERIENCE_PATH)
  console.log(NAME_PATH, name)
  const profile = `
  NAME: ${name ? name.textContent : "N/A"}
  TITLE: ${title ? title.textContent : "N/A"}
  ABOUT: ${about ? about.textContent.replaceAll('\n', ' ') : "N/A"}
  CURRENT EXPERIENCE: ${currentExperience ? currentExperience.textContent.replace(/\s\s+/g, " "): "N/A"}
  `

  return profile;
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
