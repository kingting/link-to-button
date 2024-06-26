#!/bin/bash
set -x

#----------------------------------------------------------------------------------
# Extract title from README.md
#----------------------------------------------------------------------------------
# Extract the first markdown title (e.g., # Title)
readme_title=$(grep -m 1 '^# ' README.md | sed 's/^# //')

# Fallback title if no title is found
if [ -z "$readme_title" ]; then
  readme_title="Title not found - please create a title # Title"
fi
#----------------------------------------------------------------------------------
# Variables for _config.yml from environment variables
#----------------------------------------------------------------------------------
REPO_URL=${REPO_URL:-"https://github.com/kingting/link-to-button"}
OWNER_URL=${OWNER_URL:-"https://github.com/kingting"}
REPO_NAME=${REPO_NAME:-"link-to-button"}
OWNER_NAME=${OWNER_NAME:-"kingting"}
BASEURL=${BASEURL:-"/link-to-button"}

#----------------------------------------------------------------------------------
# Generate _config.yml
#----------------------------------------------------------------------------------
cat <<EOF > _config.yml
title: ${readme_title}
description: A precise guide providing practical, tried and tested examples.
baseurl: ${BASEURL} # the subpath of your site, e.g. /blog
show_downloads: true
url: "https://${OWNER_NAME}.github.io" # the base hostname & protocol for your site
github:
  is_project_page: true
  repository_url: ${REPO_URL}
  repository_name: ${REPO_NAME}
  owner_url: ${OWNER_URL}
  owner_name: ${OWNER_NAME}

# Build settings
markdown: kramdown
remote_theme: pages-themes/architect@v0.2.0

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
EOF

