#!/bin/bash
# Check if index.md exists
if [ ! -f index.md ]; then
  echo "index.md not found!"
  exit 1
fi
#----------------------------------------------------------------------------------
# Extract title from index.md
#----------------------------------------------------------------------------------
# Extract the first markdown title (e.g., # Title)
readme_title=$(grep -m 1 '^# ' index.md | sed 's/^# //')

# Fallback title if no title is found
if [ -z "$readme_title" ]; then
  readme_title="Title not found - please create a title # Title"
fi

# Create a temporary file with the new content
cat <<EOF > temp_index.md
---
layout: default
title: $readme_title
---
EOF

cat index.md >> temp_index.md
mv temp_index.md index.md

#----------------------------------------------------------------------------------
# Include javascript 
#----------------------------------------------------------------------------------
echo "" >> index.md
echo "{% raw %}"  >> index.md
echo "<script>" >> index.md
cat .github/scripts/script.js >> index.md
echo "</script>" >> index.md
echo "{% endraw %}"  >> index.md

#----------------------------------------------------------------------------------
# Additional code or info to enhance the blog
#----------------------------------------------------------------------------------
