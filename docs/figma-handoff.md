# Merch Maverick Figma Handoff

This document packages the current coded site into a Figma-ready design handoff so we can:

1. use the live site as the current source of truth
2. recreate or trace the key pages in Figma for click-based visual editing
3. bring approved visual changes back into the repo cleanly

Local preview:
- `http://localhost:3001`

Primary coded references:
- [src/app/page.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/page.tsx)
- [src/components/home/HeroSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/HeroSection.tsx)
- [src/components/layout/Navbar.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/layout/Navbar.tsx)
- [src/components/layout/Footer.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/layout/Footer.tsx)
- [src/app/globals.css](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/globals.css)

## 1. Current Brand Direction

The current redesign direction is:

- premium B2B merch brand
- concept-to-production story
- strong hero centered on 3D garment approval
- warm luxury neutrals with teal as the key accent
- cleaner editorial spacing rather than crowded SaaS blocks
- one-stop-solution positioning, not a 3D-only product

Core business message to preserve:

- `Made-to-order: made to grow.`
- one-stop support from idea to design to factory production to logistics
- global service, not Europe-only
- factory-direct savings
- fast quote process

## 2. Visual System for Figma

Use this as the starting style system in Figma.

### Color Intent

Base neutrals:
- warm white / stone backgrounds
- white cards with soft blur and low-contrast borders
- charcoal / near-black for premium sections

Accent:
- deep teal for highlight, emphasis, and trust

Support:
- muted grays for secondary text
- subtle slate tones for secondary depth

Practical token mapping from code:
- `--color-bg-primary-light: #ffffff`
- `--color-bg-secondary-light: #f7f7f7`
- `--color-text-light: #1a1a1a`
- `--color-muted-light: #6b6b6b`
- `--color-teal: #2b6b5e`
- `--color-teal-dark: #1f5248`
- `--color-border-light: #e8e8e8`

### Typography Intent

Current font:
- Inter

Style rules:
- large, tight hero headline
- short uppercase eyebrow labels with high tracking
- readable body copy with generous line-height
- premium feel comes more from spacing and hierarchy than decorative type

Suggested Figma text styles:
- `Display / Hero`
- `Heading / XL`
- `Heading / L`
- `Body / L`
- `Body / M`
- `Label / Eyebrow`
- `Button / Primary`

### Spacing and Shape

Use these as defaults:
- page container max width: `1280px` to `1344px`
- mobile gutter: `16px`
- tablet gutter: `24px`
- desktop gutter: `32px`
- section spacing: `96px` to `128px`
- card radius: `24px` to `36px`
- button radius: `20px` to `28px`

### Effects

Use sparingly:
- soft shadow, wide blur, low opacity
- glass / blur overlays only where they support the premium look
- motion should feel smooth and expensive, not playful
- avoid purple gradients and generic AI startup visuals

## 3. Homepage Section Spec

Homepage composition in code:

1. Hero
2. Trust / industry strip
3. Concept-to-production section
4. Industry solutions
5. Why choose us
6. How it works
7. Pricing comparison
8. Social proof
9. Client portal preview
10. Final CTA

### Hero

Reference:
- [src/components/home/HeroSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/HeroSection.tsx)

Purpose:
- sell the full system in one glance
- show realistic merch approval story
- connect old message with new premium visual language

Required elements:
- navbar floating above hero
- eyebrow / premium tech-fashion cue
- headline with `Made-to-order: made to grow.`
- supporting paragraph about full-service solution
- primary CTA: `Get Instant Quote`
- secondary CTA: process / learn-more oriented
- proof cards
- hero stats
- visual stage with 3D lineup
- supporting design simulation panel

Figma note:
- build this as a desktop frame first
- then create tablet and mobile variants
- separate text column and visual stage into components

### Trust Strip

Reference:
- [src/components/home/BrandsSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/BrandsSection.tsx)

Purpose:
- show breadth of industries served
- create rhythm break after hero

Figma note:
- treat as reusable horizontal credibility band

### Concept-to-Production Section

Reference:
- [src/components/home/FactoriesSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/FactoriesSection.tsx)

Purpose:
- explain why the process is premium
- bridge design concept to manufacturing

Figma note:
- left narrative block
- right 4-card process grid

### Remaining Homepage Sections

Keep these in the first Figma pass as medium fidelity unless you want a full redesign pass immediately:
- [src/components/home/VerticalsSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/VerticalsSection.tsx)
- [src/components/home/TrustSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/TrustSection.tsx)
- [src/components/home/HowItWorksSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/HowItWorksSection.tsx)
- [src/components/home/PricingComparisonSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/PricingComparisonSection.tsx)
- [src/components/home/SocialProofSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/SocialProofSection.tsx)
- [src/components/home/ClientPortalSection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/ClientPortalSection.tsx)
- [src/components/home/FinalCTASection.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/home/FinalCTASection.tsx)

## 4. Page-by-Page Handoff List

This is the recommended Figma priority order.

### Priority 1: Must Design First

1. Homepage `/`
Reason:
- strongest brand-defining page
- most visible sales page
- contains the new visual direction

