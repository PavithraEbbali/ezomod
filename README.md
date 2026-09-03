# EZOMOD

Landing page for EZOMOD, the autonomous AI agency for real estate lead generation and outbound voice qualification. The conversion hook is booking a live architecture demo and reserving an exclusive territory. No pricing is shown anywhere.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript strict |
| Styling | Tailwind CSS 3.4 with a brand token layer in `tailwind.config.ts` |
| Smooth scroll | `@studio-freight/lenis`, synced to the GSAP ticker |
| Scroll animation | `gsap` + `ScrollTrigger` |
| Interaction | `framer-motion` |
| Particles | HTML5 Canvas 2D with pre-rendered radial sprites |
| Icons | `lucide-react` |

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. `npm run build` produces the production bundle and `npm start` serves it.

## Brand palette

Defined once in `tailwind.config.ts` and consumed through Tailwind classes.

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#FAFCFF` | Page ground |
| `canvas-sunk` | `#F3F7FA` | Alternating section bands |
| `ink` | `#090D1A` | Headings |
| `steel` | `#475569` | Body copy |
| `azure` | `#007BFF` | Primary brand |
| `azure-light` | `#00A3FF` | Gradient midpoint |
| `aqua` | `#06B6D4` | Energy and speed accents |
| `mint` / `spring` | `#10B981` / `#22C55E` | Conversion and live pulse |
| `lime` | `#84CC16` | Gradient terminus |

`bg-brand` is the 135 degree Azure to Spring Green gradient. `text-gradient` applies it as a clipped text fill. Surfaces use white at 85 percent with `backdrop-blur-xl`, hairline borders from the `--edge` custom property, and the multi-tier `shadow-halo` family.

## Structure

```
app/
  layout.tsx        Fonts, metadata, LenisProvider
  page.tsx          Section assembly
  globals.css       Base layer, glass and gradient utilities, marquee keyframes
components/
  Navbar.tsx        Frosted floating island, live agent status, magnetic CTA
  Hero.tsx          Vortex canvas, kinetic masked headline, call visualizer
  MetricsBar.tsx    Staggered metric cards with count-up
  PipelineAssembly.tsx  Pinned ScrollTrigger section, scrubbed SVG trajectory
  BentoGrid.tsx     Four 3D-tilt capability cards
  ComparisonSection.tsx Toggle between manual ISA and the EZOMOD engine
  IntegrationsMarquee.tsx Dual-lane infinite ticker, pause on hover
  CtaSection.tsx    Territory availability and three-step booking terminal
  Footer.tsx        Brand mark, live status, diagnostics, navigation
  providers/LenisProvider.tsx
  ui/               MagneticButton, MaskedText, TiltCard, VortexCanvas,
                    CallVisualizer, Waveform
hooks/
  useMagnetic.ts    Cursor-proximity spring translation
lib/utils.ts        cn, clamp, lerp
public/ezomod logo.jpeg  Brand mark consumed by Navbar and Footer via next/image
```

## Motion systems

- **Lenis** wraps the app and drives `ScrollTrigger.update` from the GSAP ticker. Anchor clicks are delegated at the document level so dynamically rendered links animate too. Everything is torn down on unmount and the provider opts out entirely under `prefers-reduced-motion`.
- **Vortex canvas** simulates tangential plus inward gravity with a cursor gravity well inside 280px. Particles are drawn as cached radial-gradient sprites rather than per-frame shadow blurs, capped at 190 particles, paused on tab hide, and reduced to a single static frame when motion is reduced.
- **Magnetic buttons** listen on `pointermove`, measure distance to the expanded bounding box, and translate on a spring with a parallax inner layer. Coarse pointers and reduced motion skip the listener.
- **Tilt cards** derive `rotateX` and `rotateY` from cursor position relative to card centre under `perspective(1000px)`, with a spotlight gradient tracking the pointer.
- **Pipeline assembly** pins the section and scrubs `strokeDashoffset` across the full path length, lighting each node and card as progress passes it. It only pins at 1024px wide and 760px tall or above; anything smaller gets the vertical rail layout with the path already drawn.
- **Masked text** reveals heading lines through animated `clip-path` insets with staggered Y translation, triggered by `useInView`.
- **Call visualizer** runs a cancellable async timeline that dials, types each transcript line in small chunks, tags objections, and completes a warm transfer before looping. The waveform writes bar heights directly to DOM refs from its own rAF loop so it never re-renders the transcript.

## Notes

- `@studio-freight/lenis` is installed because it is the package named in the brief. Upstream has renamed it to `lenis`; the API used here is identical, so switching later is an import change only.
- The brand mark lives at `public/ezomod logo.jpeg` and is referenced by the Navbar, Footer, favicon, and OpenGraph metadata. The filename contains a space, so keep it URL-safe if you move the asset to a CDN.
- `.claude/launch.json` lets the Claude Code browser pane start the dev server. Safe to delete.
