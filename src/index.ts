import * as core from '@actions/core';
import * as fs from 'fs';
import * as path from 'path';

const inputFilePath = core.getInput('input-file') || 'README.md';
const outputFilePath = core.getInput('output-file') || 'index.md';

if (!fs.existsSync(inputFilePath)) {
  core.setFailed(`Input file ${inputFilePath} does not exist`);
} else {
  let content = fs.readFileSync(inputFilePath, 'utf8');
  const startMarker = '<!-- Start Button -->';
  const endMarker = '<!-- End Button -->';

  // Changes start here
  let startIndex = content.indexOf(startMarker);
  let endIndex = content.indexOf(endMarker);

  while (startIndex !== -1 && endIndex !== -1) {
    const sectionContent = content.slice(startIndex + startMarker.length, endIndex).trim();
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
    }

    startIndex = content.indexOf(startMarker);
    endIndex = content.indexOf(endMarker);
  }
  // Changes end here

  fs.writeFileSync(outputFilePath, content, 'utf8');
  core.setOutput('new-content-path', outputFilePath);
}

