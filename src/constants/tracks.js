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
        desc: "Kompletní konfigurace trati využívající všechny sekce. Nabízí rychlé rovinky, technické šikany a změny převýšení. Ideální pro soutěžní závody a šampionáty.",
        length: "520m",
        turns: 12,
        map: "trat_1_map_hlavni_okruh.png",
        features: ["Hlazený beton"]
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
    description: "Motopark Ostrava je multifunkční motoristický areál nacházející se v Ostravě-Třebovice. Jedná se o venkovní (outdoor) okruh s asfaltovým povrchem, který je primárně využíván pro pronájem motokár, jízdy veřejnosti na vlastních strojích (minibike, motocykly) a kurzy bezpečné jízdy.",
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
        desc: "Verze RT8 upravená pro dva jezdce přináší výkon a dravost legendárního modelu RT8 do světa tandemových jízd. Je to ideální volba, pokud chceš někomu ukázat skutečnou rychlost na limitu nebo sdílet radost z jízdy. I přes svou velikost si zachovává skvělou ovladatelnost a dravý nástup výkonu.",
        power: "8.4 HP",
        speed: "60 km/h",
        weight: "171 kg",
        engine: "Honda GX270",
        img: "trat_2_kart_sodi_rt8_tandem.webp",
        features: ["Adjustable pedals"]
      }
    ],
    variants: [
      {
        id: "SHORT",
        desc: "Kratší, rychlá konfigurace trati zaměřená na plynulost a správné časování brzdění. Skvělá pro rychlé sprinty.",
        length: "510m",
        turns: 7,
        map: "trat_2_map_short.png",
        features: ["Asfaltový povrch"]
      },
      {
        id: "LONG",
        desc: "Plná délka trati kombinující technické pasáže v zadní části s dlouhou cílovou rovinkou. Prověří tvoji fyzickou kondici.",
        length: "620m",
        turns: 9,
        map: "trat_2_map_long.png",
        features: ["Asfaltový povrch"]
      },
    ]
  },
  {
    id: 4, // Opraveno z 4 na 3 pro zachování sekvence
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
        img: "trat_4_kart_crg_centurion.webp",
        features: ["Adjustable pedals"]
      },
    ],
    variants: [
      {
        id: "Fast",
        desc: "Rychlá konfigurace Steel Ringu s důrazem na maximální rychlost v protáhlých zatáčkách a perfektní výjezdy na rovinky.",
        length: "1150m",
        turns: 14,
        map: "trat_4_map_fast.png",
        features: ["Asfaltový povrch", "Výrazné převýšení"]
      },
      {
        id: "Technical",
        desc: "Extrémně náročná konfigurace s 18 zatáčkami. Tady nerozhoduje jen výkon, ale čistá stopa a precizní práce s přenosem váhy.",
        length: "1234m",
        turns: 18,
        map: "trat_4_map_technical.png",
        features: ["Asfaltový povrch", "Výrazné převýšení"]
      },
    ]
  },
  {
    id: 3,
    name: "MOTOKÁRY MODŘICE",
    city: "MODŘICE",
    coords: [49.12242369965655, 16.60468734893678],
    img: 'bg_modrice.webp',
    coverImg: 'trat_4_cover.webp',
    description: "Krytá motokárová hala kousek od Brna, která nabízí technickou a dynamickou trať na speciálním povrchu. Je ideálním místem pro pilování ideální stopy v zimních měsících a pořádání firemních vytrvalostních závodů.",
    karts: [],
    variants: []
  },
  {
    id: 5,
    name: "MOTOKÁRY HODONÍN",
    city: "HODONÍN",
    coords: [48.88730493233244, 17.143973099045443],
    img: 'bg_hodonin.webp',
    coverImg: 'trat_5_cover.webp',
    description: "Oblíbená jihomoravská outdoorová trať s kvalitním asfaltem, která prověří jezdce svou technickou náročností. Trať nabízí skvělou kombinaci ostrých vracáků a rychlých pasáží, kde rozhoduje každý detail a plynulost.",
    karts: [],
    variants: []
  },
  {
    id: 6,
    name: "MOTOKÁRY OLOMOUC - LAMBORGHINI KART ARÉNA",
    city: "OLOMOUC",
    coords: [49.59754787451436, 17.257380074413593],
    img: 'bg_olomouc.webp',
    coverImg: 'trat_6_cover.webp',
    description: "Prémiová indoorová aréna inspirovaná italským závodním duchem. Nabízí moderní zázemí, flotilu rychlých motokár a víceúrovňovou nebo technicky velmi zajímavě řešenou trať s vysokou přilnavostí povrchu.",
    karts: [],
    variants: []
  },
  {
    id: 7,
    name: "CMKARTING",
    city: "PRAHA - ZLIČÍN",
    coords: [50.05891858177532, 14.294566370957286],
    img: 'bg_cmkarting.webp',
    coverImg: 'trat_7_cover.webp',
    description: "Jedna z nejmodernějších krytých arén v Praze s flotilou špičkových elektrických motokár Sodi. Nabízí dokonale čisté prostředí bez emisí, skvělou ergonomii trati a digitální časomíru pro nekompromisní honbu za setinami sekundy.",
    karts: [],
    variants: []
  },
  {
    id: 8,
    name: "KART PLANET",
    city: "PRAHA",
    coords: [50.09971376153898, 14.513340023906606],
    img: 'bg_kartplanet.webp',
    coverImg: 'trat_8_cover.webp',
    description: "Venkovní motokárový areál v Praze, který klade důraz na čistou rychlost a širokou trať umožňující reálné předjížděcí manévry. Skvělé místo pro komunitní závody a racing na limitu pod širým nebem.",
    karts: [],
    variants: []
  },
  {
    id: 9,
    name: "KARTARÉNA CHEB",
    city: "CHEB",
    coords: [50.08637960116507, 12.448938512900463],
    img: 'bg_cheb.webp',
    coverImg: 'trat_9_cover.webp',
    description: "Závodní okruh mezinárodní úrovně, který patří k absolutní špičce v České republice. Svojí délkou, šířkou a profesionálním asfaltem poskytuje ultimátní zážitek jak pro profesionální závodní týmy, tak pro veřejnost v silných rental motokárách.",
    karts: [],
    variants: []
  },
  {
    id: 10,
    name: "E-KARTS ZLÍN",
    city: "ZLÍN",
    coords: [49.221134344323175, 17.6426467747727],
    img: 'bg_ezlin.webp',
    coverImg: 'trat_10_cover.webp',
    description: "Moderní e-kartingové centrum ve Zlíně přinášející okamžitý točivý moment elektrických motorů na technickou vnitřní trať. Žádný hluk, žádný zápach, jen čistá reakce na plyn a precizní mechanický grip.",
    karts: [],
    variants: []
  },
  {
    id: 11,
    name: "MOTOKÁRY LIBEREC",
    city: "LIBEREC",
    coords: [50.76490649026443, 15.056073437209928],
    img: 'bg_liberec.webp',
    coverImg: 'trat_11_cover.webp',
    description: "Severočeská indoorová trať situovaná v Liberci, která nabízí zajímavý profil s technickými pasážemi a vracečkami. Prověří schopnost jezdce správně přenášet váhu motokáry a držet ideální stopu.",
    karts: [],
    variants: []
  },
  {
    id: 12,
    name: "KARTCENTRUM RADOTÍN",
    city: "PRAHA - RADOTÍN",
    coords: [49.98924553952956, 14.375851266385805],
    img: 'bg_radotin.webp',
    coverImg: 'trat_12_cover.webp',
    description: "Legendární a obří motokárová hala v Radotíně, která se pyšní extrémní délkou vnitřního okruhu. Široká trať s asfaltovým povrchem uvnitř haly a silné benzínové motokáry z ní dělají kultovní záležitost pro všechny hardcore fanoušky motorsportu.",
    karts: [],
    variants: []
  },
  {
    id: 13,
    name: "Praga Silmet Arena",
    city: "PRAHA",
    coords: [50.11654966219496, 14.606907553536844],
    img: 'bg_praga.webp',
    coverImg: 'trat_13_cover.webp',
    description: "Špičkový pražský komplex spojený se jménem ikonické české značky Praga. Trať nabízí nekompromisní parametry, závodní vibe, prémiové zázemí a motokáry vyladěné pro maximální možný výkon a zážitek z jízdy.",
    karts: [],
    variants: []
  }
];
