console.log('Popup script loaded');

document.getElementById('start').addEventListener('click', () => {
  const time = parseInt(document.getElementById('time').value) * 60000; // Convert minutes to milliseconds
  const nextAction = document.getElementById('action').value;

  console.log('Button clicked. Timer set for', time, 'milliseconds with action', nextAction);

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    console.log('Active tab found', tabs[0].id);
    browser.runtime.sendMessage({ action: 'startTimer', time, nextAction, tabId: tabs[0].id })
      .then(response => console.log('Message sent:', response))
      .catch(error => console.error('Error sending message:', error));
  }).catch(error => console.error('Error querying tabs:', error));
});
