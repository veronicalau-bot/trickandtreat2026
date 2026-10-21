# trickandtreat2026

**Trick and Treat@Lib** is a self-service Halloween library game about finding reliable sources, designed for a booth visit of around five minutes.

## Play

Open `index.html` in a browser. No build step or dependencies are required. Keep the `assets`, `css`, and `js` folders alongside it.

If your browser blocks local audio playback, serve the folder with a local web server or host it as a static website. Music starts after a user interaction and can be muted using the sound button.

## Features

- Traditional Chinese and English language switching.
- Four levels: where to search, search strategies, filtering, and evaluating sources.
- Random questions, immediate feedback, and Boo introductions.
- Name entry, completion timestamp (`ddhhmmss`), and automatic idle reset.
- A results banner reminding players to take a photo or screenshot and show counter staff to claim their prize.

## Prizes

Each correct answer earns one point, with a maximum of 12 points.

| Score | Tier | Prize |
|---|---|---|
| 11-12 | Super Treat | Candy + 2 small gifts |
| 7-10 | Sweet Treat | Candy + 1 small gift |
| 0-6 | Mini Treat | Candy |

The completion timestamp uses the device's local time. Ensure the booth device's clock is accurate.

## Content

Edit questions, translations, prize tiers, and settings in [js/content.js](js/content.js). See [PLAN.md](PLAN.md) for the design plan.

Library guide: [Keyword Search Techniques](https://libguides.hkapa.edu/searchstrategy).

## Music attribution

Music: Halloween by Alex-Productions https://soundcloud.com/alexproductionsmusic

License: Creative Commons — Attribution 3.0 Unported — CC BY 3.0

Free Download / Stream: https://links.al/Min

Music promoted by Audio Library: https://links.al/youtube

The music attribution above applies to the bundled music track.
