# Italian Vacation Map – Developer Cheat Sheet

## 📑 Table of Contents

* [🔗 Links](#-links)
* [🚀 Getting Started](#-getting-started)
* [🗂️ File Structure](#️-file-structure)
* [📍 How to Add Locations](#-how-to-add-locations)

  * [Path Points](#1-path-points--red-numbered-markers)
  * [Activities](#2-activities--yellow-star-markers)
  * [Must-Dos](#3-must-dos--red-heart-markers)
  * [Food](#4-restaurants--food--orange-food-markers)
* [🏨 Add Hotels to Path Points](#-add-hotels-to-path-points)
* [🎛 Legend Filter](#-legend-filter-bottom-left)
* [↺ Cycle Button](#-cycle-button-top-center)
* [⬅️➡️ Marker Navigation](#️-marker-navigation)
* [🖼 Photo Carousel](#-photo-carousel)
* [🏷️ Auto-Generated Keywords](#️-auto-generated-keywords)
* [⚙️ Marker Classes (CSS)](#️-marker-classes-css)
* [🧪 Dev Utility Functions](#-dev-utility-functions-scriptjs)
* [📐 How to Find Coordinates](#-how-to-find-coordinates)
* [🛠️ What You Can Customize](#️-what-you-can-customize)
* [🧯 Troubleshooting Tips](#-troubleshooting-tips)
* [🧪 Sample Code Snippet](#-sample-code-snippet)
* [🗟 Legend Symbols](#-legend-symbols)

> This cheat sheet supports the **Basic Travel Planner** – a modular Leaflet-based platform for visualizing multi-stop trips. Use it to quickly customize trip routes, showcase regional highlights, and create interactive, image-driven itineraries.

---

## 🔗 Links

* **GitHub Repository:** [github.com/Oceanpro00/a\_basic\_travel\_planner](https://github.com/Oceanpro00/a_basic_travel_planner)
* **Live Demo (Full Tuscany Trip):** [oceanpro00.github.io/a\_basic\_travel\_planner/tuscany](https://oceanpro00.github.io/a_basic_travel_planner/tuscany/)
* **Live Demo (Minimal Example):** [oceanpro00.github.io/a\_basic\_travel\_planner/example](https://oceanpro00.github.io/a_basic_travel_planner/example/)

---

## 🚀 Getting Started

1. **Open `/tripData.js`**
   Define all trip content here using simple JavaScript functions.

2. **Add a path point (main trip stop):**

   ```js
   addPathPoint(lat, lng, "Stop Name", "Description", ["photo.jpg"], "https://link.com");
   ```

3. **Preview in Browser**
   Open `/index.html` in your browser or deploy via GitHub Pages.

---

## 🗂️ File Structure

* **index.html** – Core layout + script imports
* **styles.css** – Complete styling and UI behavior
* **script.js** – Marker creation, map logic, and interaction handling
* **tripData.js** – Where you define all trip data manually

---

## 📍 How to Add Locations

### 1. Path Points (📍 Red numbered markers)

```js
addPathPoint(lat, lng, "Stage Name",
    "Description",
    ["photo1.jpg"],
    "https://website.com",
    [/* optional hotel list */]);
```

### 2. Activities (⭐ Yellow star markers)

```js
addActivity(lat, lng, "Activity Name", "Type",
    ["photo1.jpg"],
    "https://link.com",
    "Description");
```

### 3. Must-Dos (❤️ Red heart markers)

```js
addMustDo(lat, lng, "Must See", "Type",
    ["photo1.jpg"],
    "https://link.com",
    "Why it’s a must");
```

### 4. Restaurants / Food (🍕 Orange food markers)

```js
addFood(lat, lng, "Restaurant Name", "Type",
    ["photo1.jpg"],
    "https://link.com",
    "What’s great here");
```

---

## 🏨 Add Hotels to Path Points

Add this inside the `hotels` array of a path point:

```js
{
  name: "Hotel Name",
  type: "🏡 Agriturismo",
  description: "Charming hillside stay...",
  link: "https://hotel.com",
  photos: ["hotel1.jpg"],
  roomPhotos: ["room1.jpg", "room2.jpg"]
}
```

* Users can toggle between exterior and room views.

---

## 🎛 Legend Filter (Bottom Left)

* Click to show only one marker type (⭐ / ❤️ / 🍕)
* Click again to show all markers
* Path points (📍) always remain visible

---

## ↺ Cycle Button (Top Center)

* Cycles through each main stop (📍 Path Point)
* Dim unrelated markers and shows content panel for that stop
* Click again for “Full Trip” mode

---

## ⬅️➡️ Marker Navigation

* Arrows appear when multiple markers of same type exist
* Cycles through ⭐, ❤️, or 🍕 markers only

---

## 🖼 Photo Carousel

* Automatically loops images from marker data
* Navigation arrows + dot indicators
* Image error handling + fallback message

---

## 🏷️ Auto-Generated Keywords

* Extracted from `type` and `description`
* Tags appear in side panel for visual reference

---

## ⚙️ Marker Classes (CSS)

### Marker Types

* `.number-marker` = Path point
* `.star-marker` = ⭐ Activity
* `.heart-marker` = ❤️ Must-Do
* `.food-marker` = 🍕 Food Spot

### Sizing

* `.size-large` / `.size-medium` / `.size-small` / `.size-tiny`

---

## 🧪 Dev Utility Functions (script.js)

* `drawPath()` – Connects path points
* `cycleToNextStage()` – Trigger stage-by-stage cycling
* `fitMapToLocations()` – Zooms out to fit all markers
* `showClickOverlay(item)` – Opens info panel
* `createImageCarousel(photos)` – Renders image slides
* `updateActivityDisplay(showAll, point)` – Adjusts visibility + size

---

## 📐 How to Find Coordinates

1. Open Google Maps
2. Right-click → Copy Latitude, Longitude
3. Paste into any `add` function call:

```js
addPathPoint(43.7696, 11.2558, "Florence", ...);
```

---

## 🛠️ What You Can Customize

* Add/remove path stops, activities, food spots, hotels
* Use hosted or local images for each marker
* Style all elements in `styles.css`
* Extend interactivity (e.g., map themes, date planning, reviews)

---

## 🧯 Troubleshooting Tips

* **Map doesn't show?** Use local server or deploy via GitHub Pages
* **Photos don’t load?** Double-check file path or image URL
* **Markers overlap?** Use distinct lat/lng per location
* **Nothing happens on click?** Ensure marker was created with the correct `add` function

---

## 🧪 Sample Code Snippet

```js
addPathPoint(43.8100, 11.2051, "Florence Airport", "Arrival in Tuscany",
    ["https://example.com/airport.jpg"], "https://link.com");

addMustDo(43.7761, 11.2494, "Accademia Gallery", "Art Museum",
    ["https://example.com/gallery.jpg"], "https://uffizi.it",
    "See Michelangelo's David");

addFood(43.7733, 11.2556, "Trattoria Mario", "Traditional",
    ["https://example.com/mario.jpg"], "",
    "Beloved Florentine steak house");
```

---

## 🗟 Legend Symbols

| Icon | Meaning                      |
| ---- | ---------------------------- |
| 📍   | Main trip stage (path point) |
| ⭐    | Activity                     |
| ❤️   | Must-do experience           |
| 🍕   | Food & dining                |
