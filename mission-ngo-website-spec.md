# MISSION NGO Website Implementation Specification

## Project Overview

Build a modern, visually distinctive website for MISSION NGO - a grassroots development organization working in rural Odisha, India since 2002. The website should showcase their impact, programs, and attract volunteers/partners.

**Tech Stack:**
- React 18+ with Vite
- Tailwind CSS
- Framer Motion for animations
- React Router for navigation
- i18next for internationalization (English, Hindi, Odia)
- Recharts or Visx for data visualization
- React Simple Maps for Odisha map
- React Countup for animated numbers

---

## CRITICAL DESIGN DIRECTIVES

### What to AVOID (Non-negotiable)

1. **NO generic Bootstrap/template aesthetics**
   - No card grids with uniform shadows and rounded corners everywhere
   - No generic hero sections with centered text and a single CTA button
   - No stock-photo-overlay-with-gradient heroes
   - No uniform padding/margins creating a "boxy" feel

2. **NO generic fonts**
   - DO NOT use: Inter, Roboto, Open Sans, Lato, Montserrat
   - These fonts scream "template website"

3. **NO generic color schemes**
   - Avoid pure Bootstrap blue (#007bff)
   - Avoid generic NGO green (#28a745)
   - Avoid flat, lifeless grays

4. **NO static, lifeless pages**
   - Every section should have subtle motion
   - Numbers should animate when scrolled into view
   - Elements should have presence and weight

### What to EMBRACE

1. **Dark Mode Support**
   
   Implement a complete dark mode with system preference detection and manual toggle.
   
   **Toggle Location:** Header, next to language switcher. Use a sun/moon icon that morphs on toggle.
   
   **Behavior:**
   - On first visit, detect `prefers-color-scheme` system preference
   - Store user preference in localStorage
   - Toggle should animate smoothly (icon rotation + color transition)
   - All pages must support both modes
   
   **Dark Mode Color Palette:**
   ```
   Backgrounds:
   - Primary Background: #0F1419 (deep charcoal, not pure black)
   - Secondary Background: #1A2128 (slightly lighter for cards)
   - Tertiary Background: #242D35 (for elevated elements)
   
   Text:
   - Primary Text: #E7E9EA (off-white, easy on eyes)
   - Secondary Text: #8B98A5 (muted for less important text)
   - Muted Text: #6B7280 (for captions, metadata)
   
   Accent Colors (adjusted for dark backgrounds):
   - Saffron/Primary: #F09D51 (slightly lighter for visibility)
   - Forest Green: #3D9B7A (brighter teal-green)
   - Golden: #F0B840 (warmer, more vibrant)
   - Teal: #5ABAA8 (brighter for links)
   
   Borders & Dividers:
   - Border: #2F3941 (subtle separation)
   - Divider: #38444D (for horizontal rules)
   
   Special:
   - Card Shadow: rgba(0, 0, 0, 0.4) (deeper shadows)
   - Hover State: #2A3640 (subtle highlight)
   - Success: #4ADE80
   - Warning: #FBBF24
   - Error: #F87171
   ```
   
   **Implementation Approach:**
   ```javascript
   // Use Tailwind's dark mode with class strategy
   // tailwind.config.js
   module.exports = {
     darkMode: 'class',
     // ... rest of config
   }
   ```
   
   **Component Pattern:**
   ```jsx
   // Example: Card component with dark mode
   <div className="bg-sand-100 dark:bg-[#1A2128] 
                   text-indigo-900 dark:text-[#E7E9EA]
                   border border-sand-200 dark:border-[#2F3941]
                   shadow-md dark:shadow-xl dark:shadow-black/30
                   transition-colors duration-300">
     {/* content */}
   </div>
   ```
   
   **Dark Mode Specific Adjustments:**
   - Images: Add subtle dark overlay or adjust brightness slightly
   - Charts: Use brighter colors for data visualization in dark mode
   - Map: Invert or use dark-themed map tiles
   - Forms: Darker input backgrounds with lighter borders on focus
   - Partner logos: Consider grayscale-invert or provide dark variants
   
   **Theme Toggle Component:**
   ```jsx
   // src/components/common/ThemeToggle.jsx
   import { useState, useEffect } from 'react';
   import { motion } from 'framer-motion';
   import { Sun, Moon } from 'lucide-react';
   
   export default function ThemeToggle() {
     const [isDark, setIsDark] = useState(false);
     
     useEffect(() => {
       // Check localStorage or system preference on mount
       const stored = localStorage.getItem('theme');
       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       
       if (stored === 'dark' || (!stored && systemPrefersDark)) {
         setIsDark(true);
         document.documentElement.classList.add('dark');
       }
     }, []);
     
     const toggleTheme = () => {
       setIsDark(!isDark);
       if (isDark) {
         document.documentElement.classList.remove('dark');
         localStorage.setItem('theme', 'light');
       } else {
         document.documentElement.classList.add('dark');
         localStorage.setItem('theme', 'dark');
       }
     };
     
     return (
       <motion.button
         onClick={toggleTheme}
         className="p-2 rounded-full bg-sand-200 dark:bg-[#242D35] 
                    text-saffron-400 dark:text-golden-400
                    hover:bg-sand-300 dark:hover:bg-[#2A3640]
                    transition-colors"
         whileTap={{ scale: 0.95 }}
         aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
       >
         <motion.div
           initial={false}
           animate={{ rotate: isDark ? 180 : 0 }}
           transition={{ type: "spring", stiffness: 200, damping: 10 }}
         >
           {isDark ? <Sun size={20} /> : <Moon size={20} />}
         </motion.div>
       </motion.button>
     );
   }
   ```
   
   **CSS Transitions:**
   ```css
   /* globals.css - Smooth theme transitions */
   html {
     transition: background-color 0.3s ease, color 0.3s ease;
   }
   
   /* Prevent flash of wrong theme on load */
   html.dark {
     color-scheme: dark;
   }
   
   /* Add to <head> in index.html to prevent flash */
   /*
   <script>
     (function() {
       const stored = localStorage.getItem('theme');
       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
       if (stored === 'dark' || (!stored && prefersDark)) {
         document.documentElement.classList.add('dark');
       }
     })();
   </script>
   */
   ```
   
   **Dark Mode for Specific Elements:**
   
   *Hero Section:*
   - Light: Warm sand background with saffron accents
   - Dark: Deep charcoal with glowing saffron/golden accents
   
   *Stats Section:*
   - Light: White cards with subtle shadows
   - Dark: Elevated dark cards with stronger number contrast
   
   *Charts:*
   - Increase saturation of data colors in dark mode
   - Use lighter grid lines
   - White/light text for labels
   
   *Map:*
   - Consider using a dark-themed base map
   - District highlights should be more vibrant
   - Tooltips should follow dark theme
   
   *Forms:*
   - Input backgrounds: #1A2128
   - Input borders: #2F3941 (brightens to teal on focus)
   - Placeholder text: #6B7280
   - Button: Maintain saffron/golden but slightly brighter

2. **Typography**
   Use distinctive, characterful fonts:
   - **Headings:** "DM Serif Display" or "Playfair Display" or "Source Serif Pro" - something with personality
   - **Body:** "Source Sans 3" or "IBM Plex Sans" or "Manrope" - clean but not generic
   - **Accent/Numbers:** "Space Grotto" or "JetBrains Mono" for statistics - adds technical credibility
   
2. **Color Palette**
   Derived from MISSION's existing branding (orange/yellow from their logo and materials):
   
   ```
   Primary Colors:
   - Saffron/Turmeric: #E07B39 (warm, earthy, represents rural India)
   - Deep Forest: #1B4D3E (trust, growth, nature)
   
   Secondary Colors:
   - Warm Sand: #F5E6D3 (backgrounds, warmth)
   - Terracotta: #C75B39 (accent, traditional crafts)
   - Indigo Night: #2D3047 (text, depth)
   
   Neutrals:
   - Off-white: #FAFAF8 (backgrounds)
   - Warm Gray: #6B6B6B (body text)
   - Charcoal: #2A2A2A (headings)
   
   Accent:
   - Golden Yellow: #E5A835 (highlights, CTAs)
   - Soft Teal: #4A9B8C (data visualizations, links)
   ```

3. **Layout Philosophy**
   - Asymmetric layouts where appropriate
   - Generous whitespace - let content breathe
   - Full-bleed images that break the grid occasionally
   - Overlapping elements to create depth
   - Varied section heights - not everything needs to be viewport height

4. **Animation Philosophy (Physics-based, subtle)**
   - Use spring animations, not linear/ease
   - Stagger animations for lists and grids
   - Parallax on scroll (subtle, not nauseating)
   - Numbers should "roll" into place when visible
   - Micro-interactions on hover (scale, shadow lift)
   - Page transitions should feel smooth
   
   Framer Motion spring config suggestion:
   ```javascript
   const springConfig = {
     type: "spring",
     stiffness: 100,
     damping: 15,
     mass: 1
   }
   ```

5. **Visual Elements**
   - Use organic shapes as decorative elements (representing rural, natural themes)
   - Subtle grain/texture overlays on hero sections
   - Hand-drawn or organic dividers between sections (not straight lines)
   - Photos should have natural frames, not perfect rectangles everywhere

---

## Internationalization (i18n)

Implement full support for three languages:
- English (en) - Default
- Hindi (hi)
- Odia (or)

**Language switcher:** Place in header, use native script names:
- English
- हिन्दी
- ଓଡ଼ିଆ

Store preference in localStorage. All static content should be translatable.

For this implementation, provide English content. Mark all text strings for translation with i18next `t()` function. Create placeholder JSON files for Hindi and Odia that mirror the English structure.

---

## Site Structure & Content

### 1. Header/Navigation

**Logo:** "MISSION" with globe icon (replicate their existing logo style)

**Navigation Items:**
- Home
- About Us (dropdown: Our Story, Vision & Mission, Team & Governance)
- Programs (dropdown: Livelihoods, FPO & Farmers, Women SHGs, Artisan Empowerment, Skill Development)
- Impact
- Where We Work
- Partners
- Transparency
- Get Involved

**Right Side Controls (in order):**
1. Theme Toggle (sun/moon icon)
2. Language Switcher

**Header Theming:**
- Light: `bg-white/90 backdrop-blur-md border-b border-sand-200`
- Dark: `dark:bg-dark-bg-secondary/90 dark:backdrop-blur-md dark:border-dark-border`

**Mobile:** Hamburger menu with full-screen overlay, animated menu items. Theme toggle and language switcher should be accessible in mobile menu as well.

---

### 2. Homepage

#### 2.1 Hero Section

**Layout:** Split or asymmetric - NOT centered text over image

**Content:**
- Tagline: "Engross, Enable, Empower"
- Headline: "Transforming Rural Odisha Since 2002"
- Subtext: "Empowering 165,000+ families through sustainable livelihoods, grassroots institutions, and community-led development."
- Primary CTA: "Explore Our Impact"
- Secondary CTA: "Get Involved"

**Visual:** Full-bleed community photo (use placeholder from Unsplash: rural India, women's groups, farming)

**Animation:** 
- Text reveals with stagger
- Image has subtle parallax on scroll
- Floating organic shapes in background

#### 2.2 Impact Stats Strip

**Layout:** Horizontal scroll on mobile, grid on desktop. Numbers should be LARGE and prominent.

**Stats (animate on scroll into view):**
```
165,000+ Families Empowered
18 Districts Covered
147,000 Women in SHG Network
₹22 Cr+ Community Funds Mobilized
22+ Years of Service
```

**Animation:** 
- Numbers count up from 0 when section enters viewport
- Use spring physics for the counting
- Each stat staggers in 100ms after the previous

#### 2.3 What We Do Overview

**Headline:** "Creating Pathways to Self-Reliance"

**Layout:** Bento grid or asymmetric cards (NOT uniform 3-column grid)

**Cards:**

1. **Livelihood & Enterprise**
   - Icon: Hands holding plant/sprout
   - Brief: "Empowering rural entrepreneurs through training, credit linkages, and market access in agriculture, livestock, and MSMEs."
   - Link: Learn More →

2. **Farmer Collectives**
   - Icon: Group of people/wheat
   - Brief: "Building Farmer Producer Organizations that give smallholders collective bargaining power and better market prices."
   - Link: Learn More →

3. **Women's Empowerment**
   - Icon: Women figure/group
   - Brief: "14,375 Self-Help Groups transforming women into community leaders and entrepreneurs."
   - Link: Learn More →

4. **Artisan Revival**
   - Icon: Craftsperson/pottery
   - Brief: "Preserving traditional crafts while connecting artisans to modern markets through PM Vishwakarma and KVIC programs."
   - Link: Learn More →

**Animation:** Cards float up with stagger on scroll

#### 2.4 Featured Initiatives

**Headline:** "Innovation at the Grassroots"

**Layout:** Large feature cards, can be horizontal with image on one side

**Initiatives:**

1. **Shop on Wheel**
   - Image: Mobile van (use placeholder)
   - Description: "A mobile marketplace bringing SHG and artisan products directly to weekly haats, trade fairs, and urban markets across Odisha."
   - Tag: "Market Access Innovation"

2. **Janjati Atmanirbhar Kendra**
   - Image: Tribal community training (use placeholder)
   - Description: "A dedicated tribal empowerment center providing culturally-rooted skill training and enterprise support. 700+ tribal individuals trained."
   - Tag: "Tribal Empowerment"

3. **Odra Desh Marketing Company**
   - Image: Farmers with produce (use placeholder)
   - Description: "A joint venture marketing company co-owned by two FPOs, aggregating rural products for bulk sales, branding, and e-commerce distribution."
   - Tag: "Collective Enterprise"

**Animation:** Horizontal scroll effect or carousel with snap

#### 2.5 Impact Visualization Section

**Headline:** "Our Journey in Numbers"

**Layout:** Interactive data visualization area

**Visualizations to include:**

1. **Growth Timeline Chart (Line/Area Chart)**
   - X-axis: Years (2002, 2007, 2012, 2017, 2023)
   - Y-axis: Families Reached
   - Data points: 0 → 1,200 → 6,000 → 22,000 → 165,000
   - Animate the line drawing on scroll

2. **Fund Allocation Donut Chart (FY 2024-25)**
   - Program Expenses: 78.09%
   - Administrative: 15.86%
   - Depreciation: 2.55%
   - Other: 3.5%
   - Animate segments expanding from center

3. **Geographic Reach (Mini Odisha Map)**
   - Highlight 18 districts where MISSION operates
   - Tooltip on hover showing district name
   - Link to full "Where We Work" page

**Animation:** Charts animate when scrolled into view

#### 2.6 Partners Logo Strip

**Headline:** "Our Partners in Change"

**Layout:** Infinite horizontal scroll of partner logos (grayscale, color on hover)

**Partners:**
- NABARD
- Government of India emblem
- Government of Odisha
- KVIC
- Ministry of MSME
- Reserve Bank of India
- National Health Mission
- EDII
(Use placeholder logos or simple text representations)

**Link:** "View All Partners →"

#### 2.7 Call to Action Section

**Layout:** Full-width, warm background color

**Content:**
- Headline: "Be Part of Rural Transformation"
- Subtext: "Whether you're a development professional, CSR partner, or passionate volunteer, there's a place for you in our mission."
- CTA Button: "Get Involved"

**Animation:** Subtle background gradient animation or floating shapes

#### 2.8 Footer

**Columns:**

1. **About**
   - MISSION logo
   - Brief: "A grassroots development organization transforming rural lives in Odisha since 2002."
   - Social links (if any)

2. **Quick Links**
   - About Us
   - Programs
   - Impact
   - Partners
   - Contact

3. **Contact**
   - Regd. Office: Town Planning Colony, Dhenkanal-759013, Odisha
   - State Office: Gajapati Nagar, Bhubaneswar-751005, Odisha
   - Email: [placeholder]
   - Phone: [placeholder]

4. **Legal**
   - Privacy Policy
   - Terms of Use
   - Annual Reports (download link)

**Bottom Bar:**
- © 2024 MISSION. All rights reserved.
- NITI Aayog UID: OR/2010/0024894
- Language switcher (alternate position)

---

### 3. About Us Page

#### 3.1 Hero

**Headline:** "Our Story"
**Subtext:** "Two decades of grassroots transformation in rural Odisha"

**Visual:** Community meeting photo (placeholder)

#### 3.2 The Context Section

**Headline:** "Why We Exist"

**Content:**
```
Odisha ranks eighth in size and eleventh in population among Indian states. Despite abundant natural resources—minerals, forests, water, and a long coastline—it faces significant development challenges.

The state's Human Development Index is the second lowest in India. According to NITI Aayog, 32.59% of Odisha's population lives in poverty, compared to the national average of 21.92%.

Regional disparities create distinct challenges:

• Coastal districts face vulnerability to natural disasters, inadequate infrastructure, and livelihood insecurity

• Eastern districts struggle with gaps in education, healthcare, and opportunities for marginalized populations  

• Central districts contend with agricultural sustainability issues, environmental degradation, and climate change impacts

MISSION was founded in 2002 to address these challenges through community-driven, sustainable interventions.
```

#### 3.3 Vision & Mission Section

**Layout:** Two-column or side-by-side cards

**Vision:**
"To create a just and empowered society where every individual, regardless of background, has equal access to livelihoods, dignity, and opportunity."

**Mission:**
"To strengthen rural communities by enhancing their capacities in livelihood, enterprise, and institution-building through participatory, innovative, and sustainable development practices."

#### 3.4 Core Values

**Layout:** Icon + text grid or list

**Values:**
1. **Inclusion** - We serve all communities, prioritizing the most marginalized and underserved
2. **Dignity** - Every individual deserves to live and work with dignity and purpose
3. **Sustainability** - We design programs that are community-owned and long-lasting
4. **Transparency** - We are accountable in every action—financially, ethically, and programmatically
5. **Collaboration** - We work hand-in-hand with government, partners, and local institutions

#### 3.5 Journey Timeline

**Layout:** Vertical timeline with alternating sides

**Milestones:**

```
2002-2007: The Foundation
- Established training programs for 1,200 youths across various skill sets
- Built foundational expertise in rural development

2007-2012: Building Partnerships  
- Collaborated with 6 ministries and government departments
- Extended operations to 2 districts
- Assisted 6,000 families

2012-2017: Scaling Impact
- Expanded operations to 16 districts
- Served 22,000 families
- Strengthened institutional capabilities

2017-2023: Deepening Reach
- Expanded to 18 districts
- Benefited 165,000 families
- Mobilized ₹22 Cr+ in community funds
- Digitized 13,000+ SHGs

2024 & Beyond: The Road Ahead
- Targeting 5,000+ rural livelihoods through enterprise and marketing
- ₹1 Crore turnover goal across SHG and FPO clusters
- Expanding to new sectors: eco-tourism, rural BPO, millet value chains
```

**Animation:** Timeline nodes and content animate in as user scrolls

#### 3.6 Secretary's Message

**Layout:** Quote/message card with photo

**Photo:** Dr. Prabodha Kumar Moharana (use placeholder professional headshot)

**Quote:**
"What makes our work meaningful is the collective spirit—of our field teams who work tirelessly in remote areas, of our partners who believe in grassroots innovation, and of the community members who show us that resilience and aspiration go hand in hand."

**Attribution:** 
Dr. Prabodha Kumar Moharana
Secretary, MISSION

---

### 4. Team & Governance Page

#### 4.1 Governing Body Section

**Headline:** "Our Leadership"

**Intro:** "MISSION's governing board provides oversight and strategic guidance. Comprising seven independent members—development professionals, intellectuals, and community activists—the board ensures transparency and accountability."

**Board Members (Card Grid):**

1. **Sri Byomojyoti Biswal**
   - Designation: President
   - Role: Strategic direction, policy approvals
   - Profession: Advocate

2. **Smt S.S. Laxmi**
   - Designation: Vice President
   - Role: Assisting President
   - Profession: Social Activist

3. **Dr. Prabodha Kumar Moharana**
   - Designation: Secretary
   - Role: Program leadership, administration
   - Profession: Social Activist

4. **Ms. Sagarika Mohanty**
   - Designation: Treasurer
   - Role: Financial oversight, donor compliance
   - Profession: Social Activist

5. **Smt Sudipti Sahoo**
   - Designation: Executive Member
   - Role: Programmatic review & local governance
   - Profession: Social Activist

6. **Sri Swadesh Ranjan Mohapatra**
   - Designation: Executive Member
   - Role: Programmatic review & local governance
   - Profession: Self-Employed

7. **Sri Jeeban Prakash Das**
   - Designation: Executive Member
   - Role: Programmatic review & local governance
   - Profession: Self-Employed

**Note:** "6 governing body meetings were held during FY 2024-25"

#### 4.2 Our Team Section

**Headline:** "The People Behind the Mission"

**Intro:** "600+ professionals working across 1,000 remote villages and 28 urban areas in eighteen districts."

**Team Composition Visual (Animated Bar/Pie Chart):**
```
Regular Staff: 15
Project Staff (Contract): 546
Empaneled Consultants: 5
Resource Persons (Thematic Experts): 32
Volunteers: 21
─────────────────────
Total: 619
```

**Expertise Areas:** Management, Engineering, Agriculture, Social Sciences

**Stat:** "30% of field and community staff are women. Tribal youth serve as CRPs and village facilitators in tribal-dominated areas."

---

### 5. Programs Pages

Create a main Programs landing page with cards linking to sub-pages. Each program page should follow a consistent template.

#### 5.1 Programs Landing Page

**Hero Headline:** "Our Programs"
**Subtext:** "Comprehensive interventions across eight thematic areas, designed to create meaningful, measurable, and community-driven impact."

**Program Cards Grid:**

1. Livelihood & Enterprise Development
2. Farmer Producer Organizations
3. Women's Self-Help Groups
4. Traditional Artisan Empowerment
5. Skill Development
6. Health & Nutrition
7. Digital Integration
8. Institutional Strengthening

#### 5.2 Program Page Template

Each program page should have:
- Hero with program name and one-liner
- The Challenge (problem being addressed)
- Our Approach
- Key Initiatives/Projects (with photos)
- Impact Numbers (animated)
- Success indicators from M&E data
- Related programs (links)

#### 5.3 Program: Livelihood & Enterprise Development

**Hero:** "Building Sustainable Livelihoods"

**One-liner:** "Empowering rural communities through agriculture, livestock, and micro-enterprise development"

**The Challenge:**
"Rural families in Odisha often depend on single, vulnerable income sources. Limited access to training, credit, and markets keeps them trapped in subsistence economies."

**Our Approach:**
"We provide end-to-end support: from skill training and business planning to credit linkages and market access. Our interventions span agriculture, livestock (backyard poultry, goatery, fishery), and micro-enterprises."

**Key Programs:**

1. **LEDP (Livelihood Enterprise Development Program)**
   - 270 SHG members trained in tailoring, bamboo articles, goat rearing
   - Toolkits and startup grants provided
   - Market access through fairs, melas, digital platforms

2. **EDP (Entrepreneurship Development Program)**
   - 360 rural entrepreneurs trained (manufacturing, service sector, food processing)
   - 115 customized business development plans created
   - 360 EIN registrations, 120 UDYAM registrations facilitated
   - Credit linkages with financial institutions

3. **Micro-Enterprise Support**
   - Backyard poultry, goatery, fishery
   - Mushroom farming, beekeeping
   - Tailoring, bamboo craft, mop making

**Impact Numbers:**
```
930 individuals assisted in income-generating activities
360 entrepreneurs trained in FY 2024-25
79% post-training self-employment rate (LEDP)
52% business setup rate (EDP)
```

#### 5.4 Program: Farmer Producer Organizations

**Hero:** "Strength in Numbers"

**One-liner:** "Organizing smallholder farmers into collectives for better bargaining power and market access"

**The Challenge:**
"Small and marginal farmers face exploitation by middlemen, lack access to quality inputs, and have no collective voice in markets."

**Our Approach:**
"We promote and strengthen Farmer Producer Organizations (FPOs) that aggregate farmers for collective input procurement, technical services, processing, and marketing."

**Key Programs:**

1. **FPO-CSS (Central Sector Scheme)**
   - 2 FPOs formed and strengthened
   - 1,800 farmer members
   - 30+ Board of Directors and CEOs trained
   - Exposure visits to leading agri-value chain institutions

2. **OFPO Bamboo Cluster**
   - 1 Bamboo-based OFPO initiated under NABARD
   - 318 members
   - Capacity building and product profiling
   - 100% target achievement

3. **Odra Desh Marketing Company**
   - Joint venture co-owned by 2 registered FPOs
   - Equity-based participation
   - Unified branding and packaging
   - E-commerce and institutional buyer linkages
   - 2,500+ farmers reached with better prices

**Impact Numbers:**
```
1,800+ farmers in FPO network
₹80 Lakhs turnover achieved within 2 years
1,000+ farmers with collective input procurement
100% FPO target achievement in FY 2024-25
```

#### 5.5 Program: Women's Self-Help Groups

**Hero:** "Women as Agents of Change"

**One-liner:** "Building a network of empowered women driving community transformation"

**The Challenge:**
"Women in rural Odisha often lack financial independence, access to credit, and platforms for collective action."

**Our Approach:**
"We form, strengthen, and federate Women Self-Help Groups (WSHGs), providing them with financial literacy, credit linkages, enterprise training, and leadership development."

**Key Initiatives:**

1. **SHG Formation & Strengthening**
   - 14,375 Women SHGs promoted
   - 147,000 women members
   - 82 SHG federations covering 1,000+ SHGs

2. **E-Shakti (NABARD Digital Initiative)**
   - 13,000+ SHGs digitized
   - Paperless credit linkage system
   - ₹82 Crore credit facilitated within 3 years

3. **SHG Federation Training**
   - Leadership building programs
   - Livelihood micro-projects
   - Financial management training

**Impact Numbers:**
```
14,375 Women SHGs
147,000 women empowered
13,000+ SHGs digitized
₹82 Crore credit linkage facilitated
82 federations formed
```

#### 5.6 Program: Traditional Artisan Empowerment

**Hero:** "Preserving Heritage, Creating Futures"

**One-liner:** "Reviving traditional crafts while connecting artisans to modern markets"

**The Challenge:**
"Traditional artisans—potters, weavers, blacksmiths, carpenters—face declining demand, lack of recognition, and no access to formal support systems."

**Our Approach:**
"We work with government schemes like PM Vishwakarma and KVIC's Gramodyog Vikas Yojana to provide artisans with recognition, skill upgradation, toolkits, credit, and market linkages."

**Key Programs:**

1. **PM Vishwakarma Yojana**
   - 130 traditional artisans registered (carpenters, potters, basket makers, masons)
   - Orientation and skill upgradation training
   - Recognition certificates, loans, and toolkits facilitated
   - 100% ID issuance achieved

2. **Gramodyog Vikas Yojana (KVIC)**
   - Partnership with Khadi and Village Industries Commission
   - Training in village oil industry, paper plate making, tamarind processing, pottery
   - Marketing support via exhibitions and buyer-seller meets
   - 70 SHG members trained

3. **Cluster Development**
   - Mushroom and watermelon clusters (agriculture)
   - Bamboo crafts, bell metal, Dokhra crafts, paddy straw crafts (handicrafts)
   - Product profiling and quality standardization

**Impact Numbers:**
```
130 artisans under PM Vishwakarma
100% recognition certificates issued
70 SHG members in Gramodyog program
5 skill camps conducted
```

#### 5.7 Program: Skill Development

**Hero:** "Skills for Self-Reliance"

**One-liner:** "Equipping rural youth and women with market-relevant skills for employment and entrepreneurship"

**The Challenge:**
"Rural youth lack access to quality vocational training aligned with market demands, leading to unemployment and migration."

**Our Approach:**
"We provide short-term vocational courses, entrepreneurship training, and placement support, with special focus on women and SC/ST communities."

**Key Initiatives:**

1. **Entrepreneurship Promotion through Skill Development**
   - 50+ women trained in food processing and cosmetology
   - MSME and cooperative linkages for self-employment
   - 4 Entrepreneurship Awareness campaigns in Dhenkanal and Angul

2. **Vocational Training**
   - Tailoring, bamboo articles, construction work
   - Food processing units
   - Digital literacy programs

3. **Placement Support**
   - Linkages with companies: Domino's, Colour Plus, Raymond, TVS Motors, Sri Laxmi Textiles

**Impact Numbers:**
```
4,800 youths received entrepreneurship training
3,600 established their own businesses
16,700 jobs created
500+ rural youths placed in companies
```

#### 5.8 Program: Health & Nutrition

**Hero:** "Healthy Communities, Strong Futures"

**One-liner:** "Improving healthcare access and nutrition awareness in underserved areas"

**Key Initiatives:**

1. **Mass Drug Administration (MDA) Awareness**
   - 12,000 community members reached
   - 560 awareness drives in 1 block
   - 100% target achievement

2. **Health Camps & Awareness**
   - Maternal and child health interventions
   - Sanitation drives
   - Nutrition education campaigns

**Impact Numbers:**
```
12,000 community members reached
560 awareness drives conducted
100% program target achieved
```

---

### 6. Impact Page

#### 6.1 Hero

**Headline:** "Measuring What Matters"
**Subtext:** "Transparent reporting on our reach, outcomes, and community transformation"

#### 6.2 Overall Reach Section

**Layout:** Large animated counter cards

**Stats:**
```
168,015 Individuals Reached
165,036 Households Served
1,157 Revenue Villages
18 Districts
285 Gram Panchayats
136 Projects Executed
```

#### 6.3 Institutions Built Section

**Headline:** "Building Lasting Community Institutions"

**Visual:** Animated icons or illustrations

**Stats:**
```
14,375 Women Self-Help Groups
217 Village Organizations
82 SHG Federations
2 Farmer Producer Organizations
1 Bamboo OFPO
1 Joint Venture Marketing Company
```

#### 6.4 Economic Impact Section

**Headline:** "Economic Transformation"

**Data Visualization:** Bar chart or infographic

**Stats:**
```
₹22 Cr+ Community Funds Mobilized
₹82 Cr Credit Linkage for SHGs
₹80 Lakhs FPO Turnover (2 years)
16,700 Jobs Created
3,600 Businesses Established
```

#### 6.5 FY 2024-25 Program Performance

**Headline:** "This Year's Achievements"

**Layout:** Table or progress bars with percentages

**Data:**
| Program | Beneficiaries | Target Achieved |
|---------|---------------|-----------------|
| FPO-CSS | 1,800 Farmers | 100% |
| LEDP | 270 Women | 79% |
| PM Vishwakarma | 130 Artisans | 100% |
| Gramodyog Vikas | 70 SHG Members | 30% |
| MDA Awareness | 12,000 Community | 100% |
| EDP | 360 Trainees | 52% |
| OFPO Bamboo | 318 Members | 100% |

**Animation:** Progress bars fill on scroll

#### 6.6 Growth Over Time

**Headline:** "22 Years of Growth"

**Visualization:** Animated line/area chart

**Data:**
```
Year: Families Reached
2007: 1,200
2012: 6,000
2017: 22,000
2023: 165,000
```

#### 6.7 Fund Utilization (Transparency)

**Headline:** "Where Your Support Goes"

**Visualization:** Animated donut chart

**Income Sources (FY 2024-25):**
- Government Grants: 73.17%
- Other Agencies: 14.83%
- Subscriptions: 6.56%
- Donations: 5.33%

**Expenditure Breakdown:**
- Program Expenses: 78.09%
- Administrative: 15.86%
- Depreciation: 2.55%
- Other: 0.05%

**Key Stat:** "96.54% Fund Utilization Rate"

---

### 7. Where We Work Page

#### 7.1 Hero

**Headline:** "Our Geographic Footprint"
**Subtext:** "Present across 18 districts of Odisha, reaching the most underserved communities"

#### 7.2 Interactive Odisha Map

**Implementation:** Use react-simple-maps or a custom SVG map of Odisha

**Features:**
- Highlight all 18 operational districts
- Different color intensity based on concentration of work
- Hover tooltip showing: District name, key programs, families reached (if data available)
- Click to show district details in a sidebar/modal

**Active Districts to Highlight:**
1. Dhenkanal (Primary - headquarters)
2. Angul
3. Khordha
4. Puri
5. Deogarh
6. Kendrapara
7-18. [Other districts from their 18-district coverage]

**Special Focus Areas:**

**Dhenkanal District (Primary):**
Blocks: Bhuban, Dhenkanal Sadar, Gondia, Hindol, Kamakhyanagar, Kankadahad, Odapada, Parjang

**Angul District:**
Blocks: Chendipada, Banarpal

**Khordha District:**
Areas: Bhubaneswar, Balugaon

**Puri & Deogarh:**
Focus: Tourism livelihoods, youth engagement, artisan linkages

#### 7.3 Office Locations

**Layout:** Cards with addresses

1. **Registered Office**
   - Town Planning Colony
   - Po- Dhenkanal (RS)
   - Dhenkanal - 759013, Odisha

2. **State Office**
   - Gajapati Nagar
   - Po- Sainik School
   - Bhubaneswar - 751005, Odisha

3. **Regional Office - Angul**
   - Dhaurapalli, Kishorenagar
   - Angul - 759126, Odisha

4. **Regional Office - Deogarh**
   - Rampalli, Reamal
   - Deogarh - 768109, Odisha

5. **Regional Office - Puri**
   - Water Works Road
   - Puri - 752002, Odisha

6. **Regional Office - Kendrapara**
   - College Road, Tinimuhani
   - Kendrapara - 754211, Odisha

---

### 8. Partners Page

#### 8.1 Hero

**Headline:** "Our Partners in Change"
**Subtext:** "Collaboration with government, financial institutions, and development organizations drives our impact"

#### 8.2 Partner Categories

**Layout:** Categorized logo grids with organization names

**Government Partners:**
- Government of India
- Government of Odisha
- Reserve Bank of India
- Ministry of MSME
- Development Commissioner (Handicrafts), Ministry of Textiles

**Financial & Development Institutions:**
- NABARD
- NABCONS

**State Agencies:**
- State Urban Development Agency (SUDA), Odisha
- Odisha Computer Application Centre (OCAC)
- State Institute for Rural Development & Panchayati Raj (SIRD&PR)
- Odisha Knowledge Corporation Limited (OKCL)
- Odisha Forest Development Corporation
- State Council for Technical Education & Vocational Training (SCTE&VT)

**National Programs:**
- National Health Mission
- Jaga Mission
- Odisha Livelihood Mission

**Industry & Enterprise:**
- Khadi and Village Industries Commission (KVIC)
- District Industries Centre (DIC)
- Entrepreneurship Development Institute of India (EDII)

**Other Partners:**
- Urban Management Centre
- Ecomatrix Solutions
- 17 Corporate Partners
- 36 Foundation & Multilateral Partners

#### 8.3 Partnership Stats

```
119 Government Departments collaborated
36 Foundation & Multilateral Partners
17 Corporate Partners
```

---

### 9. Transparency / Financials Page

#### 9.1 Hero

**Headline:** "Transparency & Accountability"
**Subtext:** "We believe in open, honest reporting of our finances and governance"

#### 9.2 Financial Summary FY 2024-25

**Income:**
| Source | Amount (₹) | Percentage |
|--------|------------|------------|
| Grant from Govt. Agencies | 40,15,187 | 73.17% |
| Grant from Other Agencies | 8,14,082 | 14.83% |
| Subscriptions | 3,60,000 | 6.56% |
| Donations | 2,92,745 | 5.33% |
| Misc. & Bank Interest | 5,708 | 0.10% |
| **Total Income** | **54,87,722** | **100%** |

**Expenditure:**
| Area | Amount (₹) | Percentage |
|------|------------|------------|
| Program Expenses | 42,85,098 | 78.09% |
| Administrative Expenses | 8,70,501 | 15.86% |
| Depreciation & Amortization | 1,39,775 | 2.55% |
| Misc. & Bank Charges | 2,579 | 0.05% |
| **Total Expenses** | **52,97,953** | **96.54%** |

**Surplus:** ₹1,89,769 (3.46%)

**Visualization:** Donut charts for both income and expenditure

#### 9.3 Key Financial Highlights

- 96.54% fund utilization rate
- Multi-year partnerships renewed with Ministry of MSME, NABARD
- Digital accounting via Tally
- Timely audit completion with no major observations

#### 9.4 Audit & Compliance

- Statutory audit by Samarjit & Associates, Chartered Accountants
- NGO Darpan profile updated
- GST filed regularly

#### 9.5 Statutory Details

**Layout:** Clean list or table

```
Registration Number (District): DKL 5218/52
Registration Number (IGR): 98/18201900010
PAN Number: AABTM6676M
TAN Number: BBNM02267G
GST Number: 21AABTM6676M2Z6
12A URN: AABTM6676ME20231
80G URN: AABTM6676MF20231
NITI Aayog UID: OR/2010/0024894
```

#### 9.6 Download Annual Reports

**Layout:** Card with download button

**Available Reports:**
- Annual Report 2024-25 (PDF) - Primary download
- [Placeholder for older reports]

---

### 10. Get Involved Page

#### 10.1 Hero

**Headline:** "Join the Movement"
**Subtext:** "There are many ways to contribute to rural transformation"

#### 10.2 Volunteer Section

**Headline:** "Volunteer With Us"

**Content:**
"We welcome development professionals, students, and passionate individuals to contribute their time and skills. Opportunities include field work, research, documentation, and capacity building."

**Volunteer Form Fields:**
- Full Name (required)
- Email (required)
- Phone Number (required)
- Location/City
- Area of Expertise (dropdown: Agriculture, Social Work, Finance, Marketing, Technology, Healthcare, Education, Other)
- Availability (dropdown: Full-time, Part-time, Weekends, Project-based)
- Brief Introduction / Why you want to volunteer (textarea)
- Submit button

**Note:** Form should have validation and show success message on submission. For now, just log form data to console (no backend).

#### 10.3 Partner With Us Section

**Headline:** "Partnership Opportunities"

**For CSR Partners:**
"Align your corporate social responsibility goals with impactful rural development programs. We offer transparent reporting, measurable outcomes, and grassroots implementation."

**For Foundations & Development Agencies:**
"Collaborate on thematic programs in livelihoods, women's empowerment, artisan development, or farmer collectives."

**For Government Bodies:**
"We have 22+ years of experience implementing central and state schemes at the grassroots level."

**Partnership Inquiry Form Fields:**
- Organization Name (required)
- Contact Person (required)
- Email (required)
- Phone Number
- Organization Type (dropdown: Corporate/CSR, Foundation, Government, Multilateral, Other)
- Area of Interest (checkboxes: Livelihoods, Women Empowerment, Artisan Development, Farmer Collectives, Skill Development, Health & Nutrition)
- Message (textarea)
- Submit button

#### 10.4 Careers Section

**Headline:** "Work With Us"

**Content:**
"Join our team of 600+ professionals working across rural Odisha. We offer opportunities in program management, community mobilization, training, and administration."

**Current Openings:** "No current openings. Check back soon or send your resume to [email placeholder]."

---

### 11. Contact Page

#### 11.1 Hero

**Headline:** "Get in Touch"
**Subtext:** "We'd love to hear from you"

#### 11.2 Contact Information

**Layout:** Cards or columns

**Registered Office:**
Town Planning Colony
Po- Dhenkanal (RS)
Dhenkanal - 759013, Odisha

**State Office:**
Gajapati Nagar
Po- Sainik School
Bhubaneswar - 751005, Odisha

**Email:** info@missionodisha.co.in (placeholder)
**Phone:** +91-XXXXX-XXXXX (placeholder)
**Website:** www.missionodisha.co.in

#### 11.3 Contact Form

**Fields:**
- Name (required)
- Email (required)
- Phone
- Subject (dropdown: General Inquiry, Partnership, Volunteering, Media, Other)
- Message (required, textarea)
- Submit button

#### 11.4 Map

**Embed:** Google Maps showing Dhenkanal office location
- Coordinates: Approximately 20.6567° N, 85.5817° E (Dhenkanal)

---

## Technical Implementation Details

### Project Structure

```
mission-ngo-website/
├── public/
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json
│   │   ├── hi/
│   │   │   └── translation.json
│   │   └── or/
│   │       └── translation.json
│   ├── assets/
│   │   ├── images/
│   │   ├── documents/
│   │   │   └── annual-report-2024-25.pdf
│   │   └── icons/
│   └── odisha-map.json (TopoJSON for map)
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   └── Button.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── ImpactStats.jsx
│   │   │   ├── WhatWeDo.jsx
│   │   │   ├── FeaturedInitiatives.jsx
│   │   │   ├── ImpactVisualization.jsx
│   │   │   ├── PartnersStrip.jsx
│   │   │   └── CTASection.jsx
│   │   ├── about/
│   │   ├── programs/
│   │   ├── impact/
│   │   ├── map/
│   │   │   └── OdishaMap.jsx
│   │   ├── forms/
│   │   │   ├── VolunteerForm.jsx
│   │   │   ├── PartnerForm.jsx
│   │   │   └── ContactForm.jsx
│   │   └── charts/
│   │       ├── GrowthChart.jsx
│   │       ├── FundAllocationChart.jsx
│   │       └── ProgramProgressChart.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── TeamGovernance.jsx
│   │   ├── Programs.jsx
│   │   ├── ProgramDetail.jsx
│   │   ├── Impact.jsx
│   │   ├── WhereWeWork.jsx
│   │   ├── Partners.jsx
│   │   ├── Transparency.jsx
│   │   ├── GetInvolved.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   ├── impactData.js
│   │   ├── programsData.js
│   │   ├── partnersData.js
│   │   ├── financialData.js
│   │   └── timelineData.js
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   ├── useCountUp.js
│   │   └── useTheme.js
│   ├── utils/
│   │   └── animations.js
│   ├── styles/
│   │   └── globals.css
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x",
    "framer-motion": "^10.x",
    "i18next": "^23.x",
    "react-i18next": "^13.x",
    "recharts": "^2.x",
    "react-simple-maps": "^3.x",
    "react-countup": "^6.x",
    "react-intersection-observer": "^9.x",
    "@headlessui/react": "^1.x",
    "lucide-react": "^0.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light mode primary colors
        saffron: {
          50: '#FEF7F0',
          100: '#FCE8D4',
          200: '#F9CBA8',
          300: '#F5A76D',
          400: '#E07B39', // Primary
          500: '#C66A2E',
          600: '#A85424',
          700: '#8A4520',
          800: '#6B361A',
          900: '#4D2714',
        },
        forest: {
          50: '#F0F7F5',
          100: '#D4E8E2',
          200: '#A8D1C4',
          300: '#6BB39D',
          400: '#3D8F7A',
          500: '#1B4D3E', // Primary
          600: '#164033',
          700: '#123329',
          800: '#0E2620',
          900: '#0A1A16',
        },
        sand: {
          50: '#FAFAF8',
          100: '#F5E6D3', // Primary
          200: '#EBD4BA',
          300: '#DFC0A0',
          400: '#D4AC86',
        },
        terracotta: {
          400: '#C75B39',
          500: '#B04E2E',
        },
        indigo: {
          900: '#2D3047',
        },
        golden: {
          400: '#E5A835',
          500: '#D49A2A',
        },
        teal: {
          400: '#4A9B8C',
          500: '#3D8577',
        },
        // Dark mode specific colors
        dark: {
          bg: {
            primary: '#0F1419',
            secondary: '#1A2128',
            tertiary: '#242D35',
            hover: '#2A3640',
          },
          text: {
            primary: '#E7E9EA',
            secondary: '#8B98A5',
            muted: '#6B7280',
          },
          border: {
            DEFAULT: '#2F3941',
            divider: '#38444D',
          },
          // Adjusted accent colors for dark mode
          accent: {
            saffron: '#F09D51',
            forest: '#3D9B7A',
            golden: '#F0B840',
            teal: '#5ABAA8',
          }
        }
      },
      fontFamily: {
        heading: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'theme-toggle': 'themeRotate 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        themeRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(0.8)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        }
      },
      boxShadow: {
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
```

### Animation Utilities

```javascript
// src/utils/animations.js
export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 1
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition
  }
};
```

### Animated Counter Component Example

```javascript
// src/components/common/AnimatedCounter.jsx
import { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';

export default function AnimatedCounter({ 
  end, 
  duration = 2.5, 
  prefix = '', 
  suffix = '',
  decimals = 0 
}) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const countUpRef = useRef(null);
  const { start, reset } = useCountUp({
    ref: countUpRef,
    start: 0,
    end,
    duration,
    prefix,
    suffix,
    decimals,
    useEasing: true,
    useGrouping: true,
    startOnMount: false,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
  }, [inView, start]);

  return (
    <span ref={ref}>
      <span ref={countUpRef} className="font-mono" />
    </span>
  );
}
```

### Theme Hook Implementation

```javascript
// src/hooks/useTheme.js
import { useState, useEffect, useCallback } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Ensure DOM is in sync
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setIsLoaded(true);
  }, []);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  }, []);

  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoaded,
    toggleTheme,
    setTheme: setSpecificTheme,
  };
}
```

### Theme Context (Optional - for global access)

```javascript
// src/context/ThemeContext.jsx
import { createContext, useContext } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const theme = useTheme();
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
```

### Updated ThemeToggle Component (using hook)

```javascript
// src/components/common/ThemeToggle.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, isLoaded } = useThemeContext();
  
  // Prevent hydration mismatch
  if (!isLoaded) {
    return (
      <div className="w-10 h-10 rounded-full bg-sand-200 dark:bg-dark-bg-tertiary animate-pulse" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full 
                 bg-sand-200 dark:bg-dark-bg-tertiary
                 hover:bg-sand-300 dark:hover:bg-dark-bg-hover
                 text-saffron-500 dark:text-golden-400
                 transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-saffron-400/50"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15 
          }}
        >
          {isDark ? (
            <Sun size={20} strokeWidth={2.5} />
          ) : (
            <Moon size={20} strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
```

### App.jsx with Theme Provider

```javascript
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
// ... other imports

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-sand-50 dark:bg-dark-bg-primary transition-colors">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* ... other routes */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

### Image Placeholders

Since actual photos will come later, use these Unsplash placeholder URLs:

```javascript
// src/data/placeholders.js
export const placeholders = {
  hero: "https://images.unsplash.com/photo-1593113598332-cd59a93f9724?w=1600", // Rural India women's group
  community: "https://images.unsplash.com/photo-1594708767771-a5f97143f5db?w=800", // Indian village
  farming: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800", // Indian farmer
  women: "https://images.unsplash.com/photo-1617450365226-9bf28c04e130?w=800", // Indian women
  artisan: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", // Pottery/crafts
  training: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", // Training session
  market: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800", // Local market
  team: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800", // Team meeting
};
```

---

## Responsive Design Notes

- **Mobile-first approach**
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Navigation:** Hamburger menu below lg breakpoint
- **Stats grid:** Single column on mobile, 2 columns on tablet, 4-5 on desktop
- **Program cards:** Stack on mobile, grid on desktop
- **Map:** Full width, touch-friendly tooltips on mobile
- **Charts:** Responsive, may simplify on mobile
- **Forms:** Full width inputs on mobile

---

## Accessibility Requirements

- Semantic HTML (header, main, nav, section, article, footer)
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios meeting WCAG AA
- Alt text for all images
- Form labels and error messages

---

## Performance Considerations

- Lazy load images below the fold
- Code-split by route
- Optimize images (use WebP where possible)
- Minimize animation on reduced-motion preference
- Preload critical fonts

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Global Styles for Dark Mode

```css
/* src/styles/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');

/* Base styles */
@layer base {
  html {
    @apply scroll-smooth;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  html.dark {
    color-scheme: dark;
  }
  
  body {
    @apply font-body text-indigo-900 bg-sand-50;
    @apply dark:text-dark-text-primary dark:bg-dark-bg-primary;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
  
  /* Smooth transitions for theme switching */
  * {
    @apply transition-colors duration-200;
  }
}

/* Component layer for reusable dark mode patterns */
@layer components {
  .card-light-dark {
    @apply bg-white dark:bg-dark-bg-secondary;
    @apply border border-sand-200 dark:border-dark-border;
    @apply shadow-md dark:shadow-dark-lg;
  }
  
  .text-primary-adaptive {
    @apply text-indigo-900 dark:text-dark-text-primary;
  }
  
  .text-secondary-adaptive {
    @apply text-gray-600 dark:text-dark-text-secondary;
  }
  
  .bg-section-adaptive {
    @apply bg-sand-50 dark:bg-dark-bg-primary;
  }
  
  .bg-elevated-adaptive {
    @apply bg-white dark:bg-dark-bg-secondary;
  }
  
  .border-adaptive {
    @apply border-sand-200 dark:border-dark-border;
  }
  
  .accent-text-adaptive {
    @apply text-saffron-400 dark:text-dark-accent-saffron;
  }
  
  .link-adaptive {
    @apply text-teal-500 hover:text-teal-400;
    @apply dark:text-dark-accent-teal dark:hover:text-teal-300;
  }
  
  /* Form inputs */
  .input-adaptive {
    @apply bg-white dark:bg-dark-bg-secondary;
    @apply border border-sand-300 dark:border-dark-border;
    @apply text-indigo-900 dark:text-dark-text-primary;
    @apply placeholder:text-gray-400 dark:placeholder:text-dark-text-muted;
    @apply focus:border-teal-400 dark:focus:border-dark-accent-teal;
    @apply focus:ring-2 focus:ring-teal-400/20 dark:focus:ring-dark-accent-teal/20;
  }
  
  /* Buttons */
  .btn-primary-adaptive {
    @apply bg-saffron-400 hover:bg-saffron-500;
    @apply dark:bg-dark-accent-saffron dark:hover:bg-saffron-400;
    @apply text-white;
  }
  
  .btn-secondary-adaptive {
    @apply bg-forest-500 hover:bg-forest-600;
    @apply dark:bg-dark-accent-forest dark:hover:bg-forest-400;
    @apply text-white;
  }
  
  .btn-outline-adaptive {
    @apply border-2 border-saffron-400 text-saffron-400;
    @apply hover:bg-saffron-400 hover:text-white;
    @apply dark:border-dark-accent-saffron dark:text-dark-accent-saffron;
    @apply dark:hover:bg-dark-accent-saffron dark:hover:text-dark-bg-primary;
  }
}

/* Prevent flash of wrong theme */
/* Add this script to index.html <head> before any CSS */
/*
<script>
  (function() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
*/
```

### Index.html Dark Mode Script

Add this to the `<head>` section of `index.html` before any stylesheets to prevent flash of wrong theme:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MISSION - Engross, Enable, Empower</title>
    
    <!-- Prevent flash of wrong theme -->
    <script>
      (function() {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
    
    <!-- Preload fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## Final Deliverable Checklist

- [ ] All pages implemented with content
- [ ] Responsive design across all breakpoints
- [ ] **Dark mode fully functional**
  - [ ] Theme toggle in header (and mobile menu)
  - [ ] System preference detection on first visit
  - [ ] localStorage persistence
  - [ ] Smooth transitions between themes
  - [ ] No flash of wrong theme on page load
  - [ ] All components styled for both modes
  - [ ] Charts and map adapted for dark mode
- [ ] Animations working smoothly
- [ ] Number counters animating on scroll
- [ ] Charts rendering with data
- [ ] Odisha map interactive
- [ ] Forms with validation
- [ ] Language switcher functional (EN working, HI/OR placeholders)
- [ ] Footer with all links
- [ ] PDF download for annual report
- [ ] Meta tags and page titles
- [ ] Loading states
- [ ] Error boundaries
- [ ] 404 page

---

## Notes for Implementation

1. Start with the layout and navigation shell
2. Build the homepage first as it contains most component types
3. Create reusable components (AnimatedCounter, SectionHeading, Button, Card)
4. Set up routing and page shells
5. Implement charts and map components
6. Add forms with validation
7. Integrate i18n
8. Polish animations
9. Optimize for performance
10. Test responsiveness

**Remember:** The goal is a website that feels warm, human, and distinctly NOT like a generic template. Every design decision should reinforce MISSION's grassroots, community-driven identity.
