# Italian Vacation Map - Cheat Sheet

## 🗂️ File Structure

* **index.html** - Main structure of the map and sidebar
* **styles.css** - All visual styling and responsive layout
* **script.js** - All map logic, interactivity, and data handling

---

## 📍 How to Add Locations

### 1. Path Points (📍 Numbered red markers for main trip stages)

```javascript
addPathPoint(lat, lng, "Stage Name",
    "Description",
    ["photo1.jpg", "photo2.jpg"],
    "https://website.com",
    [/* hotels */],
    [/* area options */]);
```

### 2. Activities (⭐ Yellow star markers)

```javascript
addActivity(lat, lng, "Activity Name", "Type",
    ["photo1.jpg", "photo2.jpg"],
    "https://link.com",
    "Description of activity");
```

### 3. Must-Dos (❤️ Red heart markers with pulse)

```javascript
addMustDo(lat, lng, "Must See", "Type",
    ["photo1.jpg", "photo2.jpg"],
    "https://link.com",
    "Why it’s a must");
```

### 4. Restaurants / Food (🍕 Orange food markers)

```javascript
addFood(lat, lng, "Restaurant Name", "Type",
    ["photo1.jpg", "photo2.jpg"],
    "https://link.com",
    "What's great about this place");
```

---

## 🏨 Add Hotels to Path Points

Use this inside the hotels array of a `addPathPoint()` call:

```javascript
{
  name: "Hotel Name",
  type: "🏡 Agriturismo",
  description: "Hotel description...",
  link: "https://hotel.com",
  photos: ["hotel1.jpg"],
  roomPhotos: ["room1.jpg", "room2.jpg"]
}
```

---

## 🎛 Legend Filter (Bottom Left)

* Click any legend item (⭐ / ❤️ / 🍕) to **filter** markers by that type.
* Clicking again will **reset to show all markers**.
* Active filters are visually highlighted.

---

## ↺ Activity Navigation (← →)

* When viewing an activity, must-do, or food marker:

  * Left/right buttons allow cycling through all markers of that type.
  * These buttons are **only shown** if more than **one** of that type exists.

---

## 🖼 Photo Carousel

* Automatically displays all photos for the selected marker
* No white gaps, infinite loop navigation
* Dots indicate number of photos
* Works for activities, must-dos, food spots, and hotel photos

---

## 🌟 Main CSS Classes

### Markers

* `.number-marker` – red path points
* `.star-marker` – ⭐ activity
* `.heart-marker` – ❤️ must-do (animated)
* `.food-marker` – 🍕 food spot

### Marker Size (Auto adjusts)

* `.size-large` / `.size-medium` / `.size-small` / `.size-tiny`

### Side Panel

* `.click-overlay` – Sliding side panel container
* `.image-carousel` – Photo display
* `.click-text` – Text/info section
* `.hotel-controls` – Hotel toggle buttons

### Legend

* `.legend-item.active` – Highlighted filter state

### Nav Buttons

* `.activity-nav button` – Arrows only, minimal style, full-size click zone

---

## ⚖️ Developer Functions

### Map

* `fitMapToLocations()` – Fit view to all markers
* `cycleToNextStage()` – Move through trip stages
* `drawPath()` – Draw dotted line route
* `getDistance()` – Calculates distance (used for marker sizing)

### Display

* `showClickOverlay(item, isArea)` – Show side panel
* `hideClickOverlay()` – Close panel
* `updateActivityDisplay(showAll, currentPathPoint)` – Updates visibility and size of markers
* `createImageCarousel(photos)` – Handles photo transitions

---

## 🌐 Coordinates Quick Tip

1. Open Google Maps
2. Right-click anywhere → click the latitude/longitude
3. Paste it into the add function

Example:

```js
addPathPoint(43.7696, 11.2558, "Florence", ...);
```

---

## 🧪 Sample Starter Code

```js
addPathPoint(43.8100, 11.2051, "Florence Airport",
    "Arrive in Florence",
    ["https://example.com/airport.jpg"],
    "");

addMustDo(43.7696, 11.2558, "Uffizi Gallery", "Art Museum",
    ["https://example.com/uffizi.jpg"],
    "https://uffizi.it",
    "Renaissance art collection");

addFood(43.7701, 11.2572, "Trattoria Mario", "Traditional",
    ["https://example.com/mario.jpg"],
    "",
    "Local Florentine steak spot");
```

---

## 🗟 Legend Symbols

| Icon | Meaning                      |
| ---- | ---------------------------- |
| 📍   | Main trip stage (path point) |
| ⭐    | Activity                     |
| ❤️   | Must-do experience           |
| 🍕   | Food & dining                |
