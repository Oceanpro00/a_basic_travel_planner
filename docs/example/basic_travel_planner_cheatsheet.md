# 🇮🇹 Italian Vacation Map – Developer Cheat Sheet

> This cheat sheet supports the **Basic Travel Planner** – a modular Leaflet-based platform for visualizing multi-stop trips. Use it to quickly customize trip routes, showcase regional highlights, and create interactive, image-driven itineraries.

---

## 📑 Table of Contents

* [🔗 Links](#-links)
* [🚀 Getting Started](#-getting-started)
* [🗂️ File Structure](#️-file-structure)
* [📍 How to Add Locations](#-how-to-add-locations)

  * [Path Points](#1-path-points--red-numbered-markers)
  * [Activities](#2-activities--yellow-star-markers)
  * [Must-Dos](#3-must-dos--red-heart-markers)
  * [Food](#4-restaurants--food--orange-food-markers)
  * [Cafes](#5-cafes--coffee-markers)
* [🏨 Add Hotels to Path Points](#-add-hotels-to-path-points)
* [🎛 Legend Filter (Bottom Left)](#-legend-filter-bottom-left)
* [↺ Cycle Button](#-cycle-button-top-center)
* [⬅️➡️ Marker Navigation](#️-marker-navigation)
* [🖼 Photo Carousel](#-photo-carousel)
* [🏷️ Auto-Generated Keywords](#️-auto-generated-keywords)
* [⚙️ Marker Classes (CSS)](#️-marker-classes-css)
* [🧪 Dev Utility Functions (scriptjs)](#-dev-utility-functions-scriptjs)
* [📐 How to Find Coordinates](#-how-to-find-coordinates)
* [🛠️ What You Can Customize](#️-what-you-can-customize)
* [🧯 Troubleshooting Tips](#-troubleshooting-tips)
* [🧪 Sample Code Snippet](#-sample-code-snippet)
* [🗟 Legend Symbols](#-legend-symbols)

---

## 🔗 Links

* **GitHub Repo:** [github.com/Oceanpro00/a\_basic\_travel\_planner](https://github.com/Oceanpro00/a_basic_travel_planner)
* **Live Demo (Full Tuscany Trip):** [Tuscany Planner](https://oceanpro00.github.io/a_basic_travel_planner/tuscany/)
* **Live Demo (Minimal Example):** [Minimal Example](https://oceanpro00.github.io/a_basic_travel_planner/example/)

---

## 🚀 Getting Started

1. Open `tripData.js` – define all trip content using provided marker functions.
2. Add locations using:

   ```js
   addPathPoint(lat, lng, "Stop Name", "Description", ["photo.jpg"], "https://link.com");
   ```
3. Open `index.html` locally or deploy via GitHub Pages to view the map.

---

## 🗂️ File Structure

| File          | Purpose                                               |
| ------------- | ----------------------------------------------------- |
| `index.html`  | Base layout and references to scripts/styles          |
| `styles.css`  | All visuals, including markers and sidebar behavior   |
| `script.js`   | Core logic: interactivity, overlays, filtering, zoom  |
| `tripData.js` | The full trip plan – stops, activities, hotels, links |

---

## 📍 How to Add Locations

### 1. Path Points – Red Numbered Markers (📍)

```js
addPathPoint(lat, lng, "City Name", "Overview", ["photo.jpg"], "link", [hotels]);
```

### 2. Activities – Yellow Star Markers (⭐)

```js
addActivity(lat, lng, "Attraction", "Type", ["img.jpg"], "link", "Description");
```

### 3. Must-Dos – Red Heart Markers (❤️)

```js
addMustDo(lat, lng, "Must Do", "Type", ["img.jpg"], "link", "Why it matters");
```

### 4. Food – Orange Fork Markers (🍕)

```js
addFood(lat, lng, "Food Place", "Cuisine", ["img.jpg"], "link", "Highlights");
```

### 5. Cafes – Coffee Markers (☕)

```js
addCafe(lat, lng, "Cafe", "Type", ["img.jpg"], "link", "Details");
```

---

## 🏨 Add Hotels to Path Points

```js
{
  name: "Hotel Name",
  type: "🏡 Boutique Stay",
  description: "Short summary...",
  link: "https://link.com",
  photos: ["hotel1.jpg"],
  roomPhotos: ["room1.jpg"]
}
```

---

## 🎛 Legend Filter (Bottom Left)

| Action              | Result                     |
| ------------------- | -------------------------- |
| Click ⭐ / 🍕 / ☕    | Show only that marker type |
| Click again         | Reset to show all          |
| 📍 & ❤️ always show | Not affected by filters    |

---

## ↺ Cycle Button (Top Center)

Cycles through each `📍` path point:

* Focus map
* Show side panel
* Dim unrelated markers

---

## ⬅️➡️ Marker Navigation

Appears when multiple same-type markers exist:

* Navigate ⭐ / ❤️ / 🍕 / ☕ clusters

---

## 🖼 Photo Carousel

* Dot + arrow navigation
* Handles image load failure
* Swaps between room & hotel photos

---

## 🏷️ Auto-Generated Keywords

* Extracted from `type` & `description`
* Helps filter content visually

---

## ⚙️ Marker Classes (CSS)

| Class            | Purpose                    |
| ---------------- | -------------------------- |
| `.number-marker` | Path point                 |
| `.heart-marker`  | Must-do                    |
| `.star-marker`   | Activity                   |
| `.food-marker`   | Food                       |
| `.cafe-marker`   | Cafe                       |
| `.size-large`    | Enlarged state             |
| `.size-medium`   | Default state              |
| `.size-small`    | De-emphasized contextually |
| `.size-tiny`     | Zoomed-out distant marker  |

---

## 🧪 Dev Utility Functions (script.js)

* `drawPath()` – Connects path points with arrows
* `cycleToNextStage()` – Stage-based navigation
* `fitMapToLocations()` – Auto-centers all markers
* `updateActivityDisplay(showAll, point)` – Zoom or cycle logic
* `createImageCarousel()` – Gallery rendering

---

## 📐 How to Find Coordinates

1. Open Google Maps
2. Right-click a location → Copy lat,lng
3. Paste into any `add...()` function

```js
addCafe(43.7696, 11.2558, "My Cafe", ...);
```

---

## 🛠️ What You Can Customize

* Add new marker types (like ☕)
* Adjust `zoomend` logic for marker visibility
* Modify styles in `styles.css`
* Add overlays for reviews or planning
* Expand hotel data with amenities

---

## 🧯 Troubleshooting Tips

| Problem                  | Likely Cause                       |
| ------------------------ | ---------------------------------- |
| Map not loading          | Tile server issue or no internet   |
| Marker click not working | Event not attached or overwritten  |
| Images not showing       | URL typo or blocked domain         |
| Filters behave oddly     | Check `data-type` and filter logic |

---

## 🧪 Sample Code Snippet

```js
addPathPoint(43.8100, 11.2051, "Florence Airport", "Arrival",
  ["https://img.com/airport.jpg"], "https://airport.com");

addMustDo(43.7761, 11.2494, "Accademia Gallery", "Museum",
  ["https://img.com/gallery.jpg"], "https://uffizi.it", "See David");

addFood(43.7733, 11.2556, "Trattoria Mario", "Tuscan",
  ["https://img.com/mario.jpg"], "", "Bistecca alla Fiorentina");
```

---

## 🗟 Legend Symbols

| Icon | Meaning                |
| ---- | ---------------------- |
| 📍   | Main stop              |
| ⭐    | Activity               |
| ❤️   | Must-Do                |
| 🍕   | Food / Restaurant      |
| ☕    | Cafe / Coffee / Bakery |
