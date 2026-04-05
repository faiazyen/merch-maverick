import type { SolutionPageData } from "@/components/verticals/SolutionPageLayout";

const allVerticals = [
  { label: "Hospitality", href: "/solutions/hospitality" },
  { label: "Corporate", href: "/solutions/corporate" },
  { label: "Fitness", href: "/solutions/fitness" },
  { label: "Industrial", href: "/solutions/industrial" },
  { label: "Events", href: "/solutions/events" },
  { label: "Influencers & Artists", href: "/solutions/influencers-artists" },
];

function getRelated(current: string) {
  return allVerticals.filter((v) => v.href !== current);
}

export const solutionPages: Record<string, SolutionPageData> = {
  hospitality: {
    slug: "hospitality",
    icon: "utensils",
    title: "Hospitality",
    subtitle: "Hotels & Restaurants",
    heroHeadline: "Premium Uniforms for Hotels & Restaurants",
    heroDescription:
      "From front-desk elegance to kitchen durability — custom staff uniforms, linens, and branded merchandise designed for the hospitality industry.",
    overview:
      "The hospitality industry demands merchandise that balances professionalism, durability, and brand consistency. Whether you manage a boutique hotel or a restaurant chain, your staff's appearance directly impacts guest perception. We provide factory-direct uniforms, towels, bathrobes, and branded items — all customized to your brand identity and built to withstand daily commercial use.",
    products: [
      { name: "Staff Uniforms", description: "Polo shirts, dress shirts, and complete uniform sets with embroidered logos. Tailored fits available.", moq: "50 units", priceRange: "€9–18/unit" },
      { name: "Chef Coats & Aprons", description: "Durable chef whites, bistro aprons, and kitchen wear. Heat-resistant fabrics available.", moq: "30 units", priceRange: "€12–25/unit" },
      { name: "Hotel Towels & Linens", description: "Premium cotton towels, bathrobes, and bed linens with woven or embroidered branding.", moq: "100 units", priceRange: "€5–15/unit" },
      { name: "Bathrobes", description: "Luxury terry cloth and waffle-weave bathrobes. Custom sizing and embroidery.", moq: "50 units", priceRange: "€18–35/unit" },
      { name: "Front Desk Apparel", description: "Professional blazers, vests, and accessories for front-of-house staff.", moq: "20 units", priceRange: "€25–50/unit" },
      { name: "Guest Amenity Items", description: "Branded slippers, tote bags, and welcome kits for guest rooms.", moq: "100 units", priceRange: "€3–8/unit" },
    ],
    testimonial: {
      quote: "We manage 12 hotels across Europe and needed a reliable merchandise partner. Merch Maverick delivered 400 custom staff uniforms with exceptional quality and attention to detail. The production tracking portal is brilliant — we could see exactly what was happening at every stage.",
      name: "Sophie van den Berg",
      role: "Operations Manager",
      company: "Hotel Collection NL",
      results: "400 uniforms, €8,400 saved",
    },
    faqs: [
      { question: "What is the minimum order for hotel uniforms?", answer: "Our minimum order quantity starts at 50 units per style. For multi-property orders, we can mix styles within a single order." },
      { question: "Can you match our existing brand colors exactly?", answer: "Yes. We do Pantone color matching for all fabric dyes and embroidery threads. We'll send a color sample for approval before production." },
      { question: "How long does production take?", answer: "Standard production is 4–8 weeks. Rush orders are available in 7–10 days for an additional fee." },
      { question: "Do you offer towel and linen programs?", answer: "Yes. We provide custom towels, bed linens, and bathrobes with woven logos, embroidered branding, or custom labels." },
    ],
    ctaText: "Ready to Outfit Your Hotel Team?",
    relatedVerticals: getRelated("/solutions/hospitality"),
  },

  corporate: {
    slug: "corporate",
    icon: "building2",
    title: "Corporate",
    subtitle: "Tech & Office Brands",
    heroHeadline: "Branded Merchandise for Modern Companies",
    heroDescription:
      "Employee swag, client gifts, and branded apparel that reflects your company culture — produced factory-direct with premium quality.",
    overview:
      "Corporate merchandise is more than swag — it's a reflection of your brand culture and values. From onboarding kits to client gifts, your branded items represent your company at every touchpoint. We work with tech companies, consulting firms, and corporate brands across Europe to produce premium merchandise that employees actually want to wear.",
    products: [
      { name: "Branded Hoodies", description: "Premium cotton and cotton-blend hoodies with embroidered or printed logos. Unisex and fitted options.", moq: "50 units", priceRange: "€16–28/unit" },
      { name: "Corporate Polo Shirts", description: "Piqué and performance polos with custom embroidery. Perfect for team events and everyday office wear.", moq: "50 units", priceRange: "€9–15/unit" },
      { name: "Custom T-Shirts", description: "Heavyweight and lightweight options with screen printing or DTG printing. Multiple color options.", moq: "50 units", priceRange: "€6–12/unit" },
      { name: "Tote Bags & Accessories", description: "Canvas totes, laptop sleeves, and branded accessories for conferences and client gifts.", moq: "100 units", priceRange: "€4–10/unit" },
      { name: "Onboarding Kits", description: "Complete welcome kits with hoodie, tee, mug, and branded items. Custom packaging available.", moq: "25 kits", priceRange: "€35–60/kit" },
      { name: "Client Gift Sets", description: "Premium gift boxes with curated branded merchandise. Custom packaging and personalization.", moq: "25 sets", priceRange: "€30–75/set" },
    ],
    testimonial: {
      quote: "We needed branded merchandise for our company rebrand — hoodies, t-shirts, and tote bags. The design support team helped us get the branding exactly right. The quality is premium and our employees love the gear. Highly recommend for any corporate merchandise needs.",
      name: "Anna Schmidt",
      role: "HR Manager",
      company: "TechCorp EU",
      results: "500 items, €5,000 saved",
    },
    faqs: [
      { question: "Can you handle multi-location deliveries?", answer: "Yes. We can ship to multiple offices across Europe. Each location gets its own tracking number." },
      { question: "Do you offer design services?", answer: "Yes. Our design team can help with logo placement, color selection, and mockup creation — included in your quote." },
      { question: "What about reorders?", answer: "Reorders are simple. We keep your specifications on file, so subsequent orders are faster and easier." },
      { question: "Can we get samples before placing a large order?", answer: "Absolutely. We offer sample production for a small fee, which is credited against your first order." },
    ],
    ctaText: "Ready to Elevate Your Company Merch?",
    relatedVerticals: getRelated("/solutions/corporate"),
  },

  fitness: {
    slug: "fitness",
    icon: "dumbbell",
    title: "Fitness",
    subtitle: "Gyms & Activewear",
    heroHeadline: "Custom Activewear for Gyms & Fitness Brands",
    heroDescription:
      "Performance-driven gym wear, branded apparel, and merchandise that your members will actually want to wear — inside and outside the gym.",
    overview:
      "Fitness brands need merchandise that performs. From moisture-wicking tank tops to compression leggings, your branded gym wear must meet high standards for quality, comfort, and durability. We produce custom activewear for gyms, fitness studios, and athletic brands — using premium technical fabrics that look as good as they perform.",
    products: [
      { name: "Performance Tank Tops", description: "Moisture-wicking, breathable tank tops with printed or sublimated branding. Multiple fit options.", moq: "50 units", priceRange: "€7–12/unit" },
      { name: "Athletic T-Shirts", description: "Lightweight technical tees with DRI-FIT style fabric. Ideal for training and daily wear.", moq: "50 units", priceRange: "€8–14/unit" },
      { name: "Training Shorts", description: "Performance shorts with zipper pockets and branded waistband. Multiple lengths available.", moq: "50 units", priceRange: "€10–18/unit" },
      { name: "Compression Leggings", description: "High-quality compression tights with sublimated designs. Women's and men's styles.", moq: "50 units", priceRange: "€14–22/unit" },
      { name: "Gym Hoodies", description: "Heavyweight cotton-blend hoodies for post-workout. Embroidered or printed logos.", moq: "50 units", priceRange: "€16–25/unit" },
      { name: "Gym Bags & Accessories", description: "Branded duffle bags, towels, shaker bottles, and resistance bands.", moq: "100 units", priceRange: "€5–15/unit" },
    ],
    testimonial: {
      quote: "We wanted branded gym wear for our 3 locations with our logo and colors. Got a quote in 90 minutes and the mockups looked amazing. The quality exceeded our expectations and the lead time was perfect. Our members love the branded gear.",
      name: "Marco Bianchi",
      role: "Founder",
      company: "FitZone Gyms, Italy",
      results: "600 items, €3,200 saved",
    },
    faqs: [
      { question: "What fabric options are available for activewear?", answer: "We offer polyester, nylon, spandex blends, and technical moisture-wicking fabrics. We can source specific fabric compositions on request." },
      { question: "Can you do sublimation printing for all-over designs?", answer: "Yes. We offer both sublimation and screen printing. Sublimation works best on polyester fabrics for all-over designs." },
      { question: "Do you offer size runs for retail?", answer: "Yes. We can produce full size runs (XS–3XL) with individual size labels and retail-ready packaging." },
      { question: "What about sustainability options?", answer: "We offer recycled polyester and organic cotton options for eco-conscious fitness brands. OEKO-TEX certified." },
    ],
    ctaText: "Ready to Launch Your Gym's Merch Line?",
    relatedVerticals: getRelated("/solutions/fitness"),
  },

  industrial: {
    slug: "industrial",
    icon: "hardhat",
    title: "Industrial",
    subtitle: "Workwear & PPE",
    heroHeadline: "Durable Workwear & Industrial Uniforms",
    heroDescription:
      "Safety-compliant, branded work uniforms built for demanding environments — from factory floors to construction sites.",
    overview:
      "Industrial workwear must meet strict safety requirements while representing your brand professionally. We produce custom work uniforms, hi-vis jackets, coveralls, and safety apparel — all compliant with European safety standards and built to withstand the toughest working conditions.",
    products: [
      { name: "Work Uniforms", description: "Durable poly-cotton work shirts and pants with embroidered company branding. Industrial wash resistant.", moq: "50 units", priceRange: "€15–28/unit" },
      { name: "Hi-Vis Jackets", description: "EN ISO 20471 compliant high-visibility jackets with reflective strips and custom branding.", moq: "50 units", priceRange: "€22–40/unit" },
      { name: "Coveralls", description: "Full-body coveralls in various fabrics. Flame-resistant and anti-static options available.", moq: "30 units", priceRange: "€25–50/unit" },
      { name: "Safety Vests", description: "Lightweight reflective vests with printed company logos. Class 2 and Class 3 options.", moq: "100 units", priceRange: "€5–12/unit" },
      { name: "Work Polo Shirts", description: "Heavy-duty polo shirts suitable for workshop environments. Embroidered branding.", moq: "50 units", priceRange: "€10–18/unit" },
      { name: "Work Accessories", description: "Branded hard hat stickers, tool bags, and work gloves with company branding.", moq: "100 units", priceRange: "€3–10/unit" },
    ],
    testimonial: {
      quote: "We needed custom work uniforms for our factory with specific safety requirements. Merch Maverick understood our needs immediately and delivered uniforms that met all our specifications. The quality is durable and professional. Great partnership.",
      name: "Klaus Mueller",
      role: "Operations Director",
      company: "BuildForce Industrial",
      results: "200 uniforms, €2,500 saved",
    },
    faqs: [
      { question: "Do your products meet European safety standards?", answer: "Yes. Our industrial products comply with relevant EN/ISO standards. We provide compliance documentation with every order." },
      { question: "Can you produce flame-resistant workwear?", answer: "Yes. We source certified flame-resistant fabrics and can produce FR coveralls, jackets, and shirts." },
      { question: "What about ongoing supply agreements?", answer: "We offer annual supply agreements with locked-in pricing and priority production slots for regular orders." },
      { question: "How durable are your industrial uniforms?", answer: "Our industrial uniforms are designed for 100+ commercial washes. We use reinforced stitching and industrial-grade fabrics." },
    ],
    ctaText: "Ready to Equip Your Workforce?",
    relatedVerticals: getRelated("/solutions/industrial"),
  },

  events: {
    slug: "events",
    icon: "partypopper",
    title: "Events",
    subtitle: "Festivals & Tours",
    heroHeadline: "Branded Merchandise for Events & Festivals",
    heroDescription:
      "From festival tees to crew apparel — high-quality event merchandise that sells out and creates lasting memories.",
    overview:
      "Event merchandise is a revenue driver and brand builder. Whether you're organizing a music festival, corporate conference, or sporting event, your merchandise needs to be high-quality, delivered on time, and priced to maximize margins. We specialize in fast-turnaround event merch with rush production options.",
    products: [
      { name: "Event T-Shirts", description: "High-quality cotton tees with screen printing or DTG. Perfect for festival and event merchandise.", moq: "100 units", priceRange: "€6–10/unit" },
      { name: "Crew Apparel", description: "Branded staff and crew uniforms including polos, jackets, and lanyards.", moq: "30 units", priceRange: "€10–22/unit" },
      { name: "VIP Merchandise", description: "Premium limited-edition items for VIP packages — hoodies, caps, exclusive tees.", moq: "25 units", priceRange: "€18–35/unit" },
      { name: "Caps & Beanies", description: "Embroidered or printed caps, snapbacks, and beanies with event branding.", moq: "100 units", priceRange: "€5–12/unit" },
      { name: "Festival Gear", description: "Bandanas, wristbands, tote bags, and flags with event artwork.", moq: "200 units", priceRange: "€2–8/unit" },
      { name: "Tour Merchandise", description: "Complete tour merch packages with multiple designs and size runs.", moq: "200 units", priceRange: "€5–15/unit" },
    ],
    testimonial: {
      quote: "We've been using Merch Maverick for our bachata festival merchandise for 3 years now. Quality is consistently great, turnaround is fast, and the communication is excellent. Our dancers and attendees absolutely love the merch.",
      name: "Melvin de la Cruz",
      role: "Event Director",
      company: "Melvin & Gatica Bachata",
      results: "€20K+ orders, €6,000+ saved",
    },
    faqs: [
      { question: "Can you handle rush orders for last-minute events?", answer: "Yes. We offer rush production in 7–10 days for event merchandise. Contact us immediately for availability." },
      { question: "Do you offer merchandise sales at events?", answer: "We produce the merchandise; you handle sales. However, we can advise on sizing, quantities, and pricing strategy." },
      { question: "What's the minimum order for event tees?", answer: "100 units minimum for screen-printed tees. Lower minimums available for DTG printing." },
      { question: "Can you produce different designs for different events?", answer: "Absolutely. We can handle multiple designs in a single order with different artworks and sizes." },
    ],
    ctaText: "Ready to Create Your Event Merch?",
    relatedVerticals: getRelated("/solutions/events"),
  },

  "influencers-artists": {
    slug: "influencers-artists",
    icon: "music2",
    title: "Influencers & Artists",
    subtitle: "Creator Merch",
    heroHeadline: "Launch Your Brand. We Handle the Rest.",
    heroDescription:
      "One-stop merch solution for musicians, artists, content creators, and community leaders — from design to production to delivery.",
    overview:
      "As a creator, your merchandise is an extension of your brand and a way to connect with your community. But managing design, production, quality control, and logistics is complex and time-consuming. That's where we come in. We provide a complete merch solution — you focus on creating, we handle everything else. From your first merch drop to scaling your brand, we're your production partner.",
    products: [
      { name: "Merch Drop Collections", description: "Complete collection production — tees, hoodies, accessories. Perfect for limited drops and seasonal launches.", moq: "50 units", priceRange: "€8–25/unit" },
      { name: "Branded Apparel", description: "Premium hoodies, tees, and jackets with your branding. Embroidered, screen printed, or DTG.", moq: "50 units", priceRange: "€10–30/unit" },
      { name: "Community Gear", description: "Branded items for your community — caps, bags, stickers, and accessories.", moq: "100 units", priceRange: "€3–12/unit" },
      { name: "Limited Editions", description: "Small-batch premium items for exclusive drops — numbered editions, special packaging.", moq: "25 units", priceRange: "€20–50/unit" },
      { name: "Custom Packaging", description: "Branded mailer bags, tissue paper, stickers, and thank-you cards for the unboxing experience.", moq: "100 units", priceRange: "€1–5/unit" },
      { name: "Full-Service Design", description: "Our design team creates your merch designs from concept to production-ready artwork.", moq: "N/A", priceRange: "From €150" },
    ],
    testimonial: {
      quote: "As a musician, I wanted to launch merch for my fans. Merch Maverick made it so easy — they helped with design, production, and logistics. My first merch drop sold out in 2 weeks! The quality is amazing and my fans are already asking for the next drop.",
      name: "Alex Rivera",
      role: "Musician / Artist",
      company: "Independent Artist",
      results: "500 merch items, €4,000 revenue",
    },
    faqs: [
      { question: "Can you help design my merch if I don't have artwork?", answer: "Yes! Our design team can create designs from scratch based on your brand identity, references, and vision. Design services start at €150." },
      { question: "What's the best approach for a first merch drop?", answer: "Start with 2–3 core items (tee, hoodie, cap) in limited quantities. This tests demand with lower risk. We can help plan your drop strategy." },
      { question: "Can you handle fulfillment and shipping?", answer: "We produce and deliver your order to you or your warehouse. For individual customer fulfillment, we recommend partnering with a 3PL service." },
      { question: "How do I get started?", answer: "Send us your ideas, brand references, and quantity estimates. We'll provide a quote within 2 hours and mockups within 24 hours." },
    ],
    ctaText: "Ready to Launch Your Merch?",
    relatedVerticals: getRelated("/solutions/influencers-artists"),
  },
};
