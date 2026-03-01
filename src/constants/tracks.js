
/* src/constants/tracks.js */
export const ALL_TRACKS = [
  {
    id: 1,
    name: "E-MOTION PARK OSTRAVA",
    city: "OSTRAVA",
    coords: [49.8005732, 18.2248296],
    img: 'bg_emotion.webp',
    coverImg: 'trat_1_cover.webp',
    description: "E-motion Park Ostrava je nejmodernější krytá (indoor) motokárová hala v regionu, situovaná v areálu nákupního centra Avion Shopping Park. Jedná se o celoroční okruh se speciálně hlazeným betonovým povrchem, který vyžaduje precizní techniku jízdy a cit pro grip. Hala je unikátní nasazením špičkových elektrických motokár, které nabízejí okamžitý točivý moment bez emisí a hluku. Areál je primárně využíván pro širokou veřejnost, firemní akce a dětské akademie, přičemž zázemí zahrnuje i profesionální závodní simulátory a moderní sportbar s výhledem na trať.",
    karts: [
      {
        model: "SODI RSX2",
        desc: "Motokára Sodi RSX2 je elektrická motokára, která nabízí tichou, ale svižnou jízdu. Díky silnému motoru zvládne rychlé zrychlení a má i speciální „Boost“, který ti dodá extra výkon na rovinkách. Volant připomíná ten z formule, takže se v ní cítíš jako opravdový závodník.",
        power: "12 HP",
        speed: "60 km/h",
        weight: "186 kg",
        engine: "-",
        img: "trat_1_kart_sodi_rsx2.webp",
        features: ["Adjustable pedals"]
      },
      {
        model: "SODI X2DRIVE",
        desc: "Sodi X2Drive je špičková dvoumístná motokára navržená pro sdílený adrenalin. Je vybavena unikátním systémem, kde jsou oba volanty propojeny, což z ní dělá ideální nástroj pro výuku ideální stopy s instruktorem nebo pro intenzivní zážitek se spolujezdcem. Nabízí skvělou stabilitu a výkon, který neztrácí ani při plném obsazení.",
        power: "- HP",
        speed: "60 km/h",
        weight: "206 kg",
        engine: "-",
        img: "trat_1_kart_sodi_x2drive.webp",
        features: []
      }
    ],
    variants: [
      {
        id: "HLAVNÍ OKRUH",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "520m",
        turns: 12,
        map: "trat_1_map_hlavni_okruh.png",
        features: []
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
        desc: "Sodi RT8 představuje světový standard v oblasti rental kartingu. Tahle mašina s agresivním designem a motorem Honda GX 270 je postavená pro maximální mechanický grip a přesné řízení. Díky nastavitelnému systému pedálů a sedačky si každý jezdec najde perfektní závodní pozici pro útok na traťový rekord.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "155 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Adjustable pedals"]
      },
      {
        model: "SODI RT8 - pro 2 osoby",
        desc: "Verze RT8 upravená pro dva jezdce přináší výkon a dravost legendárního modelu RT8 do světa tandemových jízd. Je to ideální volba, pokud chceš někomu ukázat skutečnou rychlost na limitu nebo sdílet radost z jízdy. I přes svou velikost si zachovává skvělou ovladatelnost a dravý nástup výkonu",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "171 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Adjustable pedals"]
      }
    ],
    variants: [
      {
        id: "SHORT",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "510m",
        turns: 7,
        map: "trat_2_map_short.png",
        features: ["Asfaltový povrch"]
      },
      {
        id: "LONG",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "620m",
        turns: 9,
        map: "trat_2_map_long.png",
        features: ["Asfaltový povrch"]
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
    description: "Steel Ring Třinec je multifunkční motoristický areál evropské úrovně, navržený pro profesionální sport i širokou veřejnost. Jedná se o venkovní (outdoor) okruh s vysoce kvalitním závodním asfaltem, který vyniká svou variabilitou a výrazným převýšením, což je v rámci českých drah unikát. Trať je homologována pro národní i mezinárodní závody motokár, ale slouží také pro jízdy veřejnosti, tréninky jezdců na vlastních strojích a kurzy bezpečné jízdy na přilehlém polygonu. Díky svému technickému profilu a rychlým pasážím patří mezi nejnáročnější a nejoblíbenější tratě v České republice.",
    karts: [
      {
        model: "CENTURION SENIOR",
        desc: "Centurion Senior od renomovaného výrobce CRG je synonymem pro robustnost a ryzí motokárový pocit. Tato motokára se zaměřuje na čistou mechanickou vazbu mezi jezdcem a asfaltem. Má odolný rám, který skvěle pohlcuje nerovnosti, a je vyhlášená svou čitelnou stopou, díky čemuž je oblíbenou volbou pro vytrvalostní závody i trénink techniky.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "155 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8.webp",
        features: ["Adjustable pedals"]
      },
    ],
    variants: [
      {
        id: "Fast",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "1150m",
        turns: "?",
        map: "trat_4_map_fast.png",
        features: ["Asfaltový povrch"]
      },
      {
        id: "Technical",
        desc: "The mplete track configuration utilizing every section. Features high-speed straights, technical chicanes, and elevation changes. Ideal for competitive races and championship events.",
        length: "1234m",
        turns: 18,
        map: "trat_4_map_technical.png",
        features: ["Asfaltový povrch"]
      },
    ]
  },
];