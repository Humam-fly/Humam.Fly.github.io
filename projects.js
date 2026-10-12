/* =====================================================================
   HUMAM FLAYYES — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.

   Each project has:
     title     : project name
     category  : short tag shown on the clip
     page      : who it was for (optional, leave "" to hide)
     preview   : short silent loop in /videos/preview  (5–10 s, ~1 MB)
     full      : the full video in /videos/full         (plays with sound)
     youtube   : OPTIONAL — a YouTube link. If you add one, it is used
                 instead of "full".
   If a file is missing, the site shows a "no signal" placeholder,
   so nothing ever looks broken.
   ===================================================================== */

window.SITE = {
  // ✉️  Swap for your work email when you make one
  email: "hu.flayyes@gmail.com",

  showreel: {
    preview: "videos/showreel.mp4",                 // muted hero loop (wide screens)
    vertical: "videos/showreel-vertical.mp4",       // muted hero loop (phones)
    youtube: "https://youtu.be/iCCul0R5n9U",        // "Watch full reel"
  },

  socials: [
    { label: "Instagram", handle: "@humam.fly", url: "https://www.instagram.com/humam.fly/" },
    { label: "YouTube",   handle: "@HumamFly",  url: "https://www.youtube.com/@HumamFly" },
    { label: "Behance",   handle: "Humam_Fly",  url: "https://www.behance.net/Humam_Fly" },
  ],

  reelsStat: {
    value: 1200000,                                  // counts up to this
    label: "views on a single reel",
    url: "https://www.instagram.com/reel/DVWoDl9krW7/",
  },
};

/* ---------------------------------------------------------------------
   SELECTED WORK — the horizontal timeline (vertical 9:16 clips)
   --------------------------------------------------------------------- */
window.PROJECTS = [
  {
    title: "Lenin's First Statue",
    category: "Explainer · Motion Graphics",
    page: "",
    preview: "videos/preview/lenin.mp4",
    full: "videos/full/lenin.mp4",
  },
  {
    title: "Best Actress — Ramadan 2026",
    category: "Motion Graphics · Drama",
    page: "",
    preview: "videos/preview/best-actress.mp4",
    full: "videos/full/best-actress.mp4",
  },
  {
    title: "How Rich Are You?",
    category: "Podcast Clip · Motion Graphics",
    page: "",
    preview: "videos/preview/podcast-clip.mp4",
    full: "videos/full/podcast-clip.mp4",
  },
  {
    title: "Ramadan 2026",
    category: "Drama Promo",
    page: "",
    preview: "videos/preview/ramadan-2026.mp4",
    full: "videos/full/ramadan-2026.mp4",
  },
  {
    title: "Ice Cream at −30°C",
    category: "Talking Head · Motion Graphics",
    page: "",
    preview: "videos/preview/ice-cream.mp4",
    full: "videos/full/ice-cream.mp4",
  },
  {
    title: "Most Despicable Character",
    category: "Drama Hype Edit",
    page: "",
    preview: "videos/preview/family-kitchen.mp4",
    full: "videos/full/family-kitchen.mp4",
  },
  {
    title: "The Secret",
    category: "Drama Promo",
    page: "",
    preview: "videos/preview/the-secret.mp4",
    full: "videos/full/the-secret.mp4",
  },
  {
    title: "Syrian Village Festival",
    category: "Event Promo · News",
    page: "Flash Platform",
    preview: "videos/preview/syrian-village.mp4",
    full: "videos/full/syrian-village.mp4",
  },
  {
    title: "Lafat Altayib",
    category: "Human-Interest Story",
    page: "Free Media",
    preview: "videos/preview/lafat-altayib.mp4",
    full: "videos/full/lafat-altayib.mp4",
  },
  {
    title: "Supermetall, Moscow",
    category: "Location Tour",
    page: "",
    preview: "videos/preview/supermetall.mp4",
    full: "videos/full/supermetall.mp4",
  },
];

/* ---------------------------------------------------------------------
   RAW → FINAL — before/after slider (two clips, same length, in sync)
   --------------------------------------------------------------------- */