Figma deliverables:
- desktop homepage
- tablet homepage
- mobile homepage
- component slices for hero, CTA, stat card, proof card, dark CTA block

2. Quote page `/quote`
Reference:
- [src/app/quote/page.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/quote/page.tsx)
- [src/components/quote/QuoteTool.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/quote/QuoteTool.tsx)

Reason:
- core conversion flow
- currently still visually closer to older system

Figma deliverables:
- quote landing header
- full stepper form
- success state
- mobile version

3. Pricing page `/pricing`
Reference:
- [src/app/pricing/page.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/app/pricing/page.tsx)

Reason:
- important trust and comparison page
- needs visual alignment with the new premium homepage

Figma deliverables:
- header
- comparison table
- MOQ and volume layout
- FAQ
- CTA block

### Priority 2: Next Wave

4. Solutions template pages
References:
- [src/lib/solutionData.ts](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/lib/solutionData.ts)
- [src/components/verticals/SolutionPageLayout.tsx](/Users/faiazyen/Desktop/Merch%20Maverick%20Codex/src/components/verticals/SolutionPageLayout.tsx)

Pages:
- `/solutions/hospitality`
- `/solutions/corporate`
- `/solutions/fitness`
- `/solutions/industrial`
- `/solutions/events`
- `/solutions/influencers-artists`

Reason:
- these can share one template in Figma

Figma deliverables:
- one reusable solution page master
- 1 example filled page
- card / FAQ / testimonial modules

5. About
6. Contact
7. Testimonials
8. Portal preview page

### Priority 3: Lower Priority / Admin / Internal

- `/admin`
- `/preview`
- old top-level vertical duplicates like `/corporate`, `/fitness`, `/events`, `/hospitality`, `/industrial`

These can wait unless you want the whole product cleaned up now.

## 5. Recommended Figma File Structure

Create one Figma file:

`Merch Maverick Website Redesign`

Recommended pages inside Figma:

1. `00 Cover`
2. `01 Foundations`
3. `02 Components`
4. `03 Homepage`
5. `04 Quote`
6. `05 Pricing`
7. `06 Solutions Template`
8. `07 About / Contact / Testimonials`
9. `99 Archive`

### Foundations page

Include:
- colors
- type styles
- spacing scale
- radius scale
- shadow styles
- button styles
- icon usage rules
- section layout rules

### Components page

Include:
- navbar
- footer
- primary button
- secondary button
- stat card
- proof card
- CTA block
- table styles
- FAQ item
- testimonial card
- form field styles

## 6. Fastest Way to Bring Localhost Into Figma

Best practical workflow:

### Option A: Screenshot-based tracing in Figma

This is the fastest and cleanest for your case.

1. Open `http://localhost:3001`
2. Capture full-page screenshots:
   - homepage desktop
   - homepage mobile
   - quote page desktop
   - pricing page desktop
3. Drop those screenshots into Figma as locked reference layers
4. Rebuild the layout on top using Auto Layout and reusable components

Why this is best:
- fastest
- visually accurate
- fully editable after recreation
- avoids messy HTML-to-Figma conversion

### Option B: HTML-to-Figma plugin

Use only if you want a rough shortcut.

Recommended approach:
- use localhost URL if plugin accepts it
- if not, use screenshots or a temporary deployed preview

Downside:
- imported layers are often messy
- spacing and text styles need cleanup
- not great for a serious reusable design file

### Option C: Browser screenshots plus dev measurements

If you want higher precision:
- use screenshots in Figma
- inspect the live site in browser devtools
- copy exact widths, paddings, radii, and type sizes

This is usually the best balance of speed and accuracy.

## 7. What To Capture From Localhost

Capture these states:

### Homepage

- desktop full page
- mobile full page
- hero only close screenshot
- CTA section close screenshot

### Quote

- desktop top of page
- one step active in form
- success state if possible
- mobile step state

### Pricing

- hero
- comparison table
- FAQ section
- bottom CTA

### Solution page

- one representative solution page desktop
- mobile hero and content layout

## 8. Editing Rules Inside Figma

When you edit in Figma, try to mark each change as one of these:

- `layout`
- `copy`
- `style`
- `component`
- `motion idea`
- `image / 3D asset`

This makes implementation much faster when you hand it back to me.

Please annotate especially:
- any new hero image direction
- any CTA wording changes
- spacing changes between sections
- button style changes
- form redesign decisions
- desktop/mobile differences

## 9. Handoff Back to Code

Once you edit in Figma, send back:

1. Figma link
2. which pages are final
3. which frames are desktop / tablet / mobile
4. any notes about hover, animation, or interaction

Then I will:

1. compare the Figma frames with the current code
2. update the relevant components in the repo
3. preserve the current routing and data flow
4. refine responsiveness
5. prepare the site for GitHub push / deployment

## 10. Suggested Next Move

Recommended immediate sequence:

1. Create the Figma file with the structure above
2. Capture homepage, quote, and pricing from `localhost:3001`
3. Rebuild homepage hero and CTA first
4. Edit quote page second
5. Edit pricing third
6. Send me the Figma link

If you want, the next thing I can do is create a second doc with a tighter:
- screenshot checklist
- exact frame sizes
- component naming convention for Figma

