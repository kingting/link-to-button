# To test the action locally, ensure that all the necessary JavaScript dependencies are installed, then set up environment variables (.env) and run this script .
yarn install
yarn build

# Copy README.md to index.md and convert links to buttons
node dist/index.js

# To prepare index.md for publication on GitHub Pages
./.github/scripts/generate-config.sh
./.github/scripts/init-jekyll.sh

# Build and serve the site
bundle exec jekyll build --baseurl="/link-to-button"
bundle exec jekyll serve --baseurl="/link-to=-button"
