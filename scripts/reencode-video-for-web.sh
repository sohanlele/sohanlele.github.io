#!/usr/bin/env bash
# Re-encode MP4 to H.264/AAC so it plays in Chrome, Firefox, Safari.
# Install ffmpeg first: brew install ffmpeg
# Run from repo root: ./scripts/reencode-video-for-web.sh

set -e
SRC="public/files/steerable-needle-split-screen.mp4"
OUT="public/files/steerable-needle-split-screen-web.mp4"

if [[ ! -f "$SRC" ]]; then
  echo "Source not found: $SRC"
  exit 1
fi

if ! command -v ffmpeg &>/dev/null; then
  echo "Install ffmpeg first: brew install ffmpeg"
  exit 1
fi

echo "Re-encoding to H.264/AAC for web playback..."
ffmpeg -i "$SRC" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -movflags +faststart -y "$OUT"
echo "Replacing original with web-compatible version..."
mv "$OUT" "$SRC"
echo "Done. Restart dev server and reload the page."
