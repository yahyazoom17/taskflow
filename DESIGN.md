---
version: alpha
name: Apple
description: Premium white space. SF Pro. Cinematic imagery.
colors:
  primary: "#1D1D1F"
  secondary: "#6E6E73"
  tertiary: "#0071E3"
  neutral: "#F5F5F7"
  surface: "#FFFFFF"
  on-primary: "#FFFFFF"
typography:
  display:
    fontFamily: Inter
    fontSize: 5rem
    fontWeight: 600
    letterSpacing: "-0.035em"
  h1:
    fontFamily: Inter
    fontSize: 2.6rem
    fontWeight: 600
  body:
    fontFamily: Inter
    fontSize: 1rem
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 0.82rem
    fontWeight: 500
    letterSpacing: "0"
rounded:
  sm: 8px
  md: 12px
  lg: 20px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
---

## Overview

Apple: premium white space, SF-Pro-style tight sans, cinematic full-bleed imagery, near-zero chrome.

## Colors

The palette is built around high-contrast neutrals and a single accent that drives interaction.

- **Primary (`#1D1D1F`):** Headlines and core text.
- **Secondary (`#6E6E73`):** Borders, captions, and metadata.
- **Tertiary (`#0071E3`):** The sole driver for interaction. Reserve it.
- **Neutral (`#F5F5F7`):** The page foundation.

## Typography

- **display:** Inter 5rem
- **h1:** Inter 2.6rem
- **body:** Inter 1rem
- **label:** Inter 0.82rem

## Do's and Don'ts

- **Do** use Tertiary for exactly one action per screen.
- **Do** let Neutral carry the composition — negative space is a feature.
- **Don't** introduce gradients. This system is flat on purpose.
- **Don't** mix Tertiary with alternate accents; the single-accent rule is load-bearing.
