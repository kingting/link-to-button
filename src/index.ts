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
  // Code block markers to identify code sections to skip
  const codeBlockStart = '```markdown';
  const codeBlockEnd = '```';

  // Debug: Log initial content
  logDebug('Initial content:\n' + content + '\n');

  let startIndex = content.indexOf(startMarker);
  let endIndex = content.indexOf(endMarker);

  // Find initial code block indices
  let codeBlockIndex = content.indexOf(codeBlockStart);
  let codeBlockEndIndex = content.indexOf(codeBlockEnd, codeBlockIndex + codeBlockStart.length);

  while (startIndex !== -1 && endIndex !== -1) {
    // Check if the current marker is inside a code block
    const codeBlockStartIndex = content.lastIndexOf(codeBlockStart, startIndex);
    const codeBlockEndIndex = content.indexOf(codeBlockEnd, codeBlockStartIndex + codeBlockStart.length);

    // New: Check if current markers are inside a code block
    logDebug(`Code Block Start index: ${codeBlockIndex}`);
    logDebug(`Code Block End index: ${codeBlockEndIndex}`);
    logDebug(`Start index: ${startIndex}`);
    logDebug(`End index: ${endIndex}`);
    const isInsideCodeBlock = (codeBlockStartIndex !== -1 &&
                               codeBlockStartIndex < startIndex &&
                               codeBlockEndIndex !== -1 &&
                               codeBlockEndIndex > startIndex);
    if (isInsideCodeBlock) {
      // Skip this section if it is inside a code block
      logDebug(`Skip this section startIndex: ${startIndex}`);
      logDebug(`Skip this section endIndex: ${endIndex}`);
    } else {
      // Debug: Log indices and section content
      //logDebug(`Start index: ${startIndex}`);
      //logDebug(`End index: ${endIndex}`);
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
    }
    // Update indices for next iteration
    // Adding startMarker.length to ensure we skip past the current marker
    startIndex = content.indexOf(startMarker, startIndex + startMarker.length);
    endIndex = content.indexOf(endMarker, startIndex);
    // Debug: Log updated indices for next iteration
    logDebug(`Code Block Start index: ${codeBlockIndex}`);
    logDebug(`Code Block End index: ${codeBlockEndIndex}`);
    logDebug(`Updated start index: ${startIndex}`);
    logDebug(`Updated end index: ${endIndex}`);
  } // End while loop 

  fs.writeFileSync(outputFilePath, content, 'utf8');
  if (isGitHubActions) {
    core.setOutput('new-content-path', outputFilePath);
  } else {
    console.log(`New content path: ${outputFilePath}`);
  }
}

