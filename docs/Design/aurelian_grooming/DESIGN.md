---
name: Aurelian Grooming
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4e4639'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#7f7667'
  outline-variant: '#d1c5b4'
  surface-tint: '#775a19'
  primary: '#775a19'
  on-primary: '#ffffff'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#e9c176'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#a4a5a5'
  on-tertiary-container: '#393b3c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style
This design system targets an affluent, style-conscious clientele who views grooming as a ritual rather than a chore. The brand personality is poised, meticulous, and welcoming, evoking the quiet confidence of a high-end atelier. 

The aesthetic is a refined hybrid of **Minimalism** and **Soft Luxury**. It prioritizes heavy white space to create an "airy" breathing room, punctuated by thin, precise lines and metallic accents. The goal is to evoke a sense of cleanliness, precision, and exclusivity, ensuring the user feels a transition from the chaotic digital world into a curated sanctuary.

## Colors
The palette is rooted in a pristine white base to emphasize cleanliness. 
- **Primary (Champagne Gold):** Used sparingly for key calls-to-action, active states, and premium highlights. It should feel metallic and luminous, not flat.
- **Secondary (Obsidian Black):** Reserved for high-contrast typography and structural elements like dividers or icons to provide a sharp, masculine edge.
- **Tertiary (Silk Grey):** A soft, cool grey used for subtle backgrounds, secondary borders, and disabled states to prevent the UI from feeling jarring.
- **Background:** Always clean white (#FFFFFF) to maintain the "airy" aesthetic.

## Typography
The typography strategy relies on a sophisticated contrast between classic serif and modern sans-serif. **Noto Serif** is used for headlines to convey heritage and artisanal skill. **Manrope** provides a balanced, highly legible counterpoint for body text and functional UI elements. 

To maintain the "fancy" tone, use generous tracking (letter-spacing) on uppercase labels and ensure headlines are never crowded. High-end editorial layouts are the primary inspiration here.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model for desktop to ensure content remains centered and prestigious, while transitioning to a fluid margin-based system for mobile. 

The rhythm is intentionally "loose." Rather than packing information, use vertical spacing to separate services and sections. Large sections should be padded with `margin-desktop` to create the airy feel of a spacious boutique. All spacing follows an 8px base unit to maintain mathematical harmony.

## Elevation & Depth
Elevation is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. 
- Use subtle 1px borders in Silk Grey (#F2F2F2) to define cards and containers.
- When depth is required (e.g., a booking modal), use a high-spread, ultra-low opacity shadow (Color: #1A1A1A, Opacity: 4%, Blur: 40px). 
- Background blurs (10px - 20px) may be applied to navigation bars to maintain the "Glassmorphism" feel of high-end skincare packaging.

## Shapes
The shape language is **Soft (Level 1)**. While the brand is premium, completely sharp corners can feel aggressive. A subtle 4px (0.25rem) radius on buttons and 8px (0.5rem) on cards provides a bespoke, hand-finished feel. This small radius mimics the precision of a barber's blade while remaining approachable.

## Components
- **Buttons:** Primary buttons use a solid Gold background with White text or a Black background with Gold text. Secondary buttons should be Ghost style (transparent background) with a 1px Gold border.
- **Input Fields:** Minimalist design with only a bottom border (1px Silk Grey) that turns Gold on focus. Labels should use the `label-caps` style above the field.
- **Chips:** Used for selecting time slots or services. They should feature a White background and a 1px Silk Grey border, turning Solid Black with White text when selected.
- **Cards:** White background with a 1px Silk Grey border. No shadows. Use Noto Serif for titles within cards to elevate the service descriptions.
- **Dividers:** Use hairline-thin (0.5px) dividers in Silk Grey to separate list items without breaking the visual flow.
- **Booking Calendar:** A custom, airy grid with ample padding around dates. The "Current Day" should be indicated by a gold underline rather than a heavy circle.