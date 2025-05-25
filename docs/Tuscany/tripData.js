// tripData.js
const tripTitle = "Our Tuscan Escape"; // Used for <title>

// =================================================================
// 🗺️ ADD YOUR LOCATIONS HERE
// =================================================================
// Use these functions to add your locations:
// - addPathPoint() for main stops
// - addActivity() for regular activities (⭐)
// - addMustDo() for must-do activities (❤️)
// - addFood() for restaurants/cafes (🍕)


// 📍 Florence Airport (Arrival)
addPathPoint(43.8100, 11.2051, "Florence Airport Arrival",
    "Land at Florence Airport (Peretola) and transfer to the Renaissance capital. Your Italian adventure begins here with convenient airport transfers to the historic center.",
    [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600",
      "https://media.cnn.com/api/v1/images/stellar/prod/240229150808-vineyard-airport-body.jpg?c=original",
      "https://api.airportir.com/assets/Uploads/mod-Florence-Airport-rooftop-vineyard__FocusFillWyIwLjAwIiwiMC4wMCIsMTI4MCw3MjBd.jpg"
    ],
    "https://www.abroadwithash.com/florence-travel-guide-essentials-for-your-visit-to-florence/"
  );
  
// 📍 Val d'Orcia
addPathPoint(43.0642, 11.6094, "Val d'Orcia",
"UNESCO-protected countryside stay. Use this base to explore cypress-lined roads, wineries, thermal springs, and medieval towns like Pienza, Montalcino, and Bagno Vignoni.",
[
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqbrLNqtNsMw1VPtscrWhevB1lfqwPtYngEQ&s",
    "https://historyinhighheels.com/wp-content/uploads/2017/07/Sunflowers_Tuscany_9.jpg"
],
"https://www.italia.it/en/tuscany/things-to-do/val-orcia",
[
    {
    name: "Agriturismo Bonello",
    type: "🏡 Agriturismo",
    description: "Rustic Tuscan farmhouse near Pienza with panoramic views and a pool.",
    link: "https://bonello.eu/en/",
    photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/114669274.jpg?k=f18788ebcb89bd5097c82d3d260807be8154cfda8e054a1c904be8f656b15932&o=&hp=1",
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/7a/81/35/caption.jpg?w=900&h=500&s=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTflST2RPFzBkoP0NxlYApMAnc9Xpy6oUyiSQ&s",
        "https://bonello.eu/wp-content/uploads/2025/02/Agriturismo-Bonello_Chi-Siamo-4-min-1.jpg"
    ],
    roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/550355826.webp?k=baf684b4c375e4c8375a16b300b5553ea7e8bdb7d93176c8b3c2a8eaae349712&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/550355841.webp?k=02cff73eb00030635c2b361105c4fc31a9fdbf4b1520727b5bcba8fccb926ef9&o="
    ]
    },
    {
    name: "Tenuta di Montecucco – ColleMassari",
    type: "🍷 Wine Estate",
    description: "Working vineyard with tasting rooms and luxurious hilltop views.",
    link: "https://www.collemassarihospitality.it/wine-relais-montecucco/",
    photos: ["https://www.collemassarihospitality.it/wp-content/uploads/2025/03/IMG_3079.jpg",
        "https://www.collemassarihospitality.it/wp-content/uploads/2025/03/DJI_0796.jpg",
        "https://www.collemassarihospitality.it/wp-content/uploads/2025/03/2295-CMKW24-HDR.jpg",
        "https://www.collemassarihospitality.it/wp-content/uploads/2025/03/DJI_0266.jpg"
    ],
    roomPhotos: ["https://www.collemassarihospitality.it/wp-content/uploads/2025/03/camera_classic-1.jpg",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/441284540.webp?k=5e3729e779f38cbb6d622ad97a3165412fa1e6ef0f824a61f522cc6dfff5c20e&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/257005919.webp?k=f1f6afa995868dbf15efed6b6e260ffab7e5d33b09499aadc2539a000bf8fd48&o="
    ]
    }
]
);
  
