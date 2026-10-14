# videos/

Every video on the site is silent and plays on its own. Nothing is clickable.

- `showreel-bg.mp4` / `showreel-bg-vertical.mp4`: the front-page background, for wide screens and phones.
- `showreel.mp4` / `showreel-vertical.mp4`: the full reel behind "Watch full reel" (silent).
- `breakdown-raw.mp4` / `breakdown-final.mp4`: the Raw → Final slider (same length, in sync).
- `preview/`: short silent loops for the work cards, reels and Spec Lab (720x1280, about 1 MB each).

To add a clip: put a short loop in `preview/`, then add it to `../projects.js`.

To make a loop with ffmpeg (start at 0:10, 8 seconds long):
`ffmpeg -ss 10 -i in.mp4 -t 8 -an -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" -c:v libx264 -crf 27 -movflags +faststart preview/name.mp4`
