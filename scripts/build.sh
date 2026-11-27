#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
mkdir -p dist/assets
cp index.html style.css i18n.js jobs.js site.js jobs-data.js dist/
cp -R assets/. dist/assets/