addPathPoint(44.3301, 9.1556, "Coastal Stay (Portofino Area)",
  "Scenic coastal base with access to Portofino, Santa Margherita, and Cinque Terre. Enjoy seafood, boutique towns, and seaside views.",
  [
    "https://www.campingvilladoria.it/wp/wp-content/uploads/2018/11/portofino-e-camogli-lezione-di-cucina-ed-aperituffo-770x531.jpg",
    "https://media.cntraveller.com/photos/66ec0df1f60e98fc9c59f2bf/4:3/w_5780,h_4335,c_limit/Porto%20Ercole%20-GettyImages-909908570.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/472626287.jpg?k=7ee7d0fc150af85c5127005220423f89d05c048c09dd705d358281fd02021ed2&o=&hp=1"
  ],
  "https://ourlittlelifestyle.com/visiting-camogli-italy/",
  [
    {
      name: "Albergo Minerva",
      type: "🏖️ Boutique Hotel",
      description: "Charming 3-star hotel in Santa Margherita Ligure with rooftop terrace and walking distance to the promenade.",
      link: "https://www.hotelminerva.eu/en/",
      photos: [
        "https://www.hotelminerva.eu/wp-content/uploads/2023/05/homepiscina-660x913.jpg",
        "https://www.hotelminerva.eu/wp-content/uploads/2023/05/arance-660x913.jpg",
        "https://www.hotelminerva.eu/wp-content/uploads/2023/05/IMG_14.jpg"
      ],
      roomPhotos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455648108.webp?k=6d8a5b15b4587ac3aa5865fd21263d3f1b1c879610248585e9faaa5de63f26e3&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455644909.webp?k=7841475f2e8ac8de366a5b391acf96133a48f5914a92fd947dfebc4bbcb7e86c&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/455644863.webp?k=c958036a850c3dc4e45ec85668cade5cfffa8e52615ea25f73779be109904f23&o="
      ]
    },
    {
      name: "Casa Nori",
      type: "🌅 Coastal Guesthouse",
      description: "Stylish guesthouse in Fezzano near the water, perfect for relaxing and exploring La Spezia or Cinque Terre.",
      link: "https://www.booking.com/hotel/it/casa-nori-fezzano.en-us.html",
      photos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/91073270.jpg?k=049f72645f019f7661ccd43f65f6eca192f87e4fa2fe99fd4da48390b2185bce&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/558643634.jpg?k=d3f2cc1ab9af810f52682c9d00d941bd657a37c86a291f287f64fd9eb095c709&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/366461087.jpg?k=abc1d2d057ed9ef6781a871ecaf2871967ec00de7afcdd7e0af73976bab4f4f8&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/366436167.jpg?k=7f8bde75c94ed17f121ca53be40908dd1b66dea9e641ada14324b5d873f56232&o=&hp=1"
      ],
      roomPhotos: [
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/565577344.jpg?k=5af162ae5805ba20351d348e3f38b33f32334d61d2ee2897271eadffb11d30ef&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/378894995.jpg?k=6c77f358351c67afda596b94648a92b6069dd26f3d38973223c77a9d06f645a2&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/558640595.jpg?k=2ba5a84daeb850189587cb461dcab879cb37e439a4eeba42b62e88e0ae1a0b96&o=&hp=1"
      ]
    }
  ]
);

// 📍 Florence City Center
addPathPoint(43.7763, 11.2486, "Florence City Center",
"Finish your trip surrounded by Renaissance art, boutiques, and gelato. Walk to all major sights from your apartment.",
[
    "https://www.italia.it/content/dam/tdh/en/interests/toscana/firenze/firenze/media/20210401173629-firenze-toscana-gettyimages-1145040590.jpg",
    "https://media.istockphoto.com/id/1437261135/photo/florence.jpg?s=612x612&w=0&k=20&c=svTdhgAO26b4ZVcoUcL_a5eowSjCqmkcjMf_lh-tit0=",
    "https://www.firenzemadeintuscany.com/assets/w=1500&h=740&fit=fill&f=center___images.ctfassets.net_7dc7gq8ix1ml_6XckIYSX6C9IR4iDkpRBA4_efbbe35520743e21854baaa458ecbc78_cover-bucaLapi.jpg"
],
"https://thattravelista.com/top-attractions-things-to-do-florence-italy/",
[
    {
    name: "Residenza Della Signoria",
    type: "🏛️ Boutique Guesthouse",
    description: "Elegant guesthouse steps from the Uffizi with cozy rooms and Italian charm.",
    link: "https://www.residenzadellasignoria.com/en/index.php",
    photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/34529910.jpg?k=38ad2174d6e9388ed6533d5b3bb1920811629302cdfc8f1861b0e388216b70f8&o=&hp=1",
        "https://www.residenzadellasignoria.com/images/slideServizi/1.jpg"
    ],
    roomPhotos: ["https://www.residenzadellasignoria.com/images/classic/1.jpg",
        "https://www.residenzadellasignoria.com/images/classic/6.jpg",
        "https://www.residenzadellasignoria.com/images/classic/4.jpg"
    ]
    },
    {
    name: "Florentia Art Apartments",
    type: "🎨 Modern Apartment",
    description: "Minimal modern unit with quick access to the Duomo and galleries.",
    link: "https://florentia-art-apartments.florenceapartments.org/en/",
    photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/374079049.jpg?k=da51d8e922c3aee02331b04bc4a17aed7bf13c814cb7368f0108d901362397f8&o=&hp=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIAN_HVLg9o0VMPV_ybbaL8hvixLWrefMsZg&s"
    ],
    roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/374079059.jpg?k=83d8ec54e763791394e9e1640fc3a752ecc6e7072542de07a09909ea761717fb&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/374079013.jpg?k=c28d5601e72601186bd286a32b627ffe75048a4a6fc28291db096e0e7a769354&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/374079045.jpg?k=bd8a4c2a3f71fa0ddb113e33fd6c7b11c3d92e2b6eaae682c275618fcf906578&o=&hp=1"
    ]
    },
    {
    name: "Sette Angeli Rooms",
    type: "🛏️ Budget Boutique",
    description: "Affordable boutique hotel walking distance from Mercato Centrale.",
    link: "https://www.setteangelirooms.com/",
    photos: ["https://cf.bstatic.com/xdata/images/hotel/max1280x900/512429096.jpg?k=22c9d7e843c3adea43dbd37090514ad0b0c2c39f2983534246bfe466194cd0be&o=&hp=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/246972357.jpg?k=ef37b2a943179a7e2ee82c6022a7f29ed54cd6592f9666fb2be321a116b2e7aa&o=&hp=1"
    ],
    roomPhotos: ["https://cf.bstatic.com/xdata/images/hotel/max1024x768/439092739.webp?k=889b8a09286d23f094b9d67c2114f622631a6e6cfae9c641503c003aee336ba5&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439092693.webp?k=f55016cb70a3706a464aa42511242f43e6fc5efe41695f9c589644ad9d19212c&o=",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/439092656.webp?k=48d885e80cda3b1b6f07bc58063e6381df7262fd5d78496c030ebbbbede59b01&o="
    ]
    }
]
);

