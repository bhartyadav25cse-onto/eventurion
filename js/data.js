// Eventurion - Complete Indian Historical Archive & Knowledge Base
// Comprehensive compilation of Indian history documented in archaeological papers,
// royal epigraphs, copper plates, numismatic records, and classical chronicles.

const HISTORICAL_DATA = {
  eras: [
    { id: "bronze_age", name: "Indus & Bronze Age", span: "3300 BCE – 1500 BCE", startYear: -3300, endYear: -1500 },
    { id: "vedic_mahajanapada", name: "Vedic & Mahajanapadas", span: "1500 BCE – 345 BCE", startYear: -1500, endYear: -345 },
    { id: "classical_antiquity", name: "Mauryan & Classical Antiquity", span: "345 BCE – 300 CE", startYear: -345, endYear: 300 },
    { id: "golden_age", name: "Gupta & Classical Golden Age", span: "300 CE – 650 CE", startYear: 300, endYear: 650 },
    { id: "medieval_dynasties", name: "Medieval Empires & Thalassocracies", span: "650 CE – 1206 CE", startYear: 650, endYear: 1206 },
    { id: "sultanates_vijayanagara", name: "Delhi Sultanate & Vijayanagara", span: "1206 CE – 1526 CE", startYear: 1206, endYear: 1526 },
    { id: "early_modern", name: "Mughal, Maratha & Rajput Apex", span: "1526 CE – 1818 CE", startYear: 1526, endYear: 1818 },
    { id: "freedom_struggle", name: "Sikh Empire & Freedom Movement", span: "1818 CE – 1947 CE", startYear: 1818, endYear: 1947 }
  ],

  civilizations: [
    {
      id: "indus_valley",
      name: "Indus Valley Civilization",
      nativeName: "सिन्धु-सरस्वती सभ्यता (Harappan)",
      period: "3300 BCE – 1300 BCE (Mature: 2600–1900 BCE)",
      startYear: -2600,
      endYear: -1900,
      eraId: "bronze_age",
      region: "Indus & Ghaggar-Hakra Basins",
      capital: "Harappa / Mohenjo-daro / Dholavira",
      area: "Approx. 1,500,000 km²",
      overview: "One of the world's earliest cradle urban civilizations, celebrated for advanced hydraulic engineering, grid-planned brick cities, standardized weights and measures, the world's earliest known tidal dockyard at Lothal, and international maritime trade with Mesopotamia (Meluhha).",
      image: "assets/dholavira_indus.jpg",
      imageCaption: "Archaeological AI Reconstruction: Dholavira Citadel & Prehistoric Tidal Dockyard (c. 2400 BCE)",
      featured: true,
      coords: { x: 380, y: 310 },
      territoryPath: "M 340 260 Q 410 240 430 300 Q 400 370 350 360 Q 320 310 340 260 Z",
      tag: "Civilization",
      rulers: [
        {
          name: "Priest-King & Civic Guild Elders",
          reign: "c. 2500 BCE",
          title: "Civic Magistrates & Mercantile Guilds",
          role: "Egalitarian Urban Administration",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Archaeological evidence reveals standardized municipal planning without monarchical palaces or standing armies.",
          achievements: ["Standardized burnt brick ratios (1:2:4)", "Subterranean covered drainage networks", "Standardized binary weight systems", "Lothal tidal drydock"]
        }
      ],
      majorEvents: [
        { id: "lothal-dockyard", title: "Construction of Lothal Tidal Basin", date: "c. 2400 BCE", significance: "World's earliest recorded tidal drydock connecting Indian Ocean maritime trade." }
      ],
      sources: [
        {
          title: "Cuneiform Tablets of Sargon of Akkad",
          date: "c. 2350 BCE",
          author: "Mesopotamian Royal Scribes",
          type: "Akkadian Clay Tablet Records",
          quote: "The ships from Meluhha [Indus], Magan, and Dilmun tied up at the quay of Akkad, bearing carnelian, lapis lazuli, gold, and fine timber.",
          repository: "British Museum / Louvre Collection"
        },
        {
          title: "ASI Dholavira Excavation Reports",
          date: "1990–2005 CE Excavations",
          author: "Dr. R.S. Bisht (Archaeological Survey of India)",
          type: "Archaeological Monograph",
          quote: "Dholavira showcases the most sophisticated rainwater harvesting system of the ancient world, featuring 16 massive reservoirs cut into rock.",
          repository: "Archaeological Survey of India Archives, New Delhi"
        }
      ]
    },
    {
      id: "vedic_period",
      name: "Vedic Era & 16 Mahajanapadas",
      nativeName: "वैदिक काल एवं षोडश महाजनपद",
      period: "1500 BCE – 345 BCE",
      startYear: -1500,
      endYear: -345,
      eraId: "vedic_mahajanapada",
      region: "Indo-Gangetic Plain",
      capital: "Rajagriha (Magadha), Varanasi (Kashi), Ayodhya (Kosala)",
      area: "Approx. 2,200,000 km²",
      overview: "The era of the composition of the four Vedas, Upanishads, and the emergence of the 16 Mahajanapadas (Great Republics and Kingdoms). Magadha, situated at the mineral-rich iron crossroads of the Ganges, rapidly rose to preeminence.",
      featured: false,
      coords: { x: 440, y: 340 },
      territoryPath: "M 380 300 Q 480 300 490 360 Q 430 380 370 350 Z",
      tag: "Civilization",
      rulers: [
        {
          name: "Bimbisara & Ajatashatru",
          reign: "544 – 461 BCE",
          title: "Haryanka Sovereigns of Magadha",
          role: "Architects of Magadhan Ascendancy",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Fortified Pataliputra, deployed Rathamusala and Mahashilakantaka military catapults, and patronized the Buddha and Mahavira.",
          achievements: ["Annexed Anga and Vaishali", "Constructed stone fortresses of Rajgir", "Paved the way for imperial unification"]
        }
      ],
      majorEvents: [
        { id: "battle-ten-kings", title: "Battle of the Ten Kings (Dasarajna)", date: "c. 1200 BCE", significance: "Rigvedic conflict on the Ravi River establishing King Sudas and the Bharata tribe." }
      ],
      sources: [
        {
          title: "The Rigveda Samhita",
          date: "c. 1500 – 1100 BCE",
          author: "Vedic Rishis (Vasistha, Vishvamitra)",
          type: "Oral Sacred Canon transcribed on Birch Bark",
          quote: "Truth is One, the wise speak of it in many ways (Ekam Sat Vipra Bahudha Vadanti).",
          repository: "Bhandarkar Oriental Research Institute, Pune"
        }
      ]
    },
    {
      id: "nanda",
      name: "Nanda Empire",
      nativeName: "नन्द साम्राज्य",
      period: "345 BCE – 322 BCE",
      startYear: -345,
      endYear: -322,
      eraId: "classical_antiquity",
      region: "Northern & Central India",
      capital: "Pataliputra",
      area: "Approx. 3,200,000 km²",
      overview: "Founded by Mahapadma Nanda ('Destroyer of all Kshatriyas'), who consolidated the northern subcontinent into India's first centralized territorial empire. Its formidable military of 200,000 infantry, 80,000 cavalry, and 6,000 war elephants deterred Alexander the Great's army from advancing across the Beas River.",
      featured: false,
      coords: { x: 450, y: 350 },
      territoryPath: "M 390 310 Q 480 300 510 350 Q 470 410 410 380 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Mahapadma Nanda",
          reign: "345 – 329 BCE",
          title: "Ekarat (Sole Sovereign)",
          role: "First Imperial Unifier of North India",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Subjugated Ikshvakus, Panchalas, Kasis, and Kalingas to amass legendary imperial treasuries at Pataliputra.",
          achievements: ["Unified northern Gangetic plains", "Formed the largest standing army of 4th century BCE"]
        }
      ],
      majorEvents: [
        { id: "alexander-retreat", title: "Macedonian Mutiny at the Hyphasis (Beas)", date: "326 BCE", significance: "Alexander's veteran troops refused to face the Nanda war elephant corps, triggering Greek retreat." }
      ],
      sources: [
        {
          title: "Bibliotheca Historica by Diodorus Siculus",
          date: "c. 1st Century BCE",
          author: "Diodorus Siculus (Greek Historian)",
          type: "Classical Historical Manuscript",
          quote: "The King of the Gangaridai and Prasii had an army of 20,000 horse, 200,000 foot, 2,000 four-horse chariots, and 4,000 elephants trained for war.",
          repository: "Vatican Apostolic Library"
        }
      ]
    },
    {
      id: "maurya",
      name: "Maurya Empire",
      nativeName: "मौर्य साम्राज्य",
      period: "322 BCE – 185 BCE",
      startYear: -322,
      endYear: -185,
      eraId: "classical_antiquity",
      region: "Pan-Indian Subcontinent",
      capital: "Pataliputra (Patna)",
      area: "Approx. 5,000,000 km² at peak",
      overview: "The Maurya Empire was an iron-age historical superpower founded by Chandragupta Maurya and Chanakya in 322 BCE, consolidating nearly the entire Indian subcontinent. Under Emperor Ashoka the Great, the empire witnessed unprecedented expansion followed by an ethical transformation towards Dhamma, monumental pillar edicts, hospital systems, and global Buddhist patronage.",
      image: "assets/sanchi_ashoka_maurya.jpg",
      imageCaption: "Archaeological AI Reconstruction: Sanchi Great Stupa, Ashokan Lion Capital & Celestial Cosmos (c. 250 BCE)",
      featured: true,
      coords: { x: 440, y: 380 },
      territoryPath: "M 360 260 Q 480 230 540 310 Q 510 440 450 510 Q 380 430 350 330 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Ashoka the Great",
          reign: "268 – 232 BCE",
          title: "Devanampiya Piyadassi",
          role: "Third Mauryan Emperor",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Renowned for renouncing armed conquest after the Kalinga War, carving ethical edicts into stone pillars across South Asia, and dispatching peace emissaries to Greece and Asia.",
          achievements: ["Dhamma edicts across 30+ sites", "Third Buddhist Council convened", "Free hospitals for humans and animals", "Royal highway tree-planting and wells"]
        },
        {
          name: "Chandragupta Maurya",
          reign: "322 – 298 BCE",
          title: "Founder of the Empire",
          role: "First Mauryan Emperor",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Guided by Chanakya, he overthrew the Nanda Dynasty and defeated Seleucus I Nicator to consolidate the subcontinent.",
          achievements: ["Treaty with Seleucid Empire gaining Arachosia & Gedrosia", "Unified Indus to Bengal", "Established imperial administrative bureaucracy"]
        },
        {
          name: "Bindusara",
          reign: "298 – 273 BCE",
          title: "Amitraghata (Slayer of Foes)",
          role: "Second Mauryan Emperor",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Extended Mauryan hegemony across the Deccan plateau and maintained close diplomatic relations with Hellenistic kings Antiochus I and Ptolemy II.",
          achievements: ["Subjugation of 16 Deccan kingdoms", "Greco-Syrian diplomatic exchanges"]
        }
      ],
      majorEvents: [
        { id: "kalinga-war", title: "Kalinga War", date: "c. 261 BCE", significance: "Turning point of Emperor Ashoka's reign leading to Buddhist adoption and state non-violence.", featured: true },
        { id: "third-council", title: "Third Buddhist Council", date: "c. 250 BCE", significance: "Convened at Pataliputra by Ashoka to codify the canon and dispatch global missionaries.", featured: false },
        { id: "seleucid-treaty", title: "Seleucid–Mauryan War & Treaty", date: "305 – 303 BCE", significance: "Chandragupta secured eastern Hellenistic satrapies in exchange for 500 war elephants.", featured: false }
      ],
      sources: [
        {
          title: "Indica by Megasthenes",
          date: "c. 300 BCE",
          author: "Megasthenes (Seleucid Ambassador to Pataliputra)",
          type: "Diplomatic Chronicle & Travelogue",
          quote: "The city of Pataliputra is eighty stadia in length and fifteen in breadth. It is surrounded with a wooden wall pierced with loopholes for discharging arrows and crowned with 570 towers...",
          repository: "Fragments preserved in Arrian, Diodorus Siculus, and Strabo"
        },
        {
          title: "Arthashastra by Kautilya",
          date: "c. 3rd Century BCE",
          author: "Chanakya (Kautilya)",
          type: "Treatise on Statecraft and Political Economy",
          quote: "In the happiness of his subjects lies the king's happiness; in their welfare his welfare. Whatever pleases himself he shall not consider as good, but whatever pleases his subjects...",
          repository: "Oriental Research Institute, Mysuru (Discovered 1905)"
        },
        {
          title: "Major Rock Edict XIII (Kalinga Inscription)",
          date: "c. 257 BCE",
          author: "Emperor Ashoka",
          type: "Royal Epigraph (Brahmi Script)",
          quote: "Beloved-of-the-Gods, King Priyadarsi, conquered the Kalingas eight years after his coronation. One hundred and fifty thousand were deported, one hundred thousand were killed... Even a hundredth or a thousandth part of those who were slain would now be considered very grievous by Beloved-of-the-Gods.",
          repository: "Shahbazgarhi, Girnar, and Kalsi stone inscriptions"
        }
      ]
    },
    {
      id: "satavahana",
      name: "Satavahana Empire",
      nativeName: "सातवाहन साम्राज्य (Andhrabhrityas)",
      period: "100 BCE – 225 CE",
      startYear: -100,
      endYear: 225,
      eraId: "classical_antiquity",
      region: "Deccan Plateau & Central India",
      capital: "Pratishthana (Paithan) & Amaravati",
      area: "Approx. 2,800,000 km²",
      overview: "The Satavahanas were indigenous masters of the Deccan who bridged northern and southern India, minted India's first portrait coinage, built the Great Stupa at Amaravati, and commanded lucrative Roman trade via Barygaza and Kalyan.",
      featured: true,
      coords: { x: 430, y: 440 },
      territoryPath: "M 380 390 Q 480 370 490 440 Q 450 490 390 470 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Gautamiputra Satakarni",
          reign: "78 – 102 CE",
          title: "Trisamudrapitapoyavahana (Whose steed drank from 3 seas)",
          role: "Greatest Satavahana Sovereign",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Crushed the Western Kshatrapas (Sakas), revitalized Vedic and Buddhist culture, and instituted the Shalivahana Shaka calendar era.",
          achievements: ["Defeated Nahapana at Nashik", "Pioneered royal bilingual portrait coinage", "Patronized Karla and Kanheri rock-cut chaityas"]
        }
      ],
      majorEvents: [
        { id: "nahapana-defeat", title: "Defeat of Western Kshatrapas", date: "c. 78 CE", significance: "Restored indigenous sovereignty across the Deccan and Konkan coast." }
      ],
      sources: [
        {
          title: "Nashik Cave Inscription of Gautami Balashri",
          date: "c. 130 CE",
          author: "Queen Mother Gautami Balashri",
          type: "Cave Epigraph (Nashik Cave 3)",
          quote: "He who uprooted the Sakas, Yavanas, and Pahlavas, who destroyed the pride of the Kshatriyas, whose horses drank the water of the three oceans...",
          repository: "Pandavleni Caves, Nashik, Maharashtra"
        },
        {
          title: "Periplus of the Erythraean Sea",
          date: "c. 60 CE",
          author: "Alexandrian Roman Merchant",
          type: "Greco-Roman Maritime Navigation Manual",
          quote: "In the market-towns of the Dachinabades [Deccan] are traded Roman gold aurei, spikenard, fine linens, and muslins produced in the territory of King Calliene [Kalyan].",
          repository: "Heidelberg University Codex"
        }
      ]
    },
    {
      id: "kushan",
      name: "Kushan Empire",
      nativeName: "कुषाण साम्राज्य (Kushano-Sasanian)",
      period: "30 CE – 375 CE",
      startYear: 30,
      endYear: 375,
      eraId: "classical_antiquity",
      region: "Northwest India, Gandhara & Central Asia",
      capital: "Purushapura (Peshawar) & Mathura",
      area: "Approx. 3,800,000 km²",
      overview: "At the geopolitical crossroad connecting India, China, Rome, and Persia, the Kushans fostered the sublime synthesis of Gandhara Greco-Buddhist art and Mathuran red sandstone statuary. Kanishka convened the Fourth Buddhist Council and inaugurated the Mahayana transmission along the Silk Road.",
      featured: false,
      coords: { x: 370, y: 260 },
      territoryPath: "M 320 220 Q 420 230 430 300 Q 380 340 330 290 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Kanishka I the Great",
          reign: "127 – 150 CE",
          title: "Devaputra (Son of God)",
          role: "Sovereign of Gandhara and the Silk Road",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Constructed the monumental Kanishka Stupa in Peshawar and gathered scholars Ashvaghosha, Charaka, and Nagarjuna at his court.",
          achievements: ["Convened Fourth Buddhist Council in Kashmir", "Introduced golden Dinar coinage", "Commissioned earliest anthropomorphic Buddha sculptures"]
        }
      ],
      majorEvents: [
        { id: "fourth-buddhist-council", title: "Fourth Buddhist Council in Kashmir", date: "c. 130 CE", significance: "Standardized the Sarvastivada Mahayana canons and engraved them onto copper plates." }
      ],
      sources: [
        {
          title: "Rabatak Inscription of Kanishka",
          date: "c. 127 CE",
          author: "Emperor Kanishka I",
          type: "Bactrian Greek-Script Stone Monument",
          quote: "In the year one it has been proclaimed into India, throughout all the realm of the Kshatrapas: the cities of Saketa, Kausambi, Pataliputra, as far as Sri-Champa...",
          repository: "National Museum of Afghanistan, Kabul"
        }
      ]
    },
    {
      id: "gupta",
      name: "Gupta Empire",
      nativeName: "गुप्त साम्राज्य (Classical Golden Age)",
      period: "319 CE – 543 CE",
      startYear: 319,
      endYear: 543,
      eraId: "golden_age",
      region: "Northern, Central & Western India",
      capital: "Pataliputra & Ujjain",
      area: "Approx. 3,500,000 km²",
      overview: "Renowned as the Classical Golden Age of India, marked by monumental discoveries in mathematics (invention of zero, decimal system, and algebra by Aryabhata), astronomy (heliocentrism and spherical earth), metallurgy (the rust-resistant Iron Pillar of Delhi), classical Sanskrit literature (Kalidasa), and the founding of Nalanda Mahavihara.",
      image: "assets/nalanda_gupta.jpg",
      imageCaption: "Archaeological AI Reconstruction: Nalanda Mahavihara & Astronomers at the Observatories (c. 500 CE)",
      featured: true,
      coords: { x: 440, y: 340 },
      territoryPath: "M 370 290 Q 480 270 510 340 Q 470 410 400 370 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Samudragupta",
          reign: "335 – 375 CE",
          title: "Kaviraja (King of Poets)",
          role: "Military Genius and Imperial Unifier",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Never defeated in battle across dozens of campaigns from the Punjab to the Pallava south; celebrated on the Prayagraj Pillar.",
          achievements: ["Dakshinapatha expedition subjugating 12 southern kings", "Pioneered classical Gold Dinar coinage with veena depiction"]
        },
        {
          name: "Chandragupta II Vikramaditya",
          reign: "375 – 415 CE",
          title: "Vikramaditya",
          role: "Imperial Patron of Arts & Science",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Destroyed the Western Kshatrapas to annex Gujarat seaports; assembled the Navaratnas (Nine Gems) including Kalidasa, Varahamihira, and Dhanvantari.",
          achievements: ["Annexed Saurashtra and Bharuch ports", "Navaratna court patron", "Forged the rustless Iron Pillar of Delhi"]
        }
      ],
      majorEvents: [
        { id: "nalanda-founding", title: "Founding of Nalanda Mahavihara", date: "c. 427 CE", significance: "World's premier residential international university hosting 10,000 scholars from China, Korea, and Persia.", featured: true }
      ],
      sources: [
        {
          title: "Allahabad Pillar Inscription (Prayag Prashasti)",
          date: "c. 370 CE",
          author: "Harishena (Court Poet & Foreign Minister)",
          type: "Sanskrit Epigraph in Classical Champu Style",
          quote: "Whose mortal body was full of charm through hundred wounds inflicted by battle-axes, arrows, lances, pikes, swords, and javelins...",
          repository: "Allahabad Fort Stone Pillar, Prayagraj"
        },
        {
          title: "Record of Buddhist Kingdoms by Faxian",
          date: "c. 414 CE",
          author: "Faxian (Chinese Buddhist Pilgrim)",
          type: "Chinese Imperial Travel Journal",
          quote: "The inhabitants are rich and prosperous; they vie with one another in the practice of charity. Throughout the whole country the people do not kill any living creature, nor drink wine.",
          repository: "National Library of China, Beijing"
        }
      ]
    },
    {
      id: "harsha",
      name: "Empire of Harsha (Pushyabhuti)",
      nativeName: "हर्षवर्धन साम्राज्य (कन्नौज)",
      period: "606 CE – 647 CE",
      startYear: 606,
      endYear: 647,
      eraId: "golden_age",
      region: "Northern & Central India",
      capital: "Kanyakubja (Kannauj)",
      area: "Approx. 2,500,000 km²",
      overview: "Emperor Harsha unified northern India following the Huna disruptions. A prolific playwright and compassionate sovereign, his court was chronicled by Banabhatta in the Harshacharita and Chinese pilgrim Xuanzang, who attended Harsha's grand assembly at Kannauj and Prayag Maha Moksha Parishad.",
      featured: false,
      coords: { x: 440, y: 320 },
      territoryPath: "M 390 280 Q 480 270 500 330 Q 450 360 400 340 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Harshavardhana",
          reign: "606 – 647 CE",
          title: "Siladitya (Sun of Virtue)",
          role: "Last Imperial Buddhist Emperor of North India",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Composed famous Sanskrit plays Ratnavali, Priyadarsika, and Nagananda, distributing his entire royal treasury every five years at Prayag.",
          achievements: ["Kannauj Grand Assembly of 643 CE", "Patron of Nalanda Chancellor Silabhadra", "Authored classical Sanskrit dramas"]
        }
      ],
      majorEvents: [
        { id: "battle-narmada", title: "Battle of the Narmada River", date: "618 CE", significance: "Pulakeshin II of the Chalukyas halted Harsha's southward expansion, fixing the Narmada as the border." }
      ],
      sources: [
        {
          title: "Harshacharita by Banabhatta",
          date: "c. 640 CE",
          author: "Banabhatta (Asthana Kavi)",
          type: "Earliest Historical Biography in Sanskrit",
          quote: "In him fortune resided without pride, valour without cruelty, learning without arrogance, and power without oppression.",
          repository: "Adyar Library Manuscript Collection, Chennai"
        }
      ]
    },
    {
      id: "chalukya",
      name: "Chalukya Dynasty (Badami)",
      nativeName: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯ",
      period: "543 CE – 753 CE",
      startYear: 543,
      endYear: 753,
      eraId: "medieval_dynasties",
      region: "Deccan & Western India",
      capital: "Vatapi (Badami)",
      area: "Approx. 2,000,000 km²",
      overview: "Pioneered the sublime Vesara style of Hindu temple architecture at Aihole, Badami, and Pattadakal (UNESCO). King Pulakeshin II defeated Emperor Harsha on the Narmada and maintained diplomatic ties with Khosrow II of Persia.",
      featured: false,
      coords: { x: 420, y: 430 },
      territoryPath: "M 390 390 Q 460 380 470 450 Q 420 480 380 440 Z",
      tag: "Dynasty",
      rulers: [
        {
          name: "Pulakeshin II",
          reign: "610 – 642 CE",
          title: "Parameshwara",
          role: "Sovereign of the Three Maharashtrakas",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Defeated Emperor Harsha, Mahendravarman I Pallava, and the Kadambas to command peninsular India from coast to coast.",
          achievements: ["Aihole Prashasti inscription", "Reception of Persian Sasanian embassy", "Pattadakal temple architecture foundation"]
        }
      ],
      majorEvents: [
        { id: "aihole-prashasti", title: "Inscribing of Aihole Prashasti", date: "634 CE", significance: "Poet Ravikirti commemorated Pulakeshin II's military triumphs and linked him to Kalidasa and Bharavi." }
      ],
      sources: [
        {
          title: "Aihole Stone Inscription at Meguti Temple",
          date: "634 CE",
          author: "Ravikirti (Court Poet)",
          type: "Sanskrit Meguti Temple Epigraph",
          quote: "Harsha [Joy], whose lotus feet were adorned with the rays of the jewels of kings, had his joy melted away by fear when his elephants fell in battle...",
          repository: "Meguti Temple, Aihole, Bagalkot, Karnataka"
        }
      ]
    },
    {
      id: "pallava",
      name: "Pallava Dynasty",
      nativeName: "பல்லவ பேரரசு (Kanchi & Mamallapuram)",
      period: "275 CE – 897 CE",
      startYear: 275,
      endYear: 897,
      eraId: "medieval_dynasties",
      region: "Tamilakam & Coromandel Coast",
      capital: "Kanchipuram & Mamallapuram",
      area: "Approx. 1,200,000 km²",
      overview: "Masters of monolithic rock-cut granite architecture, who carved the Pancha Rathas and the Shore Temple at Mahabalipuram. Their Grantha script spread across maritime Southeast Asia, serving as the ancestor to Khmer, Thai, Javanese, and Mon scripts.",
      featured: false,
      coords: { x: 450, y: 470 },
      territoryPath: "M 420 440 Q 470 430 480 490 Q 440 510 420 470 Z",
      tag: "Dynasty",
      rulers: [
        {
          name: "Narasimhavarman I",
          reign: "630 – 668 CE",
          title: "Mamalla (The Great Wrestler)",
          role: "Victor of Vatapi and Mahabalipuram Builder",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Captured the Chalukya capital Vatapi in 642 CE and commissioned the monolithic rock sculptures of Mamallapuram.",
          achievements: ["Carved Arjuna's Penance and Shore Temple", "Naval expedition restoring King Manavamma of Sri Lanka"]
        }
      ],
      majorEvents: [
        { id: "fall-vatapi", title: "Conquest of Vatapi", date: "642 CE", significance: "Pallava general Paranjothi captured the Chalukya capital, assuming the title Vatapi-kondan." }
      ],
      sources: [
        {
          title: "Kuram Copper Plates",
          date: "c. 680 CE",
          author: "Paramesvaravarman I Scribes",
          type: "Sanskrit-Tamil Bilingual Copper Charter",
          quote: "Narasimhavarman, who wrote the syllable of victory on the back of Pulakeshin, who was fleeing with his broken army...",
          repository: "Government Museum, Egmore, Chennai"
        }
      ]
    },
    {
      id: "rashtrakuta",
      name: "Rashtrakuta Empire",
      nativeName: "ರಾಷ್ಟ್ರಕೂಟ ಸಾಮ್ರಾಜ್ಯ (Manyakheta)",
      period: "753 CE – 982 CE",
      startYear: 753,
      endYear: 982,
      eraId: "medieval_dynasties",
      region: "Deccan & Central India",
      capital: "Manyakheta (Malkhed)",
      area: "Approx. 3,000,000 km²",
      overview: "Identified by Arab travelers (Al-Masudi and Sulaiman) as one of the four great empires of the medieval world alongside Rome, China, and the Abbasid Caliphate. Commissioned the monolithic Kailash Temple at Ellora (Cave 16), carved out of a single mountain of basalt.",
      featured: true,
      coords: { x: 420, y: 420 },
      territoryPath: "M 370 360 Q 480 340 500 420 Q 450 470 380 430 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Amoghavarsha I",
          reign: "814 – 878 CE",
          title: "Nrupatunga",
          role: "Scholar-King and Ashoka of the South",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Reigned for 64 peaceful years; patronized Jain and Hindu scholars, and co-authored Kavirajamarga, the earliest extant work on Kannada literature.",
          achievements: ["Authored Kavirajamarga and Prashnottara Ratnamalika", "Praised by Arab geographer Sulaiman as one of the four world monarchs"]
        },
        {
          name: "Krishna I",
          reign: "756 – 774 CE",
          title: "Akālavarsha",
          role: "Architect of the Monolithic Kailash Temple",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Ordered the vertical top-down excavation of 200,000 tons of rock to create the Kailash Temple at Ellora.",
          achievements: ["Completed the largest monolithic rock excavation on Earth"]
        }
      ],
      majorEvents: [
        { id: "ellora-kailash", title: "Consecration of Kailash Temple", date: "c. 760 CE", significance: "Unprecedented engineering marvel carved top-down without scaffolds or joints.", featured: true }
      ],
      sources: [
        {
          title: "Kavirajamarga (The Royal Road of Poets)",
          date: "c. 850 CE",
          author: "King Amoghavarsha I & Sri Vijaya",
          type: "Kannada Poetics and Geopolitical Manuscript",
          quote: "The land of Kannada extends from the Kaveri River in the south to the Godavari River in the north...",
          repository: "Oriental Research Institute, Mysuru"
        },
        {
          title: "Silsilat al-Tawarikh by Merchant Sulaiman",
          date: "c. 851 CE",
          author: "Sulaiman al-Tajir (Arab Voyager)",
          type: "Arabic Maritime & Commercial Chronicle",
          quote: "The King of the Balhara [Vallabharaja - Rashtrakuta] is the most eminent of the kings of India, maintaining peace, vast cavalry, and paying his soldiers regular salaries.",
          repository: "Bibliothèque nationale de France, Paris"
        }
      ]
    },
    {
      id: "chola",
      name: "Imperial Chola Dynasty",
      nativeName: "சோழர் பேரரசு (Thanjavur & Thalassocracy)",
      period: "848 CE – 1279 CE",
      startYear: 848,
      endYear: 1279,
      eraId: "medieval_dynasties",
      region: "Tamilakam & Indian Ocean Maritime Empire",
      capital: "Thanjavur & Gangaikonda Cholapuram",
      area: "Maritime thalassocracy across Bay of Bengal",
      overview: "One of the longest-ruling maritime powers in world history. Under Rajaraja I and Rajendra I, the Cholas transformed the Bay of Bengal into a 'Chola Lake', constructing the monumental Brihadisvara Temple (Big Temple) in granite, perfecting lost-wax bronze sculptures of Nataraja, and conducting a 1,000-ship naval invasion of the Srivijaya Empire in Southeast Asia.",
      image: "assets/thanjavur_chola.jpg",
      imageCaption: "Archaeological AI Reconstruction: Brihadisvara Vimana & Chola Maritime War Fleet (c. 1010 CE)",
      featured: true,
      coords: { x: 450, y: 480 },
      territoryPath: "M 420 440 Q 480 430 490 500 Q 450 530 420 480 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Rajaraja Chola I the Great",
          reign: "985 – 1014 CE",
          title: "Sivapadasekhara / Arulmozhivarman",
          role: "Architect of the Imperial Chola Apex",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Instituted the land survey system, commanded powerful blue-water navies, and built the all-granite Brihadisvara Temple.",
          achievements: ["Built 216-foot granite Brihadisvara Temple (1010 CE)", "Pioneered royal Meikeerthi historical epigraphs", "Conquered northern Sri Lanka and Maldives"]
        },
        {
          name: "Rajendra Chola I",
          reign: "1014 – 1044 CE",
          title: "Gangaikondan / Kadarangondan",
          role: "Supreme Maritime Commander",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Marched armies to the Ganges and launched overseas naval campaigns conquering 14 port kingdoms of the Srivijaya Empire across Malacca, Sumatra, and the Malay Peninsula.",
          achievements: ["Naval conquest of Srivijaya (1025 CE)", "Founded Gangaikonda Cholapuram with vast royal water reservoir Cholagangam"]
        }
      ],
      majorEvents: [
        { id: "srivijaya-campaign", title: "Naval Conquest of Srivijaya", date: "1025 CE", significance: "Secured maritime spice trade routes between India, the Sunda Straits, and Song Dynasty China.", featured: true },
        { id: "brihadisvara-consecration", title: "Consecration of Brihadisvara Temple", date: "1010 CE", significance: "Completed the 13-story all-granite vimana crowned with an 80-ton monolithic cupola." }
      ],
      sources: [
        {
          title: "Thanjavur Brihadisvara Temple Epigraphs",
          date: "1010 CE",
          author: "King Rajaraja Chola I",
          type: "Tamil Granite Inscriptions",
          quote: "Rajaraja, who having conquered the Cheras, Pandiyas, Gangas, Vengai, and Ilam [Sri Lanka], caused to be constructed this stone temple Peruvudaiyar Kovil...",
          repository: "Base Plinths of Brihadisvara Temple, Thanjavur, Tamil Nadu"
        },
        {
          title: "Tiruvalangadu Copper Plates of Rajendra Chola I",
          date: "1018 CE",
          author: "Imperial Chola Scribes",
          type: "31 Large Copper Plates strung on Royal Seal Ring",
          quote: "Having conquered Katāha [Kedah] with spirited ships that traversed the raging ocean, he seized the immense treasures of the King of Kadāram...",
          repository: "Government Museum, Chennai"
        }
      ]
    },
    {
      id: "pala",
      name: "Pala Empire of Bengal",
      nativeName: "পাল সাম্রাজ্য (Gaur & Magadha)",
      period: "750 CE – 1161 CE",
      startYear: 750,
      endYear: 1161,
      eraId: "medieval_dynasties",
      region: "Bengal, Bihar & Eastern India",
      capital: "Gauda, Pataliputra & Vikrampura",
      area: "Approx. 2,400,000 km²",
      overview: "Elected through consensus (Matsyanyaya) by regional chieftains, the Buddhist Palas revitalized Mahayana and Vajrayana Buddhism, founded Vikramashila and Somapura Mahaviharas, dispatched Atisha to Tibet, and fostered the graceful eastern Indian bronze sculpturing tradition.",
      featured: false,
      coords: { x: 490, y: 350 },
      territoryPath: "M 460 320 Q 520 300 540 370 Q 490 410 450 370 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Dharmapala",
          reign: "770 – 810 CE",
          title: "Paramasaugata",
          role: "Founder of Vikramashila Mahavihara",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Engaged in the Tripartite Struggle for Kannauj, holding a grand imperial durbar and donating 200 villages to maintain Nalanda.",
          achievements: ["Founded Vikramashila and Somapura Mahavihara (UNESCO)", "Revitalized Buddhist monastic education across Asia"]
        }
      ],
      majorEvents: [
        { id: "vikramashila-founding", title: "Establishment of Vikramashila University", date: "c. 800 CE", significance: "Premier international university specialized in Tantrayana, philosophy, and grammar." }
      ],
      sources: [
        {
          title: "Khalimpur Copper Plate Inscription",
          date: "c. 802 CE",
          author: "King Dharmapala",
          type: "Copper Plate Inscription in Gaudi Script",
          quote: "Gopala was made king by the people to put an end to the state of anarchy (Matsyanyaya), as the fish swallow the small ones in water...",
          repository: "Asiatic Society of Bengal, Kolkata"
        }
      ]
    },
    {
      id: "delhi_sultanate",
      name: "Delhi Sultanate",
      nativeName: "سلطنت دہلی (Mamluk, Khilji, Tughlaq, Lodi)",
      period: "1206 CE – 1526 CE",
      startYear: 1206,
      endYear: 1526,
      eraId: "sultanates_vijayanagara",
      region: "Indo-Gangetic Plain & Central India",
      capital: "Delhi (Qila Rai Pithora, Siri, Tughlaqabad)",
      area: "Approx. 3,200,000 km² at peak",
      overview: "Succession of five Islamic dynasties ruling from Delhi. Renowned for successfully repelling five massive Mongol invasions under Alauddin Khilji, introducing Indo-Islamic architectural arches and domes (Qutb Minar, Alai Darwaza), paper manufacturing, and currency standardization (Tanka and Jital).",
      featured: false,
      coords: { x: 420, y: 310 },
      territoryPath: "M 370 270 Q 460 260 480 340 Q 430 380 370 330 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Alauddin Khilji",
          reign: "1296 – 1316 CE",
          title: "Sikandar-i-Sani (Second Alexander)",
          role: "Military Reformer and Mongol Repeller",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Maintained a massive standing army with fixed price controls and granary reserves, crushing Chagatai Mongol forces at Jalandhar, Kili, and Amroha.",
          achievements: ["Defeated 5 major Mongol invasions", "Annexed Gujarat, Ranthambore, and Chittor", "Constructed Alai Darwaza"]
        }
      ],
      majorEvents: [
        { id: "mongol-repulsion", title: "Battle of Kili (Mongol Invasions)", date: "1299 CE", significance: "Zafar Khan led Khilji cavalry to crush 200,000 Mongols outside the gates of Delhi." }
      ],
      sources: [
        {
          title: "Tarikh-i-Firoz Shahi by Ziauddin Barani",
          date: "c. 1357 CE",
          author: "Ziauddin Barani (Court Chronicler)",
          type: "Persian Court History",
          quote: "Sultan Alauddin established market regulations such that the price of grain, cloth, and horses did not rise by a single dang for decades...",
          repository: "National Archives of India, New Delhi"
        }
      ]
    },
    {
      id: "vijayanagara",
      name: "Vijayanagara Empire",
      nativeName: "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ (Karnata Samrajya)",
      period: "1336 CE – 1646 CE",
      startYear: 1336,
      endYear: 1646,
      eraId: "sultanates_vijayanagara",
      region: "Deccan & Southern India",
      capital: "Vijayanagara (Hampi)",
      area: "Approx. 1,800,000 km²",
      overview: "Founded by brothers Harihara and Bukka guided by Sage Vidyaranya on the Tungabhadra River, Vijayanagara was the second largest city in the medieval world after Beijing. Reached its golden epoch under Emperor Krishnadevaraya, renowned for immense open-air bazaars trading diamonds and Arabian stallions, musical granite pillars, and the stone chariot of Vitthala Temple.",
      featured: true,
      coords: { x: 430, y: 450 },
      territoryPath: "M 400 410 Q 480 400 490 490 Q 430 520 390 460 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Krishnadevaraya the Great",
          reign: "1509 – 1529 CE",
          title: "Andhra Bhoja / Mooru Rayara Ganda",
          role: "Greatest Sovereign of South India",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Military genius who defeated the Sultanates of Bijapur, Golconda, and the Gajapatis of Odisha; patron of the Ashta Diggajas (Eight Literary Giants) including Tenali Rama.",
          achievements: ["Authored epic poem Amuktamalyada", "Constructed Vitthala and Krishna temples at Hampi", "Established flourishing diamond trade"]
        }
      ],
      majorEvents: [
        { id: "battle-raichur", title: "Battle of Raichur", date: "1520 CE", significance: "Decisive victory of Krishnadevaraya over Ismail Adil Shah using advanced artillery and cavalry tactics.", featured: true }
      ],
      sources: [
        {
          title: "Chronicles of Fernão Nunes & Domingo Paes",
          date: "c. 1520–1522 CE",
          author: "Domingo Paes & Fernão Nunes (Portuguese Horse Merchants)",
          type: "Portuguese Diplomatic Eyewitness Chronicle",
          quote: "The city of Vijayanagara is as large as Rome and very beautiful to the sight... There are jewels of diamonds and rubies sold openly in the street as if they were common vegetables.",
          repository: "Bibliothèque nationale de France (Paris Manuscript)"
        },
        {
          title: "Amuktamalyada by Krishnadevaraya",
          date: "c. 1515 CE",
          author: "Emperor Krishnadevaraya",
          type: "Telugu Royal Literary Epic on Statecraft",
          quote: "A king should rule with righteousness (Dharma). He should protect the weak, encourage merchants from overseas, and maintain his borders vigilant.",
          repository: "Saraswathi Mahal Library, Thanjavur"
        }
      ]
    },
    {
      id: "rajput_confederacy",
      name: "Rajput Kingdoms & Mewar",
      nativeName: "राजपूत राज्य एवं मेवाड़ (Chittorgarh & Kumbhalgarh)",
      period: "728 CE – 1818 CE",
      startYear: 728,
      endYear: 1818,
      eraId: "early_modern",
      region: "Rajasthan & Central India",
      capital: "Chittorgarh / Udaipur / Kumbhalgarh",
      area: "Approx. 850,000 km²",
      overview: "Legendary warrior clans of Northwestern India renowned for unyielding resistance against foreign conquerors, chivalric code of Kshatriya honour, hilltop fortresses (Kumbhalgarh with the world's second-longest continuous wall), and immortal sagas of Maharana Pratap and Rana Sanga.",
      featured: true,
      coords: { x: 390, y: 340 },
      territoryPath: "M 360 310 Q 420 300 430 350 Q 390 380 350 350 Z",
      tag: "Civilization",
      rulers: [
        {
          name: "Maharana Pratap",
          reign: "1572 – 1597 CE",
          title: "Hindua Suraj (Sun of Hindus)",
          role: "Immortal Sovereign of Mewar",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Refused to submit to Mughal hegemony, fighting from the Aravalli hills and winning back nearly all of Mewar through guerrilla tactics.",
          achievements: ["Battle of Haldighati (1576 CE)", "Battle of Dewair (1582 CE) liberating 36 Mughal outposts", "Chavand cultural renaissance"]
        },
        {
          name: "Rana Sanga",
          reign: "1508 – 1528 CE",
          title: "Maharana Sangram Singh I",
          role: "Unifying Head of Rajput Confederation",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Bearing 80 battlefield wounds and missing an eye and arm, he defeated the Sultanates of Malwa and Gujarat before confronting Babur at Khanwa.",
          achievements: ["Defeated Ibrahim Lodi at Khatoli", "Unified Rajput clans into a national coalition"]
        }
      ],
      majorEvents: [
        { id: "battle-haldighati", title: "Battle of Haldighati", date: "1576 CE", significance: "Maharana Pratap and his loyal warhorse Chetak resisted the imperial army in the narrow Aravalli pass.", featured: true }
      ],
      sources: [
        {
          title: "Rajprashasti Mahakavyam",
          date: "1676 CE",
          author: "Ranmuktasuri (Sanskrit Court Poet)",
          type: "Monolithic Marble Inscriptions at Rajsamand Lake",
          quote: "The largest stone-carved book in the world, engraved across 25 slabs detailing the genealogy, vows, and battles of the Sisodia Maharanas.",
          repository: "Nauchowki Ghat, Rajsamand Lake, Rajasthan"
        }
      ]
    },
    {
      id: "ahom",
      name: "Ahom Kingdom of Assam",
      nativeName: "আহোম ৰাজ্য (Kingdom of Pragjyotisha)",
      period: "1228 CE – 1826 CE",
      startYear: 1228,
      endYear: 1826,
      eraId: "early_modern",
      region: "Brahmaputra Valley & Northeast India",
      capital: "Charaideo, Garhgaon & Rangpur",
      area: "Approx. 400,000 km²",
      overview: "Ruling the Brahmaputra basin for 600 continuous years, the Ahoms preserved Northeast Indian sovereignty, successfully thwarting 17 separate Mughal military campaigns. Under commander Lachit Borphukan, they crushed the imperial Mughal navy at the Battle of Saraighat.",
      featured: false,
      coords: { x: 550, y: 320 },
      territoryPath: "M 520 300 Q 580 290 600 340 Q 550 360 520 330 Z",
      tag: "Dynasty",
      rulers: [
        {
          name: "Lachit Borphukan & Chakradhwaj Singha",
          reign: "1667 – 1672 CE",
          title: "Borphukan (Supreme Military Commander)",
          role: "Liberator of Assam",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Decisively defeated Ram Singh's Mughal imperial flotilla on the waters of the Brahmaputra at Saraighat.",
          achievements: ["Battle of Saraighat (1671 CE)", "Pioneered riverine war fortifications and earthen dykes"]
        }
      ],
      majorEvents: [
        { id: "battle-saraighat", title: "Naval Battle of Saraighat", date: "1671 CE", significance: "Greatest riverine naval victory in Indian history, halting Mughal eastward expansion." }
      ],
      sources: [
        {
          title: "Ahom Buranjis (Royal Chronicles)",
          date: "13th – 18th Century CE",
          author: "Ahom Imperial Scribes",
          type: "Illustrated Sanchi Bark Manuscripts",
          quote: "My uncle is not greater than my country: Commander Lachit's decisive declaration defending the Garhgaon river pass.",
          repository: "Department of Historical and Antiquarian Studies, Guwahati"
        }
      ]
    },
    {
      id: "mughal",
      name: "Mughal Empire",
      nativeName: "گورکانیان (Hindustan)",
      period: "1526 CE – 1857 CE",
      startYear: 1526,
      endYear: 1857,
      eraId: "early_modern",
      region: "Pan-Indian Subcontinent",
      capital: "Agra, Fatehpur Sikri, Shahjahanabad (Delhi)",
      area: "Approx. 4,000,000 km² at peak",
      overview: "Established by Babur in 1526, the Mughal Empire became one of the wealthiest empires in human history, accounting for nearly 25% of global GDP in 1700. Known for the centralized Mansabdari administrative system, religious syncretism under Akbar, and architectural marvels of white Makrana marble and red sandstone including the Taj Mahal and Red Fort.",
      featured: true,
      coords: { x: 420, y: 320 },
      territoryPath: "M 350 250 Q 480 230 520 310 Q 480 430 410 460 Q 360 380 340 300 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Akbar the Great",
          reign: "1556 – 1605 CE",
          title: "Jalal-ud-din Muhammad Akbar",
          role: "Imperial Consolidator and Cultural Synthesizer",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Abolished the Jizya tax, established the Ibadat Khana for interfaith dialogues, patronized the Navaratnas (including Birbal and Tansen), and built Fatehpur Sikri.",
          achievements: ["Policy of Sulh-i-Kul (Universal Peace)", "Mansabdari military administrative system", "Constructed Fatehpur Sikri and Agra Fort"]
        },
        {
          name: "Shah Jahan",
          reign: "1628 – 1658 CE",
          title: "King of the World",
          role: "Master Architect of the Golden Age",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Commissioned the Taj Mahal, Jama Masjid, Red Fort, and the jewel-encrusted Peacock Throne.",
          achievements: ["Constructed the Taj Mahal (UNESCO)", "Founded Shahjahanabad (Old Delhi)"]
        }
      ],
      majorEvents: [
        { id: "first-panipat", title: "First Battle of Panipat", date: "1526 CE", significance: "Babur introduced matchlock guns and field cannon tactics to establish Mughal rule." },
        { id: "taj-mahal-completion", title: "Completion of the Taj Mahal", date: "1653 CE", significance: "Pinnacle of Mughal pietra dura and white marble symmetry." }
      ],
      sources: [
        {
          title: "Ain-i-Akbari & Akbarnama",
          date: "1598 CE",
          author: "Abu'l-Fazl ibn Mubarak (Grand Vizier)",
          type: "Illuminated Persian Imperial Gazetteer",
          quote: "A comprehensive survey of the administration, crop yields, army regulations, Hindu philosophies, and cultural flora of Hindustan.",
          repository: "Victoria and Albert Museum, London / Asiatic Society"
        },
        {
          title: "Baburnama (Memoirs of Babur)",
          date: "c. 1529 CE",
          author: "Zahir-ud-din Muhammad Babur",
          type: "Chagatai Turkic Autobiography",
          quote: "Hindustan is a country of extraordinary size and wealth, with an abundance of craftsmen of every kind...",
          repository: "British Library, London"
        }
      ]
    },
    {
      id: "maratha",
      name: "Maratha Empire & Confederacy",
      nativeName: "मराठा साम्राज्य (Hindavi Swarajya)",
      period: "1674 CE – 1818 CE",
      startYear: 1674,
      endYear: 1818,
      eraId: "early_modern",
      region: "Western, Central & Peninsular India",
      capital: "Raigad, Satara, Pune (Shaniwar Wada)",
      area: "Approx. 2,800,000 km² at peak",
      overview: "Founded by Chhatrapati Shivaji Maharaj in 1674 upon the ideological principle of Hindavi Swarajya (self-rule). Pioneer of guerrilla warfare (Ganimi Kawa), indigenous blue-water naval fortresses (Sindhudurg, Vijaydurg) under Admiral Kanhoji Angre, and the Ashta Pradhan cabinet. Under Peshwa Baji Rao I, the Marathas unfurled the saffron flag (Bhagwa Dhwaj) from the Deccan to Attock on the Indus.",
      image: "assets/raigad_maratha.jpg",
      imageCaption: "Historical Reconstruction: Raigad Fort Battlements & Saffron Swarajya Standard (c. 1674 CE)",
      featured: true,
      coords: { x: 410, y: 400 },
      territoryPath: "M 360 330 Q 480 310 500 390 Q 450 480 380 460 Q 360 380 360 330 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Chhatrapati Shivaji Maharaj",
          reign: "1674 – 1680 CE",
          title: "Haidava Dharmoddharak / Chhatrapati",
          role: "Founder of the Maratha Empire",
          image: "assets/chhatrapati_fury.jpg",
          summary: "Coronated at Raigad in 1674; pioneered coastal naval defense, established a non-feudal standing army, prohibited harassment of women and mosques, and revived Marathi and Sanskrit governance.",
          achievements: ["Coronation at Raigad (1674 CE)", "Father of the Indian Navy with 400+ warships", "Ashta Pradhan council of administration"]
        },
        {
          name: "Peshwa Baji Rao I",
          reign: "1720 – 1740 CE",
          title: "Shrimant Peshwa",
          role: "Undefeated Military General (41 Battles)",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Never lost a battle in his lifetime, deploying lightning cavalry strikes to shatter Mughal control across Malwa, Bundelkhand, and the gates of Delhi.",
          achievements: ["Battle of Palkhed (1728 CE)", "Raised Bhagwa Dhwaj across Central India"]
        }
      ],
      majorEvents: [
        { id: "shivaji-coronation", title: "Coronation of Chhatrapati Shivaji", date: "June 6, 1674 CE", significance: "Official consecration of Hindavi Swarajya at Raigad with ancient Vedic rituals.", featured: true },
        { id: "battle-palkhed", title: "Battle of Palkhed", date: "1728 CE", significance: "Masterclass in cavalry mobility where Baji Rao outmaneuvered Nizam-ul-Mulk." }
      ],
      sources: [
        {
          title: "Shivacharitra Pradip & Sabhasad Bakhar",
          date: "1697 CE",
          author: "Krishnaji Anant Sabhasad",
          type: "Modi Script Marathi Chronicle",
          quote: "He created a sovereign kingdom out of nothing, fortified hundreds of mountain citadels, and made the sea fear his navy...",
          repository: "Bharat Itihas Sanshodhak Mandal, Pune"
        },
        {
          title: "Adnyapatra (Royal Edict on State Policy)",
          date: "1715 CE",
          author: "Ramchandra Pant Amatya",
          type: "Treatise on Maratha Naval & Fort Governance",
          quote: "Forts are the essence of the realm. The sea is like a kingdom; he who commands the navy commands the wealth of the sea.",
          repository: "Peshwa Daftar Archives, Pune"
        }
      ]
    },
    {
      id: "sikh_empire",
      name: "Sikh Empire (Sarkar-i-Khalsa)",
      nativeName: "ਸਰਕਾਰ-ਏ-ਖ਼ਾਲਸਾ (Lahore Durbar)",
      period: "1799 CE – 1849 CE",
      startYear: 1799,
      endYear: 1849,
      eraId: "freedom_struggle",
      region: "Punjab, Kashmir, Ladakh & Khyber Pass",
      capital: "Lahore & Amritsar",
      area: "Approx. 520,000 km²",
      overview: "Founded by Maharaja Ranjit Singh ('Lion of Punjab'), the Sikh Empire united the 12 Misls into a formidable, modern secular military power. Armed with European-drilled Fauj-i-Khas artillery, they halted Afghan incursions, conquered Kashmir and Ladakh under General Zorawar Singh, and gilded the Harmandir Sahib (Golden Temple) in Amritsar.",
      featured: true,
      coords: { x: 380, y: 270 },
      territoryPath: "M 340 230 Q 420 220 440 280 Q 390 310 340 270 Z",
      tag: "Empire",
      rulers: [
        {
          name: "Maharaja Ranjit Singh",
          reign: "1801 – 1839 CE",
          title: "Sher-e-Punjab (Lion of Punjab)",
          role: "Sovereign of the Khalsa Empire",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Rule marked by secular religious harmony where no capital punishment was ever issued; secured the Koh-i-Noor diamond and golden foil for Harmandir Sahib.",
          achievements: ["Captured Lahore (1799) and Peshawar (1834)", "Modernized army with French & Italian generals", "Golden embellishment of Harmandir Sahib"]
        },
        {
          name: "Hari Singh Nalwa",
          reign: "1820 – 1837 CE",
          title: "Commander-in-Chief of Khalsa Army",
          role: "Conqueror of the Khyber Frontier",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Only commander in world history to reverse the invasion corridor through the Khyber Pass, building Jamrud Fort and defending the frontier.",
          achievements: ["Captured Peshawar and Jamrud Fort", "Defeated Afghan forces at Battle of Nowshera"]
        }
      ],
      majorEvents: [
        { id: "battle-jamrud", title: "Battle of Jamrud", date: "1837 CE", significance: "Hari Singh Nalwa halted the Afghan invasion at the mouth of the Khyber Pass." }
      ],
      sources: [
        {
          title: "Umdat-ut-Tawarikh by Sohan Lal Suri",
          date: "1840 CE",
          author: "Lala Sohan Lal Suri (Royal Astrologer & Diarist)",
          type: "Persian Daily Court Diary of the Lahore Durbar",
          quote: "A day-by-day record of the military audits, diplomatic banquets, and justice administered personally by Maharaja Ranjit Singh.",
          repository: "Punjab State Archives, Patiala"
        }
      ]
    },
    {
      id: "freedom_movement",
      name: "Indian Freedom Struggle & Republic",
      nativeName: "भारतीय स्वतंत्रता संग्राम (1857 – 1947)",
      period: "1857 CE – 1947 CE (Republic 1950)",
      startYear: 1857,
      endYear: 1950,
      eraId: "freedom_struggle",
      region: "All-India Nationwide Movement",
      capital: "New Delhi",
      area: "3,287,263 km²",
      overview: "From the First War of Independence in 1857 to the non-violent mass campaigns led by Mahatma Gandhi (Non-Cooperation, Dandi March, Quit India) and armed liberation by Netaji Subhas Chandra Bose's Indian National Army (INA). Culminated in the dawn of freedom at midnight on August 15, 1947, and the adoption of the world's longest written democratic Constitution on January 26, 1950.",
      featured: true,
      coords: { x: 430, y: 380 },
      territoryPath: "M 360 250 Q 480 230 520 310 Q 480 430 430 530 Q 380 450 350 320 Z",
      tag: "Movement",
      rulers: [
        {
          name: "Rani Lakshmibai of Jhansi",
          reign: "1857 – 1858 CE",
          title: "Khoob Ladi Mardani",
          role: "Heroine of the 1857 Uprising",
          image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=600&q=80",
          summary: "Fought fearlessly against British forces under Sir Hugh Rose, defending Jhansi and Gwalior with her son tied to her back.",
          achievements: ["Led defense of Jhansi Fort", "Immortal symbol of anti-colonial resistance"]
        },
        {
          name: "Netaji Subhas Chandra Bose",
          reign: "1942 – 1945 CE",
          title: "Leader of the Indian National Army (INA)",
          role: "Head of the Provisional Government of Azad Hind",
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
          summary: "Raised the Azad Hind Fauj, hoisted the tricolor at the Andaman & Nicobar islands, and marched to liberate the northeast frontier with the war cry 'Chalo Dilli'.",
          achievements: ["Formed Azad Hind Government", "Proclaimed Indian sovereignty over Andaman & Nicobar (Shaheed & Swaraj)"]
        },
        {
          name: "Mahatma Gandhi & Sardar Patel",
          reign: "1915 – 1950 CE",
          title: "Father of the Nation & Iron Man of India",
          role: "Architects of National Freedom & Integration",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
          summary: "Mobilized millions across caste and creed through Satyagraha; Sardar Patel peacefully integrated 562 princely states into a unified Indian Republic.",
          achievements: ["Dandi Salt Satyagraha (1930)", "Quit India Movement (1942)", "Integration of 562 Princely States into the Indian Union"]
        }
      ],
      majorEvents: [
        { id: "1857-revolt", title: "First War of Independence (1857 Revolt)", date: "1857 CE", significance: "Nationwide uprising ending British East India Company rule and transferring control to the British Crown.", featured: true },
        { id: "dandi-march", title: "Dandi Salt March", date: "1930 CE", significance: "240-mile march against the salt tax that electrified the nation and captured global consciousness." },
        { id: "independence-1947", title: "Independence of India", date: "August 15, 1947", significance: "At the stroke of midnight, India achieved freedom from colonial rule." }
      ],
      sources: [
        {
          title: "Proclamation of the Provisional Government of Azad Hind",
          date: "October 21, 1943",
          author: "Netaji Subhas Chandra Bose",
          type: "Official Government Declaration",
          quote: "In the name of God, in the name of bygone generations who have welded the Indian people into one nation... we call upon the Indian people to rally round our banner.",
          repository: "National Archives of India, New Delhi"
        },
        {
          title: "Tryst with Destiny Address",
          date: "August 14–15, 1947",
          author: "Jawaharlal Nehru",
          type: "Audio Recording & Parliamentary Record",
          quote: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom...",
          repository: "Parliament of India Archives, New Delhi"
        }
      ]
    }
  ],

  // In-depth Historical Battles, Treaties, and Turning Points
  events: [
    {
      id: "kalinga-war",
      title: "Kalinga War",
      date: "c. 261 BCE",
      year: -261,
      civilizationId: "maurya",
      civilization: "Maurya Empire",
      location: "Dhauli Hills, Daya River, Odisha",
      overview: "Fought between the Maurya Empire under Emperor Ashoka and the autonomous coastal republic of Kalinga, this clash was among the largest and bloodiest pitched battles in ancient world history, causing Ashoka's legendary moral transformation to Buddhism.",
      whatHappened: "Kalinga commanded vital trade corridors linking northern India to maritime routes across Southeast Asia. Emperor Ashoka marched his imperial armies into Kalinga in his eighth regnal year. The Kalingan defense was fiercely tenacious. More than 100,000 Kalingans were slain along the Daya River, 150,000 were driven into bondage, and countless more perished from ensuing plagues and displacement. When Ashoka rode through the battlefield witnessing the crimson river and weeping families, remorse struck his conscience.",
      significance: "The devastation catalyzed a historic transformation in Ashoka. He completely foreswore aggressive military conquest (Digvijaya) in favor of righteous moral conduct (Dhammavijaya). He embraced Buddhism, established stone-carved edicts promoting religious tolerance and non-violence, built public hospitals, planted shade trees, and dispatched peace delegations to Hellenistic Greece, Egypt, and Sri Lanka.",
      relatedRuler: {
        name: "Ashoka the Great",
        role: "Third Emperor of the Maurya Dynasty",
        reign: "268 – 232 BCE"
      },
      sources: [
        {
          title: "Major Rock Edict XIII (Dhauli & Kalsi)",
          date: "c. 257 BCE",
          type: "Royal Epigraph (Brahmi script)",
          description: "Ashoka's personal declaration of acute sorrow and remorse over the slaughter and exile of the people of Kalinga."
        },
        {
          title: "Naturalis Historia (Book VI)",
          date: "c. 77 CE",
          author: "Pliny the Elder",
          type: "Roman Naturalist & Geographer Record",
          description: "Records the formidable military prowess of the Calingae people, citing 60,000 infantry, 1,000 cavalry, and 700 war elephants."
        },
        {
          title: "Hathigumpha Inscription of Kharavela",
          date: "c. 2nd Century BCE",
          type: "Udayagiri Rock Inscription",
          description: "Details the ancient hydraulic canal systems excavated during early Mauryan interactions in coastal Kalinga."
        }
      ]
    },
    {
      id: "third-council",
      title: "Third Buddhist Council",
      date: "c. 250 BCE",
      year: -250,
      civilizationId: "maurya",
      civilization: "Maurya Empire",
      location: "Asokarama Monastery, Pataliputra",
      overview: "Presided over by Moggaliputta-Tissa under Ashoka's royal patronage to standardize the Buddhist canon and dispatch global missionaries across Asia, Greece, and Egypt.",
      significance: "Dispatched peace envoys including Mahinda and Sanghamitta to Sri Lanka, spreading Buddhism into a pan-Asian world religion.",
      relatedRuler: { name: "Ashoka the Great" }
    },
    {
      id: "lothal-dockyard",
      title: "Construction of Lothal Tidal Basin",
      date: "c. 2400 BCE",
      year: -2400,
      civilizationId: "indus_valley",
      civilization: "Indus Valley Civilization",
      location: "Gulf of Khambhat, Gujarat",
      overview: "The world's earliest known engineered tidal basin and drydock, equipped with sluice gates to lock in seawater at high tide so merchant ships could load beadwork and carnelian for Sumeria.",
      significance: "Demonstrates prehistoric knowledge of tidal hydrodynamics and extensive Indian Ocean maritime shipping centuries before the Mediterranean civilizations."
    },
    {
      id: "battle-ten-kings",
      title: "Battle of the Ten Kings (Dasarajna)",
      date: "c. 1200 BCE",
      year: -1200,
      civilizationId: "vedic_period",
      civilization: "Vedic Civilization",
      location: "Banks of Parushni (Ravi River), Punjab",
      overview: "Rigvedic conflict wherein King Sudas of the Trtsu-Bharata clan defeated a confederation of ten prominent Aryan and non-Aryan tribal kingdoms.",
      significance: "Established the Bharata clan as the paramount rulers of northern India, from whom the name 'Bharatavarsha' (Bharat) is derived."
    },
    {
      id: "nalanda-founding",
      title: "Founding of Nalanda Mahavihara",
      date: "c. 427 CE",
      year: 427,
      civilizationId: "gupta",
      civilization: "Gupta Empire",
      location: "Nalanda, Bihar",
      overview: "Founded by Emperor Kumaragupta I, Nalanda became the world's premier residential university. It hosted 10,000 scholars, 2,000 professors, and a 9-story library (Dharmaganja) with 9 million manuscripts.",
      significance: "Epicenter of Asian philosophy, logic, medicine, astronomy, and mathematics, educating Xuanzang, Yijing, and Padmasambhava."
    },
    {
      id: "battle-narmada",
      title: "Battle of the Narmada River",
      date: "618 CE",
      year: 618,
      civilizationId: "chalukya",
      civilization: "Chalukya Dynasty",
      location: "Narmada River Crossing, Madhya Pradesh",
      overview: "Clash between Emperor Harshavardhana of Kannauj leading northern armies and Pulakeshin II of the Chalukyas defending the Deccan.",
      significance: "Pulakeshin's victory halted Harsha's southward expansion and established the Narmada as the eternal cultural boundary between northern and peninsular India."
    },
    {
      id: "srivijaya-campaign",
      title: "Chola Naval Expedition to Srivijaya",
      date: "1025 CE",
      year: 1025,
      civilizationId: "chola",
      civilization: "Imperial Chola Dynasty",
      location: "Malacca Straits, Sumatra, Malay Peninsula",
      overview: "Rajendra Chola I dispatched a massive fleet of blue-water war vessels across 3,000 kilometers of the Bay of Bengal, capturing Emperor Sangrama Vijayottunggavarman and sacking 14 port kingdoms.",
      significance: "Established Chola naval dominance over the world's busiest maritime trade corridor connecting India to Song Dynasty China."
    },
    {
      id: "battle-raichur",
      title: "Battle of Raichur",
      date: "May 19, 1520 CE",
      year: 1520,
      civilizationId: "vijayanagara",
      civilization: "Vijayanagara Empire",
      location: "Raichur Doab, Karnataka",
      overview: "Decisive engagement between Emperor Krishnadevaraya and Sultan Ismail Adil Shah of Bijapur. Krishnadevaraya deployed combined infantry, cavalry, and artillery to storm the citadel.",
      significance: "Secured the fertile Krishna-Tungabhadra doab for Vijayanagara and showcased the integration of Portuguese firearms in Indian military strategy."
    },
    {
      id: "battle-haldighati",
      title: "Battle of Haldighati",
      date: "June 18, 1576 CE",
      year: 1576,
      civilizationId: "rajput_confederacy",
      civilization: "Rajput Kingdoms (Mewar)",
      location: "Haldighati Pass, Aravalli Range, Rajasthan",
      overview: "Pitched battle between the forces of Maharana Pratap of Mewar and the Mughal imperial army led by Man Singh I of Amber in the yellow-clay mountain pass of Haldighati.",
      significance: "Though tactically indecisive, Maharana Pratap refused to surrender, inaugurating 20 years of guerrilla resistance that liberated the majority of Mewar."
    },
    {
      id: "battle-saraighat",
      title: "Battle of Saraighat",
      date: "March 1671 CE",
      year: 1671,
      civilizationId: "ahom",
      civilization: "Ahom Kingdom",
      location: "Saraighat, Brahmaputra River, Guwahati",
      overview: "Riverine naval battle between the Mughal Empire led by Raja Ram Singh and the Kingdom of Assam commanded by General Lachit Borphukan.",
      significance: "Lachit's brilliant use of river terrain, nimble war boats (Bacharis), and psychological courage defeated the Mughal armada, preserving Assamese independence."
    },
    {
      id: "shivaji-coronation",
      title: "Coronation of Chhatrapati Shivaji",
      date: "June 6, 1674 CE",
      year: 1674,
      civilizationId: "maratha",
      civilization: "Maratha Empire",
      location: "Raigad Fort, Maharashtra",
      overview: "Gaga Bhatt of Varanasi officiated the Vedic Rajyabhisheka ceremony at Raigad Fort, formally coronating Shivaji as Chhatrapati of Hindavi Swarajya.",
      significance: "Established an independent, sovereign indigenous empire in India, shattering the myth of Mughal imperial invincibility."
    },
    {
      id: "battle-colachel",
      title: "Battle of Colachel",
      date: "August 10, 1741 CE",
      year: 1741,
      civilizationId: "maratha", // Associated regional index
      civilization: "Kingdom of Travancore",
      location: "Colachel, Kanyakumari, Tamil Nadu",
      overview: "King Marthanda Varma of Travancore decisively routed the naval expedition of the Dutch East India Company (VOC) under Admiral Eustachius De Lannoy.",
      significance: "First documented instance in Asian history where an Asian kingdom completely defeated an established European colonial naval power."
    },
    {
      id: "1857-revolt",
      title: "First War of Indian Independence (1857)",
      date: "May 10, 1857 CE",
      year: 1857,
      civilizationId: "freedom_movement",
      civilization: "Indian National Struggle",
      location: "Meerut, Delhi, Kanpur, Jhansi, Lucknow, Arrah",
      overview: "Massive spontaneous military mutiny and civilian uprising across northern and central India sparked by Mangal Pandey, led by Rani Lakshmibai, Nana Saheb, Tatya Tope, Kunwar Singh, and Begum Hazrat Mahal.",
      significance: "Brought an end to a century of rule by the British East India Company and sparked the flame of the national freedom movement."
    },
    {
      id: "dandi-march",
      title: "Dandi Salt March",
      date: "March 12 – April 6, 1930 CE",
      year: 1930,
      civilizationId: "freedom_movement",
      civilization: "Indian National Struggle",
      location: "Sabarmati Ashram to Dandi Beach, Gujarat",
      overview: "Mahatma Gandhi and 78 companions marched 240 miles on foot to the Arabian Sea to make salt in direct defiance of the British colonial salt monopoly.",
      significance: "Sparked the nationwide Civil Disobedience Movement, leading to the arrest of 60,000 freedom fighters and shaking colonial legitimacy worldwide."
    }
  ],

  // Interactive AI Historical Reconstructions for 6 Major Historical Sites
  reconstructions: [
    {
      id: "pataliputra",
      city: "Pataliputra & Sanchi Complex",
      period: "c. 250 BCE (Reign of Emperor Ashoka)",
      civilization: "Maurya Empire",
      coordinates: "25° 36' N, 85° 08' E",
      image: "assets/sanchi_ashoka_maurya.jpg",
      overview: "Reconstructing the Mauryan imperial capital and sacred stupa complexes under Emperor Ashoka, featuring the Great Stupa of Sanchi, the monolithic Ashokan Lion Capital Pillar under the celestial starry cosmos, and royal Dhamma rock edicts.",
      layers: {
        arch: { title: "80-Pillar Hall & Sal Palisade", description: "Polished Chunar sandstone columns at Kumhrar and subterranean wooden defensive palisades." },
        env: { title: "Ganges-Son River Confluence", description: "Vast riparian junction, flood levees, and monsoon mango groves." },
        people: { title: "Scribes, Monks & Hellenic Envoys", description: "Brahmi lipikaras, Buddhist monks in ochre robes, and Seleucid diplomatic retinues." },
        trade: { title: "River Barges & Silk Bazaars", description: "Riverine cargo vessels carrying Taxila lapis, Kalinga cotton, and punch-marked silver coins." }
      },
      sources: [
        { title: "Megasthenes' Indica", text: "A city 80 stadia long by 15 stadia wide, protected by 570 towers and a moat 600 feet broad." },
        { title: "Kumhrar Excavation (ASI 1912)", text: "Dr. Spooner unearthed the 80-pillar hypostyle hall with mirror-like Ashokan polish." }
      ]
    },
    {
      id: "dholavira",
      city: "Dholavira (Kotada Timba)",
      period: "c. 2400 BCE (Mature Harappan)",
      civilization: "Indus Valley Civilization",
      coordinates: "23° 53' N, 70° 13' E",
      image: "assets/dholavira_indus.jpg",
      overview: "Reconstructing the grand stone-built Harappan city in the Rann of Kutch, featuring the world's most sophisticated prehistoric stormwater harvesting system and multi-tiered citadels.",
      layers: {
        arch: { title: "Tripartite Stone Citadel", description: "Massive dressed limestone defensive walls, ceremonial stadiums, and gatehouses." },
        env: { title: "Seasonal Mansar & Manhar Streams", description: "Series of 16 rock-cut reservoirs with check dams storing 250,000 m³ of water." },
        people: { title: "Lapidary Artisans & Seal Carvers", description: "Bead polishers drilling carnelian with chert drills and merchants stamping steatite unicorn seals." },
        trade: { title: "Caravan Routes to Mesopotamia", description: "Bullock carts laden with copper ingots, etched carnelian, and shell bangles." }
      },
      sources: [
        { title: "ASI Dholavira Monograph", text: "Dr. R.S. Bisht documented the 10-character signboard in the Indus script discovered at the northern gateway." }
      ]
    },
    {
      id: "hampi",
      city: "Vijayanagara (Hampi)",
      period: "c. 1520 CE (Epoch of Krishnadevaraya)",
      civilization: "Vijayanagara Empire",
      coordinates: "15° 20' N, 76° 27' E",
      overview: "Reconstructing the golden medieval metropolis of Hampi on the boulder-strewn banks of the Tungabhadra River, bustling with jewel bazaars, musical pillars, and royal pavilions.",
      layers: {
        arch: { title: "Vitthala & Virupaksha Gopurams", description: "Granite temple towers, the monolithic Stone Chariot, and the stepped Pushkarani bath." },
        env: { title: "Tungabhadra River & Anegundi Hills", description: "Rushing granite rapids crossed by round coracle boats under boulder hills." },
        people: { title: "Imperial Guards, Poets & Portuguese Merchants", description: "Tenali Rama, royal dancing maidens, and horse traders from Lisbon and Hormuz." },
        trade: { title: "Sule Bazaar & Diamond Markets", description: "Open arcades piled with pearls, diamonds, Mysore sandalwood, and Venetian ducats." }
      },
      sources: [
        { title: "Domingo Paes Chronicles", text: "Recorded open diamond bazaars and streets wider than any in Europe filled with painted elephants." }
      ]
    },
    {
      id: "nalanda",
      city: "Nalanda Mahavihara",
      period: "c. 500 CE (Classical Gupta Era)",
      civilization: "Gupta Empire",
      coordinates: "25° 08' N, 85° 26' E",
      image: "assets/nalanda_gupta.jpg",
      overview: "Reconstructing the world's premier residential international university, surrounded by red brick viharas, meditation halls, and the towering Sariputta Stupa.",
      layers: {
        arch: { title: "9-Story Dharmaganja Library & Stupas", description: "Ratnasagara, Ratnodadhi, and Ratnaranjaka library towers and terracotta stupas." },
        env: { title: "Sacred Lotus Lakes & Mango Groves", description: "Reflective water basins where scholars debated under shade trees." },
        people: { title: "10,000 International Monks & Pandits", description: "Scholars from China, Korea, Tibet, and Persia studying astronomy, medicine, and logic." },
        trade: { title: "Royal Endowments & Palm-Leaf Scriptoriums", description: "Monks illuminating palm-leaf codices supported by the revenue of 200 royal villages." }
      },
      sources: [
        { title: "Travels of Xuanzang (Datang Xiyuji)", text: "Recorded that learned gatekeepers quizzed applicants at the entrance, admitting only 2 out of 10." }
      ]
    },
    {
      id: "thanjavur",
      city: "Thanjavur Brihadisvara",
      period: "c. 1010 CE (Consecration Year)",
      civilization: "Imperial Chola Dynasty",
      coordinates: "10° 46' N, 79° 07' E",
      image: "assets/thanjavur_chola.jpg",
      overview: "Reconstructing the completion and consecration of the Brihadisvara Temple (Big Temple), the world's tallest granite temple vimana crowned by an 80-ton monolithic stone cupola.",
      layers: {
        arch: { title: "Granite Vimana & Royal Fortifications", description: "216-foot carved granite tower without mortar, and the royal Sivaganga moat." },
        env: { title: "Kaveri River Delta & Paddy Canals", description: "Lush green delta irrigated by the ancient Grand Anicut (Kallanai) canal system." },
        people: { title: "400 Temple Dancers, Musicians & Chola Priests", description: "Bharatanatyam dancers, bronze sculptors casting Nataraja, and royal commanders." },
        trade: { title: "Merchant Guilds (Ayyavole 500)", description: "Spice and camphor trade linking the Kaveri delta to Sumatra and Guangzhou." }
      },
      sources: [
        { title: "Thanjavur Temple Stone Records", text: "Every donor, gold cup, dancer, and musician's name was carved into the granite basement." }
      ]
    },
    {
      id: "raigad",
      city: "Raigad Fort (Gibraltar of the East)",
      period: "c. 1674 CE (Shivaji's Coronation)",
      civilization: "Maratha Empire",
      coordinates: "18° 14' N, 73° 26' E",
      image: "assets/raigad_maratha.jpg",
      overview: "Reconstructing the impregnable mountain citadel of Raigad perched 2,700 feet above the Sahyadri valleys, venue of Chhatrapati Shivaji Maharaj's historic coronation.",
      layers: {
        arch: { title: "Raj Bhavan, Jagdishwar Temple & Nagarkhana", description: "Carved stone royal throne chamber with acoustic amplification, and the Maha Darwaza." },
        env: { title: "Sahyadri Mountain Clouds & Takmak Tok", description: "Steep vertical rock escarpments surrounded by swirling monsoon mists." },
        people: { title: "Mavala Warriors, Ashta Pradhans & Scribes", description: "Peshwas, Amatyas, and swordsmen carrying Bhavani Talwars." },
        trade: { title: "Two-Story Stone Bazaar (Holi Cha Mal)", description: "High stone arcades designed so cavalrymen could make purchases without dismounting." }
      },
      sources: [
        { title: "English Records of Henry Oxenden", text: "British envoy Oxenden recorded attending Shivaji's coronation and marveled at the impregnable fort layout." }
      ]
    }
  ]
};

// Export to global scope
window.HISTORICAL_DATA = HISTORICAL_DATA;
