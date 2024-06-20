# Link to Button Action

## Overview

**Link to Button Action** is a GitHub Action that converts marked links in a file to buttons. This is particularly useful for creating interactive documentation or webpages on GitHub Pages where inline display of files is desired.

## Features

- Converts specified links within a file to buttons.
- **Exclude Links from Conversion**: You can prevent specific links from being converted to buttons by wrapping them in a Markdown code block ` ```markdown ````. This is particularly useful for documentation purposes.
- Useful for interactive GitHub Pages documentation.
- Simple setup and usage.

### Example Link Conversion

Here is an example of how the action converts a simple text link to a button, including how it looks before and after conversion.

#### Before Conversion

**Marked Link in README.md**:

```markdown
<!-- Start Button -->
[script.js](https://github.com/kingting/link-to-button/blob/main/.github/scripts/script.js)
<!-- End Button -->
```

**View on GitHub Repo**:

[script.js](https://github.com/kingting/link-to-button/blob/main/.github/scripts/script.js)

#### After Conversion

**View on GitHub Pages**:

![Button Show](https://github.com/kingting/link-to-button/blob/main/docs/images/show-script-js.png)

**View after Pressing the Button**:

![Button Hide](https://github.com/kingting/link-to-button/blob/main/docs/images/hide-script-js.png)

## Usage

### Pre-requisites

Ensure you have a repository set up with the necessary files, including `README.md` or any other markdown file you want to process.

### Inputs

- **`input-file`**: Path to the input file (default: `README.md`).
- **`output-file`**: Path to the output file (default: `index.md`).

### Example Workflow

Here is an example workflow (`.github/workflows/main.yml`) to demonstrate how to use this action:

<!-- Start Button -->
[.github/workflows/test.yml](https://github.com/kingting/gh-pages/blob/main/.github/workflows/test.yml)
<!-- End Button -->

### Using `script.js`

To make the buttons functional, the workflow includes steps to append the content of `script.js` to your output file (`index.md`).

<!-- Start Button -->
[.github/scripts/scripts](https://github.com/kingting/gh-pages/blob/main/.github/scripts/script.js)
<!-- End Button -->

### Local Testing

To test the action locally, you can set up environment variables (`.env`) and run the script using Node.js. Here are the steps:

```bash
yarn build 
node dist/index.js
```

## Maintaining the Action Repository

### Setting Up `package.json`


1. **Create `package.json`:**
   ```bash
   yarn init
   ```

2. **Install Dependencies:**
   ```bash
   yarn add --dev typescript @vercel/ncc prettier eslint jest @types/jest ts-jest
   yarn add @actions/core dotenv
   ```

3. **Example `package.json`:**

<!-- Start Button -->
[package.json](https://github.com/kingting/gh-pages/blob/main/package.json)
<!-- End Button -->

### Keeping Dependencies Updated

Keeping your dependencies up-to-date is crucial for maintaining the security, performance, and compatibility of your project. Using `npm outdated`, you can easily identify which dependencies need updating.

#### Checking for Outdated Packages

1. **Run `yarn outdated`:**
   ```bash
   yarn outdated
   ```

   This command will display a list of packages that have newer versions available.

#### Updating Dependencies

You can update the dependencies manually or automatically:

1. **Manually Update `package.json`:**
   - Open `package.json` and update the versions of the outdated packages to their latest versions.
   - Save the changes.

2. **Automatically Update Packages:**
   - Run `yarn update` to update all packages to the latest version specified in the `package.json`:
     ```bash
     yarn update
     ```

3. **Install Updated Packages:**
   - After updating the `package.json` or running `npm update`, install the updated packages:
     ```bash
     yarn install
     ```

### Compiling and Updating the Action

1. **Compile TypeScript and Bundle with `ncc`:**
   ```bash
   yarn build
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