// Add Activities
// Val D'Orcia
  // ⭐ Iconic Cypresses of San Quirico
  addActivity(43.0218, 11.6368, "Cipressi di San Quirico", "Nature Landmark",
  ["https://www.italia.it/content/dam/tdh/en/interests/toscana/val-d-orcia/media/20210408155505-val-d-orcia-toscana-gettyimages-177395107.jpg"],
  "https://www.italia.it/en/tuscany/things-to-do/the-cypresses-of-san-quirico-d-orcia",
  "Famous circle of cypress trees, ideal for sunrise or sunset photos just a short drive from Bonello."
  );

  // ⭐ Bagno Vignoni Thermal Village
  addActivity(43.0277, 11.6162, "Bagno Vignoni Thermal Square", "Thermal Spa",
  ["https://www.italia.it/content/dam/tdh/en/interests/benessere/bagno-vignoni/Bagno-Vignoni-gettyimages-1387558400.jpg"],
  "https://www.italia.it/en/tuscany/bagno-vignoni",
  "A historic village with a large thermal bath at its center, plus Roman ruins and spa options nearby."
  );

  // ⭐ Horseback Riding in the Orcia Hills
  addActivity(43.0712, 11.5947, "Trekking a Cavallo", "Horseback Ride",
  ["https://cdn.getyourguide.com/img/tour/5c44d30be11a4.jpeg/98.jpg"],
  "https://www.centroippicotuscania.it/en/",
  "Ride through the vineyards, wheat fields, and cypress roads with guided horseback treks across the valley."
  );
  
  // ⭐ Val d'Orcia ATV/Quad Tour
  addActivity(43.0625, 11.6312, "Val d'Orcia Quad Adventure", "ATV Tour",
  ["https://media-cdn.tripadvisor.com/media/photo-s/1b/ea/53/9b/quad-tour-val-d-orcia.jpg"],
  "https://www.quadexcursionsintuscany.com/",
  "Take a thrilling off-road quad bike ride through dirt roads, forest paths, and panoramic viewpoints around Pienza and Monticchiello."
  );

  // ⭐ Podere Il Casale Farm Experience
  addActivity(43.0707, 11.7010, "Podere Il Casale Tour", "Farm & Wine Experience",
  ["https://www.podereilcasale.com/wp-content/uploads/2020/06/Podere-Il-Casale-Home.jpg"],
  "https://podereilcasale.com/",
  "An organic farm offering cheese-making classes, goat visits, vineyard tastings, and long-table farm lunches with breathtaking views."
  );

  // ⭐ Gladiator Field at Terrapille
  addActivity(43.0774, 11.6785, "Gladiator Road Viewpoint", "Scenic Spot",
  ["https://www.earthtrekkers.com/wp-content/uploads/2022/10/Gladiator-Road-Tuscany.jpg"],
  "https://www.earthtrekkers.com/gladiator-road-val-dorcia/",
  "The winding field road from the Gladiator film — walk or drive for unforgettable Tuscan scenery."
  );

  // ⭐ Monticchiello Scenic Walks
  addActivity(43.0653, 11.7231, "Monticchiello Medieval Walk", "Historic Village",
  ["https://www.tuscanyreview.com/uploads/5/2/6/1/52611407/232539_orig.jpg"],
  "https://www.tuscanyreview.com/monticchiello.html",
  "This tiny hilltop town offers walled views, artisan shops, and some of the best sunset walks in the region."
  );

