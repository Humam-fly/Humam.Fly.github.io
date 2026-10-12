# videos/

- `showreel.mp4`: the hero background loop (three vertical clips side by side).
- `preview/`: short silent loops (5–10 s, 720x1280, about 1 MB each) that play on the cards and phones.
- `full/`: the full videos that open when someone clicks a card. They're 720x1280, with audio normalised to -14 LUFS.

To add a new project:
1. Put a short loop in `preview/` and the full video in `full/`.
2. Add an entry in `../projects.js`.

To make a preview loop with ffmpeg (start at 0:10, 8 seconds long):
`ffmpeg -ss 10 -i in.mp4 -t 8 -an -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" -c:v libx264 -crf 27 -movflags +faststart preview/name.mp4`
