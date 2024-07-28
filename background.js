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

    // Show confirmation notification
    browser.notifications.create({
      "type": "basic",
      "iconUrl": browser.extension.getURL("icons/icon-48.png"),
      "title": "Netflix Sleep Timer",
      "message": `You set the timer for ${request.time / 60000} minutes`
    });

    sendResponse({ status: "Timer set" });
  } else if (request.action === "closeTab") {
    console.log('Closing the current tab');
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      browser.tabs.remove(tabs[0].id);
    }).catch(error => console.error('Error querying tabs:', error));
  }
});
