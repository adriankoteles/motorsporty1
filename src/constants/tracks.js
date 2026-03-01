/* src/constants/tracks.js */
export const ALL_TRACKS = [
  {
    id: 1,
    name: "E-MOTION PARK OSTRAVA",
    city: "OSTRAVA",
    coords: [49.8005732, 18.2248296],
    img: 'bg_emotion.webp',
    coverImg: 'trat_1_cover.webp',
    description: "Motopark Ostrava je multifunkční motoristický areál nacházející se v Ostravě-Třebovice... Jedná se o venkovní (outdoor) okruh s asfaltovým povrchem, který je primárně využíván pro pronájem motokár, jízdy veřejnosti na vlastních strojích (minibike, motocykly) a kurzy bezpečné jízdy.",
    karts: [
      {
        model: "SODI RSX2",
        desc: "Motokára Sodi RSX2 je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách. Volant připomíná ten z formule, takže se v ní cítíš jako opravdový závodník.",
        power: "12 HP",
        speed: "60 km/h",
        weight: "186 kg",
        engine: "-",
        img: "trat_1_kart_sodi_rsx2.webp",
        features: ["Racing seat with 5-point harness", "Hydraulic disc brakes", "Digital lap timer display", "Adjustable pedals"]
      },
      {
        model: "SODI X2DRIVE",
        desc: "Motokára Sodi RSX2 Junior je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách.",
        power: "- HP",
        speed: "60 km/h",
        weight: "206 kg",
        engine: "-",
        img: "trat_1_kart_sodi_x2drive.webp",
        features: ["Racing seat with 5-point harness", "Hydraulic disc brakes", "Digital lap timer display", "Adjustable pedals"]
      }
    ],
    variants: [
      {
        id: "HLAVNÍ OKRUH",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "520m",
        turns: 12,
        map: "trat_1_map_hlavni_okruh.png",
        features: ["Asfaltový povrch", "Maximálně 18 motokár v jedné jízdě", "Digital lap timer display", "Adjustable pedals"]
      },
    ]
  },
  {
    id: 2,
    name: "MOTOPARK OSTRAVA",
    city: "OSTRAVA",
    coords: [49.82522589411177, 18.216954740621414],
    img: 'bg_motopark.webp',
    coverImg: 'trat_2_cover.webp',
    description: "Motopark Ostrava je multifunkční motoristický areál nacházející se v Ostravě-Třebovice... Jedná se o venkovní (outdoor) okruh s asfaltovým povrchem, který je primárně využíván pro pronájem motokár, jízdy veřejnosti na vlastních strojích (minibike, motocykly) a kurzy bezpečné jízdy.",
    karts: [
      {
        model: "SODI RT8",
        desc: "Motokára Sodi RSX2 je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách. Volant připomíná ten z formule, takže se v ní cítíš jako opravdový závodník.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "155 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Racing seat with 5-point harness", "Hydraulic disc brakes", "Digital lap timer display", "Adjustable pedals"]
      },
      {
        model: "SODI RT8 - pro 2 osoby",
        desc: "Motokára Sodi RSX2 Junior je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "171 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Racing seat with 5-point harness", "Hydraulic disc brakes", "Digital lap timer display", "Adjustable pedals"]
      }
    ],
    variants: [
      {
        id: "SHORT",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "510m",
        turns: 7,
        map: "trat_2_map_short.png",
        features: ["Asfaltový povrch", "Maximálně 18 motokár v jedné jízdě", "Digital lap timer display", "Adjustable pedals"]
      },
      {
        id: "LONG",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "620m",
        turns: 9,
        map: "trat_2_map_long.png",
        features: ["Asfaltový povrch", "Maximálně 18 motokár v jedné jízdě", "Digital lap timer display", "Adjustable pedals"]
      },
    ]
  },
  {
    id: 4,
    name: "STEEL RING",
    city: "TŘINEC",
    coords: [49.691454618987045, 18.66848821476503],
    img: 'bg_steelring.webp',
    coverImg: 'trat_4_cover.webp',
    description: "Steel Ring je multifunkční motoristický areál nacházející se v Třinci... Jedná se o venkovní (outdoor) okruh s asfaltovým povrchem, který je primárně využíván pro pronájem motokár, jízdy veřejnosti na vlastních strojích (minibike, motocykly) a kurzy bezpečné jízdy.",
    karts: [
      {
        model: "CENTURION SENIOR",
        desc: "Motokára Sodi RSX2 je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách. Volant připomíná ten z formule, takže se v ní cítíš jako opravdový závodník.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "155 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Racing seat with 5-point harness", "Hydraulic disc brakes", "Digital lap timer display", "Adjustable pedals"]
      },
    ],
    variants: [
      {
        id: "Fast",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "1150m",
        turns: 1,
        map: "trat_4_map_fast.png",
        features: ["Asfaltový povrch", "Maximálně 18 motokár v jedné jízdě", "Digital lap timer display", "Adjustable pedals"]
      },
      {
        id: "Technical",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "1234m",
        turns: 18,
        map: "trat_4_map_technical.png",
        features: ["Asfaltový povrch", "Maximálně 18 motokár v jedné jízdě", "Digital lap timer display", "Adjustable pedals"]
      },
    ]
  },
  {
    id: 3,
    name: "MOJE MOTOKÁRY OSTRAVA",
    city: "OSTRAVA",
    coords: [49.8300, 18.2300],
    img: 'bg_moje_motokary.webp',
    description: "Oblíbená ostravská trať s technickými pasážemi.",
    karts: [{ model: "SODI RT8", hp: "9 HP", speed: "70 km/h", weight: "170 kg", engine: "Benzin", features: ["Pohodlné sezení"] }],
    variants: [{ id: "ZÁKLADNÍ", length: "400m", turns: 8, map: "map_moje.svg" }]
  },
  // Ostatní tratě (Template pro doplnění, aby mapa nepadala)
  { id: 5, name: "LAMBORGHINI KART ARÉNA", city: "OLOMOUC", coords: [49.5938, 17.2509], img: 'bg_lambo.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 6, name: "E-KARTS ZLÍN", city: "ZLÍN", coords: [49.2265, 17.6651], img: 'bg_zlin.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 7, name: "KART-CENTRUM RADOTÍN", city: "PRAHA", coords: [49.9833, 14.3667], img: 'bg_radotin.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 8, name: "MOTOKÁRY MODŘICE", city: "MODŘICE", coords: [49.1275, 16.6120], img: 'bg_modrice.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 9, name: "MOTOKÁRY HODONÍN", city: "HODONÍN", coords: [48.8489, 17.1303], img: 'bg_hodonin.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 10, name: "FUN ARENA CHEB", city: "CHEB", coords: [50.0797, 12.3701], img: 'bg_cheb.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 11, name: "MOTOKÁRY PÍSEK", city: "PÍSEK", coords: [49.3088, 14.1475], img: 'bg_pisek.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 12, name: "AUTODROM SOSNOVÁ", city: "ČESKÁ LÍPA", coords: [50.6617, 14.5294], img: 'bg_sosnova.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 13, name: "AUTODROM VYSOKÉ MÝTO", city: "VYSOKÉ MÝTO", coords: [49.9351, 16.1558], img: 'bg_myto.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
  { id: 14, name: "KART ARÉNA PARDUBICE", city: "PARDUBICE", coords: [50.0343, 15.7743], img: 'bg_pardubice.webp', description: "...", karts: [], variants: [{ id: "STANDARD", length: "---", turns: 0 }] },
];