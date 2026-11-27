#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
mkdir -p dist/assets
cp index.html style.css jobs.js site.js jobs-data.js dist/
cp assets/* dist/assets/
