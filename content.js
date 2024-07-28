console.log('Content script loaded');

browser.runtime.onMessage.addListener((request) => {
  console.log('Content script received message:', request);

  const pauseVideo = () => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      console.log('Video element found, pausing video');
      videoElement.pause();
    } else {
      console.log('Video element not found, retrying...');
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
        if (mutation.target.innerText.includes('Next Episode')) {
          console.log('Next episode detected, pausing video');
          pauseVideo();
          observer.disconnect();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
});
