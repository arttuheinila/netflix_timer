let timerId = null;

console.log('Background script loaded');

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  if (request.action === "startTimer") {
    console.log('Starting timer for', request.time, 'milliseconds');
    if (timerId) {
      clearTimeout(timerId);
      console.log('Existing timer cleared');
    }
    timerId = setTimeout(() => {
      console.log('Timer finished, executing action', request.nextAction);
      if (request.nextAction === "close") {
        browser.tabs.remove(request.tabId)
          .then(() => console.log('Tab closed successfully'))
          .catch(error => console.error('Error closing tab:', error));
      } else {
        browser.tabs.sendMessage(request.tabId, { action: request.nextAction })
          .then(response => console.log('Action sent successfully:', response))
          .catch(error => console.error('Error sending action:', error));
      }
    }, request.time);
    sendResponse({ status: "Timer set" });
  } else if (request.action === "closeTab") {
    if (sender.tab) {
      console.log('Closing tab with id:', sender.tab.id);
      browser.tabs.remove(sender.tab.id)
        .then(() => console.log('Tab closed successfully'))
        .catch(error => console.error('Error closing tab:', error));
    } else {
      console.error('No tab information provided with closeTab request');
    }
  }
});
