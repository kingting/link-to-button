#!/bin/bash
set -x
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
title: Technical Insight
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
theme: jekyll-theme-cayman

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
EOF

