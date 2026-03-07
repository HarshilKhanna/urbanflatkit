import { Tower } from "@/types";

export const DEFAULT_DATA: Tower = {
  flats: [
    {
      // Flat 101 — Living & Dining
      rooms: [
        {
          // Living Room
          items: [
            {
              id: "aeron-chair",
              name: "Aeron Chair",
              brand: "Herman Miller",
              category: "Furniture",
              description:
                "The iconic ergonomic task chair, engineered for long hours with PostureFit SL lumbar support and breathable 8Z Pellicle mesh.",
              imageUrl: "/images/aeron_.webp",
              externalUrl: "https://hermanmiller.com",
              externalLabel: "via Herman Miller",
              specs: {
                Material: "8Z Pellicle mesh",
                Adjustment: "PostureFit SL",
                Sizes: "A / B / C",
                "Weight limit": "136 kg",
              },
            },
            {
              id: "flow-sofa",
              name: "Flow Modular Sofa",
              brand: "Muuto",
              category: "Furniture",
              description:
                "A low-profile modular sofa with clean Scandinavian lines. Reconfigure for any living space.",
              imageUrl: "/images/flowmodular.webp",
              externalUrl: "https://muuto.com",
              externalLabel: "via Muuto",
              specs: {
                Frame: "Solid oak",
                Upholstery: "Textured fabric",
                Modules: "3-piece",
                Depth: "95 cm",
              },
            },
            {
              id: "pedrera-pendant",
              name: "Pedrera Pendant",
              brand: "Gubi",
              category: "Lighting",
              description:
                "A sculptural pendant light by Barba Corsini with perforated spherical shade. Diffuses light beautifully in any room.",
              imageUrl: "/images/pendant.webp",
              externalUrl: "https://gubi.com",
              externalLabel: "via Gubi",
              specs: {
                Diameter: "32 cm",
                Material: "Lacquered steel",
                Bulb: "E27",
                "Cord length": "300 cm",
              },
            },
            {
              id: "monstera-pot",
              name: "Monstera Deliciosa",
              brand: "The Sill",
              category: "Decor",
              description:
                "The classic statement houseplant. Large tropical leaves bring life and texture to any interior.",
              imageUrl: "/images/monstera.webp",
              externalUrl: "https://thesill.com",
              externalLabel: "via The Sill",
              specs: {
                Light: "Bright indirect",
                Water: "Every 1–2 weeks",
                Pot: "14-inch ceramic",
                "Pet safe": "No",
              },
            },
            {
              id: "string-shelf",
              name: "String Shelving Unit",
              brand: "String Furniture",
              category: "Furniture",
              description:
                "Modular wall-mounted shelving that grows with you. Mix panels, cabinets, and desks for a custom layout.",
              imageUrl: "/images/stringshelve.webp",
              externalUrl: "https://stringfurniture.com",
              externalLabel: "via String",
              specs: {
                Material: "Powder-coated steel",
                Depth: "28 cm",
                Modules: "Piano / Cabinet / Desk",
                Colour: "White, Black, Oak",
              },
            },
            {
              id: "hay-side-table",
              name: "About a Lounge Table",
              brand: "Hay",
              category: "Furniture",
              description:
                "Compact side table with a circular top and slender legs. Perfect beside a sofa or armchair.",
              imageUrl: "/images/lounge-table.webp",
              externalUrl: "https://hay.com",
              externalLabel: "via Hay",
              specs: {
                Top: "Oak or laminate",
                Legs: "Steel",
                Diameter: "45 cm",
                Height: "45 cm",
              },
            },
            {
              id: "ph5-pendant",
              name: "PH 5 Pendant",
              brand: "Louis Poulsen",
              category: "Lighting",
              description:
                "Poul Henningsen's iconic multi-shade pendant. Eliminates glare and casts a soft, even light.",
              imageUrl: "/images/ph5pendant.webp",
              externalUrl: "https://louispoulsen.com",
              externalLabel: "via Louis Poulsen",
              specs: {
                Diameter: "30 cm",
                Shades: "3-layer",
                Bulb: "E27",
                Finish: "White, Black, Chrome",
              },
            },
            {
              id: "anglepoise-type75",
              name: "Type 75 Desk Lamp",
              brand: "Anglepoise",
              category: "Lighting",
              description:
                "British classic task lamp with four springs. Direct light exactly where you need it.",
              imageUrl: "/images/anglepoise-type-75-desk-lamp-25.webp",
              externalUrl: "https://anglepoise.com",
              externalLabel: "via Anglepoise",
              specs: {
                Arm: "3-section",
                Base: "Cast iron",
                Bulb: "E27",
                Colours: "8 options",
              },
            },
            {
              id: "terrazzo-bowl",
              name: "Terrazzo Catch-All",
              brand: "Menu",
              category: "Decor",
              description:
                "Hand-cast terrazzo bowl for keys, coins, or fruit. Each piece has a unique chip pattern.",
              imageUrl: "/images/terrazo.webp",
              externalUrl: "https://menu.as",
              externalLabel: "via Menu",
              specs: {
                Material: "Terrazzo",
                Diameter: "22 cm",
                Finish: "Natural",
                "Care": "Wipe clean",
              },
            },
          ],
        },
        {
          // Dining Room
          items: [
            {
              id: "tulip-table",
              name: "Tulip Dining Table",
              brand: "Knoll",
              category: "Furniture",
              description:
                "Eero Saarinen's 1956 pedestal table — no legs to clutter the visual field. A design icon that fits any space.",
              imageUrl: "/images/tulip-dining.webp",
              externalUrl: "https://knoll.com",
              externalLabel: "via Knoll",
              specs: {
                Top: "Calacatta marble / laminate",
                Base: "Cast aluminium",
                Diameter: "120 cm",
                Seats: "4–6",
              },
            },
            {
              id: "arco-floor-lamp",
              name: "Arco Floor Lamp",
              brand: "Flos",
              category: "Lighting",
              description:
                "Castiglioni's arc lamp brings a ceiling light where there is none. The marble base counterweights the sweeping reach.",
              imageUrl: "/images/arco-floor.webp",
              externalUrl: "https://flos.com",
              externalLabel: "via Flos",
              specs: {
                Material: "Stainless steel + marble",
                Reach: "240 cm",
                Shade: "Spun aluminium",
                Bulb: "E27 max 150W",
              },
            },
            {
              id: "wishbone-chair",
              name: "Wishbone Chair",
              brand: "CH24",
              category: "Furniture",
              description:
                "Hans Wegner's Y-chair in solid wood and paper cord seat. A dining and desk classic.",
              imageUrl: "/images/wishbone_chair.webp",
              externalUrl: "https://carsten-jorgensen.com",
              externalLabel: "via CH24",
              specs: {
                Material: "Oak / Walnut / Ash",
                Seat: "Paper cord",
                Height: "74 cm",
                "Stackable": "Yes",
              },
            },
            {
              id: "kartell-bourgie",
              name: "Bourgie Table Lamp",
              brand: "Kartell",
              category: "Lighting",
              description:
                "Baroque-inspired table lamp in injection-moulded plastic. Crystal effect, modern twist.",
              imageUrl: "/images/bourgie-table.webp",
              externalUrl: "https://kartell.com",
              externalLabel: "via Kartell",
              specs: {
                Material: "Polycarbonate",
                Height: "66 cm",
                Switch: "In-line",
                Colours: "Clear, Black, Gold",
              },
            },
            {
              id: "flos-snoopy",
              name: "Snoopy Table Lamp",
              brand: "Flos",
              category: "Lighting",
              description:
                "Castiglioni's playful table lamp with a marble base and opal glass diffuser. Warm, even light.",
              imageUrl: "/images/snoopy.webp",
              externalUrl: "https://flos.com",
              externalLabel: "via Flos",
              specs: {
                Base: "Carrara marble",
                Shade: "Opal glass",
                Height: "34 cm",
                Bulb: "E27 max 150W",
              },
            },
            {
              id: "normann-copenhagen-block",
              name: "Block Table Lamp",
              brand: "Normann Copenhagen",
              category: "Lighting",
              description:
                "Minimal cube lamp with a soft, diffused glow. Touch dimmer and USB port on base.",
              imageUrl: "/images/block-table.webp",
              externalUrl: "https://normann-copenhagen.com",
              externalLabel: "via Normann Copenhagen",
              specs: {
                Material: "Concrete / Ceramic",
                Size: "12 × 12 cm",
                Dimmable: "Touch",
                "USB": "Yes",
              },
            },
            {
              id: "muuto-ambit",
              name: "Ambit Pendant",
              brand: "Muuto",
              category: "Lighting",
              description:
                "Sculptural pendant with a spun metal shade. Available in several sizes and soft colours.",
              imageUrl: "/images/Ambit-Pendant-White_1024x1024.webp",
              externalUrl: "https://muuto.com",
              externalLabel: "via Muuto",
              specs: {
                Diameter: "35 / 45 cm",
                Material: "Spun aluminium",
                Bulb: "E27",
                Colours: "6 options",
              },
            },
            {
              id: "ferm-living-mirror",
              name: "Circle Mirror",
              brand: "Ferm Living",
              category: "Decor",
              description:
                "Round wall mirror with a slim metal frame. Expands light and space in any room.",
              imageUrl: "/images/circle-mirror.webp",
              externalUrl: "https://fermliving.com",
              externalLabel: "via Ferm Living",
              specs: {
                Diameter: "60 cm",
                Frame: "Brushed brass / Black",
                "Mount": "Wall",
                Glass: "Safety back",
              },
            },
          ],
        },
      ],
    },
    {
      // Flat 202 — Bedroom & Kitchen
      rooms: [
        {
          // Bedroom
          items: [
            {
              id: "merino-throw",
              name: "Merino Wool Throw",
              brand: "Bemboka",
              category: "Textiles",
              description:
                "A generously sized throw woven from superfine merino. Naturally temperature-regulating and impossibly soft.",
              imageUrl: "/images/merino-wool.webp",
              externalUrl: "https://bemboka.com",
              externalLabel: "via Bemboka",
              specs: {
                Material: "100% merino wool",
                Size: "130 × 170 cm",
                Weight: "300 gsm",
                Care: "Dry clean",
              },
            },
            {
              id: "linen-cushion-set",
              name: "Linen Cushion Set",
              brand: "Society Limonta",
              category: "Textiles",
              description:
                "Stone-washed pure linen cushion covers with an invisible zipper. Improves with every wash.",
              imageUrl: "/images/linen-cushion.webp",
              externalUrl: "https://societylimonta.com",
              externalLabel: "via Society Limonta",
              specs: {
                Material: "100% pure linen",
                Sizes: "45×45 cm / 30×50 cm",
                Colours: "Sand, Ash, Chalk",
                Closure: "Invisible zip",
              },
            },
            {
              id: "berber-rug",
              name: "Beni Ourain Rug",
              brand: "Azilal Rugs",
              category: "Textiles",
              description:
                "Hand-knotted by Berber weavers in the Atlas Mountains. Each piece is one-of-a-kind with organic diamond motifs.",
              imageUrl: "/images/beni-ourain-rug.webp",
              externalUrl: "https://azilalrugs.com",
              externalLabel: "via Azilal Rugs",
              specs: {
                Material: "Natural undyed wool",
                Size: "200 × 300 cm",
                Pile: "High pile",
                Origin: "Morocco",
              },
            },
            {
              id: "ceramic-vase",
              name: "Column Vase",
              brand: "Audo Copenhagen",
              category: "Decor",
              description:
                "Cylindrical stoneware vase with a raw, tactile surface. Designed to stand alone or in a cluster.",
              imageUrl: "/images/Column-Vase-LSA-1.webp",
              externalUrl: "https://audocopenhagen.com",
              externalLabel: "via Audo",
              specs: {
                Material: "Stoneware",
                Height: "30 cm",
                Finish: "Raw matte",
                Opening: "5 cm",
              },
            },
            {
              id: "hay-mags-soft",
              name: "Mags Soft Low Board",
              brand: "Hay",
              category: "Furniture",
              description:
                "Low bed base with soft upholstered headboard. Clean lines, comfortable support.",
              imageUrl: "/images/hay-mags-soft-low-25-seater-sofa-comb-1-6.webp",
              externalUrl: "https://hay.dk",
              externalLabel: "via Hay",
              specs: {
                Sizes: "Single, Double, King",
                Headboard: "Upholstered",
                Material: "Steel, fabric",
                Legs: "Wood",
              },
            },
            {
              id: "string-bedside",
              name: "String Bedside Shelf",
              brand: "String Furniture",
              category: "Furniture",
              description:
                "Wall-mounted shelf unit that doubles as a nightstand. Fits books, lamp, and a glass.",
              imageUrl: "/images/stringbedside.webp",
              externalUrl: "https://stringfurniture.com",
              externalLabel: "via String",
              specs: {
                Width: "60 cm",
                Depth: "25 cm",
                Material: "Plywood, steel",
                Mount: "Wall",
              },
            },
            {
              id: "wool-blanket",
              name: "Wool Throw",
              brand: "Linum",
              category: "Textiles",
              description:
                "Heavy wool throw in a natural herringbone weave. Cosy for bed or sofa.",
              imageUrl: "/images/wool-throw-throw.webp",
              externalUrl: "https://linum.com",
              externalLabel: "via Linum",
              specs: {
                Material: "100% wool",
                Size: "130 × 180 cm",
                Weight: "1.2 kg",
                Colours: "Grey, Camel, Charcoal",
              },
            },
            {
              id: "cushion-linen",
              name: "Linen Cushion Cover",
              brand: "Tekla",
              category: "Textiles",
              description:
                "Square cushion cover in stonewashed linen. Soft, durable, and machine washable.",
              imageUrl: "/images/cushion-cover.webp",
              externalUrl: "https://tekla.com",
              externalLabel: "via Tekla",
              specs: {
                Material: "Linen",
                Size: "50 × 50 cm",
                "Insert": "Not included",
                Colours: "8 options",
              },
            },
            {
              id: "glass-vase-bedroom",
              name: "Bud Vase Set",
              brand: "Menu",
              category: "Decor",
              description:
                "Set of three hand-blown glass bud vases. For a single stem or small bouquet.",
              imageUrl: "/images/bud-vase-set.webp",
              externalUrl: "https://menu.dk",
              externalLabel: "via Menu",
              specs: {
                Material: "Glass",
                Set: "3 vases",
                Heights: "12, 16, 20 cm",
                Finish: "Clear",
              },
            },
          ],
        },
        {
          // Kitchen
          items: [
            {
              id: "nespresso-vertuo",
              name: "Vertuo Next",
              brand: "Nespresso",
              category: "Appliances",
              description:
                "Centrifusion brewing at the press of a button. Reads the barcode on every capsule to deliver the perfect cup.",
              imageUrl: "/images/vertuo-next.webp",
              externalUrl: "https://nespresso.com",
              externalLabel: "via Nespresso",
              specs: {
                Technology: "Centrifusion",
                Pressure: "19 bar",
                "Cup sizes": "Espresso to Alto",
                "Tank capacity": "1.1 L",
              },
            },
            {
              id: "smeg-toaster",
              name: "2-Slice Toaster",
              brand: "Smeg",
              category: "Appliances",
              description:
                "Retro-inspired toaster with six browning levels, a defrost function, and a crumb tray. A kitchen counter staple.",
              imageUrl: "/images/two-slice-toaster.webp",
              externalUrl: "https://smeg.com",
              externalLabel: "via Smeg",
              specs: {
                Slots: "2",
                "Browning levels": "6",
                Power: "950W",
                Colours: "Cream, Red, Black, Pastel Blue",
              },
            },
            {
              id: "sage-kettle",
              name: "Kettle",
              brand: "Sage",
              category: "Appliances",
              description:
                "Stainless steel kettle with variable temperature control. Ideal for tea and pour-over.",
              imageUrl: "/images/kettle.webp",
              externalUrl: "https://sageappliances.com",
              externalLabel: "via Sage",
              specs: {
                Capacity: "1.7 L",
                "Temp control": "5 presets",
                Material: "Stainless steel",
                Boil: "Quick boil",
              },
            },
            {
              id: "vitamix-blender",
              name: "Blender",
              brand: "Vitamix",
              category: "Appliances",
              description:
                "High-performance blender for smoothies, soups, and nut butters. Variable speed and pulse.",
              imageUrl: "/images/blender.webp",
              externalUrl: "https://vitamix.com",
              externalLabel: "via Vitamix",
              specs: {
                Capacity: "2 L",
                Motor: "2 HP",
                Speeds: "Variable + pulse",
                Jug: "BPA-free plastic",
              },
            },
            {
              id: "kitchenaid-mixer",
              name: "Stand Mixer",
              brand: "KitchenAid",
              category: "Appliances",
              description:
                "Iconic stand mixer with planetary action. Attachments for pasta, meat, and more.",
              imageUrl: "/images/stand-mixer.webp",
              externalUrl: "https://kitchenaid.com",
              externalLabel: "via KitchenAid",
              specs: {
                Bowl: "4.8 L",
                Power: "325 W",
                Attachments: "Optional",
                Colours: "Many",
              },
            },
            {
              id: "miele-dishwasher",
              name: "Dishwasher",
              brand: "Miele",
              category: "Appliances",
              description:
                "Quiet, efficient dishwasher with AutoOpen drying and flexible basket layout.",
              imageUrl: "/images/dishwasher.webp",
              externalUrl: "https://miele.com",
              externalLabel: "via Miele",
              specs: {
                Capacity: "14 place settings",
                Noise: "42 dB",
                Programs: "Auto, Eco, Quick",
                "Water softener": "Built-in",
              },
            },
            {
              id: "kitchen-towel-set",
              name: "Linen Tea Towels",
              brand: "Ferm Living",
              category: "Textiles",
              description:
                "Set of two linen tea towels with a striped weave. Absorbent and quick to dry.",
              imageUrl: "/images/linen-tea-towels.webp",
              externalUrl: "https://fermliving.com",
              externalLabel: "via Ferm Living",
              specs: {
                Material: "Linen",
                Set: "2",
                Size: "50 × 70 cm",
                Colours: "Natural, Grey, Striped",
              },
            },
          ],
        },
      ],
    },
  ],
};
