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
## Maintaining the Action Repository

### Setting Up `package.json`

1. **Create `package.json`:**
   ```bash
   npm init
   ```

2. **Install Dependencies:**
   ```bash
   npm install --save-dev typescript @vercel/ncc prettier eslint jest @types/jest ts-jest
   npm install @actions/core dotenv
   ```

3. **Configure `package.json`:**
   ```json
   {
     "name": "link-to-button",
     "version": "1.0.0",
     "description": "GitHub Action that replaces links with buttons",
     "main": "dist/index.js",
     "scripts": {
       "clean": "rimraf dist",
       "build": "npm run clean && tsc -p . && ncc build src/index.ts -o dist",
       "format": "prettier --write '**/*.ts'",
       "format-check": "prettier --check '**/*.ts'",
       "lint": "eslint src/**/*.ts",
       "test": "jest",
       "licensed-check": "src/misc/licensed-check.sh",
       "licensed-generate": "src/misc/licensed-generate.sh"
     },
     "repository": {
       "type": "git",
       "url": "git+https://github.com/kingting/link-to-button.git"
     },
     "author": "King Ting",
     "license": "MIT",
     "bugs": {
       "url": "https://github.com/kingting/link-to-button/issues"
     },
     "homepage": "https://github.com/kingting/link-to-button#readme",
     "dependencies": {
       "@actions/core": "^1.10.1",
       "dotenv": "^16.4.5"
     },
     "devDependencies": {
       "typescript": "^5.4.5",
       "@vercel/ncc": "^0.38.1",
       "prettier": "^3.3.2",
       "eslint": "^9.5.0",
       "jest": "^29.7.0",
       "@types/jest": "^29.5.12",
       "ts-jest": "^29.1.5"
     }
   }
   ```

### Keeping Dependencies Updated

Keeping your dependencies up-to-date is crucial for maintaining the security, performance, and compatibility of your project. Using `npm outdated`, you can easily identify which dependencies need updating.

#### Checking for Outdated Packages

1. **Run `npm outdated`:**
   ```bash
   npm outdated
   ```

   This command will display a list of packages that have newer versions available.

#### Updating Dependencies

You can update the dependencies manually or automatically:

1. **Manually Update `package.json`:**
   - Open `package.json` and update the versions of the outdated packages to their latest versions.
   - Save the changes.

2. **Automatically Update Packages:**
   - Run `npm update` to update all packages to the latest version specified in the `package.json`:
     ```bash
     npm update
     ```

3. **Install Updated Packages:**
   - After updating the `package.json` or running `npm update`, install the updated packages:
     ```bash
     npm install
     ```

### Compiling and Updating the Action

1. **Compile TypeScript and Bundle with `ncc`:**
   ```bash
   npm run build
   ```

2. **Commit and Push the Changes:**
   ```bash
   git add .
   git commit -m "Compile TypeScript and bundle with ncc"
   git push origin main
   ```

### Checking the Latest Code to GitHub

1. **Ensure all Changes are Committed:**
   ```bash
   git status
   ```

2. **Push the Changes to GitHub:**
   ```bash
   git push origin main
   ```

By following these steps, you ensure that your GitHub Action is properly configured using best practices. This includes setting up `package.json`, compiling the action using TypeScript and `ncc`, and pushing the latest code to GitHub. This approach helps maintain the robustness and reliability of your action.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Author

Created by [kingting](http://github.com/kingting).