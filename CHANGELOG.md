# Changelog – Basic Travel Planner

This file documents the key changes made to the project across each version. It tracks features, fixes, improvements, and architectural decisions. A summarized version is available in the [README](./README.md).

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