// Portofino
  // ⭐ Kayaking & Snorkeling in Portofino Marine Park
  addActivity(44.3031, 9.2106, "Kayak & Snorkel Tour", "Water Adventure",
  ["https://www.portofinocoast.it/wp-content/uploads/2021/06/kayak-tour-portofino.jpg"],
  "https://www.portofinocoast.it/en/categories/kayak-tour-in-the-portofino-marine-area/",
  "Explore the stunning coastline by kayak, discovering hidden coves and snorkeling spots in the protected marine area.");

  // ⭐ Hiking to San Fruttuoso Abbey
  addActivity(44.3165, 9.1752, "Hike to San Fruttuoso", "Hiking Trail",
  ["https://wild-about-travel.com/wp-content/uploads/2017/03/San-Fruttuoso-Abbey.jpg"],
  "https://wild-about-travel.com/hiking-portofino/",
  "Trek through scenic trails to reach the secluded San Fruttuoso Abbey, nestled between forested hills and the sea.");

  // ⭐ Boat Tour to Camogli and San Fruttuoso
  addActivity(44.3060, 9.2095, "Boat Tour: Camogli & San Fruttuoso", "Boat Excursion",
  ["https://portofinotourism.com/wp-content/uploads/2017/07/portofino-boat-tour.jpg"],
  "https://portofinotourism.com/portofino-tours/",
  "Enjoy a relaxing boat tour along the coast, visiting the charming village of Camogli and the historic San Fruttuoso Abbey.");

  // ⭐ Visit Castello Brown
  addActivity(44.3030, 9.2100, "Castello Brown", "Historical Site",
  ["https://upload.wikimedia.org/wikipedia/commons/3/3f/Castello_Brown_Portofino.jpg"],
  "https://en.wikipedia.org/wiki/Castello_Brown",
  "Explore this historic castle offering panoramic views of Portofino and the Ligurian Sea.");

  // ⭐ Relax at Bagni Fiore Beach Club
  addActivity(44.3080, 9.2110, "Bagni Fiore Beach Club", "Luxury Beach",
  ["https://lillyred.it/wp-content/uploads/2021/07/bagni-fiore-portofino.jpg"],
  "https://lillyred.it/favorite-things-to-do-in-portofino/",
  "Unwind at this exclusive beach club, known for its crystal-clear waters and chic ambiance.");

  // ⭐ Explore Portofino's Piazzetta
  addActivity(44.3039, 9.2078, "Portofino Piazzetta", "Cultural Spot",
  ["https://www.visititaly.eu/uploads/2021/07/portofino-piazzetta.jpg"],
  "https://www.visititaly.eu/places-and-tours/what-to-do-in-portofino",
  "Stroll through the heart of Portofino, surrounded by colorful buildings, boutiques, and cafes.");

  // ⭐ Visit the Portofino Lighthouse
  addActivity(44.2986, 9.2183, "Portofino Lighthouse", "Scenic Viewpoint",
  ["https://www.thedailyadventuresofme.com/wp-content/uploads/2021/06/portofino-lighthouse.jpg"],
  "https://thedailyadventuresofme.com/home/things-to-do-in-portofino",
  "Walk to the lighthouse for breathtaking views of the coastline and the open sea.");

  // ⭐ Discover the Museo del Parco
  addActivity(44.3032, 9.2103, "Museo del Parco", "Art Museum",
  ["https://portofinotourism.com/wp-content/uploads/2017/07/museo-del-parco.jpg"],
  "https://portofinotourism.com/what-to-do-in-portofino/",
  "Visit this open-air museum featuring contemporary sculptures set against the backdrop of the sea.");

  // ⭐ Take a Cooking Class in Portofino
  addActivity(44.3038, 9.2104, "Italian Cooking Class", "Culinary Experience",
  ["https://www.viator.com/images/portofino-cooking-class.jpg"],
  "https://www.viator.com/Portofino/d4232",
  "Learn to prepare traditional Ligurian dishes in a hands-on cooking class with local chefs.");

  // ⭐ Camogli Lighthouse Aperitivo
  addActivity(44.3514, 9.1515, "Sunset Aperitivo at Camogli Lighthouse", "Scenic Walk",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0f/14/94/68/suggestivo-tramonto.jpg"],
  "https://www.liguria.info/guide/camogli-liguria/",
  "Stroll to Camogli’s lighthouse and enjoy drinks by the sea with a front-row seat to the sunset glow."
  );

  // ⭐ San Fruttuoso by Boat (from Camogli or Santa)
  addActivity(44.3060, 9.1939, "Boat Trip to San Fruttuoso", "Cultural + Swim Spot",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/San_Fruttuoso_Abbey.jpg/800px-San_Fruttuoso_Abbey.jpg"],
  "https://www.fondoambiente.it/luoghi/abbazia-di-san-fruttuoso",
  "Visit a hidden abbey accessible only by boat or trail — crystal-clear water, historic stonework, and a beach cove."
  );

  // ⭐ Camogli Snorkeling Adventure
  addActivity(44.3473, 9.1495, "Snorkeling in Camogli", "Water Adventure",
  ["https://www.portofinodivers.com/images/gallery/snorkeling_portofino_02.jpg"],
  "https://www.portofinodivers.com/en/snorkeling-trips/",
  "Explore rocky reefs and sea life near Camogli’s coast with guided snorkeling — great for beginners."
  );

  // ⭐ Villa Durazzo Gardens (Santa Margherita)
  addActivity(44.3347, 9.2089, "Villa Durazzo Garden Walk", "Cultural Spot",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Villa_Durazzo_Santa_Margherita.jpg/800px-Villa_Durazzo_Santa_Margherita.jpg"],
  "https://villadurazzo.it/",
  "Baroque villa above Santa Margherita with panoramic gardens, peacocks, and frescoed salons."
  );

  // ⭐ Rapallo Cable Car to Sanctuary
  addActivity(44.3514, 9.2181, "Cable Car to Montallegro", "Scenic Ride",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0d/92/11/e9/funivia-rapallo-montallegro.jpg"],
  "https://www.funiviarapallo.it/",
  "Ride from Rapallo to Montallegro’s hilltop sanctuary — sweeping sea views, forest paths, and old-world charm."
  );

  // ⭐ Zoagli E-Bike Olive Grove Tour
  addActivity(44.3490, 9.3072, "E-Bike Ride in Zoagli Hills", "Cycling Adventure",
  ["https://www.rivierabike.com/wp-content/uploads/2022/04/olive-ride.jpg"],
  "https://www.rivierabike.com/",
  "Ride through olive groves, cliff roads, and quiet villages — a local-led e-bike adventure with tasting stops."
  );

  // ⭐ Santa Margherita Cooking Class & Market
  addActivity(44.3337, 9.2111, "Ligurian Cooking Experience", "Culinary Workshop",
  ["https://cdn.getyourguide.com/img/tour/5b0e89decdbea.jpeg/98.jpg"],
  "https://www.getyourguide.com/liguria-l872/ligurian-market-tour-cooking-class-in-santa-margherita-t213740/",
  "Shop for ingredients at the local market and learn to prepare traditional Ligurian dishes in a hands-on class."
  );

  // ⭐ SUP Rental in Santa Margherita
  addActivity(44.3302, 9.2115, "SUP from Santa Beach", "Water Sport",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Stand_up_paddle_board.jpg/640px-Stand_up_paddle_board.jpg"],
  "https://www.portofinoisland.com/things-to-do/watersports-rentals",
  "Paddle along Santa’s coast by stand-up board — visit hidden coves and get unique views of pastel towns."
  );

  // ⭐ Monte di Portofino Trek (Ruta–San Rocco–Camogli)
  addActivity(44.3603, 9.1774, "Ruta to Camogli Trek", "Nature Trail",
  ["https://media-cdn.tripadvisor.com/media/photo-s/10/4e/6e/0e/sentiero-ruta-camogli.jpg"],
  "https://www.parcoportofino.it/",
  "Forested clifftop trail from Ruta to San Rocco and down to Camogli. Rustic churches and sea panoramas."
  );

  // ⭐ Baia del Silenzio, Sestri Levante (Beach + Boat Rental)
  addActivity(44.2703, 9.3944, "Baia del Silenzio Beach & Boat", "Seaside Relaxation",
  ["https://media.timeout.com/images/105797681/image.jpg"],
  "https://www.visitsestrilevante.it/en/",
  "Famous for calm turquoise waters and soft sand. Great for swimming, sunbathing, or small boat rentals."
  );

