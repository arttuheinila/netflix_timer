# Netflix Sleep Timer Extension

## Overview

The Netflix Sleep Timer is a browser extension designed to automatically pause or close Netflix after a specified amount of time or at the end of an episode. This extension is perfect for those who like to watch Netflix before bed and don't want their device to keep playing all night.

## Features

- **Pause after a set time:** Automatically pause the video after a specified number of minutes.
- **Close after a set time:** Automatically close the browser tab after a specified number of minutes.
- **Pause at the end of an episode:** Automatically pause the video at the end of the current episode.
- **Close at the end of an episode:** Automatically close the browser tab at the end of the current episode.
- **Browser notifications:** Get notified when the timer is set.

## Installation

1. Clone or download this repository to your local machine.

bash
   git clone https://github.com/arttuheinila/netflix-timer.git
   

2. Open your browser and go to the extensions page:
   - For Chrome: `chrome://extensions/`
   - For Firefox: `about:addons`

3. Enable "Developer mode" (for Chrome) or "Debug mode" (for Firefox).

4. Click on "Load unpacked" (for Chrome) or "Load Temporary Add-on" (for Firefox).

5. Select the folder where you cloned/downloaded the repository.

## Usage

1. Click on the Netflix Sleep Timer extension icon in your browser to open the popup.

2. Select an action from the dropdown menu:
   - **Wait Next Episode and Pause**: Pause the video at the end of the current episode.
   - **Pause after X minutes**: Pause the video after a specified number of minutes.
   - **Close after X minutes**: Close the browser tab after a specified number of minutes.

3. If you selected "Pause after X minutes" or "Close after X minutes," enter the number of minutes in the input field that appears.

4. Click the "Start" button to set the timer.

5. A browser notification will confirm that the timer has been set.

## Development

### Files and Structure

- **manifest.json**: The manifest file that defines the extension's permissions and behavior.
- **background.js**: The background script that handles timers and notifications.
- **content.js**: The content script that interacts with the Netflix webpage.
- **popup.html**: The HTML file for the extension's popup interface.
- **popup.js**: The JavaScript file that handles user interactions in the popup.

### Adding New Features

1. Make your changes in the relevant files.
2. Reload the extension in your browser as described in the Installation section.

### Debugging

- Use the browser's developer tools to view console logs and debug issues.
- Ensure the extension has the necessary permissions in the manifest file.
- Check the browser's notification settings to ensure notifications are allowed for the extension.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**.

You are free to:
- **Share**: copy and redistribute the material in any medium or format.
- **Adapt**: remix, transform, and build upon the material.

Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **Non-Commercial**: You may not use the material for commercial purposes.

No additional restrictions: You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.

For more details, see the full license text [here](https://creativecommons.org/licenses/by-nc/4.0/legalcode).
