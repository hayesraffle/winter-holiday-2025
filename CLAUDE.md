# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive single-page HTML application for planning a family vacation to one of four destinations (Baja California Sur, Southwest USA, Oaxaca, or Tulum). Built for December 14-21, 2025 trip for family of 4.

## Tech Stack

- **Pure HTML5** - Single self-contained file (index.html)
- **CSS3** - Embedded styles using Google Material Design 3 principles
- **Vanilla JavaScript** - No frameworks or build process
- **Browser targets** - Modern browsers (Chrome, Safari, Firefox, Edge), no IE11 support

## Development Commands

This project requires no build process. To work with it:

```bash
# Open in browser
open index.html

# Or use a local server for testing
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

## Project Structure

```
winter holiday/
├── index.html       # Main application (all code in one file)
└── handover.md      # Detailed project requirements and context
```

## Architecture

### Single-File Application
All HTML, CSS, and JavaScript are contained in `index.html`. The app uses a tab-based navigation system with 6 main sections:
1. Overview - Comparison of all destinations
2. Baja California - Detailed itinerary and resources
3. Southwest USA - Desert/cultural tour details
4. Oaxaca - UNESCO heritage and food culture
5. Tulum - Mayan ruins and beaches
6. Cast Your Vote - Family voting interface

### Key Components

**Tab System**: Simple JavaScript-based tab switching using `.active` classes
- `showTab(index)` - Main navigation function
- Tabs and content panels synchronized via index

**Voting System**:
- `selectVote(button, destination)` - Handles destination selection
- `submitVote()` - Generates mailto: link with vote details
- Uses localStorage-free approach (email-based)

**Styling**:
- CSS custom properties (`:root` variables) for Material Design 3 colors
- Responsive grid layouts using CSS Grid
- Card-based UI components
- Mobile-responsive breakpoint at 768px

### Color Scheme

Currently uses Material Design 3 purple palette. The handover document requests softer Google-style colors:
- Primary: Should be soft blue (#1E88E5) instead of purple
- Surface colors: Light grays and whites
- Follows Google Calendar/Drive aesthetic

## Key Features to Maintain

1. **Self-contained** - No external dependencies (except Google Fonts)
2. **Responsive** - Mobile-first design
3. **Accessible** - Semantic HTML, proper ARIA where needed
4. **Fast loading** - No heavy frameworks or libraries

## Known Enhancement Requirements

Per handover.md, the following enhancements are planned:

1. **Color scheme update** - Switch to softer Google Material Design 3 palette (light blues, grays)
2. **Real images** - Replace placeholder image cards with actual photos via API (Unsplash/Pexels/Pixabay)
3. **Link verification** - Verify and update all external tour operator/hotel links
4. **Image attribution** - Add photo credits for any fetched images

## Testing

Before any release:
- Test all 6 tabs load without errors
- Verify voting functionality generates proper mailto: links
- Check responsive behavior on mobile (375px width minimum)
- Validate all external links are working
- Ensure no console errors

## Important Context

- Family has high standards (used Backroads, Context Travel before)
- December timing is critical - some experiences are seasonal
- Baja is the top recommendation (see handover.md for reasoning)
- This is a real family decision with real budget implications
