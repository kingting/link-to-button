# Link to Button Action

## Overview

**Link to Button Action** is a GitHub Action that converts marked links in a file to buttons. This is particularly useful for creating interactive documentation or webpages on GitHub Pages where inline display of files is desired.

## Features

- Converts specified links within a file to buttons.
- Useful for interactive GitHub Pages documentation.
- Simple setup and usage.

## Usage

### Pre-requisites

Ensure you have a repository set up with the necessary files, including `README.md` or any other markdown file you want to process.

### Inputs

- **`input-file`**: Path to the input file (default: `README.md`).
- **`output-file`**: Path to the output file (default: `index.md`).

### Example Workflow

Here is an example workflow (`.github/workflows/main.yml`) to demonstrate how to use this action:

```yaml
name: Convert Links to Buttons

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Create a sample README file
        run: |
          echo "# Sample Project" > README.md
          echo "" >> README.md
          echo "This is a sample project to demonstrate the link-to-button GitHub Action." >> README.md
          echo "" >> README.md
          echo "<!-- Start Button -->" >> README.md
          echo "[Run Script](https://github.com/user/repo/blob/main/script.sh)" >> README.md
          echo "<!-- End Button -->" >> README.md

      - name: Run Link-to-Button Action
        uses: kingting/link-to-button@v0.9
        with:
          input-file: 'README.md'
          output-file: 'index.md'

      - name: Enable Button Functionality
        run: |
          echo "<script>" >> index.md
          cat dist/script.js >> index.md
          echo "</script>" >> index.md

      - name: Print Updated Content
        run: cat index.md
```
### Using `script.js`

To make the buttons functional, the workflow includes steps to append the content of `script.js` to your output file (`index.md`).

### Example

Here is an example of how to structure your markdown file to use this action:

**Before:**

```markdown
# Sample Project

This is a sample project to demonstrate the link-to-button GitHub Action.

<!-- Start Button -->
[Run Script](https://github.com/user/repo/blob/main/script.sh)
<!-- End Button -->
```

**After:**

The action will convert the marked link to a button and append the script content like this:

```html
# Sample Project

This is a sample project to demonstrate the link-to-button GitHub Action.

<span class="page-button-container">
  <button data-script-name="Run Script" onclick="fetchAndDisplayScript('script-content-Run Script', 'https://raw.githubusercontent.com/user/repo/main/script.sh', this)" class="page-button">Show Run Script</button>
</span>
<div id="script-content-Run Script" style="display:none; white-space: pre-wrap;"></div>

<script>
function fetchAndDisplayScript(elementId, url, button) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const element = document.getElementById(elementId);
      element.style.display = 'block';
      element.textContent = data;
      button.disabled = true;
    })
    .catch(error => {
      console.error('Error fetching the script:', error);
    });
}
</script>
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author

Created by [kingting](http://github.com/kingting).