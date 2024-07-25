console.log('Background script loaded');

let timerId = null;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);

  if (request.action === "startTimer") {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log('Timer finished, sending action', request.nextAction);
      browser.tabs.sendMessage(request.tabId, { action: request.nextAction })
        .then(response => console.log('Action sent successfully:', response))
        .catch(error => console.error('Error sending action:', error));
    }, request.time);
    sendResponse({ status: "Timer set" });
  }
});
