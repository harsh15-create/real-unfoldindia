# QA Checklist: Region Highlights Feature (South India)

## 1. Page Rendering
- [ ] Navigate to `/regions/south-india`
- [ ] **Data Fetching**: Verify the page loads without crashing.
- [ ] **Hero Section**:
    - [ ] Hero Image is visible (check `south-india-hero.jpg` placeholder or real URL).
    - [ ] Title "South India" is H1.
    - [ ] Intro text is readable.
- [ ] **Highlights Section**:
    - [ ] Section title "Visual Highlights" is present.
    - [ ] Grid displays exactly 6 thumbnails initially (if data has >6; verified 8 items in JSON).
    - [ ] "View all 8 photos" button appears.

## 2. Interaction & Lightbox
- [ ] **Lightbox Open**: Click on any thumbnail (e.g., Kerala Backwaters). Dialog/Modal should open.
- [ ] **Image Rendering**: The full-size image is displayed in the modal.
- [ ] **Caption**: Caption text "Houseboat on the Kerala backwaters" is visible.
- [ ] **Navigation**:
    - [ ] Click "Right Arrow" button -> Next image (Mahabalipuram).
    - [ ] Click "Left Arrow" button -> Previous image.
    - [ ] **Keyboard**: Press Right Arrow key -> Next image.
    - [ ] **Keyboard**: Press Left Arrow key -> Previous image.
- [ ] **Close**:
    - [ ] Click "X" button -> Lightbox closes.
    - [ ] Press "Escape" key -> Lightbox closes.
    - [ ] Click outside the image -> Lightbox closes.
- [ ] **Focus Management**:
    - [ ] Focus is trapped within modal when open.
    - [ ] Focus returns to the trigger thumbnail when closed.

## 3. Analytics Events
- [ ] **Open Section**: Verified `region_highlights_open` fires when the section scrolls into view (Intersection Observer).
    - *Check console logs.*
- [ ] **Click**: Verified `region_highlight_click` fires with correct `highlight_id` (e.g., `kerala-backwaters`) when a thumbnail is clicked.
- [ ] **Share**: Verified `region_highlight_share` fires when Share button is clicked.

## 4. Accessibility
- [ ] Images have valid `alt` text (e.g., "Houseboat cruising through Kerala backwaters lined with palms").
- [ ] Thumbnails are keyboard focusable (`Tab` to select, `Enter` to open).
- [ ] ARIA roles: Modal has `role="dialog"` (handled by Shadcn/Radix).

## 5. Performance
- [ ] Thumbnails use `loading="lazy"`.
- [ ] `Cache-Control` header logic is in place (simulated in `regionsApi.ts`).
