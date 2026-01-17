export default function AustraliaGsStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "#website",
        "url": "https://ai.eecglobal.com/australiagsprep",
        "name": "EEC Australia GS Prep Tool",
        "publisher": { "@id": "#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ai.eecglobal.com/australiagsprep/?s={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "#webpage",
        "url": "https://ai.eecglobal.com/australiagsprep",
        "name": "Free AI Australia GS Interview Prep Tool by EEC",
        "author": [
          { "@id": "#amit-jalan" },
          { "@id": "#ca-madhav-gupta" },
          { "@id": "#anirudh-gupta" },
          { "@id": "#ridhika-jalan" },
          { "@id": "#mohita-gupta" }
        ],
        "isPartOf": { "@id": "#website" },
        "primaryImageOfPage": { "@id": "#primaryimage" },
        "description": "A 100% free tool for Indian students, powered by AI, to prepare for Australia's Genuine Student (GS) and student visa interviews with hyper-personalized questions and feedback.",
        "mainEntity": { "@id": "#webapp" }
      },
      {
        "@type": "WebApplication",
        "@id": "#webapp",
        "name": "Free AI Australia GS Interview Prep Tool",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web",
        "description": "A 100% free, AI-powered tool for Indian students to prepare for the Australian Genuine Student (GS) visa interview with hyper-personalized questions, voice practice, and instant feedback.",
        "provider": { "@id": "#organization" },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "author": [
          { "@id": "#amit-jalan" },
          { "@id": "#ca-madhav-gupta" },
          { "@id": "#anirudh-gupta" },
          { "@id": "#ridhika-jalan" },
          { "@id": "#mohita-gupta" }
        ]
      },
      {
        "@type": "Service",
        "@id": "#service",
        "name": "AI GS Interview Prep Service",
        "serviceType": "EducationalService",
        "description": "A free, AI-powered service for Indian students to prepare for the Australian Genuine Student (GS) visa interview. Features include personalized questions, voice practice, and instant feedback.",
        "provider": { "@id": "#organization" },
        "areaServed": {
          "@type": "Country",
          "name": "India"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        },
        "subjectOf": [
          { "@id": "#course-physio" },
          { "@id": "#course-mib" },
          { "@id": "#course-it-diploma" }
        ]
      },
      {
        "@type": "Dataset",
        "@id": "#eec-australia-data",
        "name": "EEC Australia Study Abroad Dataset",
        "description": "A structured dataset containing information crucial for Indian students planning to study in Australia. This includes a list of Australian-government-approved financial institutions in India for education loans, detailed data on Australian cities (categorization, post-study work rights bonuses, and associated universities), and a list of high-demand jobs for graduates.",
        "creator": {
          "@type": "Organization",
          "name": "EEC (Enbee Education Center Private Limited)",
          "@id": "#organization"
        },
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "distribution": [
          {
            "@type": "DataDownload",
            "encodingFormat": "application/json",
            "contentUrl": "/data/eec_australia_dataset.json"
          },
          {
            "@type": "DataDownload",
            "encodingFormat": "text/csv",
            "contentUrl": "/data/eec_australia_dataset.csv"
          }
        ]
      },
      {
        "@type": "ImageObject",
        "@id": "#primaryimage",
        "url": "https://eecglobal.com/wp-content/uploads/2022/10/EEC-Logo.svg",
        "width": 80,
        "height": 32,
        "caption": "EEC Global Logo"
      },
      {
        "@type": "EducationalOrganization",
        "@id": "#organization",
        "name": "EEC (Enbee Education Center Private Limited)",
        "alternateName": "EEC Global",
        "url": "https://eecglobal.com",
        "logo": { "@id": "#primaryimage" },
        "foundingDate": "1997",
        "description": "Established in 1997, EEC is Gujarat's largest and oldest study abroad company, providing expert test preparation, admissions, and visa guidance to students aiming to study overseas.",
        "sameAs": [
          "https://www.instagram.com/eecglobal",
          "https://www.facebook.com/eecglobal",
          "https://www.youtube.com/@eecgujarat",
          "https://www.linkedin.com/school/eecindia"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "9870",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasPart": [
          { "@id": "#branch-1" }, { "@id": "#branch-2" }, { "@id": "#branch-11" }, { "@id": "#branch-4" }, { "@id": "#branch-5" }, { "@id": "#branch-6" }, { "@id": "#branch-7" }, { "@id": "#branch-8" }, { "@id": "#branch-9" }, { "@id": "#branch-10" }, { "@id": "#branch-vesu" }, { "@id": "#branch-12" }, { "@id": "#branch-13" }, { "@id": "#branch-14" }, { "@id": "#branch-15" }, { "@id": "#branch-16" }, { "@id": "#branch-17" }, { "@id": "#branch-18" }, { "@id": "#branch-19" }, { "@id": "#branch-20" }, { "@id": "#branch-21" }, { "@id": "#branch-22" }, { "@id": "#branch-23" }, { "@id": "#branch-24" }, { "@id": "#branch-25" }, { "@id": "#branch-26" }
        ],
        "review": [
          { "@id": "#review-aarav" },
          { "@id": "#review-meera" },
          { "@id": "#review-vikram" }
        ]
      },
      {
        "@type": "Person",
        "@id": "#amit-jalan",
        "name": "Amit Jalan",
        "jobTitle": "Managing Director, EEC & Lead AI Strategist",
        "description": "With over 28 years of experience, Amit Jalan is an industry veteran specializing in the Australian GS framework, Group of Eight university admissions, and complex visa processes. He is the lead systems architect behind this AI tool.",
        "image": "https://i.pravatar.cc/150?u=amit_jalan",
        "url": "#",
        "worksFor": { "@id": "#organization" }
      },
      {
        "@type": "Person",
        "@id": "#ca-madhav-gupta",
        "name": "CA Madhav Gupta",
        "jobTitle": "Director, EEC & Australia GS Financial Expert",
        "description": "A Chartered Accountant with 15+ years of experience, Madhav Gupta is a leading expert in the financial and compliance aspects of Australian student visas, specializing in GS financial requirements and fund structuring.",
        "image": "https://i.pravatar.cc/150?u=madhav_gupta",
        "url": "#",
        "worksFor": { "@id": "#organization" }
      },
      {
        "@type": "Person",
        "@id": "#anirudh-gupta",
        "name": "Anirudh Gupta",
        "jobTitle": "Vice President, EEC & Australia Destination Expert",
        "description": "A Bond University alumnus with 20+ years in global education, Anirudh Gupta is an 'Everything-Australia' expert. He leads on GS processes and serves as the Lead GS Questions Auditor for EEC.",
        "image": "https://i.pravatar.cc/150?u=anirudh_gupta",
        "url": "#",
        "worksFor": { "@id": "#organization" }
      },
      {
        "@type": "Person",
        "@id": "#ridhika-jalan",
        "name": "Ridhika Jalan",
        "jobTitle": "Head – Corporate Strategy, EEC & Certified Australia Expert",
        "description": "Ridhika Jalan, a Bradford University alumna and Certified Australia Expert, leads corporate strategy at EEC. She specializes in pre-departure orientation and student welfare frameworks, including OSHC.",
        "image": "https://i.pravatar.cc/150?u=ridhika_jalan",
        "url": "#",
        "worksFor": { "@id": "#organization" }
      },
      {
        "@type": "Person",
        "@id": "#mohita-gupta",
        "name": "Mohita Gupta",
        "jobTitle": "Vice President – Counselling Services, EEC & Visa Interview Specialist",
        "description": "A former investment banker with Citibank Global, Mohita Gupta heads Counselling Services at EEC. She is a recognized authority on visa interview strategy, GS requirements, and high-impact interview preparation.",
        "image": "https://i.pravatar.cc/150?u=mohita_gupta",
        "url": "#",
        "worksFor": { "@id": "#organization" }
      },
      {
        "@type": "Review",
        "@id": "#review-aarav",
        "itemReviewed": { "@id": "#webapp" },
        "author": {
          "@type": "Person",
          "name": "Aarav P."
        },
        "reviewBody": "The AI pinpointed the exact weak spot in my GS answers regarding my study gap. The practice sessions and feedback were brutal but necessary. I went into the real interview with 100% confidence. Visa granted!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "@id": "#review-meera",
        "itemReviewed": { "@id": "#webapp" },
        "author": {
          "@type": "Person",
          "name": "Meera K."
        },
        "reviewBody": "My marriage was recent, and I was worried it would be a red flag. The tool generated so many specific questions about it, and the model answers helped me frame my situation honestly and positively. It made all the difference.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      {
        "@type": "Review",
        "@id": "#review-vikram",
        "itemReviewed": { "@id": "#webapp" },
        "author": {
          "@type": "Person",
          "name": "Vikram S."
        },
        "reviewBody": "For me, it was the financial questions. The AI didn't just ask 'who is your sponsor', it drilled down into my father's income and ITR details. That level of specific practice is something you can't get anywhere else. This tool is a game-changer.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      },
      { "@type": "EducationalOrganization", "@id": "#branch-1", "name": "EEC Alkapuri", "url": "https://maps.app.goo.gl/2Fw9ZqQ2cxPnc7oG7", "telephone": "+918000506539", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, B-Wing, Windsor Plaza, RC Dutt Rd, Alkapuri", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "1113" } },
      { "@type": "EducationalOrganization", "@id": "#branch-2", "name": "EEC Nizampura (Head Office)", "url": "https://maps.app.goo.gl/YdvZNZxtHWd2yc8c6", "telephone": "+918758753333", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Procube Complex, Nizampura Rd, Above GSRTC Bus Station", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "2104" } },
      { "@type": "EducationalOrganization", "@id": "#branch-11", "name": "EEC Manjalpur", "url": "https://maps.app.goo.gl/UnPqodGxMcrEo3Fz5", "telephone": "+918758750037", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Infinity Arcade, Opposite Pratapnagar Police HQ, ONGC Dairy Road, Manjalpur", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "495" } },
      { "@type": "EducationalOrganization", "@id": "#branch-4", "name": "EEC New VIP Road", "url": "https://maps.app.goo.gl/KuJKjF8j3HPnjaDf6", "telephone": "+918758750040", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Shree Siddheshwar Plaza, New VIP Rd", "addressLocality": "Vadodara", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "302" } },
      { "@type": "EducationalOrganization", "@id": "#branch-5", "name": "EEC Nadiad", "url": "https://maps.app.goo.gl/RTNfRzf4G8Tdejrz5", "telephone": "+918758880010", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "4th Floor, Nexus 2, College Rd, Opposite McDonalds", "addressLocality": "Nadiad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "253" } },
      { "@type": "EducationalOrganization", "@id": "#branch-6", "name": "EEC Vallabh Vidyanagar Anand", "url": "https://maps.app.goo.gl/DQ6cuxAXGSncLrYbA", "telephone": "+918758882884", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "1st Floor, Sigma Prime Complex, Above Royal Enfield, Sardar Patel Statue Circle", "addressLocality": "Anand", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "340" } },
      { "@type": "EducationalOrganization", "@id": "#branch-7", "name": "EEC Parvat Patia (Dumbhal)", "url": "https://maps.app.goo.gl/v4X4Xn9drJngRj2h9", "telephone": "+918758880210", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "UG-10, AMS, Shri Vardhan Textile Market, Above Zudio & Opp. Samrat International School, Dumbhal", "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "280" } },
      { "@type": "EducationalOrganization", "@id": "#branch-8", "name": "EEC Mota Varachha", "url": "https://maps.app.goo.gl/zhgM8HA2CjJu8c6m9", "telephone": "+918758750018", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "4th Floor, Opera Business Hub, Lajamni Chowk, Mota Varachha", "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.5", "reviewCount": "602" } },
      { "@type": "EducationalOrganization", "@id": "#branch-9", "name": "EEC Katargam", "url": "https://maps.app.goo.gl/6NfEPdx7ThDbkjtm8", "telephone": "+918758880160", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Neeru Farms, Rajhans Flamingo, Gajera Rd, Priya Park Society", "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "152" } },
      { "@type": "EducationalOrganization", "@id": "#branch-10", "name": "EEC Ghod Dod Road", "url": "https://maps.app.goo.gl/C3wzygXWeAHW6b8t5", "telephone": "+918758757777", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, Jade Blue Union Square, Ghod Dod Rd", "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "1136" } },
      { "@type": "EducationalOrganization", "@id": "#branch-vesu", "name": "EEC Vesu", "url": "https://maps.app.goo.gl/dNUVu7cD7nE4mbcBA", "telephone": "+918758750029", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "1st Floor, International Finance Centre, IFC, VIP Rd, Vesu", "addressLocality": "Surat", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "22" } },
      { "@type": "EducationalOrganization", "@id": "#branch-12", "name": "EEC Vapi", "url": "https://maps.app.goo.gl/YiLTBLZhCm6rBdnD8", "telephone": "+918758880040", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, EEC, ISquare Building, Daman Rd, Opposite Axis Bank, Daulat Nagar", "addressLocality": "Vapi", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "185" } },
      { "@type": "EducationalOrganization", "@id": "#branch-13", "name": "EEC Navsari", "url": "https://maps.app.goo.gl/MS9E6Rc53e8LA9Ly7", "telephone": "+918758880055", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "4th Floor, Sachi Arcade, Opp. Prajapati Ashram, Khumbharwad", "addressLocality": "Navsari", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "210" } },
      { "@type": "EducationalOrganization", "@id": "#branch-14", "name": "EEC Bharuch", "url": "https://maps.app.goo.gl/VBAtqRoL3PiH4oBL9", "telephone": "+918758884889", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, Shalimar Complex, Above Reliance Mart, Station Road", "addressLocality": "Bharuch", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "175" } },
      { "@type": "EducationalOrganization", "@id": "#branch-15", "name": "EEC Memnagar", "url": "https://maps.app.goo.gl/HabxCB5xTpg2CDwg6", "telephone": "+918758883889", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Satya One, Opp. Manav Mandir, Helmet Circle, Memnagar", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "936" } },
      { "@type": "EducationalOrganization", "@id": "#branch-16", "name": "EEC Ghatlodiya", "url": "https://maps.app.goo.gl/svz3SdkthSb6k1Kd6", "telephone": "+918758880710", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, Shayona Sarvopari, Shayona City, RC Technical Road, Ghatlodiya, Chanakyapuri", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "59" } },
      { "@type": "EducationalOrganization", "@id": "#branch-17", "name": "EEC Chandkheda", "url": "https://maps.app.goo.gl/y1ARGMfmyjMxun728", "telephone": "+918758750010", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "4th Floor, Sigma Arcade, Above Vijay Sales, Near Visat Circle, Chandkheda", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "144" } },
      { "@type": "EducationalOrganization", "@id": "#branch-18", "name": "EEC Maninagar", "url": "https://maps.app.goo.gl/zHAm836PeUWRQDDh7", "telephone": "+917096083333", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "4th Floor, Prism Building, Below Apple Cinema, Shah Alam Tolnaka, Kankaria", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "533" } },
      { "@type": "EducationalOrganization", "@id": "#branch-19", "name": "EEC Odhav", "url": "https://maps.app.goo.gl/AM2hxunaJJw1mQes5", "telephone": "+918758881885", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Kahan Commercial Complex, Sardar Patel Ring Rd, Above Vijay Sales, Gokul Nagar, Adinath Nagar, Odhav", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "245" } },
      { "@type": "EducationalOrganization", "@id": "#branch-20", "name": "EEC Nikol", "url": "https://maps.app.goo.gl/wmFoU7EjVnZ6fUBU6", "telephone": "+918758880700", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "3rd Floor, Suvas Scala, Opp. Nikol Police Station, Nikol", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "401" } },
      { "@type": "EducationalOrganization", "@id": "#branch-21", "name": "EEC Bapunagar", "url": "https://maps.app.goo.gl/TrwUQNXy2u2QA7vWA", "telephone": "+918758880320", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, White House, India Colony Road, Opposite Swaminarayan Mandir", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "195" } },
      { "@type": "EducationalOrganization", "@id": "#branch-22", "name": "EEC Naroda", "url": "https://maps.app.goo.gl/Ec65JHFzi4cy1e459", "telephone": "+918758880730", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Sahitya Hills & Icon, Above Style Up Store, Muktidham Char Rasta, Vasant Vihar 2, Naroda", "addressLocality": "Ahmedabad", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "165" } },
      { "@type": "EducationalOrganization", "@id": "#branch-23", "name": "EEC Kalol", "url": "https://maps.app.goo.gl/J7JbtSYwE9rRkXbi9", "telephone": "+918758750090", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Above Raymond, Near HDFC Bank, Navjivan Mill Compound, Memon Market", "addressLocality": "Kalol", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "120" } },
      { "@type": "EducationalOrganization", "@id": "#branch-24", "name": "EEC Himatnagar", "url": "https://maps.app.goo.gl/KcBi8DfDZ4mzsnnu5", "telephone": "+918758750080", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Platinum Square Building, Opposite Post Office", "addressLocality": "Himatnagar", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "95" } },
      { "@type": "EducationalOrganization", "@id": "#branch-25", "name": "EEC Mehsana", "url": "https://maps.app.goo.gl/HACNeuMnYg56HdTf6", "telephone": "+918758880886", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Perfect Plaza, Near Aayush Hospital, Radhanpur Road", "addressLocality": "Mehsana", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "135" } },
      { "@type": "EducationalOrganization", "@id": "#branch-26", "name": "EEC Visnagar", "url": "https://maps.app.goo.gl/WYhAJgDMYTwbLHUY6", "telephone": "+918758750086", "parentOrganization": { "@id": "#organization" }, "address": { "@type": "PostalAddress", "streetAddress": "2nd Floor, Above Shukan Restaurant, Visnagar Kheralu Road", "addressLocality": "Visnagar", "addressRegion": "Gujarat", "addressCountry": "IN" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "85" } },
      {
        "@type": "EducationalOrganization",
        "@id": "#uq",
        "name": "The University of Queensland",
        "url": "https://www.uq.edu.au/"
      },
      {
        "@type": "EducationalOrganization",
        "@id": "#adelaide",
        "name": "The University of Adelaide",
        "url": "https://www.adelaide.edu.au/"
      },
      {
        "@type": "EducationalOrganization",
        "@id": "#tafensw",
        "name": "TAFE NSW",
        "url": "https://www.tafensw.edu.au/"
      },
      {
        "@type": "CourseInstance",
        "@id": "#course-physio",
        "name": "Bachelor of Physiotherapy (Honours)",
        "provider": { "@id": "#uq" },
        "funder": { "@id": "#organization" }
      },
      {
        "@type": "CourseInstance",
        "@id": "#course-mib",
        "name": "Master of International Business",
        "provider": { "@id": "#adelaide" },
        "funder": { "@id": "#organization" }
      },
      {
        "@type": "CourseInstance",
        "@id": "#course-it-diploma",
        "name": "Diploma of Information Technology",
        "provider": { "@id": "#tafensw" },
        "funder": { "@id": "#organization" }
      },
      {
        "@type": "WebFeed",
        "url": "https://ai.eecglobal.com/australiagsprep/feed.xml",
        "mainEntityOfPage": { "@id": "#webpage" }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}



