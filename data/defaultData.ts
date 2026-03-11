import { Tower } from "@/types";

export const DEFAULT_DATA: Tower = {
  flats: [
    {
      // Sample flat — structured by room, aligned to essentials list
      rooms: [
        {
          // Living Room
          items: [
            {
              id: "sofa-3-seater",
              name: "3-Seater Sofa",
              brand: "Evercozy",
              category: "Furniture",
              description:
                "Three-seater sofa in a warm orange fabric for main seating.",
              imageUrl: "/orange-sofa-3-person-removebg-preview.png",
              externalUrl: "https://www.amazon.in/EverCozy-Italino-Luxurious-Furniture-Warranty/dp/B0FYZJN61C/ref=pd_ybh_a_d_sccl_11/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Width: "220 cm",
                Depth: "90 cm",
                Height: "90 cm",
                Seats: "3 seater",
              },
            },
            {
              id: "sofa-single-seater",
              name: "Single-Seater Sofa",
              brand: "Orange Tree",
              category: "Furniture",
              description:
                "Compact accent sofa with fabric upholstery and solid wood legs.",
              imageUrl: "/singleseater-removebg-preview.png",
              externalUrl:
                "https://www.orangetree.in/products/fior-1-seater-sofa",
              externalLabel: "via Orange Tree",
              specs: {
                Dimensions: "107L × 85W × 79H cm",
                Material: "Upholstery + mango wood",
                Finish: "Light walnut on wood",
                Seats: "1 seater accent sofa",
              },
            },
            {
              id: "centre-table-extensible",
              name: "Stacking Centre Table",
              brand: "Skaffix",
              category: "Furniture",
              description:
                "Round stacking coffee tables that extend living room surface.",
              imageUrl: "/centretablextensible-removebg-preview.png",
              externalUrl:
                "https://www.amazon.in/Skaffix-Stacking-Engineered-Black-White/dp/B0FDR2KB3N",
              externalLabel: "via Amazon",
              specs: {
                Dimensions: "55D × 55W × 45H cm",
                "Max load": "100 kg",
                Weight: "5 kg",
                Materials: "Metal frame, engineered wood top",
              },
            },
            {
              id: "tv",
              name: "Television",
              brand: "Sony",
              category: "Appliances",
              description:
                "Primary TV for the main entertainment zone.",
              imageUrl: "/tv-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Sony-inches-BRAVIA-Google-K-55S25BM2/dp/B0F7X5FC43/ref=sr_1_1_sspa?sr=8-1-spons&aref=pNXLyGJmAJ&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
              externalLabel: "via Amazon",
              specs: {
                Size: "55 in class",
                Resolution: "4K UHD",
              },
            },
            {
              id: "tv-cabinet-1",
              name: "TV Cabinet",
              brand: "Blesky",
              category: "Furniture",
              description:
                "Low TV unit with storage for consoles and accessories.",
              imageUrl: "/tv-unit-cabinet.avif",
              externalUrl: "https://www.bluewud.com/collections/tv-unit-furniture/products/blesky-tv-entertainment-unit-set-top-box-stand-tv-cabinet-with-shelves-ideal-for-upto-65-brown-maple-diy",
              externalLabel: "via Bluewud",
              specs: {
                Width: "180 cm",
                Height: "55 cm",
                Depth: "40 cm",
                Storage: "Closed drawers",
              },
            },
            {
              id: "normal-fan",
              name: "Ceiling Fan",
              brand: "Havells",
              category: "Appliances",
              description:
                "Standard ceiling fan for ambient air circulation.",
              imageUrl: "/normalfan-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Havells-Fusion-600mm-Ceiling-Brown/dp/B00B4BBR7Y/ref=pd_ybh_a_d_sccl_41/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Sweep: "1200 mm",
                Speed: "3-speed control",
              },
            },
            {
              id: "ac-living",
              name: "Living Room Split AC",
              brand: "Lloyd",
              category: "Appliances",
              description:
                "0.8T inverter split AC, ideal for compact living spaces.",
              imageUrl: "/ac-removebg-preview.png",
              externalUrl:
                "https://havells.com/lloyd/home-appliances/air-conditioners/split-ac/element-inverter-split-ac-08-3-star-gls09i3fosev.html",
              externalLabel: "via Havells Lloyd",
              specs: {
                "5 in 1 Convertible": "40 / 60 / 80 / 100 / Auto",
                "Smart 4-Way Swing": "Automatic 4-direction airflow",
                "Turbo Cool": "Rapid room cooling mode",
                "Installation Check": "Built-in installation diagnostics",
              },
            },
            {
              id: "living-room-lighting",
              name: "Ambient Lighting Set",
              brand: "Groeien",
              category: "Lighting",
              description:
                "Combined ceiling and accent lights for a warm, layered glow.",
              imageUrl: "/hanging-room.jpg",
              externalUrl: "https://www.amazon.in/Groeien-newPT-X3VH-0ZIP-40-Watts-Antique-Hanging/dp/B0922PQ32Q/ref=pd_ybh_a_d_sccl_23/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Circuits: "3 lighting circuits",
                "Colour temperature": "3000 K warm",
              },
            },
            {
              id: "buddha-statue",
              name: "Blessing Buddha Statue",
              brand: "Tansha Quo",
              category: "Decor",
              description:
                "Polyresin blessing Buddha idol in green and gold.",
              imageUrl:
                "/polyresin-gold-green-blessing-buddha-15-inch-by-tansha-quo-polyresin-gold-green-blessing-buddha-gb8vxb-removebg-preview.png",
              externalUrl: "https://shopps.in/product/buddha-statue-green/",
              externalLabel: "via Shopps.in",
              specs: {
                Sizes: "30 cm, 61 cm, 91 cm",
                Material: "Marble dust fibre",
                Dispatch: "Made-to-order, ships in ~1 week",
              },
            },
            {
              id: "tealight-holder-living",
              name: "White Stone Candle Holder",
              brand: "BeautifyMySpace",
              category: "Decor",
              description:
                "White stone candle holder with glass shade.",
              imageUrl: "/tealights_holder-removebg-preview.png",
              externalUrl:
                "https://beautifymyspace.com/product/white-stone-candle-holder-with-glass-shade-14-inches-tall/",
              externalLabel: "via BeautifyMySpace",
              specs: {
                Material: "Metal, marble dust, glass",
                Size: "H 43.18 cm × 10.16 cm",
                Colour: "Antique brass stand, brown glass shade",
                Shape: "Conical, three-sphere stem",
                Use: "Festivals, dining, home decor",
              },
            },
            {
              id: "tealight-antique-lamp",
              name: "Geometric Metal Tealight Holders",
              brand: "Etta Avenue",
              category: "Decor",
              description:
                "Set of geometric metal tealight holders for accents.",
              imageUrl: "/tealight-antiquelamp-removebg-preview.png",
              externalUrl:
                "https://www.wayfair.com/decor-pillows/pdp/etta-avenue-geometric-modern-metal-candle-holders-w002675046.html",
              externalLabel: "via Wayfair",
              specs: {
                Dimensions: "6 in H × 8 in D (overall)",
                Weight: "2.7 lb (set)",
                Material: "Metal",
                Candle: "Votive / tealight, set of holders",
              },
            },
            {
              id: "hanging-glass-bulb",
              name: "Honeycomb Glass Pendant Light",
              brand: "RBSK",
              category: "Lighting",
              description:
                "White honeycomb glass pendant for modern ambient lighting.",
              imageUrl: "/hanging-inverted-removebg-preview.png",
              externalUrl:
                "https://www.amazon.in/RBSK-Handmade-Decorative-Chandelier-Honeycomb/dp/B0FCD5ND3L",
              externalLabel: "via Amazon",
              specs: {
                Dimensions: "15L × 15W × 25H cm",
                Power: "20 W, E27 LED (not included)",
                Room: "Bedroom, dining, home office",
                Usage: "Indoor pendant lighting",
              },
            },
            {
              id: "clock-with-gears",
              name: "Gears Wall Clock",
              brand: "The Gears Clock",
              category: "Decor",
              description:
                "24-inch vintage wall clock with exposed moving gears.",
              imageUrl: "/clock-with-gear-removebg-preview.png",
              externalUrl:
                "https://www.thegearsclock.com/collections/all/products/wall-clock-real-moving-gears-24-inch-vintage-brown",
              externalLabel: "via The Gears Clock",
              specs: {
                Diameter: "60 cm",
                Power: "3 × AA batteries (not included)",
                Material: "Fir wood frame, plastic gears, metal hands",
                Style: "Industrial vintage with real moving gears",
              },
            },
            {
              id: "ushape-curve-sculpture",
              name: "Music Sculpture",
              brand: "Handicraftviet",
              category: "Decor",
              description:
                "Minimal U-shaped sculpture for shelves or consoles.",
              imageUrl: "/music-sculpture-removebg-preview.png",
              externalUrl: "https://www.amazon.com/gp/aw/d/B0BV6S7GJS/?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=cf77e1e25793005e73e7ceef57d26fa9&hsa_cr_id=0&sr=1-3-f02f01d6-adaf-4bef-9a7c-29308eff9043&ref_=sbx__sbtcd2_asin_2_img",
              externalLabel: "via Amazon",
              specs: {
                Height: "22 cm",
                Width: "10 cm",
                Depth: "6 cm",
                Material: "Resin / stone",
              },
            },
            {
              id: "umbrella-idols",
              name: "Umbrella Idols",
              brand: "Etsy Artist",
              category: "Decor",
              description:
                "Romantic couple figurine under an umbrella for console decor.",
              imageUrl: "/umbrellaidols-removebg-preview.png",
              externalUrl:
                "https://www.etsy.com/in-en/listing/4346907585/romantic-couple-figurine-love-sculpture",
              externalLabel: "via Etsy",
              specs: {
                Height: "28 cm",
                Width: "10 cm",
                Depth: "8 cm",
                Theme: "Romantic couple under umbrella",
              },
            },
            {
              id: "bluewhite-pottery",
              name: "Blue Gradient Coffee Cups (Set of 4)",
              brand: "Viola Beuscher",
              category: "Decor",
              description:
                "Handmade blue gradient coffee cups used as console accents.",
              imageUrl: "/blue-white-pottery-removebg-preview.png",
              externalUrl:
                "https://violabeuscher.com/en/products/blue-gradient-coffee-cups-set-of-4",
              externalLabel: "via Viola Beuscher",
              specs: {
                Diameter: "7 cm",
                Height: "6.5 cm",
                Capacity: "190 ml per cup",
                Set: "4 handmade coffee cups",
              },
            },
            {
              id: "red-artificial-flowers",
              name: "Red Hybrid Tea Rose Stem",
              brand: "The Faux Flower Company",
              category: "Decor",
              description:
                "Artificial red hybrid tea rose stem with realistic finish.",
              imageUrl: "/redartificialflowers-removebg-preview.png",
              externalUrl:
                "https://thefauxflowercompany.com/en-us/products/red-hybrid-tea-rose",
              externalLabel: "via The Faux Flower Company",
              specs: {
                Height: "52 cm",
                Width: "14 cm",
                Stem: "Wired, can be bent/trimmed",
                Colour: "Red hybrid tea rose",
              },
            },
    
          ],
        },
        {
          // Dining
          items: [
            {
              id: "marble-dining-table",
              name: "Marble Top Dining Table Set",
              brand: "Wooden Space",
              category: "Furniture",
              description:
                "Main marble-top dining table for four to six people.",
              imageUrl: "/diningset-removebg-preview.png",
              externalUrl: "https://www.amazon.in/WOODEN-SPACE-6-Seater-Composite-Furniture/dp/B0FQWFZKBF/ref=pd_ybh_a_d_sccl_41/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Seats: "6 seater",
                Length: "180 cm",
                Width: "90 cm",
                Top: "Marble",
              },
            },
            {
              id: "cutlery-crockery",
              name: "Crockery Set",
              brand: "La Opala",
              category: "Decor",
              description:
                "Plates, bowls, and serving ware for the dining table.",
              imageUrl: "/crockery-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Opala-Collection-Dinner-10-Autumn/dp/B0BXF8J4B9/ref=pd_ybh_a_d_sccl_40/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Pieces: "10 piece set",
                DinnerPlates: "4",
                Bowls: "4",
                ServingPlatters: "2",
              },
            },
            {
              id: "table-mats",
              name: "Table Mats",
              brand: "Leeonz",
              category: "Textiles",
              description:
                "Set of placemats for everyday dining use.",
              imageUrl: "/tablemats-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Leeonz%C2%AE-Placemats-Dining-Washable-Non-Slip/dp/B0C56XB13H/ref=pd_ybh_a_d_sccl_39/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Set: "6 mats",
                Length: "45 cm",
                Width: "30 cm",
                Material: "PVC blend",
              },
            },
          
            {
              id: "dining-vase",
              name: "Table Vase",
              brand: "Vendola",
              category: "Decor",
              description:
                "Vase used as a centrepiece on the dining table.",
              imageUrl: "/vase1-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Vendola-Plastic-Decorative-Ceramic-Unbreakable/dp/B0FRYDFDG4/ref=pd_ybh_a_d_sccl_38/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Height: "27 cm",
                Diameter: "12 cm",
                Material: "Matte ceramic",
                Use: "Centrepiece",
              },
            },
            {
              id: "dining-glasses",
              name: "Beverage Glasses",
              brand: "Rahas",
              category: "Decor",
              description:
                "Set of glasses for daily water and beverages.",
              imageUrl: "/glasses-removebg-preview.png",
              externalUrl: "https://www.amazon.in/RAHAS-Champagne-Flute-Wine-Glass/dp/B0C8Z5ZPB4/ref=pd_ybh_a_d_sccl_37/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Set: "6 glasses",
                Capacity: "270 ml each",
                Height: "22 cm",
                Material: "Crystal glass",
              },
            },
            {
              id: "twin-hanging-lampshade",
              name: "Twin Hanging Lampshades",
              brand: "Desidiya",
              category: "Lighting",
              description:
                "Pair of hanging lamps centered above a table.",
              imageUrl: "/twinhanging-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Desidiya-Pendant-Brushed-Kitchen-Lighting/dp/B0FCMSFCJ9/ref=pd_ybh_a_d_sccl_36/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Count: "2 pendants",
                Drop: "80 cm adjustable",
                ShadeDiameter: "18 cm",
                Finish: "Brushed brass",
              },
            },
            {
              id: "dining-centrepiece-bowl",
              name: "Dining Centrepiece Bowl",
              brand: "Kexes",
              category: "Decor",
              description:
                "Fruit or snack bowl used as a table centrepiece.",
              imageUrl: "/fruitbowldining-removebg-preview.png",
              externalUrl: "https://www.amazon.in/KEXES-WOKQIXAK-Classic-Chocolate-Decoration/dp/B0BRT23S7X/ref=pd_ybh_a_d_sccl_15/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Diameter: "28 cm",
                Height: "8 cm",
                Material: "Pressed glass",
                Use: "Fruit / snacks",
              },
            },
            {
              id: "dining-wall-art-2",
              name: "Room Artwork",
              brand: "Artsense",
              category: "Decor",
              description:
                "Secondary artwork completing the wall composition.",
              imageUrl: "/art2-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Artsense-abstract-wishtree-Decoration-Frame-Multicolor/dp/B0DF77RNJB/ref=pd_ybh_a_d_sccl_34/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Size: "50 × 70 cm",
                Type: "Art print",
              },
            },
          ],
        },
        {
          // Kitchen
          items: [
            {
              id: "gas-stove-3-burner",
              name: "3-Knob Gas Stove",
              brand: "Havells",
              category: "Appliances",
              description:
                "Three-burner gas stove on the counter.",
              imageUrl: "/gasstove.webp",
              externalUrl: "https://www.amazon.in/Havells-Toughened-Premium-Removable-Warranty/dp/B0G64R4DVW/ref=pd_ybh_a_d_sccl_33/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Burners: "3 burners",
                Width: "65 cm",
                Body: "Toughened glass",
                Ignition: "Auto ignition",
              },
            },
            {
              id: "induction-hob",
              name: "Induction Cooktop",
              brand: "Prestige",
              category: "Appliances",
              description:
                "Backup induction cooktop for quick electric cooking.",
              imageUrl: "/induction.jpg",
              externalUrl: "https://www.amazon.in/Prestige-IRIS-ECO-Induction-automatic/dp/B0C4DMRHYG/ref=pd_ybh_a_d_sccl_9/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Zones: "2 zones",
                Power: "1800 W",
                Control: "Touch panel",
                Timer: "180 minute",
              },
            },
            {
              id: "chimney-main",
              name: "Kitchen Chimney",
              brand: "Faber",
              category: "Appliances",
              description:
                "Wall-mounted chimney hood over the cooktop.",
              imageUrl: "/chimney.jpg",
              externalUrl: "https://www.amazon.in/Faber-Autoclean-Filterless-Collector-Comprehensive/dp/B0F2HGMCL4/ref=pd_ybh_a_d_sccl_35/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Width: "60 cm",
                Suction: "1100 m³/h",
                Filter: "Filterless",
                Noise: "58 dB",
              },
            },
            {
              id: "double-door-fridge",
              name: "Double Door Refrigerator",
              brand: "Samsung",
              category: "Appliances",
              description:
                "Primary double-door refrigerator with freezer and fridge.",
              imageUrl: "/fridge-double.jpg",
              externalUrl: "https://www.amazon.in/Samsung-Convertible-Inverter-Refrigerator-RS76CG8003S9HL/dp/B0BQC4Y4TP/ref=pd_ybh_a_d_sccl_30/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "280 L",
                Doors: "2 doors",
                Technology: "Convertible 5-in-1",
                Finish: "Graphite steel",
              },
            },
            {
              id: "electric-kettle",
              name: "Electric Kettle",
              brand: "Wipro",
              category: "Appliances",
              description:
                "Electric kettle for boiling water and quick beverages.",
              imageUrl: "/kettle.webp",
              externalUrl: "https://www.amazon.in/Wipro-electric-Kettle-Triple-Protection/dp/B0DT9VHYB3/ref=sr_1_1_sspa?s=kitchen&sr=1-1-spons&aref=L22nkn6dO9&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "1700 ml",
                Power: "2000 W",
                Body: "Borosilicate glass",
                Illumination: "Blue LED ring",
              },
            },
            {
              id: "microwave-oven",
              name: "Microwave Oven",
              brand: "Panasonic",
              category: "Appliances",
              description:
                "Microwave for reheating and basic baking.",
              imageUrl: "/microwave.webp",
              externalUrl: "https://www.amazon.in/Panasonic-Microwave-NN-ST310QBFG-Black-Menus/dp/B0D7MFQLJR/ref=pd_ybh_a_d_sccl_19/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "25 L",
                Power: "800 W",
                AutoMenus: "85",
                Type: "Solo / convection",
              },
            },
            {
              id: "water-purifier",
              name: "Water Purifier",
              brand: "Native",
              category: "Appliances",
              description:
                "Mounted water purifier providing safe drinking water.",
              imageUrl: "/water-purifier.webp",
              externalUrl: "https://www.amazon.in/Native-Purifier-RO-Copper-Alkaline/dp/B0D79G62J3/ref=pd_ybh_a_d_sccl_8/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Stages: "6 stage",
                Tank: "8 L",
                TDSLimit: "2000 ppm",
                Type: "RO / UV",
              },
            },
            {
              id: "countertop-with-drawers",
              name: "Grey Shagreen Console with Drawers",
              brand: "Picture Perfect Home",
              category: "Furniture",
              description:
                "Grey faux shagreen console with two drawers and slim metal frame.",
              imageUrl: "/countertop-with-drawers-removebg-preview.png",
              externalUrl:
                "https://pictureperfecthome.co.uk/product/grey-faux-shagreen-leather-and-gold-metal-2-drawer-console-table-desk/",
              externalLabel: "via Picture Perfect Home",
              specs: {
                Dimensions: "W 130.5 × D 45 × H 76 cm",
                Material: "Faux leather, metal, wood",
                Colour: "Grey, black, gold",
                Storage: "Two drawers, console table",
              },
            },
            {
              id: "teapot",
              name: "Teapot",
              brand: "Glenburn Tea District",
              category: "Decor",
              description:
                "Teapot used for serving tea on a counter or table.",
              imageUrl: "/teapot.jpg",
              externalUrl: "https://www.amazon.in/Glenburn-Tea-Direct-Ceramic-Infuser/dp/B00M91DIWK/ref=pd_ybh_a_d_sccl_29/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "400 mL",
                Use: "Tea service",
              },
            },
            
          ],
        },
        {
          // Bedroom
          items: [
            {
              id: "bed-main",
              name: "Bed",
              brand: "Nilkamal",
              category: "Furniture",
              description:
                "Main double bed sized for two.",
              imageUrl: "/bed-removebg-preview.png",
              externalUrl: "https://www.amazon.in/Nilkamal-Arthur-Engineered-Without-Storage/dp/B09RZXQZ2N/ref=pd_ybh_a_d_sccl_13/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Size: "Queen / king (160 cm)",
                Length: "200 cm",
                HeadboardHeight: "90 cm",
                Storage: "Optional under-bed storage",
              },
            },
            {
              id: "mattress",
              name: "Mattress",
              brand: "Roma Puf",
              category: "Textiles",
              description:
                "Comfortable mattress on the main bed.",
              imageUrl: "/mattress-removebg-preview.png",
              externalUrl: "https://www.amazon.in/ROMA-PUF-Double-Reversible-Mattress/dp/B0B7BCDYP9/ref=pd_ybh_a_d_sccl_7/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Thickness: "5 in",
                Type: "Foam / spring",
              },
            },
            // removed bedside table and working table per requirements
            {
              id: "bedside-lamp",
              name: "Bedside Lamp",
              brand: "Tu Casa",
              category: "Lighting",
              description:
                "Table lamp on the bedside for reading and soft light.",
              imageUrl: "/bedsidelamp-removebg-preview.png",
              externalUrl: "https://www.amazon.in/casa-Table-Portable-Lamp-Housewarming/dp/B06XWBCJYL/ref=pd_ybh_a_d_sccl_44/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Height: "45 cm",
                ShadeDiameter: "25 cm",
                BaseDiameter: "15 cm",
                Type: "Table lamp",
              },
            },
            {
              id: "bedroom-curtains",
              name: "Curtains",
              brand: "HFI",
              category: "Textiles",
              description:
                "Curtains for privacy and light control.",
              imageUrl: "/curtains.webp",
              externalUrl: "https://www.amazon.in/HFI-Royal-Silky-Grommet-Curtain/dp/B08WHN8SWZ/ref=pd_ybh_a_d_sccl_21/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Drop: "7 feet",
                Type: "Blackout / sheer mix",
              },
            },
            {
              id: "pillow-covers",
              name: "Pillow Covers",
              brand: "CaliTime",
              category: "Textiles",
              description:
                "Set of pillow covers complementing the bedding palette.",
              imageUrl: "/pillowcover.webp",
              externalUrl: "https://www.amazon.in/CaliTime-Pillow-Covers-Decoration-Chenille/dp/B08HLN8NCK/ref=pd_ybh_a_d_sccl_6/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Set: "4 covers",
                Size: "45 × 70 cm",
                Fabric: "Chenille blend",
                Closure: "Hidden zipper",
              },
            },
            {
              id: "bedroom-mirror-long",
              name: "Long Curve-Top Mirror",
              brand: "The Artment",
              category: "Decor",
              description:
                "Full-height curve-top mirror.",
              imageUrl: "/mirrorcurvetop.webp",
              externalUrl: "https://www.amazon.in/Artment-artistic-apartment-Floor-Mirror/dp/B0DQ4XVSCV/ref=pd_ybh_a_d_sccl_20/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Height: "155 cm",
                Placement: "Lean or wall-mounted",
              },
            },
            {
              id: "bedroom-art-1",
              name: "Wall Abstract Art",
              brand: "DSH Crafting",
              category: "Decor",
              description:
                "Wall art placed above a bed or sofa for visual interest.",
              imageUrl: "/wallart-removebg-preview.png",
              externalUrl: "https://www.amazon.in/DSH-Hanging-Office-Bedroom-Decoration/dp/B09TJCNM6H/ref=pd_bxgy_thbs_d_sccl_1/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Size: "46 x 19 inches",
                Type: "Framed art",
              },
            },
            {
              id: "bedroom-sculpture",
              name: "Bedroom Sculpture",
              brand: "Rianz",
              category: "Decor",
              description:
                "Decorative sculpture object on bedside or console.",
              imageUrl: "/antler-removebg-preview.png",
              externalUrl: "https://www.amazon.in/RIANZ%C2%AE-Pair-Luxury-Showpiece-Living/dp/B0FQ3XMKPX/ref=pd_ybh_a_d_sccl_22/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Height: "22.5 cm",
                Style: "Modern",
              },
            },
          ],
        },
        {
          // Entrance / Circulation
          items: [
            {
              id: "entrance-pot-stand",
              name: "Entrance Pot Stand",
              brand: "Generic",
              category: "Decor",
              description:
                "Floor-standing metal pot stand holding planters.",
              imageUrl: "/potstand-removebg-preview.png",
              externalUrl: "https://www.amazon.in/dp/B09KNMTNX1?ref_=cm_sw_r_cso_wa_apan_dp_1AXJS46V5K0FXEZ66Y7Y",
              externalLabel: "via Amazon",
              specs: {
                Mounting: "Floor standing",
                Dimensions: "23D × 23W × 56H cm",
              },
            },
            // removed doormats and shoe rack per requirements
            {
              id: "circle-mirror-entrance",
              name: "Circle Mirror",
              brand: "A. R. Creatives",
              category: "Decor",
              description:
                "Round mirror for quick checks before stepping out.",
              imageUrl: "/circle-mirror.webp",
              externalUrl: "https://www.amazon.in/R-CREATIVES-Frame-Decorative-Wall-Mounted/dp/B0FCD7V523/ref=sr_1_10?s=kitchen&sr=1-10",
              externalLabel: "via Amazon",
              specs: {
                Diameter: "70 cm",
                FrameDepth: "3 cm",
                Weight: "4 kg",
                Shape: "Circular",
              },
            },
          ],
        },
        {
          // Utility / Bathroom / Appliances
          items: [
            
            {
              id: "washing-machine",
              name: "Washing Machine",
              brand: "LG",
              category: "Appliances",
              description:
                "Washing machine for everyday laundry.",
              imageUrl: "/washingmachine.webp",
              externalUrl: "https://www.amazon.in/LG-Technology-Automatic-T80VBMB4Z-Turbodrum/dp/B0DPHTSTYJ/ref=pd_ybh_a_d_sccl_32/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "8 kg",
                SpinSpeed: "780 rpm",
                Pulsator: "Turbodrum",
                Type: "Top load",
              },
            },
            {
              id: "iron",
              name: "Iron",
              brand: "Havells",
              category: "Appliances",
              description:
                "Electric iron for pressing clothing at home.",
              imageUrl: "/iron.webp",
              externalUrl: "https://www.amazon.in/Havells-Glace-Plus-1000W-Royal/dp/B08WX6S5KF/ref=pd_ybh_a_d_sccl_11/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Wattage: "1000 W",
                Type: "Dry",
              },
            },
            {
              id: "ironing-board",
              name: "Ironing Board",
              brand: "Bathla",
              category: "Furniture",
              description:
                "Foldable ironing board for pressing clothes.",
              imageUrl: "/ironboard.jpg",
              externalUrl: "https://www.amazon.in/ATHENACREATIONS-Multi-Purpose-Convertible-Multi-Use-Foldable/dp/B01MYGSIUO/ref=pd_ybh_a_d_sccl_10/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Length: "120 cm",
                Width: "38 cm",
                Height: "90 cm",
                Feature: "Foldable",
              },
            },
            // removed foldable chair per requirements
            {
              id: "air-purifier",
              name: "Air Purifier",
              brand: "Levoit",
              category: "Appliances",
              description:
                "Air purifier servicing primary seating and sleep zones.",
              imageUrl: "/air purifier.jpg",
              externalUrl: "https://www.amazon.in/LEVOIT-Core-Mini-Fragrance-Frenshener/dp/B0CG1N11DV/ref=pd_ybh_a_d_sccl_12/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Coverage: "183 sq ft",
                CADR: "90 m³/h",
                FanSpeeds: "3",
                Filter: "HEPA",
              },
            },
            {
              id: "diffuser",
              name: "Diffuser",
              brand: "Air Roma",
              category: "Decor",
              description:
                "Scent diffuser to keep the flat fragrant and welcoming.",
              imageUrl: "/diffuser.webp",
              externalUrl: "https://www.amazon.in/Essential-Lemongrass-Ultrasonic-Aromatherapy-Humidifier/dp/B0BYVRJW7T/ref=pd_ybh_a_d_sccl_28/521-0094499-9118856",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "150 ml",
                Runtime: "8 hours",
                Modes: "3 mist modes",
                Type: "Reed / electric",
              },
            },
            {
              id: "soap-dispenser",
              name: "Soap Dispenser (White Marble)",
              brand: "Generic",
              category: "Decor",
              description:
                "White marble-look soap dispenser next to the basin.",
              imageUrl: "/soapdisp.jpg",
              externalUrl: "https://www.amazon.in/Handcrafted-Dispenser-Stainless-Refillable-Countertop/dp/B0DSCF5SNT/ref=pd_ybh_a_d_sccl_18/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Capacity: "280 ml",
                Height: "18 cm",
                Diameter: "7 cm",
                Finish: "Marble effect",
              },
            },
            {
              id: "illuminated-mirror",
              name: "Illuminated Circular Mirror",
              brand: "Generic",
              category: "Decor",
              description:
                "Backlit circular mirror above a wash basin.",
              imageUrl: "/illuminatedmirror.webp",
              externalUrl: "https://www.amazon.in/Bathroom-Control-Circular-Illuminated-Pattern/dp/B0GFLNNQ61/ref=pd_ybh_a_d_sccl_17/521-0094499-9118856?psc=1",
              externalLabel: "via Amazon",
              specs: {
                Diameter: "72 cm",
                Depth: "3 cm",
                Weight: "6 kg",
                Shape: "Circular",
              },
            },
          ],
        },
      ],
    },
  ],
};
