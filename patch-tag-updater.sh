#!/bin/bash

# Get the latest tag
latest_tag=$(git describe --tags "$(git rev-list --tags --max-count=1)")

# Default value for initial tag
initial_tag="0.0.1"

# If no tag is found, set the initial tag
if [ -z "$latest_tag" ]; then
  echo "No tags found. Setting the initial tag: $initial_tag"
  read -p "Do you want to proceed? (y/n): " -r response
  if [[ "$response" == "y" ]]; then
    git tag "$initial_tag"
    echo "Tag created: $initial_tag"
    git push origin "$initial_tag"
    echo "Tag pushed: $initial_tag"
  else
    echo "Aborted."
  fi
  exit 0
fi

# Break down the tag into its components (major.minor.patch)
major=$(echo "$latest_tag" | cut -d. -f1)
minor=$(echo "$latest_tag" | cut -d. -f2)
patch=$(echo "$latest_tag" | cut -d. -f3)

# Increment the patch version
new_patch=$((patch + 1))

# Construct the new tag
new_tag="${major}.${minor}.${new_patch}"
echo "Current tag is $latest_tag. Next tag will be $new_tag."
read -p "Do you want to proceed? (y/n): " -r response

if [[ "$response" == "y" ]]; then
  git tag "$new_tag"
  echo "Tag created: $new_tag"
  git push origin "$new_tag"
  echo "Tag pushed: $new_tag"
else
  echo "Aborted."
fi