// Florence
  // ⭐ Uffizi Gallery – Renaissance Masterpieces
  addActivity(43.7687, 11.2550, "Uffizi Gallery", "Art Museum",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Uffizi_Gallery%2C_Florence.jpg/800px-Uffizi_Gallery%2C_Florence.jpg"],
  "https://www.uffizi.it/en",
  "Home to Botticelli's 'Birth of Venus' and other Renaissance masterpieces. Booking ahead is essential to avoid long lines."
  );

  // ⭐ Galleria dell'Accademia – Michelangelo's David
  addActivity(43.7760, 11.2583, "Galleria dell'Accademia", "Art Museum",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Michelangelo%27s_David_-_Galleria_dell%27Accademia.jpg/800px-Michelangelo%27s_David_-_Galleria_dell%27Accademia.jpg"],
  "https://www.galleriaaccademiafirenze.it/en/",
  "See Michelangelo’s iconic 'David' sculpture up close, along with other Renaissance artworks."
  );

  // ⭐ Florence Cathedral (Duomo) & Brunelleschi's Dome
  addActivity(43.7731, 11.2560, "Florence Cathedral (Duomo)", "Historical Landmark",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Florence_Duomo.jpg/800px-Florence_Duomo.jpg"],
  "https://duomo.firenze.it/en/home",
  "Climb to the top of Brunelleschi's Dome for panoramic views of Florence. The cathedral's architecture is a masterpiece in itself."
  );

  // ⭐ Boboli Gardens – Renaissance Landscape
  addActivity(43.7631, 11.2486, "Boboli Gardens", "Garden",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Boboli_Gardens.jpg/800px-Boboli_Gardens.jpg"],
  "https://www.uffizi.it/en/boboli-garden",
  "Explore the expansive gardens behind Pitti Palace, featuring sculptures, fountains, and grottoes."
  );

  // ⭐ Ponte Vecchio – Historic Bridge
  addActivity(43.7679, 11.2531, "Ponte Vecchio", "Historic Site",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ponte_Vecchio_Florence.jpg/800px-Ponte_Vecchio_Florence.jpg"],
  "https://en.wikipedia.org/wiki/Ponte_Vecchio",
  "Florence's oldest bridge, lined with jewelry shops and offering picturesque views over the Arno River."
  );

  // ⭐ Piazzale Michelangelo – City Panorama
  addActivity(43.7634, 11.2658, "Piazzale Michelangelo", "Scenic Viewpoint",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Piazzale_Michelangelo_View.jpg/800px-Piazzale_Michelangelo_View.jpg"],
  "https://en.wikipedia.org/wiki/Piazzale_Michelangelo",
  "Offers one of the best panoramic views of Florence, especially breathtaking at sunset."
  );

  // ⭐ Mercato Centrale – Food Market
  addActivity(43.7769, 11.2546, "Mercato Centrale", "Food Market",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mercato_Centrale_Florence.jpg/800px-Mercato_Centrale_Florence.jpg"],
  "https://www.mercatocentrale.com/florence/",
  "A bustling market offering a variety of local foods, from fresh produce to traditional Tuscan dishes."
  );

  // ⭐ Basilica of Santa Croce – Historic Church
  addActivity(43.7680, 11.2625, "Basilica of Santa Croce", "Church",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Santa_Croce_Florence.jpg/800px-Santa_Croce_Florence.jpg"],
  "https://en.wikipedia.org/wiki/Basilica_of_Santa_Croce,_Florence",
  "Final resting place of notable Italians like Michelangelo and Galileo. The church is adorned with beautiful frescoes."
  );

  // ⭐ Museo Galileo – Science Museum
  addActivity(43.7674, 11.2559, "Museo Galileo", "Science Museum",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Museo_Galileo_Florence.jpg/800px-Museo_Galileo_Florence.jpg"],
  "https://www.museogalileo.it/en/",
  "Exhibits on the history of science, featuring instruments from the Renaissance period, including Galileo's own tools."
  );

  // ⭐ Santa Maria Novella Pharmacy – Historic Apothecary
  addActivity(43.7745, 11.2486, "Santa Maria Novella Pharmacy", "Historic Shop",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Santa_Maria_Novella_Pharmacy.jpg/800px-Santa_Maria_Novella_Pharmacy.jpg"],
  "https://www.smnovella.com/",
  "One of the world's oldest pharmacies, offering herbal remedies and perfumes in a historic setting."
  );

  // ⭐ Vasari Corridor – Secret Passageway
  addActivity(43.7687, 11.2550, "Vasari Corridor", "Historic Passage",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Vasari_Corridor_Florence.jpg/800px-Vasari_Corridor_Florence.jpg"],
  "https://www.uffizi.it/en/vasari-corridor",
  "A hidden passageway connecting the Uffizi Gallery to the Pitti Palace, offering unique views over the city."
  );

  // ⭐ Leather School (Scuola del Cuoio) – Artisan Workshop
  addActivity(43.7681, 11.2628, "Scuola del Cuoio", "Artisan Workshop",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Scuola_del_Cuoio_Florence.jpg/800px-Scuola_del_Cuoio_Florence.jpg"],
  "https://www.scuoladelcuoio.com/",
  "Watch artisans craft leather goods using traditional techniques in this historic workshop."
  );

  // ⭐ Oltrarno District – Artisan Neighborhood
  addActivity(43.7669, 11.2486, "Oltrarno District", "Neighborhood",
  ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Oltrarno_Florence.jpg/800px-Oltrarno_Florence.jpg"],
  "https://en.wikipedia.org/wiki/Oltrarno",
  "Explore a vibrant neighborhood known for its artisan workshops, cafes, and less-touristy atmosphere."
  );

  // ⭐ Florence Street Art Walking Tour
  addActivity(43.7715, 11.2493, "Street Art Walking Tour", "Contemporary Culture",
  ["https://www.florencestreetart.com/img/works/clet-work.jpg"],
  "https://www.florencestreetart.com/",
  "Discover Florence’s modern edge with a self-guided or private tour of murals and street art by local legends like Clet."
  );  

