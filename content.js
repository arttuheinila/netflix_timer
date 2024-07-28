console.log('Content script loaded');

browser.runtime.onMessage.addListener((request) => {
  console.log('Content script received message:', request);

  const pauseVideo = () => {
    const pauseButton = document.querySelector('[aria-label="Pause"], [aria-label="Keskeytä"]'); // Include both English and Finnish labels
    const videoElement = document.querySelector('video');
    
    if (pauseButton) {
      console.log('Pause button found, clicking pause button');
      pauseButton.click();
    } else if (videoElement) {
      console.log('Pause button not found, pausing video directly');
      videoElement.pause();
      
      // Check if the video is paused after attempting to pause it
      setTimeout(() => {
        if (videoElement.paused) {
          console.log('Video successfully paused');
        } else {
          console.log('Failed to pause video, retrying...');
          pauseVideo(); // Retry pausing the video
        }
      }, 500); // Check after half a second
    } else {
      console.log('Pause button and video element not found, retrying...');
      setTimeout(pauseVideo, 1000); // Retry after 1 second
    }
  };

  if (request.action === "pause") {
    pauseVideo();
  } else if (request.action === "close") {
    console.log('Closing window');
    window.close();
  } else if (request.action === "waitNextEpisode") {
    console.log('Waiting for next episode to pause');

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const textContent = node.textContent || node.innerText || '';
            console.log('Mutation observed:', textContent);

            // Check for specific conditions for the Next Episode button
            const isNextEpisodeButton = textContent.includes('Next episode') || textContent.includes('Seuraava');
            const isWatchCredits = textContent.includes('Katso lopputekstit');

            if (isNextEpisodeButton && !isWatchCredits) {
            // if (isNextEpisodeButton) {
              console.log('Next episode detected, pausing video');
              browser.runtime.sendMessage({ action: "closeTab" });
              observer.disconnect();
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});