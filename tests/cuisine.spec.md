
# QA Checklist: Cuisine Module

## 1. Data Integrity
- [ ] Master JSON (`culture-cuisine.json`) loads correctly and contains categories/cards.
- [ ] Detail JSONs (e.g., `punjabi.json`) load correctly.
- [ ] Images (placeholders) are present and have alt text.

## 2. Frontend Rendering
### Master Page (`/culture/cuisine`)
- [ ] Hero section displays correct title and image.
- [ ] Intro text renders.
- [ ] Category filters work (switching active category updates grid).
- [ ] Search bar works (filtering by title/tags).
- [ ] Clicking a card navigates to the correct slug URL.

### Detail Page (`/culture/cuisine/[slug]`)
- [ ] Hero displays title and "About" section content is visible.
- [ ] "Signature Dishes" grid renders with price/location.
- [ ] "Legendary Eateries" section lists restaurants/markets.
- [ ] "Travel Tips" (Best Time, Etiquette) sidebar is visible.
- [ ] Gallery carousel works (if images present).

## 3. Navigation & Routing
- [ ] `/explore` -> "Cuisine" card links to `/culture/cuisine`.
- [ ] Back button in Master and Detail pages works.
- [ ] Navbar and Footer are present on all pages.

## 4. Analytics
- [ ] Events fire on navigation:
    - `CULTURE_OPEN` (Master Page)
    - `CUISINE_CLICK` (Card Click)
    - `CUISINE_VIEW` (Detail Page Load)

## 5. Responsiveness
- [ ] Grid layout adjusts (1 col mobile, 2 col md, 3 col lg).
- [ ] Hero text readable on mobile.