// Tuscany
  // ⭐ Explore Saturnia’s Natural Thermal Cascades
  addActivity(42.6552, 11.5117, "Cascate del Mulino, Saturnia", "Natural Spa",
  ["https://www.earthtrekkers.com/wp-content/uploads/2022/05/Saturnia-Cascate-del-Mulino.jpg"],
  "https://www.earthtrekkers.com/saturnia-thermal-baths-italy/",
  "Free natural hot springs cascade over smooth rock terraces — one of Italy’s most photogenic spa spots."
  );

  // ⭐ Visit Tarot Garden by Niki de Saint Phalle (art + surrealism)
  addActivity(42.4380, 11.4120, "Tarot Garden Sculpture Park", "Artistic Experience",
  ["https://upload.wikimedia.org/wikipedia/commons/2/28/TarotGarden-Niki.jpg"],
  "https://www.giardinodeitarocchi.it/",
  "Explore this surreal sculpture garden built by French artist Niki de Saint Phalle — colorful, playful, and unforgettable."
  );

  // ⭐ Climb the Torre del Mangia in Siena
  addActivity(43.3183, 11.3308, "Climb Torre del Mangia", "Scenic Climb",
  ["https://upload.wikimedia.org/wikipedia/commons/4/4d/Siena_Torre_del_Mangia.jpg"],
  "https://www.sienawelcome.com/en/museums/torre-del-mangia",
  "Climb 400 steps to the top of Siena's iconic tower for sweeping medieval views over rooftops and piazzas."
  );

  // ⭐ Chianti Olive Oil Testing
  addActivity(43.5802, 11.3118, "Olive Oil Tasting at Pruneti", "Culinary Experience",
  ["https://www.pruneti.it/media/wysiwyg/visita-guidata-pruneti-experience.jpg"],
  "https://www.pruneti.it/en/visits-and-tastings/",
  "Visit the Pruneti estate in Greve in Chianti to sample award-winning extra virgin olive oils and explore their modern production techniques."
  );

  // ⭐ Arezzo First Sunday Antique Market
  addActivity(43.4630, 11.8820, "Arezzo Antiques Market", "Market",
  ["https://upload.wikimedia.org/wikipedia/commons/3/38/Antiques_Market_Arezzo.jpg"],
  "https://www.discovertuscany.com/arezzo/antique-fair.html",
  "Every first Sunday of the month, over 500 vendors fill Arezzo’s Piazza Grande with Tuscany’s largest antiques market."
  );
  

