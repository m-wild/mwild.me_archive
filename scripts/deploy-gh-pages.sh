#/bin/bash
set -e

# prerequisites
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy (not on SOURCE_BRANCH)."
    exit 0
fi

# config
git config --global user.name "$COMMIT_AUTHOR_NAME"
git config --global user.email "$COMMIT_AUTHOR_EMAIL"

# deploy
cd "$BUILD_OUT_DIR"
git init
git add .
git commit -m "Travis-CI build for ${TRAVIS_COMMIT}"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:$TARGET_BRANCH > /dev/null 2>&1
