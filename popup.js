document.addEventListener('DOMContentLoaded', () => {
  const actionSelect = document.getElementById('action');
  const timeInput = document.getElementById('time');
  const startButton = document.getElementById('start');

  function notifyContentScript(message) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { notification: message });
    });
  } 
  // const notificationBar = document.getElementById('notification-bar')

  // function showNotification(message) {
  //   notificationBar.textContent = message;
  //   notificationBar.style.display = 'block';
  //   setTimeout(() => {
  //     notificationBar.style.display = 'none';
  //   }, 3000); //Hide notification after 3 seconds
  // }


  actionSelect.addEventListener('change', () => {
    if (actionSelect.value === 'pause' || actionSelect.value === 'close') {
      timeInput.classList.remove('hidden');
    } else {
      timeInput.classList.add('hidden');
    }
  });

  startButton.addEventListener('click', () => {
    const action = actionSelect.value;
    const time = parseInt(timeInput.value, 10) || 0;
    let message = { action: 'startTimer', nextAction: action };

    if (action === 'pause' || action === 'close') {
      message.time = time * 60000;
      notifyContentScript(`Timer set for ${time} minutes to ${action === 'pause' ? 'pause' : 'close'}.`)
    } else {
      message.time = 0;
      notifyContentScript(`Timer set to ${action === 'pauseNext' ? 'pause' : 'close'} at the end of current episode.`)
    }

    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.runtime.sendMessage({ ...message, tabId: tabs[0].id });
    });

    window.close();
  });

  // Trigger the initial change event to set the correct state on load  
  actionSelect.dispatchEvent(new Event('change'));
});

document.getElementById('time').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    document.getElementById('start').click();
  }
});