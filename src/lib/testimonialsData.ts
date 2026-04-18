export type Testimonial = {
  name: string;
  role: string;
  company: string;
  industry: string;
  avatar: string;
  quote: string;
  results: string;
};

export const allTestimonials: Testimonial[] = [
  {
    name: "Sophie van den Berg",
    role: "Operations Manager",
    company: "Hotel Collection NL",
    industry: "Hospitality",
    avatar: "/images/testimonials/sophie-van-den-berg.png",
    quote:
      "We manage 12 hotels across Europe and needed a reliable merchandise partner. Merch Maverick delivered 400 custom staff uniforms with exceptional quality and attention to detail. Communication stayed clear at every stage, and we were confident enough to reorder for our other properties.",
    results: "400 uniforms, €8,400 saved",
  },
  {
    name: "Marco Bianchi",
    role: "Founder",
    company: "FitZone Gyms, Italy",
    industry: "Fitness",
    avatar: "/images/testimonials/marco-bianchi.png",
    quote:
      "We wanted branded gym wear for our 3 locations with our logo and colors. Got a quote in 90 minutes and the mockups looked amazing. The quality exceeded our expectations and the lead time was perfect. Our members love the branded gear and we're already planning our next order.",
    results: "600 items, €3,200 saved",
  },
  {
    name: "Melvin de la Cruz",
    role: "Event Director",
    company: "Melvin & Gatica Bachata",
    industry: "Events",
    avatar: "/images/testimonials/melvin-de-la-cruz.png",
    quote:
      "We've been using Merch Maverick for our bachata festival merchandise for 3 years now. Quality is consistently great, turnaround is fast, and the communication is excellent. Our dancers and attendees absolutely love the merch. The value for money is unbeatable.",
    results: "€20K+ orders, €6,000+ saved",
  },
  {
    name: "Anna Schmidt",
    role: "HR Manager",
    company: "TechCorp EU",
    industry: "Corporate",
    avatar: "/images/testimonials/anna-schmidt.png",
    quote:
      "We needed branded merchandise for our company rebrand — hoodies, t-shirts, and tote bags. The design support team helped us get the branding exactly right. The quality is premium and our employees love the gear. Highly recommend for any corporate merchandise needs.",
    results: "500 items, €5,000 saved",
  },
  {
    name: "Klaus Mueller",
    role: "Operations Director",
    company: "BuildForce Industrial",
    industry: "Industrial",
    avatar: "/images/testimonials/klaus-mueller.png",
    quote:
      "We needed custom work uniforms for our factory with specific safety requirements. Merch Maverick understood our needs immediately and delivered uniforms that met all our specifications. The quality is durable and professional. Great partnership.",
    results: "200 uniforms, €2,500 saved",
  },
  {
    name: "Alex Rivera",
    role: "Musician / Artist",
    company: "Independent Artist",
    industry: "Influencers",
    avatar: "/images/testimonials/alex-rivera.png",
    quote:
      "As a musician, I wanted to launch merch for my fans. Merch Maverick made it so easy — they helped with design, production, and logistics. My first merch drop sold out in 2 weeks! The quality is amazing and my fans are already asking for the next drop.",
    results: "500 merch items, €4,000 revenue",
  },
  {
    name: "Jennifer Lee",
    role: "Marketing Director",
    company: "Alpine Consulting",
    industry: "Corporate",
    avatar: "/images/testimonials/jennifer-lee.png",
    quote:
      "We needed branded merchandise for our client gifts. The quote process was fast, the mockups were perfect, and the delivery was on time. Our clients loved the quality and presentation. Definitely using Merch Maverick again.",
    results: "300 items, €2,800 saved",
  },
  {
    name: "David Thompson",
    role: "Studio Owner",
    company: "Iron Gym London",
    industry: "Fitness",
    avatar: "/images/testimonials/david-thompson.png",
    quote:
      "We wanted to create a sense of community with branded merchandise for our members. Merch Maverick's team understood our vision and delivered exactly what we needed. The quality is premium and our members feel like part of something special.",
    results: "400 items, €3,600 saved",
  },
  {
    name: "Maria Santos",
    role: "Dance School Director",
    company: "Santos Dance Academy",
    industry: "Influencers",
    avatar: "/images/testimonials/maria-santos.png",
    quote:
      "I run a dance school and wanted branded apparel for my students. Merch Maverick helped us design and produce custom dance wear. The process was seamless and the quality is fantastic. My students feel proud wearing our branded gear.",
    results: "150 items, €1,200 saved",
  },
  {
    name: "Roberto Rossi",
    role: "General Manager",
    company: "Rossi Restaurant Group",
    industry: "Hospitality",
    avatar: "/images/testimonials/roberto-rossi.png",
    quote:
      "We manage a restaurant group and needed consistent branded merchandise across all locations. Merch Maverick delivered on time, on budget, and with exceptional quality. The process stayed transparent from approval through delivery. Highly recommend.",
    results: "800 items, €6,500 saved",
  },
];

export const featuredTestimonials = allTestimonials.filter((testimonial) =>
  [
    "Sophie van den Berg",
    "Marco Bianchi",
    "Alex Rivera",
    "Anna Schmidt",
    "Melvin de la Cruz",
    "Klaus Mueller",
  ].includes(testimonial.name),
);
