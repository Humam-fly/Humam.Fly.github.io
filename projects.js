/* =====================================================================
   HUMAM FLAYYES — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.

   HOW TO ADD YOUR VIDEOS
   1. Export a short, silent preview loop (5–10 s, 720p, H.264 .mp4,
      ideally under 3 MB) and drop it in the /videos folder.
   2. Point "preview" at it, e.g.  preview: "videos/my-project.mp4"
   3. Paste the full video's YouTube link into "youtube".
   Until a file exists, the site shows a styled "no signal" placeholder,
   so nothing ever looks broken.
   ===================================================================== */

window.SITE = {
  // ✉️  Replace with your real email address
  email: "your.email@example.com",

  showreel: {
    preview: "videos/showreel.mp4",                 // muted hero loop
    youtube: "https://youtu.be/iCCul0R5n9U",        // "Watch full reel"
  },

  socials: [
    { label: "Instagram", handle: "@humam.fly", url: "https://www.instagram.com/humam.fly/" },
    { label: "YouTube",   handle: "@HumamFly",  url: "https://www.youtube.com/@HumamFly" },
    { label: "Behance",   handle: "Humam_Fly",  url: "https://www.behance.net/Humam_Fly" },
  ],

  reelsStat: {
    value: 1000000,                                  // counts up to this
    label: "views on a single reel",
    url: "https://www.instagram.com/reel/DVWoDl9krW7/",
  },
};

/* ---------------------------------------------------------------------
   SELECTED WORK — horizontal timeline
   title     : project name
   category  : short tag shown on the clip
   year      : optional
   preview   : muted loop in /videos
   youtube   : full video (youtu.be/…, youtube.com/watch?v=…, or /shorts/…)
   --------------------------------------------------------------------- */
window.PROJECTS = [
  {
    title: "Showreel 2026",
    category: "Editing · VFX",
    year: "2026",
    preview: "videos/project-01.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
  {
    title: "Brand Film",
    category: "Commercial",
    year: "2026",
    preview: "videos/project-02.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
  {
    title: "Title Sequence",
    category: "Motion Graphics",
    year: "2025",
    preview: "videos/project-03.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
  {
    title: "Music Video",
    category: "Edit · Color",
    year: "2025",
    preview: "videos/project-04.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
  {
    title: "Documentary Cut",
    category: "Arabic Content",
    year: "2025",
    preview: "videos/project-05.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
  {
    title: "Product Launch",
    category: "VFX · 3D",
    year: "2024",
    preview: "videos/project-06.mp4",
    youtube: "https://youtu.be/iCCul0R5n9U",
  },
];

/* ---------------------------------------------------------------------
   REELS — vertical 9:16 short-form edits (auto-play when on screen)
   url is optional: where tapping the phone takes you.
   --------------------------------------------------------------------- */
window.REELS = [
  { title: "Reel 01", preview: "videos/reel-01.mp4", url: "https://www.instagram.com/reel/DVWoDl9krW7/" },
  { title: "Reel 02", preview: "videos/reel-02.mp4", url: "https://www.instagram.com/humam.fly/" },
  { title: "Reel 03", preview: "videos/reel-03.mp4", url: "https://www.instagram.com/humam.fly/" },
  { title: "Reel 04", preview: "videos/reel-04.mp4", url: "https://www.instagram.com/humam.fly/" },
];

/* ---------------------------------------------------------------------
   VFX BREAKDOWN — before/after slider
   Use two clips of the SAME length and framing.
   --------------------------------------------------------------------- */
window.BREAKDOWN = {
  title: "Sky replacement & compositing",
  before: "videos/vfx-before.mp4",   // raw plate
  after:  "videos/vfx-after.mp4",    // final shot
};

/* ---------------------------------------------------------------------
   SERVICES — the giant marquee
   --------------------------------------------------------------------- */
window.SERVICES = ["Editing", "Motion Graphics", "VFX", "Reels", "Arabic & English content"];