// Example: Add must-dos
  // ❤️ Hot Air Balloon Ride over Val d’Orcia
  addMustDo(43.0534, 11.6442, "Hot Air Balloon Tuscany", "Bucket List Experience",
  ["https://cdn.getyourguide.com/img/tour/62d8e7b7a32d1.jpeg/98.jpg"],
  "https://ballooningintuscany.com/",
  "Soar over golden fields and medieval towns at sunrise with a hot air balloon ride launched near San Quirico or Montisi."
  );

  // ❤️ Sunset Cruise along the Portofino Coast
  addMustDo(44.3031, 9.2106, "Sunset Boat Tour", "Romantic Experience",
  ["https://www.portofinocoast.it/wp-content/uploads/2021/06/sunset-cruise.jpg"],
  "https://www.portofinocoast.it/en/categories/sunset-cruise-along-the-portofino-coast/",
  "Enjoy a romantic sunset cruise along the Portofino coastline, complete with aperitifs and breathtaking views of the Mediterranean."
  );

  // ❤️ Cooking Class in Camogli
  addMustDo(44.3470, 9.1550, "Ligurian Cooking Class", "Culinary Experience",
  ["https://www.portofinocoast.it/wp-content/uploads/2021/06/cooking-class.jpg"],
  "https://www.portofinocoast.it/en/categories/ligurian-cooking-class-in-camogli/",
  "Learn to prepare traditional Ligurian dishes in a hands-on cooking class set in the charming village of Camogli."
  );

  // ❤️ Florence: Ferrari Test Drive with Private Instructor
  addMustDo(43.7696, 11.2558, "Ferrari Test Drive", "Luxury Experience",
  ["https://www.getyourguide.com/cdn-cgi/image/width=800,height=600,quality=75,format=auto/https://cdn.getyourguide.com/img/tour/5d1a3c1e9b3a2.jpeg/98.jpg"],
  "https://www.getyourguide.com/florence-l32/ferrari-test-driver-with-a-private-instructor-t123456/",
  "Experience the thrill of driving a Ferrari through the Tuscan countryside with a professional instructor."
  );

  // ❤️ Florence: Ponte Vecchio Rafting Cruise
  addMustDo(43.7680, 11.2531, "Ponte Vecchio Rafting Cruise", "Adventure",
  ["https://www.getyourguide.com/cdn-cgi/image/width=800,height=600,quality=75,format=auto/https://cdn.getyourguide.com/img/tour/5d1a3c1e9b3a2.jpeg/98.jpg"],
  "https://www.getyourguide.com/florence-l32/pontevecchio-rafting-cruise-t123457/",
  "Discover Florence's center on a rafting cruise down the Arno River, passing beneath the iconic Ponte Vecchio."
  );

  // ❤️ Truffle Hunting in San Miniato
  addMustDo(43.6840, 10.8510, "Truffle Hunting in San Miniato", "Unique Experience",
    ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Truffle_hunting.jpg/800px-Truffle_hunting.jpg"],
    "https://en.wikipedia.org/wiki/San_Miniato",
    "Join a local guide and trained dogs to hunt for prized white truffles in the forests of San Miniato."
  );

  // ❤️ Val d'Orcia Vintage Steam Train
  addMustDo(43.2307, 11.4939, "Val d'Orcia Steam Train", "Bucket List Ride",
  ["https://www.turismo.intoscana.it/site/wp-content/uploads/2021/01/treno-natura-territorio.jpg"],
  "https://www.trenonatura.terresiena.it/",
  "Ride an old-fashioned steam train through the Val d'Orcia hills — from Asciano to Monte Antico — with optional food & wine stops along the way."
  );

// 🍕 Experience Cafés Around Val d'Orcia
  // Torrefazione Fiorella – San Quirico
  addFood(43.0586, 11.6040, "Torrefazione Fiorella", "Artisan Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/17/2b/85/07/torrefazione-fiorella.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g668217-d23887280-Reviews-Torrefazione_Fiorella-San_Quirico_d_Orcia_Tuscany.html",
  "Beloved local roaster with rich espresso blends and friendly baristas in the village center of San Quirico."
  );
  
  // Caffè Poliziano – Montepulciano
  addFood(43.0977, 11.7865, "Caffè Poliziano", "Historic View Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/1a/c4/4e/4f/the-cafe.jpg"],
  "https://www.caffepoliziano.it/",
  "Elegant 19th-century café with original decor and terrace views across the valley below Montepulciano’s ridge."
  );
  
  // Bar Il Giardino – Pienza
  addFood(43.0787, 11.6778, "Bar Il Giardino", "Garden Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/12/ba/e4/3d/bar-il-giardino.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g644280-d1898758-Reviews-Bar_Il_Giardino-Pienza_Tuscany.html",
  "Quiet outdoor seating with garden charm—perfect for a light lunch, coffee, or afternoon spritz surrounded by blooms."
  );
  
  // Caffè La Posta – Montalcino
  addFood(43.0556, 11.4897, "Caffè La Posta", "Wine & Coffee Bar",
  ["https://media-cdn.tripadvisor.com/media/photo-s/10/84/f1/d5/caffe-la-posta.jpg"],
  "https://www.facebook.com/caffelapostamontalcino/",
  "Stop in Montalcino’s central piazza for a Brunello tasting or classic espresso in this low-key, wine-forward bar."
  );
  
  // Bar Il Loggiato – Bagno Vignoni
  addFood(43.0275, 11.6226, "Bar Il Loggiato", "Thermal View Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0e/d1/cc/91/bar-il-loggiato.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g668217-d2192955-Reviews-Bar_Il_Loggiato-San_Quirico_d_Orcia_Tuscany.html",
  "Overlooks the iconic steamy thermal pool of Bagno Vignoni — tranquil and surreal, best enjoyed with a glass of wine."
  );
  
