# A Basic Travel Planner

A fully-free, self-hostable, map-based trip planner for visualizing vacations with interactive routing, hotels, and activity highlights. Built to be adapted for any trip, anywhere in the world.

This example shows a multi-stop trip through Italy, but you can easily swap in your own destinations, descriptions, and photos to create your own.

---

## Screenshots

### Location Detail Popup

![Location Detail](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/location_data.png)

### Start of Route

![Start of Route](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/route_planning.png)

### Activity Detail Popup

![Activity Detail](https://raw.githubusercontent.com/Oceanpro00/a_basic_travel_planner/main/assets/activity_data.png)

---

## Purpose

Most travel tools are either:

* Paywalled or filled with ads
* Tied to rigid platforms
* Lacking customization or visuals

This tool is open, portable, and built with simplicity in mind. It works entirely in the browser and takes minutes to personalize.

---

## Live Demo

[View Live on GitHub Pages](https://oceanpro00.github.io/a_basic_travel_planner/florence/) 

> You can fork this repo, edit `/docs/script.js`, and make your own in no time.

---

## Features

* Interactive map (Leaflet.js)
* Cycle through trip segments ("Full Trip", "Stop 1", etc.)
* Clickable points for:

  * Destinations (number markers)
  * Activities (star markers)
  * Hotels (grouped with photos)
* Popups with:

  * Carousel photo viewer
  * Description, tags, booking link
  * Toggle between hotel exterior & room views

---

## Build Notes

This project was created as a quick, personal tool with help from:

* Claude AI (Anthropic) for initial scaffolding and UI logic
* Local LLMs for code suggestions, cleanup, and live adaptation
* My own hands-on debugging, styling, and UX decisions

The goal was simply to get a working visual planner that can be customized fast.

---

## Tech Stack

* HTML, CSS, JavaScript (Vanilla)
* Leaflet.js (map)
* No frameworks or backend
* Hosted via GitHub Pages

---

## Project Structure

```
/docs
  ├── index.html        # Main app
  ├── script.js         # Core logic
  ├── styles.css        # UI styling
/assets
  ├── location_data.png
  ├── route_planning.png
  └── activity_data.png
```

Set GitHub Pages to deploy from `/docs`.

---

## Customize It

To make this your own:

* Replace `addPathPoint()` and `addActivity()` calls in `script.js`
* Update location names, coordinates, descriptions, photos
* Optionally add your own hotel or tag logic

Want multiple routes? Custom marker icons? It's all just code.

---

## Credits

* Maps: OpenStreetMap
* Photos: Unsplash, Booking.com, and tourism websites
* AI Tools: Claude AI, Mistral, OpenChat

---

This was built independently as a personal tool using AI-assisted development. Use or adapt it however you’d like.
