
# Adventures Experience Module

This module implements the "Adventures" section of Unfold India, providing a master grid view and 25 detailed activity pages.

## Directory Structure

- `src/pages/experiences/AdventuresPage.tsx`: The master landing page.
- `src/pages/experiences/AdventureDetail.tsx`: The dynamic detail route (`/experiences/adventures/:slug`).
- `src/components/adventures/`: Reusable UI components (Hero, Card, Modal, LocationList).
- `src/data/adventures/`: JSON data source (Master + 25 Activity files).
- `src/lib/adventures-api.ts`: API layer using Vite's `import.meta.glob` for efficient data loading.

## Integration

The routes are registered in `App.tsx`:
```tsx
<Route path="/experiences/adventures" element={<AdventuresPage />} />
<Route path="/experiences/adventures/:slug" element={<AdventureDetail />} />
```

To link to this section from the Header or elsewhere:
```tsx
<Link to="/experiences/adventures">Adventures</Link>
```

## Data Management

The system reads directly from the JSON files in `src/data/adventures/`. 
To update content (e.g., change a price or add a location), simply edit the corresponding JSON file. No database migration or build step is strictly required for development, but a rebuild is needed for production to bundle the new JSON content.

## Analytics

Analytics events are tracked in `src/analytics/events.ts`. Currently, they log to the console. Search for `[Analytics]` in the browser console to verify events like `experience_open` or `activity_book_cta`.

## Testing

A manual QA checklist is available in `tests/adventures-page.spec.md`.