// ☕ Florence City: Experience Cafés

  // Ditta Artigianale Oltrarno
  addFood(43.7684, 11.2487, "Ditta Artigianale Oltrarno", "Specialty Coffee Bar",
  ["https://media-cdn.tripadvisor.com/media/photo-s/18/2d/3d/7a/ditta-artigianale.jpg"],
  "https://www.dittaartigianale.it/",
  "A modern espresso haven with sleek interiors, house-roasted beans, and a true third-wave coffee vibe."
  );
  
  // Caffè Gilli (1733)
  addFood(43.7725, 11.2537, "Caffè Gilli", "Historic Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0d/45/83/c1/caffe-gilli.jpg"],
  "https://www.gilli.it/",
  "Florence's oldest café in Piazza della Repubblica, known for marble counters, elegant pastries, and people-watching."
  );
  
  // Melaleuca Bakery + Bistro
  addFood(43.7688, 11.2622, "Melaleuca", "Brunch Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/17/4a/15/47/melaleuca.jpg"],
  "https://www.melaleucafirenze.com/",
  "Bright, Aussie-inspired café by the Arno with fluffy pancakes, avocado toast, and smooth flat whites."
  );
  
  // Caffè Rivoire
  addFood(43.7682, 11.2530, "Rivoire", "Luxury Chocolate Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/1b/f3/e4/d2/piazza-della-signoria.jpg"],
  "https://www.rivoire.it/",
  "Refined hot chocolate and espresso, served in Florence’s political heart—perfect after Uffizi or Palazzo Vecchio."
  );
  
  // Le Vespe Cafè
  addFood(43.7686, 11.2593, "Le Vespe Café", "Boho Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0f/4c/85/0d/inside-le-vespe-cafe.jpg"],
  "https://www.instagram.com/levespecafe/",
  "Canadian-owned café tucked in a quiet street offering chill vibes, homemade granola, and quirky charm."
  );


// ☕ Coastal Cafés: Portofino, Camogli, Santa Margherita

  // Gelateria Gepi – Portofino Marina
  addFood(44.3037, 9.2099, "Gelateria Gepi", "Seafront Gelato",
  ["https://media-cdn.tripadvisor.com/media/photo-s/1a/43/13/9e/gelateria-gepi.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g187825-d2099139-Reviews-Gelateria_Gepi-Portofino_Italian_Riviera.html",
  "Classic Italian gelato in the heart of Portofino—grab a cone and watch the boats bob in the harbor."
  );
  
  // Caffè del Porto – Santa Margherita
  addFood(44.3329, 9.2112, "Caffè del Porto", "Harbor Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/0f/5a/14/33/20170516-110014-largejpg.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g187827-d2313955-Reviews-Caffe_del_Porto-Santa_Margherita_Ligure.html",
  "Chic café right on the marina—great for a coffee or aperitivo with yachts in full view."
  );
  
  // Revello Pasticceria – Camogli
  addFood(44.3474, 9.1552, "Revello Pasticceria", "Classic Bakery Café",
  ["https://media-cdn.tripadvisor.com/media/photo-s/13/e2/3d/38/dolci.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g227888-d1174329-Reviews-Revello_Pasticceria-Camogli_Italian_Riviera.html",
  "Historic bakery offering focaccia, pastries, and espresso just off the seaside promenade."
  );
  
  // Caffè Pino – Santa Margherita Old Town
  addFood(44.3315, 9.2109, "Caffè Pino", "Local Favorite",
  ["https://media-cdn.tripadvisor.com/media/photo-s/12/f6/0a/46/caffe-pino.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g187827-d2348970-Reviews-Caffe_Pino-Santa_Margherita_Ligure.html",
  "Laid-back spot for locals with fair prices, great cappuccino, and flaky cornetti in the morning."
  );
  
  // Caffè delle Rose – Sestri Levante
  addFood(44.2726, 9.3961, "Caffè delle Rose", "Beachside Lounge",
  ["https://media-cdn.tripadvisor.com/media/photo-s/1c/57/f3/e7/bar.jpg"],
  "https://www.tripadvisor.com/Restaurant_Review-g194917-d2356351-Reviews-Caffe_delle_Rose-Sestri_Levante_Italian_Riviera.html",
  "Located on Baia del Silenzio with outdoor terrace seating—perfect for an espresso by the waves."
  );
  
  