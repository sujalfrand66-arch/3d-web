export interface SeoPageData {
  slug: string; // e.g. "about", "services/web-development"
  canonicalUrl: string;
  title: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  eyebrow: string;
  leadParagraph: string;
  sections: {
    heading: string;
    body: string[];
    listItems?: string[];
  }[];
  relatedLinks: {
    label: string;
    url: string;
  }[];
  schemaType: string;
  customSchema?: Record<string, unknown>;
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "about",
    canonicalUrl: "https://lfeditor.in/about/",
    title: "About Us — Sujal Frand & Anmol Frand | XWEBSITEWALA",
    metaDescription: "Learn about XWEBSITEWALA, a creative web design and development studio founded by Sujal Frand and Anmol Frand in Suratgarh, Rajasthan.",
    keywords: "about XWEBSITEWALA, Sujal Frand, Anmol Frand, web designer Suratgarh, web developer Rajasthan, creative studio Suratgarh",
    h1: "About XWEBSITEWALA — Sujal Frand & Anmol Frand",
    eyebrow: "FOUNDERS & STUDIO STORY",
    leadParagraph: "XWEBSITEWALA is an independent web design and development studio founded by two brothers, Sujal Frand and Anmol Frand, based in Suratgarh, Rajasthan.",
    sections: [
      {
        heading: "Our Philosophy: Purpose-Driven Digital Architecture",
        body: [
          "We started XWEBSITEWALA with a simple observation: most websites are either overly generic templates that load slowly or visual experiments that fail to convert.",
          "We believe every modern business deserves a digital presence that feels distinctive, loads instantly, and delivers genuine measurable results. We care about the details people usually overlook — typography rhythm, micro-interactions, responsive fluidity, and clean underlying code."
        ],
        listItems: [
          "Founded in Suratgarh, Rajasthan — serving local and global businesses",
          "Engineered with modern frontend technologies: React, TypeScript, GSAP, and Vite",
          "Focused on performance, Core Web Vitals, and technical SEO from day one",
          "100% custom-crafted digital solutions without reliance on bloated themes"
        ]
      },
      {
        heading: "Meet the Team Behind XWEBSITEWALA",
        body: [
          "Sujal Frand leads UI/UX design, visual hierarchy, and core frontend architecture. With a passion for editorial typography and interaction design, Sujal ensures every interface feels intuitive and premium.",
          "Anmol Frand specializes in creative development, motion choreography, and full-stack integration, transforming complex wireframes into responsive, high-performance web applications."
        ]
      }
    ],
    relatedLinks: [
      { label: "View Our Services", url: "/services/" },
      { label: "Explore Projects", url: "/projects/" },
      { label: "Contact Us", url: "/contact/" },
      { label: "Suratgarh Web Services", url: "/locations/suratgarh/" }
    ],
    schemaType: "AboutPage",
    customSchema: {
      "@type": "AboutPage",
      "@id": "https://lfeditor.in/about/#webpage",
      "url": "https://lfeditor.in/about/",
      "name": "About Us — Sujal Frand & Anmol Frand | XWEBSITEWALA",
      "description": "Learn about XWEBSITEWALA, a creative web design and development studio founded by Sujal Frand and Anmol Frand in Suratgarh, Rajasthan.",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lfeditor.in/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://lfeditor.in/about/" }
        ]
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "XWEBSITEWALA",
        "founders": [
          { "@type": "Person", "name": "Sujal Frand" },
          { "@type": "Person", "name": "Anmol Frand" }
        ],
        "location": {
          "@type": "PostalAddress",
          "addressLocality": "Suratgarh",
          "addressRegion": "Rajasthan",
          "addressCountry": "IN"
        }
      }
    }
  },
  {
    slug: "services",
    canonicalUrl: "https://lfeditor.in/services/",
    title: "Web Design & Web Development Services | XWEBSITEWALA",
    metaDescription: "Explore custom web design, frontend web development, UI/UX interface design, e-commerce, and technical SEO services from XWEBSITEWALA in Suratgarh, Rajasthan.",
    keywords: "web design services, web development services, UI UX design, ecommerce website developer, SEO services Rajasthan, Suratgarh web agency",
    h1: "Creative Web Services & Digital Craft",
    eyebrow: "CAPABILITIES & CRAFT",
    leadParagraph: "We build custom, high-performance websites tailored to your business goals. From concept to launch, our services combine aesthetic precision with modern engineering.",
    sections: [
      {
        heading: "Full-Spectrum Web Capabilities",
        body: [
          "Whether you need a custom corporate website, an interactive product showcase, or an e-commerce platform, XWEBSITEWALA delivers bespoke digital solutions built for scalability, speed, and search visibility."
        ],
        listItems: [
          "Custom Web Development: Fast React & TypeScript applications built without bloated templates",
          "Modern Web Design: Visual branding, responsive grid layouts, and editorial typography",
          "UI / UX Design: Intuitive customer journeys, wireframes, and conversion-centered design",
          "E-Commerce Solutions: Online stores with seamless checkout and payment gateway integrations",
          "Technical SEO & Optimization: Core Web Vitals tuning, structured data, and on-page SEO architecture"
        ]
      }
    ],
    relatedLinks: [
      { label: "Custom Web Development", url: "/services/web-development/" },
      { label: "Modern Web Design", url: "/services/web-design/" },
      { label: "UI / UX Design", url: "/services/ui-ux-design/" },
      { label: "E-Commerce Development", url: "/services/ecommerce/" },
      { label: "Technical SEO Services", url: "/services/seo/" },
      { label: "View Portfolio", url: "/projects/" }
    ],
    schemaType: "CollectionPage"
  },
  {
    slug: "services/web-development",
    canonicalUrl: "https://lfeditor.in/services/web-development/",
    title: "Custom Web Development Services in Rajasthan | XWEBSITEWALA",
    metaDescription: "Modern frontend and custom web development by XWEBSITEWALA. Built with React, TypeScript, scalable architecture, and fast load times.",
    keywords: "custom web development Rajasthan, React web developer Suratgarh, frontend developer Rajasthan, modern website development, web application developer",
    h1: "Custom Web Development & Modern Frontend Engineering",
    eyebrow: "REACT, TYPESCRIPT & NEXT-GEN FRONTEND",
    leadParagraph: "We engineer lightning-fast, scalable web applications crafted from scratch using React, TypeScript, and clean semantic architecture.",
    sections: [
      {
        heading: "Engineered for Performance and Longevity",
        body: [
          "A slow website loses customers before they even read your headline. We do not use bloated pre-made templates or heavy page builders that drag down load speeds.",
          "Our engineering workflow focuses on clean modular code, optimized bundle sizes, responsive fluid layouts across mobile and desktop, and rigorous cross-browser testing."
        ],
        listItems: [
          "Custom React & TypeScript architecture for responsive flexibility",
          "Near-instant page loads optimized for Google Core Web Vitals (LCP, CLS, INP)",
          "RESTful API & headless CMS integrations for seamless content management",
          "Semantic HTML5 structure ensuring comprehensive accessibility and indexability"
        ]
      }
    ],
    relatedLinks: [
      { label: "Web Design Services", url: "/services/web-design/" },
      { label: "Technical SEO", url: "/services/seo/" },
      { label: "Explore Projects", url: "/projects/" },
      { label: "Hire Web Developer", url: "/contact/" }
    ],
    schemaType: "Service"
  },
  {
    slug: "services/web-design",
    canonicalUrl: "https://lfeditor.in/services/web-design/",
    title: "Modern Website Design & Visual Architecture | XWEBSITEWALA",
    metaDescription: "Bespoke website design services in Suratgarh & Rajasthan. Clean typography, visual hierarchy, user-first layouts, and brand-tailored aesthetics.",
    keywords: "website design Suratgarh, web designer Rajasthan, modern web design, UI design agency, creative website design",
    h1: "Modern Web Design & Digital Brand Architecture",
    eyebrow: "VISUAL HIERARCHY & BESPOKE AESTHETICS",
    leadParagraph: "We design memorable digital experiences that command attention, communicate your brand value, and guide visitors toward clear action.",
    sections: [
      {
        heading: "Design That Connects and Converts",
        body: [
          "Great web design is not just about making things look attractive; it is about establishing immediate clarity and trust with your audience.",
          "We structure every layout with deliberate typographic rhythm, balanced whitespace, purposeful color palettes, and micro-interactions that elevate your brand above ordinary competitors."
        ],
        listItems: [
          "Bespoke visual identity tailored to your industry and brand ethos",
          "Mobile-first responsive layouts that look pristine on any screen size",
          "High-contrast, accessible typography with clear content hierarchy",
          "Conversion-focused design elements crafted to turn visitors into inquiries"
        ]
      }
    ],
    relatedLinks: [
      { label: "UI / UX Design", url: "/services/ui-ux-design/" },
      { label: "Web Development", url: "/services/web-development/" },
      { label: "Client Portfolio", url: "/projects/" },
      { label: "Contact Us", url: "/contact/" }
    ],
    schemaType: "Service"
  },
  {
    slug: "services/ui-ux-design",
    canonicalUrl: "https://lfeditor.in/services/ui-ux-design/",
    title: "UI/UX Interface & Experience Design | XWEBSITEWALA",
    metaDescription: "User-centered UI/UX design by XWEBSITEWALA. Wireframing, interaction design, user journey mapping, and conversion-optimized interfaces.",
    keywords: "UI UX designer Rajasthan, user experience design Suratgarh, interface design, wireframing, interaction design",
    h1: "UI/UX Interface & User Experience Design",
    eyebrow: "USER FLOWS & INTERACTION DESIGN",
    leadParagraph: "We create intuitive digital interfaces where simplicity meets functionality, ensuring effortless navigation for your users.",
    sections: [
      {
        heading: "Human-Centered Design Methodology",
        body: [
          "A great user experience eliminates friction. We map customer journeys, analyze navigation pain points, and build interface prototypes that feel completely natural to use.",
          "From straightforward e-commerce checkouts to complex business portals, our UI/UX design process ensures users find what they need in seconds."
        ],
        listItems: [
          "User persona analysis and user journey mapping",
          "Low-fidelity wireframing to high-fidelity interactive prototypes",
          "Design system creation for long-term consistency and scalability",
          "Usability testing and accessibility-focused interface standards"
        ]
      }
    ],
    relatedLinks: [
      { label: "Web Design Services", url: "/services/web-design/" },
      { label: "E-Commerce Solutions", url: "/services/ecommerce/" },
      { label: "View Projects", url: "/projects/" },
      { label: "Get in Touch", url: "/contact/" }
    ],
    schemaType: "Service"
  },
  {
    slug: "services/ecommerce",
    canonicalUrl: "https://lfeditor.in/services/ecommerce/",
    title: "E-Commerce Website Development in Rajasthan | XWEBSITEWALA",
    metaDescription: "Custom e-commerce web development by XWEBSITEWALA. High-converting online stores, seamless product catalogs, fast checkout, and secure payments.",
    keywords: "ecommerce website developer Rajasthan, online store development Suratgarh, custom ecommerce website, ecommerce design Rajasthan",
    h1: "E-Commerce Website Design & Online Store Development",
    eyebrow: "FLAGSHIP DIGITAL STORES & COMMERCE",
    leadParagraph: "We build custom online stores engineered to showcase your products, process payments securely, and maximize checkout conversions.",
    sections: [
      {
        heading: "High-Performance Commerce Built for Sales",
        body: [
          "E-commerce requires flawless execution across every step of the buyer's journey: from discovering a product to completing the payment.",
          "We develop fast, responsive online stores with structured product catalogs, streamlined search and filtering, and integration with leading Indian and international payment gateways."
        ],
        listItems: [
          "Custom product pages with rich imagery, variations, and specifications",
          "Fast, frictionless checkout with Razorpay, UPI, credit/debit card integrations",
          "Mobile-first responsive store design for on-the-go shoppers",
          "Inventory, order management, and automated customer communication"
        ]
      }
    ],
    relatedLinks: [
      { label: "Rajwada Furnish Project", url: "/projects/" },
      { label: "Custom Web Development", url: "/services/web-development/" },
      { label: "Technical SEO", url: "/services/seo/" },
      { label: "Start an E-Commerce Project", url: "/contact/" }
    ],
    schemaType: "Service"
  },
  {
    slug: "services/seo",
    canonicalUrl: "https://lfeditor.in/services/seo/",
    title: "Technical SEO & Website Optimization | XWEBSITEWALA",
    metaDescription: "Technical SEO, site structure, and Core Web Vitals optimization by XWEBSITEWALA to improve search rankings, crawlability, and loading performance.",
    keywords: "SEO services Suratgarh, technical SEO Rajasthan, Core Web Vitals optimization, on-page SEO, website speed optimization",
    h1: "Technical SEO, Site Architecture & Speed Optimization",
    eyebrow: "CRAWLABILITY, SPEED & SEARCH VISIBILITY",
    leadParagraph: "We optimize your website's technical foundation, structured data, and performance so search engines crawl, understand, and index your content accurately.",
    sections: [
      {
        heading: "Built-In SEO Excellence, Not an Afterthought",
        body: [
          "True SEO begins in the codebase. Search engines prioritize fast, well-structured, mobile-friendly websites with clean markup and unambiguous content hierarchy.",
          "We implement comprehensive on-page and technical SEO, ensuring your digital presence is built to rank naturally without risky shortcuts."
        ],
        listItems: [
          "Clean semantic HTML5 heading hierarchy (H1, H2, H3) and crawlable internal linking",
          "Valid Schema.org JSON-LD structured data (Organization, LocalBusiness, Service, Breadcrumbs)",
          "Core Web Vitals tuning: sub-second Largest Contentful Paint (LCP) and zero layout shifts (CLS)",
          "XML sitemap generation, robots.txt directives, and canonical tag configuration"
        ]
      }
    ],
    relatedLinks: [
      { label: "Web Development Services", url: "/services/web-development/" },
      { label: "Suratgarh Web Studio", url: "/locations/suratgarh/" },
      { label: "Explore Our Work", url: "/projects/" },
      { label: "Contact for SEO Audit", url: "/contact/" }
    ],
    schemaType: "Service"
  },
  {
    slug: "projects",
    canonicalUrl: "https://lfeditor.in/projects/",
    title: "Web Design & Development Portfolio | XWEBSITEWALA",
    metaDescription: "Explore real web design and development projects created by XWEBSITEWALA for businesses across Suratgarh, Rajasthan, and beyond.",
    keywords: "XWEBSITEWALA portfolio, web design projects Suratgarh, website development case studies, Rajasthan web developer work",
    h1: "Web Design & Web Development Project Portfolio",
    eyebrow: "CURATED CLIENT WORK",
    leadParagraph: "A showcase of verified real-world websites and digital platforms designed and developed by XWEBSITEWALA for diverse business sectors.",
    sections: [
      {
        heading: "Featured Client Projects",
        body: [
          "Every project in our portfolio represents a custom-crafted digital solution designed around our client's unique brand, audience, and operational goals."
        ],
        listItems: [
          "Suratgarh Properties (2026) — Comprehensive real estate portal with verified property listings (suratgarhproperties.shop)",
          "Glamour Makeover (2026) — High-end beauty, salon, and lifestyle studio website (glamourmakeover.in)",
          "Meghna Motors (2026) — Automotive dealership showcase with interactive vehicle catalog (meghnamotors.online)",
          "Parmarth Medicose (2025) — Pharmacy & healthcare digital storefront (parmarthmedicose.store)",
          "Rajwada Furnish (2025) — Luxury furniture and home decor e-commerce platform (rajwadafurnish.com)",
          "Chawla Silk Store (2025) — Heritage ethnic wear and silk apparel catalog (chawlasilkstore.com)",
          "Groshine Consultants (2025) — Professional corporate business & advisory portal (groshineconsultants.com)",
          "Mantola of Motors (2025) — Automotive care, detailing, and service booking platform (mantola.in)"
        ]
      }
    ],
    relatedLinks: [
      { label: "Web Development Services", url: "/services/web-development/" },
      { label: "E-Commerce Solutions", url: "/services/ecommerce/" },
      { label: "About Founders", url: "/about/" },
      { label: "Discuss Your Project", url: "/contact/" }
    ],
    schemaType: "CollectionPage"
  },
  {
    slug: "contact",
    canonicalUrl: "https://lfeditor.in/contact/",
    title: "Contact XWEBSITEWALA — Web Design & Development in Suratgarh",
    metaDescription: "Get in touch with Sujal Frand & Anmol Frand at XWEBSITEWALA in Suratgarh, Rajasthan for web design, development, UI/UX, or e-commerce projects.",
    keywords: "contact XWEBSITEWALA, hire web developer Suratgarh, web designer contact Rajasthan, website developer phone number",
    h1: "Contact XWEBSITEWALA — Let's Build Your Website",
    eyebrow: "GET IN TOUCH",
    leadParagraph: "Ready to elevate your digital presence? Reach out to Sujal Frand & Anmol Frand to discuss your next web design, development, or e-commerce project.",
    sections: [
      {
        heading: "Direct Contact Channels",
        body: [
          "We work closely with business owners, founders, and creative brands. Reach out via phone, WhatsApp, or connect on our official social channels."
        ],
        listItems: [
          "Phone / Call: +91 99838 53091 / +91 90247 91337",
          "WhatsApp: Direct chat available via wa.me/919983853091",
          "Studio Location: Suratgarh, Rajasthan, India — PIN 335804",
          "Serving Clients In: Suratgarh, Hanumangarh, Pilibanga, Bikaner, and throughout Rajasthan"
        ]
      }
    ],
    relatedLinks: [
      { label: "Explore Our Work", url: "/projects/" },
      { label: "Our Services", url: "/services/" },
      { label: "About Sujal & Anmol", url: "/about/" },
      { label: "Suratgarh Location Info", url: "/locations/suratgarh/" }
    ],
    schemaType: "ContactPage"
  },
  {
    slug: "locations/suratgarh",
    canonicalUrl: "https://lfeditor.in/locations/suratgarh/",
    title: "Web Designer & Web Developer in Suratgarh, Rajasthan | XWEBSITEWALA",
    metaDescription: "XWEBSITEWALA is a Suratgarh-based web design and development studio creating custom websites, UI/UX design, and digital solutions for local businesses.",
    keywords: "web designer Suratgarh, web developer Suratgarh, website developer Suratgarh, web development company Suratgarh, website design Suratgarh Rajasthan",
    h1: "Web Design & Web Development Studio in Suratgarh, Rajasthan",
    eyebrow: "LOCAL STUDIO PRESENCE",
    leadParagraph: "Based in Suratgarh, XWEBSITEWALA provides local businesses, retailers, real estate firms, and service providers with world-class web design and custom development.",
    sections: [
      {
        heading: "Empowering Suratgarh Businesses with Modern Web Standards",
        body: [
          "From City Mandi and Bikaner Road to industrial and residential corridors across Suratgarh, local businesses are realizing that a modern digital presence is essential for credibility and customer acquisition.",
          "As local web developers born and raised in Suratgarh, Sujal Frand and Anmol Frand understand the local market context while delivering engineering standards on par with top global creative studios."
        ],
        listItems: [
          "Local in-person consultation and dedicated ongoing technical support",
          "Custom websites for retail stores, clinics, property dealers, and service agencies in Suratgarh",
          "Google Business Profile optimization and localized search presence",
          "Fast loading speeds engineered for both mobile networks and high-speed broadband"
        ]
      }
    ],
    relatedLinks: [
      { label: "View Our Projects", url: "/projects/" },
      { label: "Web Development Services", url: "/services/web-development/" },
      { label: "Hanumangarh Web Services", url: "/locations/hanumangarh/" },
      { label: "Contact Our Suratgarh Office", url: "/contact/" }
    ],
    schemaType: "LocalBusiness"
  },
  {
    slug: "locations/hanumangarh",
    canonicalUrl: "https://lfeditor.in/locations/hanumangarh/",
    title: "Website Development & Design in Hanumangarh | XWEBSITEWALA",
    metaDescription: "Professional web design, custom website development, and e-commerce solutions for businesses and retail brands in Hanumangarh, Rajasthan.",
    keywords: "website development Hanumangarh, web developer Hanumangarh, web designer Hanumangarh Town, Hanumangarh Junction website design",
    h1: "Website Design & Development Services in Hanumangarh",
    eyebrow: "REGIONAL CLIENT SERVICE",
    leadParagraph: "Serving businesses across Hanumangarh Junction and Hanumangarh Town with custom web applications, e-commerce stores, and digital branding.",
    sections: [
      {
        heading: "Custom Web Solutions for Hanumangarh Enterprises",
        body: [
          "Hanumangarh is a thriving commercial hub in northern Rajasthan with growing enterprises in agriculture trade, retail, education, and healthcare.",
          "XWEBSITEWALA partners with Hanumangarh businesses to build modern, responsive websites that stand out in local search and convert digital traffic into loyal customers."
        ],
        listItems: [
          "E-commerce stores and product catalogs for Hanumangarh retail and manufacturing",
          "Corporate websites for agricultural traders, legal/financial firms, and clinics",
          "Clean, mobile-optimized interfaces for customers browsing on smartphones",
          "Seamless communication and project delivery backed by our nearby Suratgarh studio"
        ]
      }
    ],
    relatedLinks: [
      { label: "E-Commerce Development", url: "/services/ecommerce/" },
      { label: "Suratgarh Web Studio", url: "/locations/suratgarh/" },
      { label: "Pilibanga Services", url: "/locations/pilibanga/" },
      { label: "Get a Quote", url: "/contact/" }
    ],
    schemaType: "LocalBusiness"
  },
  {
    slug: "locations/pilibanga",
    canonicalUrl: "https://lfeditor.in/locations/pilibanga/",
    title: "Website Design & Web Developer in Pilibanga | XWEBSITEWALA",
    metaDescription: "Custom website design, responsive web development, and digital presence for businesses and agricultural trade in Pilibanga, Rajasthan.",
    keywords: "web developer Pilibanga, website design Pilibanga, web development company Pilibanga Rajasthan, website maker Pilibanga",
    h1: "Web Design & Website Development in Pilibanga",
    eyebrow: "LOCAL COMMERCE & DIGITAL PRESENCE",
    leadParagraph: "Providing businesses in Pilibanga with modern, lightning-fast websites that build trust, showcase services, and expand market reach.",
    sections: [
      {
        heading: "Bridging Local Business with Modern Web Technology",
        body: [
          "Pilibanga's vibrant commercial ecosystem deserves digital tools that reflect the quality of its businesses. We build customized websites that help local enterprises present their services professionally.",
          "With zero bloated templates and a dedicated focus on usability, we ensure your business is easily discoverable by customers across the region."
        ],
        listItems: [
          "Responsive websites engineered for grain traders, retailers, and local services",
          "Clean contact integrations with one-tap WhatsApp and phone dialing",
          "Local SEO markup to help your business appear prominently on regional searches",
          "Rapid delivery and direct support from nearby studio founders"
        ]
      }
    ],
    relatedLinks: [
      { label: "Web Development Services", url: "/services/web-development/" },
      { label: "Suratgarh Studio", url: "/locations/suratgarh/" },
      { label: "Hanumangarh Services", url: "/locations/hanumangarh/" },
      { label: "Contact Us", url: "/contact/" }
    ],
    schemaType: "LocalBusiness"
  },
  {
    slug: "locations/bikaner",
    canonicalUrl: "https://lfeditor.in/locations/bikaner/",
    title: "Modern Web Design & Development in Bikaner | XWEBSITEWALA",
    metaDescription: "Custom web development, UI/UX design, and high-performance e-commerce websites for established brands and emerging businesses in Bikaner, Rajasthan.",
    keywords: "web developer Bikaner, website design Bikaner, web development company Bikaner, UI UX designer Bikaner, ecommerce website Bikaner",
    h1: "Web Design & Custom Web Development in Bikaner, Rajasthan",
    eyebrow: "EXPANDING DIGITAL HORIZONS",
    leadParagraph: "Delivering modern digital architecture, brand-first web design, and high-conversion e-commerce platforms to businesses across Bikaner.",
    sections: [
      {
        heading: "Digital Craft for Bikaner's Growing Business Sectors",
        body: [
          "As one of Rajasthan's prominent cultural and economic centers, Bikaner is home to iconic brands in food manufacturing, hospitality, handicrafts, and education.",
          "XWEBSITEWALA creates high-end web experiences that match the ambition of Bikaner businesses, combining editorial visual design with robust React engineering."
        ],
        listItems: [
          "Flagship e-commerce stores for confectionery, packaged foods, and handicraft artisans",
          "Hospitality & tourism portal design with booking inquiry flows",
          "Enterprise website development built with React and TypeScript for maximum speed",
          "Structured technical SEO to compete effectively in national and global search queries"
        ]
      }
    ],
    relatedLinks: [
      { label: "E-Commerce Solutions", url: "/services/ecommerce/" },
      { label: "Custom Web Development", url: "/services/web-development/" },
      { label: "Suratgarh Studio", url: "/locations/suratgarh/" },
      { label: "Start Your Bikaner Project", url: "/contact/" }
    ],
    schemaType: "LocalBusiness"
  }
];
