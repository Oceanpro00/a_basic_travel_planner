# Changelog – Basic Travel Planner

This file documents the key changes made to the project across each version. It tracks features, fixes, improvements, and architectural decisions. A summarized version is available in the [README](./README.md).

---

## v0.5.0 – May 27, 2025

### 🚀 Features

- **Modular interface structure:** The project now cleanly separates the Planner UI (`/docs/ez_travel_planner/`) and Viewer UI (`/docs/ez_travel_planner/map/`), allowing users to independently plan and present trips.
- **Input-based planning workflow:** Replaced manual `tripData.js` editing with structured input blocks (Path Point, Must-Do, Activity, Cafe, Hotel) that auto-generate the code while reflecting live changes on the map.
- **Live trip preview:** All marker additions and edits update instantly on the map panel, improving clarity and feedback during planning.
- **LocalStorage persistence:** Unfinished sessions are saved automatically in-browser. If no trip has been started, a two-point sample trip is preloaded as a starter guide.
- **"New Trip" logic:** Added button to clear current trip from storage and revert to sample trip, improving user onboarding and control.

### 🧪 Refactors & Improvements

- **Overlay cleanup:** Refined sidebar visual spacing and photo carousels. Added logic to suppress overlays for markers without sufficient data.
- **Improved image fallback:** Carousel now uses a placeholder when encountering broken or missing URLs. Default height set to avoid layout shifts.
- **Z-index layering fix:** Proper stacking behavior across markers and overlays ensures more predictable click handling.
- **Mobile polish:** Increased space between button footer and map when fully scrolled. Footer is now transparent to avoid layout blocking.

### 📝 Documentation

- **README enhancements:** Clarified Planner vs Viewer usage. Added updated screenshots showing each marker type, overlay, and interface view.
- **Cheatsheet updates:** Fully restructured with updated marker functions (`addCafe`, etc.), photo best practices, and section breakdowns.
- **Folder restructuring:** Introduced `/docs/example/` and `/docs/tuscany/` as clean, deployable sample trips using the viewer interface.

---

## v0.4.0 – May 26, 2025

### 🚀 Features

- **Zoom-based visibility system:** Non-primary markers (Activities ⭐, Food 🍕, Cafes ☕) now dynamically appear or hide based on zoom level (`zoom >= 12`).
- **New marker type – ☕ Cafes:** Added support for cafes as a distinct marker type with its own icon, filter toggle, and `addCafe()` function.
- **Dynamic auto-centering:** The map now fits to the bounds of all path points at load, replacing the static center point.
- **Independent marker filtering:** The legend now allows toggling each marker type (⭐ / ❤️ / 🍕 / ☕) individually, improving readability and control.

### 🧪 Refactors & Improvements

- **Improved photo handling:** Fixed edge cases where images failed to render due to invalid or empty photo arrays. Added fallback logic for missing images.
- **Overlay UI enhancements:** Reordered elements in the detail overlay for clarity, including placing the "Visit Website" button above hotel listings.
- **Cleaner mobile behavior:** Adjusted z-index and marker scaling to improve touch interaction and prevent overlap.

### 📝 Documentation

- **Updated `basic_travel_planner_cheatsheet.md`:** Reorganized layout, added table of contents, and included all new marker functions and visibility logic.
- **Improved README intro:** Refined project description to better highlight use cases, modular design, and privacy-friendly implementation.
- **Added visibility system notes:** New default marker visibility and zoom behavior explained in both cheat sheet and README.

---

## v0.3.0 – May 25, 2025

### ✨ Refactors & Improvements

* Cleaned up marker selection logic to prevent accidental shrinking or disappearance
* Removed experimental area marker toggle system for simplified UX and maintainability
* Enhanced image carousel: added arrow navigation, dot indicators, and broken-image fallback
* Introduced auto-generated keyword tags based on marker `type` and `description`
* Updated responsive styling and mobile transitions for better usability

### 📝 Documentation

* Rewrote [`basic_travel_planner_cheatsheet.md`](./basic_travel_planner_cheatsheet.md) to match current system architecture
* Fully updated `README.md` for professional use and clarity
* Added screenshots, roadmap, and a clarified license policy

---

## v0.2.0 – May 23, 2025

### 🚀 Features

* Added interactive legend filter (Activities, Must-Dos, Food)
* Implemented trip cycle button to toggle between stops and full trip view
* Hotel overlays now support toggling between exterior and room photos
* Responsive layout tweaks for overlay panels, legends, and images

### 💡 UX Enhancements

* Improved marker scaling logic relative to stage proximity
* Added consistent z-index stacking and hover scaling behaviors
* Clean hover and click interactions across all marker types

---

## v0.1.0 – May 21, 2025

### 🛠 Initial Build

* Launched Leaflet.js map with numbered path points and route line
* Introduced star, heart, and food markers with optional detail overlays
* Built side panel overlay with photo carousels, tags, and booking links
* Created base styles and layout for mobile-friendly interaction
* Deployed via GitHub Pages and scaffolded with initial cheat sheet

---

## 🔭 Ongoing Goals

* Modular support for multi-day plans, calendar integration
* Print/export features and offline support
* Improved accessibility (keyboard nav, screen reader friendliness)
* Future planner UI with drag-and-drop interface
* Optional AI-assisted itinerary generator
