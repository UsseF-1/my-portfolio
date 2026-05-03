# SPA Portfolio — README

## Deliverables Created

| File | Description |
|---|---|
| `spa-index.html` | Single-page entry point — all 10 sections merged |
| `css/effects.css` | Scroll reveal + hover animations (existing files untouched) |
| `js/spa.js` | IntersectionObserver, active nav, mobile drawer, smooth scroll |

## Section Mapping

| Original Page | Section ID | Nav Label |
|---|---|---|
| `index.html` | `#home` | Home |
| `about.html` | `#about` | About |
| `education.html` | `#education` | Education |
| `courses.html` | `#courses` | Courses & Certs |
| `skills.html` | `#skills` | Skills |
| `services.html` | `#services` | Services |
| `projects.html` | `#projects` | Projects |
| `achievements.html` | `#achievements` | Achievement |
| `contact.html` | `#contact` | Contact |
| `thanks.html` | `#thanks` | Thank You |

## How Animations Work

### Hover Effects (no color changes)
- **Cards** — `translateY(-4px)` lift + enhanced `box-shadow` via `.hover-lift`
- **Sidebar nav icons** — `translateX(3px)` micro-move on hover
- **Buttons** — `translateY(-2px) scale(1.02)` lift via `.btn-lift`
- **Service cards** — existing `service-card-hover` class preserved (already in `styles.css`)

### Scroll Animations
- Elements with `.reveal` fade in from below (`opacity 0 → 1`, `translateY 28px → 0`)
- `.reveal-left` / `.reveal-right` slide in from the sides
- `.reveal-stagger` applies staggered delays (70ms each) to grid children
- Triggered by `IntersectionObserver` in `js/spa.js` when elements enter viewport at 12% threshold
- `prefers-reduced-motion` disables all animations instantly

## Responsiveness

| Breakpoint | Behaviour |
|---|---|
| `> 1024px` (desktop) | Fixed left sidebar (`w-72`), main content offset `lg:ml-72` |
| `481–1024px` (tablet) | Sidebar hidden, sticky mobile header visible, single-column layouts |
| `≤ 480px` (mobile) | Same as tablet + font-size reductions, tightened padding, no horizontal overflow |

### Mobile Navigation
1. A hamburger button (`☰`) appears in the sticky mobile header
2. Clicking it slides in a full-height drawer from the left (same content as sidebar)
3. Clicking the overlay, the `✕` button, or pressing `Escape` closes it
4. Clicking any nav link inside also closes the drawer and smooth-scrolls to that section

## Running Locally

```bash
npx http-server . -p 8080
# then open: http://localhost:8080/spa-index.html
```
