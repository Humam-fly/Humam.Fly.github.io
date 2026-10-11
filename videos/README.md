# videos/

Drop your clips here, using the file names listed in `../projects.js`.

- Silent H.264 `.mp4`, 720p, 5–10 s loops, ideally under 3 MB each.
- `showreel.mp4`: hero background loop
- `project-01.mp4` … `project-06.mp4`: Selected Work previews
- `reel-01.mp4` … `reel-04.mp4`: vertical 9:16 reels
- `vfx-before.mp4` / `vfx-after.mp4`: before/after breakdown (same length & framing)

Tip: `ffmpeg -i in.mov -t 8 -an -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow -movflags +faststart out.mp4`
