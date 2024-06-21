#!/bin/bash
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
# Copy README.md to index.md with front matter
#----------------------------------------------------------------------------------
cat <<EOF > index.md
---
layout: default
title: $readme_title
---
EOF
cat README.md >> index.md

#----------------------------------------------------------------------------------
# Include javascript 
#----------------------------------------------------------------------------------
echo "{% raw %}"  >> index.md
echo "<script>" >> index.md
cat .github/scripts/script.js >> index.md
echo "</script>" >> index.md
echo "{% endraw %}"  >> index.md

#----------------------------------------------------------------------------------
# Additional code or info to enhance the blog
#----------------------------------------------------------------------------------
