
### Adventures Page QA & Tests

## Manual Acceptance Checklist

- [ ] **Navigation**: Clicking "Adventures" or navigating to `/experiences/adventures` loads the hero section and grid.
- [ ] **Data Loading**: Grid displays 25 cards (Paragliding, etc.) populated from `experience-adventures.json`.
- [ ] **Lazy Loading**: Scrolling down causes images to load without layout shift.
- [ ] **Search**: Typing "water" in the search box filters the grid to Water sports or titles containing "water".
- [ ] **Filters**: Clicking "Snow" category tab filters grid to Skiing, Snowboarding, etc.
- [ ] **Quick View**: Clicking "Quick View" on a card opens the modal.
  - [ ] Modal title, hero image, and description match the activity.
  - [ ] "Check Availability" button click logs an analytics event.
  - [ ] ESC key closes the modal.
- [ ] **Detail Page**: Clicking "Details" navigates to `/experiences/adventures/:slug`.
  - [ ] URL is correct.
  - [ ] Page content (long description, locations, safety) is loaded from the specific JSON.
  - [ ] "Back to Adventures" button works.
- [ ] **Locations**: Detail page lists locations with accurate pricing.
- [ ] **Responsive**: 
  - [ ] Grid becomes 1 column on mobile.
  - [ ] Modal fits on mobile screen with scroll.

## Automated Test Scenarios (Future Cypress/Playwright)

1. `visit('/experiences/adventures')` -> Assert Hero Title exists.
2. `getActivityCard('paragliding').click()` -> Assert redirect to `/experiences/adventures/paragliding`.
3. `clickFilter('Snow')` -> Assert `card-count` is 4.