window.BREAKDOWN = {
  before: "videos/breakdown-raw.mp4",     // raw green-screen, filmed off my monitor while editing (2024)
  after:  "videos/breakdown-final.mp4",   // the finished edit, same moment
  title:  "Green screen → snowy explainer.",
  body:   "Left: the raw plate, filmed off my monitor while I was editing in 2024. Right: the finished cut — key, snow particles, B-roll, captions and pacing.",
};

/* ---------------------------------------------------------------------
   REELS — phone frames that auto-play when on screen.
   Tapping one opens the full video (or "url" if you set one instead).
   --------------------------------------------------------------------- */
window.REELS = [
  { title: "Samaher",         preview: "videos/preview/samaher.mp4",        full: "videos/full/samaher.mp4" },
  { title: "Three Stars",     preview: "videos/preview/three-stars.mp4",    full: "videos/full/three-stars.mp4" },
  { title: "Hidden Charges",  preview: "videos/preview/hidden-charges.mp4", full: "videos/full/hidden-charges.mp4" },
  { title: "Russian Smile",   preview: "videos/preview/russian-smile.mp4",  full: "videos/full/russian-smile.mp4" },
  { title: "Misr Mosque",     preview: "videos/preview/egypt-mosque.mp4",   full: "videos/full/egypt-mosque.mp4" },
  { title: "Banned",          preview: "videos/preview/banned.mp4",         full: "videos/full/banned.mp4" },
];

/* ---------------------------------------------------------------------
   SPEC LAB — six fictional brands, six motion styles.
   Spec work: made to show range, not paid client projects.
   --------------------------------------------------------------------- */
window.SPEC = {
  note: "Spec work · fictional brands · original graphics, music & SFX",
  items: [
    { title: "Ember & Oat",           style: "Kinetic Type · Coffee",     preview: "videos/preview/spec-coffee.mp4",   full: "videos/full/spec-coffee.mp4" },
    { title: "The Radio Years",       style: "Paper Collage · Museum",    preview: "videos/preview/spec-museum.mp4",   full: "videos/full/spec-museum.mp4" },
    { title: "Tallyo",                style: "App UI · Fintech",          preview: "videos/preview/spec-app.mp4",      full: "videos/full/spec-app.mp4" },
    { title: "Anatomy of a Reel",     style: "Editorial Infographic",     preview: "videos/preview/spec-anatomy.mp4",  full: "videos/full/spec-anatomy.mp4" },
    { title: "Dunefall",              style: "Synthwave · Festival",      preview: "videos/preview/spec-festival.mp4", full: "videos/full/spec-festival.mp4" },
    { title: "ظلّ المدينة",            style: "Arabic Title Sequence",     preview: "videos/preview/spec-drama.mp4",    full: "videos/full/spec-drama.mp4" },
  ],
};

/* ---------------------------------------------------------------------
   ABOUT
   --------------------------------------------------------------------- */
window.ABOUT = {
  photo: "images/humam-stage.jpg",
  photoCaption: "Open mic final — top 3 of 10",
  lines: [
    "I'm Humam — a Syrian editor from Aleppo, based in Riyadh.",
    "Self-taught. I started out cutting music and lyric videos for Aleppo's rap scene, and never stopped.",
    "Today I edit Arabic & English short-form: drama promos, news reels, talking heads and motion-graphics explainers that stop the scroll.",
    "I also come from the stage — acting and stand-up — which is why I cut for performance and timing first.",
  ],
  tools: ["Premiere Pro", "After Effects", "Audition", "DaVinci Resolve"],
  inDevelopment: [
    { title: "SHIFT · نَوْبة", note: "vertical micro-series" },
    { title: "TRUMAN", note: "short film" },
  ],
};

/* ---------------------------------------------------------------------
   SERVICES — the giant marquee
   --------------------------------------------------------------------- */
window.SERVICES = ["Editing", "Motion Graphics", "Drama Promos", "News Reels", "Talking Heads", "Arabic & English content"];
