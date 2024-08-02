document.addEventListener('DOMContentLoaded', () => {
  const actionSelect = document.getElementById('action');
  const timeInput = document.getElementById('time');
  const startButton = document.getElementById('start');

  // Function to notify the content script
  function notifyContentScript(message) {
    browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        if (tabs.length > 0) {
          browser.tabs.sendMessage(tabs[0].id, { notification: message });
          console.log('Notification sent to content script:', message);
        }
      })
      .catch(error => console.error('Error querying tabs:', error));
  }

  // Event listener to show or hide the time input field
  actionSelect.addEventListener('change', () => {
    if (['pause', 'close'].includes(actionSelect.value)) {
      timeInput.classList.remove('hidden');
    } else {
      timeInput.classList.add('hidden');
    }
  });

  // Event listener for the start button
  startButton.addEventListener('click', () => {
    const action = actionSelect.value;
    const time = parseInt(timeInput.value, 10) || 0;
    const timeInMs = action === 'pause' || action === 'close' ? time * 60000 : 0;
    const notificationMessage = action === 'pause' || action === 'close'
      ? `Timer set for ${time} minutes to ${action}.`
      : `Timer set to ${action} at the end of the current episode.`;

    // Notify the content script
    notifyContentScript(notificationMessage);

    // Send message to background script
    browser.tabs.query({ active: true, currentWindow: true })
      .then(tabs => {
        if (tabs.length > 0) {
          console.log('Sending message to background script:', {
            action: 'startTimer',
            nextAction: action,
            time: timeInMs,
            tabId: tabs[0].id
          });
          return browser.runtime.sendMessage({
            action: 'startTimer',
            nextAction: action,
            time: timeInMs,
            tabId: tabs[0].id
          });
        }
      })
      .catch(error => console.error('Error sending message:', error));

    // Close the popup window
    window.close();
  });

  // Trigger the initial change event to set the correct state on load  
  actionSelect.dispatchEvent(new Event('change'));
});

// Handle Enter key press in time input field
document.getElementById('time').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('start').click();
  }
});
