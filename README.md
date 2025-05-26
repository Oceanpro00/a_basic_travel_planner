# Basic Travel Planner

**Basic Travel Planner** is a modular, self-hosted travel visualization tool for mapping multi-stop trips with rich detail. Built entirely with Leaflet.js and vanilla JavaScript, it enables creators, travelers, and developers to design flexible, interactive itineraries with **zero backend dependencies**.

This project aims to offer an elegant alternative to bloated, ad-ridden, or paywalled travel planning tools. With it, you can:

- Highlight cities and must-see locations
- Showcase restaurants, cafes, activities, and hotels
- Visually plan routes and stages
- Present immersive, image-rich trip previews

Whether you're crafting a travel journal, pitching a trip idea, or building a personal trip site, this planner is adaptable, extendable, and fully offline-capable.

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

* Use this tool to:

- Share personalized trip plans with friends or clients
- Build region-specific travel previews
- Prototype travel ideas for content creation or editorial pitches


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

This project was developed through iterative prototyping and AI-supported collaboration. It blends automation with handcrafted logic to offer a smooth user experience across devices.

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

## Update

### v0.4.0 – May 26, 2025

- Introduced 🟨 zoom-level visibility logic (zoom in to reveal activities/food/cafes)
- New marker type: ☕ Cafe (added support, icon, filter, and behavior)
- Map auto-centering now dynamically fits all path points on load
- Side panel carousel now better handles missing/invalid images
- Rewritten developer cheat sheet with detailed usage breakdown
- Refined mobile responsiveness and scaling behavior
- Minor fixes for overlay transitions and marker z-index stacking

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
