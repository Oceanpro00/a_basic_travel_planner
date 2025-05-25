# Basic Travel Planner

A clean, self-hosted, interactive travel visualizer built in just 4 focused days.

This project was created to address the lack of visually intuitive, lightweight, and affordable tools for planning trips. Many existing platforms are either paywalled, confusing, ad-heavy, or limited to static documents that are hard to edit, carry, or use interactively on the go. This planner aims to subvert that.

Built for portfolio demonstration and future growth, it delivers a scalable client-side platform for visualizing multi-stop travel routes using Leaflet.js and plain JavaScript. Users can explore cities, highlight activities, toggle between hotel views, and manage their trip spatially — all in-browser, with no backend required.

While basic JavaScript knowledge or access to an AI assistant (like ChatGPT) is recommended for setup, the system is intentionally straightforward to use. Future versions will include a more robust planner UI, optional AI assistance, and broader travel utilities — while preserving user privacy and browser-based flexibility.

---

## Table of Contents

* [Live Demos](#live-demos)
* [Features](#features)
* [Getting Started](#getting-started)
* [Customize Your Trip](#customize-your-trip)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Changelog](#changelog)
* [License](#license)

---

## Screenshots

### Location Detail Popup

![Location Detail](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/location_data.png)

### Route and Stage Markers

![Start of Route](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/route_planning.png)

### Activity Overlay with Tags

![Activity Detail](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/activity_data.png)

## Live Demos

* **Tuscany Trip Example:** [View Planner](https://oceanpro00.github.io/a_basic_travel_planner/tuscany/)
* **Minimal Starter Version:** [View Basic Example](https://oceanpro00.github.io/a_basic_travel_planner/example/)
* **GitHub Repo:** [github.com/Oceanpro00/a\_basic\_travel\_planner](https://github.com/Oceanpro00/a_basic_travel_planner)

---

## Features

* Fully client-side: no backend, no database
* Map powered by Leaflet.js with custom marker styling
* Clickable stops, activities, food spots, and must-do highlights
* Visual legend to filter marker types (Activity, Must-Do, Food)
* Side panel with:

  * Image carousel
  * Description, link, and auto-tagged keywords
  * Toggle for hotel exterior vs. room views
* Responsive layout and mobile-ready behavior

---

## Getting Started

To reproduce or deploy this project:

1. Clone or fork the repository
2. Open `/docs/tripData.js`

   * Use `addPathPoint()`, `addActivity()`, `addMustDo()`, and `addFood()`
3. Open `/docs/index.html` in any browser or deploy via GitHub Pages
4. Edit `tripTitle` to change the document title

---

## Customize Your Trip

* Modify any location or marker in `tripData.js`
* Use direct image URLs or local files in `/assets`
* Add hotels per stop with room and exterior photo options
* All layout and visual design lives in `styles.css`

📘 Need full documentation? See [`basic_travel_planner_cheatsheet.md`](./basic_travel_planner_cheatsheet.md)

---

## Build Notes

This project was built in just 4 focused days with a mix of AI collaboration and hands-on coding.

* **Claude AI** (Anthropic) was used to scaffold early logic and generate UI patterns
* **ChatGPT** helped rapidly iterate, debug, and explore refactors
* **Custom implementation** handled interaction logic, UX polish, marker handling, and mobile responsiveness

The result is a lightweight planner that can be easily customized or extended, serving as both a technical portfolio piece and a base for future travel tools.

---

## Tech Stack

* HTML + CSS + JavaScript (no frameworks)
* Leaflet.js for map rendering
* Hosted via GitHub Pages

---

## Project Structure

```
CHANGELOG.md         # Optional separate changelog (matches README entries)
/docs
├── index.html        # Main app file
├── script.js         # App logic & interactivity
├── styles.css        # All styling & animations
├── tripData.js       # Trip configuration
/assets               # Static images (optional)
```

Set GitHub Pages to deploy from the `/docs` folder.

---

## Changelog

### v0.3.0 – May 25, 2025

* Refactored marker logic to simplify visibility and interaction
* Removed deprecated area options logic
* Improved photo carousel, error handling, and image transitions
* Overhauled cheat sheet and added auto keyword tagging

### v0.2.0 – May 23, 2025

* Added filterable legend by marker type (Activity, Must-Do, Food)
* Introduced cycle button for navigating path points
* Enabled hotel overlays with room/exterior photo toggle

### v0.1.0 – May 21, 2025

* Initial build with Leaflet map, core marker types, and popups
* Implemented numbered stops, path routing, and side panel interaction

---

## Future Ideas

The current version is a strong foundation, but future iterations may include:

* A drag-and-drop UI planner for trip building
* AI-generated day-by-day itineraries based on your stops
* Optional date & timeline integration
* Theme support (dark mode, city-specific looks)
* Export to printable PDF or shareable links

---

## License

This project was built independently with the help of Claude AI and ChatGPT, alongside custom logic and manual iteration. It is open-source and shared for demonstration and inspiration purposes.

All rights to commercial use are reserved by the original creator. You may fork, adapt, or explore the project for learning or personal experimentation, but **you may not use it commercially or redistribute it** without written permission.
