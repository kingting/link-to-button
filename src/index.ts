import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

// Check if running in GitHub Actions or locally
const isGitHubActions = !!process.env.GITHUB_ACTIONS;

// Function to get input, depending on the environment
const getInput = (name: string, defaultValue: string): string => {
  return isGitHubActions ? core.getInput(name) || defaultValue : process.env[name.toUpperCase().replace(/-/g, '_')] || defaultValue;
};

const inputFilePath = getInput('input-file', 'README.md');
const outputFilePath = getInput('output-file', 'index.md');
const debug = getInput('debug', 'false') === 'true';

function logDebug(message: string) {
  if (isGitHubActions) {
    core.debug(message);
  } else {
    console.debug(message);
  }
}

if (!fs.existsSync(inputFilePath)) {
  core.setFailed(`Input file ${inputFilePath} does not exist`);
} else {
  let content = fs.readFileSync(inputFilePath, 'utf8');
  const startMarker = '<!-- Start Button -->';
  const endMarker = '<!-- End Button -->';

  // Debug: Log initial content
  logDebug('Initial content:\n' + content + '\n');

  let startIndex = content.indexOf(startMarker);
  let endIndex = content.indexOf(endMarker);

  while (startIndex !== -1 && endIndex !== -1) {
    // Debug: Log indices and section content
    logDebug(`Start index: ${startIndex}`);
    logDebug(`End index: ${endIndex}`);
    const sectionContent = content.slice(startIndex + startMarker.length, endIndex).trim();
    logDebug(`Section content:\n${sectionContent}\n`);
    const regex = /\[(.*?)\]\((.*?)\)/;
    const match = sectionContent.match(regex);

    if (match) {
      const scriptName = match[1].split('/').pop();
      const scriptUrl = match[2].replace('github.com', 'raw.githubusercontent.com').replace('blob/', '');
      const buttonHtml = `
<span class="page-button-container">
  <button data-script-name="${scriptName}" onclick="fetchAndDisplayScript('script-content-${scriptName}', '${scriptUrl}', this)" class="page-button">Show ${scriptName}</button>
</span>
<div id="script-content-${scriptName}" style="display:none; white-space: pre-wrap;"></div>
`;

      content = content.slice(0, startIndex) + buttonHtml + content.slice(endIndex + endMarker.length);
      // Debug: Log new content after replacement
      logDebug('New content after replacement:\n' + content + '\n');
    }

    startIndex = content.indexOf(startMarker, startIndex + startMarker.length);
    endIndex = content.indexOf(endMarker, startIndex);
    // Debug: Log updated indices for next iteration
    logDebug(`Updated start index: ${startIndex}`);
    logDebug(`Updated end index: ${endIndex}`);
  }

  fs.writeFileSync(outputFilePath, content, 'utf8');
  core.setOutput('new-content-path', outputFilePath);
}

