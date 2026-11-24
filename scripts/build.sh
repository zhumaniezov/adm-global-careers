#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
mkdir -p dist/assets
cp index.html style.css carousel.js jobs.js jobs-data.js dist/
cp assets/* dist/assets/
