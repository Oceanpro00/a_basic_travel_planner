# Changelog – Basic Travel Planner

This file documents the key changes made to the project across each version. It tracks features, fixes, improvements, and architectural decisions. A summarized version is available in the [README](./README.md).

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
