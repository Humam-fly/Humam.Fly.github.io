/* =====================================================================
   HUMAM FLAYYES — CONTENT FILE
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit to update the site.

   Every video on the site is a silent loop that plays on its own.
   The only sound is the full showreel, behind the "Watch full reel" button.

   Each item has:
     title     : name shown on the card
     category  : short tag shown on the card
     page      : who it was for (optional, leave "" to hide)
     preview   : short silent loop in /videos/preview  (5–10 s, ~1 MB)
   If a file is missing, the site shows a "no signal" placeholder,
   so nothing ever looks broken.
   ===================================================================== */

window.SITE = {
  // ✉️  Swap for your work email when you make one
  email: "hu.flayyes@gmail.com",

  showreel: {
    background: "videos/showreel-bg.mp4",           // front-page background (wide screens)
    backgroundVertical: "videos/showreel-bg-vertical.mp4", // front-page background (phones)
    full: "videos/showreel.mp4",                    // "Watch full reel" (with music, plays on the site)
    fullVertical: "videos/showreel-vertical.mp4",
  },

  socials: [
    { label: "Instagram", handle: "@humam.fly", url: "https://www.instagram.com/humam.fly/" },
    { label: "YouTube",   handle: "@HumamFly",  url: "https://www.youtube.com/@HumamFly" },
    { label: "Behance",   handle: "Humam_Fly",  url: "https://www.behance.net/Humam_Fly" },
  ],
};

/* ---------------------------------------------------------------------
   SELECTED WORK — the horizontal timeline (vertical 9:16 clips)
   --------------------------------------------------------------------- */
window.PROJECTS = [
  { title: "Lenin's First Statue",        category: "Explainer · Motion Graphics", page: "", preview: "videos/preview/lenin.mp4" },
  { title: "Best Actress · Ramadan 2026", category: "Motion Graphics · Drama",     page: "", preview: "videos/preview/best-actress.mp4" },
  { title: "How Rich Are You?",           category: "Podcast Clip · Motion Graphics", page: "", preview: "videos/preview/podcast-clip.mp4" },
  { title: "Ramadan 2026",                category: "Drama Promo",                 page: "", preview: "videos/preview/ramadan-2026.mp4" },
  { title: "Lenin · The Hook",            category: "Explainer · Opening Titles",  page: "", preview: "videos/preview/lenin-intro.mp4" },
  { title: "Most Despicable Character",   category: "Drama Hype Edit",             page: "", preview: "videos/preview/family-kitchen.mp4" },
  { title: "The Secret",                  category: "Drama Promo",                 page: "", preview: "videos/preview/the-secret.mp4" },
  { title: "Syrian Village Festival",     category: "Event Promo · News",          page: "Flash Platform", preview: "videos/preview/syrian-village.mp4" },
  { title: "Lafat Altayib",               category: "Human-Interest Story",        page: "Free Media",     preview: "videos/preview/lafat-altayib.mp4" },
  { title: "Supermetall, Moscow",         category: "Location Tour",               page: "", preview: "videos/preview/supermetall.mp4" },
];

/* ---------------------------------------------------------------------
   RAW → FINAL — before/after slider (two clips, same length, in sync)
   --------------------------------------------------------------------- */
window.BREAKDOWN = {
  before: "videos/breakdown-raw.mp4",     // raw green-screen, filmed off my monitor while editing (2024)
  after:  "videos/breakdown-final.mp4",   // the finished edit, same moment
  title:  "Green screen. Back when it was rough.",
  body: [
    "2024. One small room, ten people, and not one of them spoke my language.",
    "I spent my days looking for work and my nights editing on an old laptop that could barely play a video.",
    "This is one of the videos that came out of that room.",
    "Plenty of people can edit your videos. I'm the one who stays up until it's right.",
  ],
};

/* ---------------------------------------------------------------------
   REELS — phone frames that play on their own (not clickable)
   --------------------------------------------------------------------- */
window.REELS = [
  { title: "Samaher",        preview: "videos/preview/samaher.mp4" },
  { title: "Three Stars",    preview: "videos/preview/three-stars.mp4" },
  { title: "Hidden Charges", preview: "videos/preview/hidden-charges.mp4" },
  { title: "Russian Smile",  preview: "videos/preview/russian-smile.mp4" },
  { title: "Misr Mosque",    preview: "videos/preview/egypt-mosque.mp4" },
  { title: "Banned",         preview: "videos/preview/banned.mp4" },
];

/* ---------------------------------------------------------------------
   SPEC LAB — fictional brands, different motion styles.
   Spec work: made to show range, not paid client projects.
   --------------------------------------------------------------------- */
window.SPEC = {
  note: "Spec work · fictional brands",
  items: [
    { title: "Ember & Oat",       style: "Kinetic Type · Coffee",   preview: "videos/preview/spec-coffee.mp4" },
    { title: "Tallyo",            style: "App UI · Fintech",        preview: "videos/preview/spec-app.mp4" },
    { title: "Anatomy of a Reel", style: "Editorial Infographic",   preview: "videos/preview/spec-anatomy.mp4" },
    { title: "Orbit",             style: "Product Launch · 3D UI",  preview: "videos/preview/spec-orbit.mp4" },
    { title: "Sketch → Motion",   style: "Storyboard to Animation", preview: "videos/preview/spec-sketch.mp4" },
    { title: "مِسك",               style: "Arabic Luxury Ad",        preview: "videos/preview/spec-oud.mp4" },
    { title: "The Body Clock",    style: "Science Explainer · Hologram UI", preview: "videos/preview/spec-clock.mp4" },
  ],
};

/* ---------------------------------------------------------------------
   ABOUT
   --------------------------------------------------------------------- */
window.ABOUT = {
  photo: "images/humam-stage.jpg",
  lines: [
    "I'm Humam, a Syrian actor and video editor.",
    "My first edit was in 2015, in Windows Movie Maker, back when YouTube was something only a few of us cared about.",
    "I never stopped. Today I cut Arabic and English short form: drama promos, news, talking heads and motion graphics.",
    "The actor in me makes every cut. I edit for the moment a performance lands, and I don't waste a single second getting there.",
  ],
  tools: ["Premiere Pro", "After Effects", "Audition", "DaVinci Resolve"],
};

/* ---------------------------------------------------------------------
   SERVICES — the giant marquee
   --------------------------------------------------------------------- */
window.SERVICES = ["Editing", "Motion Graphics", "Drama Promos", "News Reels", "Talking Heads", "Arabic & English content"];
