# Interactive Test Guide
## Req #5 Mobile-Friendly Navigation - Manual Testing

**Purpose**: Step-by-step guide to manually test and verify all acceptance criteria
**Dev Server**: `http://localhost:5173`
**Time Estimate**: 30-45 minutes for complete verification

---

## 🚀 Setup

### 1. Start Dev Server
```bash
cd web
npm run dev
```
Wait for:
```
  ➜  Local:   http://localhost:5173/
```

### 2. Open DevTools
- **Chrome/Edge/Firefox**: Press `F12` or `Ctrl+Shift+I`
- **Safari**: Enable via Preferences > Advanced > Show Develop menu

### 3. Enable Device Toolbar
- **Chrome/Edge**: `Ctrl+Shift+M`
- **Firefox**: `Ctrl+Shift+M` or click responsive icon
- **Safari**: Develop > Enter Responsive Design Mode

---

## 📱 Test Device Sizes

| Device | Width | Height | Notes |
|--------|-------|--------|-------|
| iPhone SE | 375px | 667px | Standard phone |
| iPhone 12 | 390px | 844px | Modern phone |
| iPhone 14 Plus | 430px | 932px | Large phone |
| Pixel 6 | 412px | 915px | Android phone |
| iPad mini | 768px | 1024px | Tablet |
| iPad Pro | 1024px | 1366px | Large tablet |
| Desktop | 1440px+ | 900px+ | Desktop |

---

## ✅ Test Execution Steps

### Test Group 1: Desktop Navigation (1025px+)

**Setup**: Set viewport to 1440px × 900px

#### 🧪 Test 1.1: Desktop Menu Visibility
```
Steps:
1. Set viewport to 1440px
2. Look at navigation bar
3. Observe menu items

Expected Results:
✅ Logo visible on left
✅ "Home", "Packages", "Preview", "Contact" visible horizontally
✅ Hamburger icon is HIDDEN (not visible)
✅ Order button visible on right
✅ All items clearly readable

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 1.2: Desktop Spacing
```
Steps:
1. Inspect navigation bar
2. Right-click > Inspect > Look at gap property

Expected Results:
✅ Gap between menu items: 20-32px
✅ Logo has margin: left ~16px, right ~auto
✅ Spacing consistent

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 1.3: Desktop Hover States
```
Steps:
1. Hover over each menu item
2. Observe visual feedback

Expected Results:
✅ "Home" link: Color changes to primary (green)
✅ "Packages" link: Color changes to primary
✅ "Preview" link: Color changes to primary
✅ "Contact" link: Color changes to primary
✅ Smooth color transition

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 1.4: Desktop Active State
```
Steps:
1. On home page (http://localhost:5173/)
2. Observe "Home" link color
3. Click "Packages"
4. Observe which link is highlighted

Expected Results:
✅ Home page: "Home" link is primary color
✅ Packages page: "Packages" link is primary color
✅ Active state follows current route

Result: [ ] PASS  [ ] FAIL
```

**Group 1 Score: [ ] 0/4  [ ] 1/4  [ ] 2/4  [ ] 3/4  [ ] 4/4 ✅**

---

### Test Group 2: Mobile Navigation (≤767px)

**Setup**: Set viewport to 375px × 667px (iPhone SE)

#### 🧪 Test 2.1: Mobile Menu Hidden
```
Steps:
1. Set viewport to 375px
2. Refresh page
3. Look at navigation bar

Expected Results:
✅ Desktop menu (Home, Packages, Preview, Contact) is HIDDEN
✅ Only logo and hamburger icon visible
✅ Hamburger icon on right side
✅ Clean mobile appearance

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 2.2: Hamburger Button Size
```
Steps:
1. Right-click hamburger icon
2. Inspect element
3. Check computed size

Expected Results:
✅ Width: 44px
✅ Height: 44px
✅ Touch target ≥44px (WCAG standard)
✅ Easily tappable on mobile

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 2.3: Hamburger Button Feedback
```
Steps:
1. Hover over hamburger icon (desktop simulation)
2. Or tap on mobile device

Expected Results:
✅ Background color change to light gray (#f5f5f5)
✅ Visual indication it's interactive
✅ Cursor changes to pointer

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 2.4: Hamburger Click
```
Steps:
1. Click hamburger icon
2. Wait for animation
3. Observe drawer

Expected Results:
✅ Drawer slides in from right
✅ Takes ~250ms to fully open
✅ Overlay appears with semi-transparent background
✅ Hamburger icon remains visible

Result: [ ] PASS  [ ] FAIL
```

**Group 2 Score: [ ] 0/4  [ ] 1/4  [ ] 2/4  [ ] 3/4  [ ] 4/4 ✅**

---

### Test Group 3: Drawer Menu Appearance (375px)

**Setup**: Drawer open on 375px viewport

#### 🧪 Test 3.1: Drawer Width
```
Steps:
1. Hamburger open
2. Right-click drawer
3. Inspect > Check width in computed styles
4. Calculate: Should be 75vw (375 * 0.75 = 281px, capped at 300px)

Expected Results:
✅ Drawer width: ~281px (75vw of 375px viewport)
✅ Not exceeding 300px max
✅ Right-aligned with page edge
✅ Fills 75% of screen

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 3.2: Drawer Content
```
Steps:
1. Look at drawer contents
2. Observe structure

Expected Results:
✅ Header with "Menu" title and X button
✅ Navigation links: Home, Packages, Preview, Contact
✅ Footer with "Order" button
✅ All items visible without scrolling

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 3.3: Overlay
```
Steps:
1. Observe the dark background behind drawer
2. Check opacity

Expected Results:
✅ Semi-transparent dark overlay visible
✅ Can see page content underneath (but darkened)
✅ Overlay covers entire viewport

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 3.4: Close Button
```
Steps:
1. Look at top-right of drawer
2. Find X button
3. Click X button

Expected Results:
✅ X button visible and centered in header
✅ Button is 44px × 44px (touch target)
✅ Click closes drawer and returns to normal view

Result: [ ] PASS  [ ] FAIL
```

**Group 3 Score: [ ] 0/4  [ ] 1/4  [ ] 2/4  [ ] 3/4  [ ] 4/4 ✅**

---

### Test Group 4: Drawer Interactions

**Setup**: Drawer open on 375px viewport

#### 🧪 Test 4.1: Menu Item Click
```
Steps:
1. Drawer open
2. Click "Packages" link
3. Wait for drawer to close

Expected Results:
✅ Drawer closes smoothly
✅ Page navigates to /packages
✅ URL changes in address bar
✅ Drawer state resets

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 4.2: Active Page Highlight
```
Steps:
1. Navigate to Packages page
2. Open drawer again
3. Look at "Packages" link in drawer

Expected Results:
✅ "Packages" link has different color/background
✅ Active indication clear (e.g., green text, left border)
✅ Other links don't have active styling

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 4.3: Click Outside to Close
```
Steps:
1. Drawer open
2. Click on the overlay (dark background area)
3. NOT on the drawer itself

Expected Results:
✅ Drawer closes
✅ Overlay disappears
✅ No navigation occurs
✅ Smooth close animation

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 4.4: ESC Key to Close
```
Steps:
1. Drawer open
2. Press ESC key
3. Observe drawer

Expected Results:
✅ Drawer closes immediately
✅ No navigation
✅ Responsive to keyboard input

Result: [ ] PASS  [ ] FAIL
```

**Group 4 Score: [ ] 0/4  [ ] 1/4  [ ] 2/4  [ ] 3/4  [ ] 4/4 ✅**

---

### Test Group 5: Touch & Swipe Gestures (375px)

#### 🧪 Test 5.1: Touch Target Sizes
```
Steps:
1. Inspect each menu link
2. Check height
3. Right-click link > Inspect > Look for min-height

Expected Results:
✅ Each link has min-height: 44px
✅ Comfortable spacing for mobile touch
✅ Links don't overlap

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 5.2: Swipe Detection (30px)
```
Steps:
1. Drawer open
2. Touch/click and drag from right toward left ~25px
3. Release

Expected Results:
✅ Drawer starts to follow finger motion
⚠️ Less than 30px: No visual feedback yet
✅ If dragging continues past 30px: See visual feedback

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 5.3: Swipe to Close (50px+)
```
Steps:
1. Drawer open
2. Swipe from right to left ~60px (or more)
3. Release finger

Expected Results:
✅ Drawer closes smoothly
✅ Animation completes in ~250ms
✅ Returned to normal view

Note: This test requires real mobile device or accurate touch emulation
Result: [ ] PASS  [ ] FAIL  [ ] N/A (testing on desktop)
```

#### 🧪 Test 5.4: Incomplete Swipe (snap-back)
```
Steps:
1. Drawer open
2. Swipe left ~35px (between 30-50px)
3. Release finger

Expected Results:
✅ Drawer follows finger during swipe
✅ Snaps back to fully open position
✅ Drawer doesn't close (not enough distance)

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 5.5: Vertical Scroll Not Affected
```
Steps:
1. Drawer open
2. Try to scroll up/down in drawer
3. Check if drawer closes

Expected Results:
✅ Vertical scrolling works (if content is tall)
✅ Doesn't trigger swipe close
✅ Swipe only triggers with left motion (>30px)

Result: [ ] PASS  [ ] FAIL
```

**Group 5 Score: [ ] 0/5  [ ] 1/5  [ ] 2/5  [ ] 3/5  [ ] 4/5  [ ] 5/5 ✅**

---

### Test Group 6: Responsive Breakpoints

#### 🧪 Test 6.1: 320px Small Phone
```
Steps:
1. Set viewport to 320px
2. Open drawer
3. Measure drawer width

Expected Results:
✅ Drawer width: 85vw (320 * 0.85 = 272px)
✅ Max width: 280px (so 272px shown)
✅ Takes up most of screen but leaves edge visible
✅ All content readable

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 6.2: 375px Standard Phone
```
Steps:
1. Set viewport to 375px
2. Open drawer
3. Measure: Should be 75vw (375 * 0.75 = 281px, max 300px)

Expected Results:
✅ Drawer width: ~281px (75vw)
✅ Balanced on 375px screen
✅ Hamburger still accessible on left

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 6.3: 414px Large Phone
```
Steps:
1. Set viewport to 414px
2. Open drawer
3. Measure: Should be 70vw (414 * 0.70 = 289px, max 320px)

Expected Results:
✅ Drawer width: ~289px (70vw)
✅ More conservative on larger phone
✅ Context/background visible

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 6.4: 768px Tablet
```
Steps:
1. Set viewport to 768px
2. Hamburger should still be visible
3. Open drawer
4. Measure: Should be 65vw (768 * 0.65 = 499px, max 380px = 380px)

Expected Results:
✅ Drawer width: 380px (capped at max)
✅ Hamburger still accessible
✅ Tablet-appropriate sizing

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 6.5: 900px Large Tablet
```
Steps:
1. Set viewport to 900px
2. Refresh page
3. Look at navigation

Expected Results:
✅ Hamburger icon is HIDDEN
✅ Desktop menu visible (Home, Packages, Preview, Contact)
✅ Transition from drawer to horizontal menu automatic
✅ No hamburger/drawer visible

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 6.6: 1440px Desktop
```
Steps:
1. Set viewport to 1440px
2. Check navigation

Expected Results:
✅ Full desktop menu visible
✅ Hamburger hidden
✅ All navigation items horizontal
✅ Maximum comfort desktop experience

Result: [ ] PASS  [ ] FAIL
```

**Group 6 Score: [ ] 0/6  [ ] 1/6  [ ] 2/6  [ ] 3/6  [ ] 4/6  [ ] 5/6  [ ] 6/6 ✅**

---

### Test Group 7: Accessibility

#### 🧪 Test 7.1: Screen Reader (using DevTools)
```
Steps:
1. Open DevTools > Accessibility
2. Inspect hamburger button
3. Look at accessibility tree

Expected Results:
✅ Hamburger has aria-label: "Toggle navigation menu"
✅ aria-expanded shows current state (true/false)
✅ aria-controls="drawer-menu" connects to drawer

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 7.2: Keyboard Navigation - Tab
```
Steps:
1. On desktop view (1440px)
2. Press Tab key repeatedly
3. Track focus through elements

Expected Results:
✅ Focus moves: Logo → Home → Packages → Preview → Contact → Order
✅ All links tabbable
✅ Visible focus outline on each element
✅ Logical tab order

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 7.3: Keyboard Navigation - Mobile
```
Steps:
1. Mobile view (375px)
2. Press Tab to hamburger button
3. Press Tab into drawer (if open)

Expected Results:
✅ Hamburger button gets focus (outline visible)
✅ Can click/enter to open drawer
✅ Tab navigates to drawer links when open

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 7.4: Focus Indicators
```
Steps:
1. Mobile view
2. Click hamburger to open drawer
3. Tab through links in drawer
4. Observe each link

Expected Results:
✅ Each link has blue outline when focused
✅ Outline is 2px thick
✅ Outline offset visible (not buried in text)
✅ Easy to see where you are

Result: [ ] PASS  [ ] FAIL
```

**Group 7 Score: [ ] 0/4  [ ] 1/4  [ ] 2/4  [ ] 3/4  [ ] 4/4 ✅**

---

### Test Group 8: Performance

#### 🧪 Test 8.1: Animation Smoothness
```
Steps:
1. Open DevTools > Performance tab
2. Click hamburger to open drawer
3. Record performance
4. Stop recording and analyze

Expected Results:
✅ FPS stays at 60fps during animation
✅ No dropped frames
✅ Animation duration ~250ms
✅ Smooth without jank

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 8.2: No Console Errors
```
Steps:
1. Open DevTools > Console tab
2. Perform all interactions (open, close, swipe, etc.)
3. Look for red error messages

Expected Results:
✅ No errors in console
✅ No warnings about missing ARIA attributes
✅ No performance warnings

Result: [ ] PASS  [ ] FAIL
```

#### 🧪 Test 8.3: Responsive Resize
```
Steps:
1. Start at 375px (drawer open)
2. Drag viewport edge to 900px
3. Observe transition

Expected Results:
✅ Smooth transition
✅ Drawer automatically closes
✅ Menu switches to desktop nav
✅ No visual jumping
✅ Page remains usable during resize

Result: [ ] PASS  [ ] FAIL
```

**Group 8 Score: [ ] 0/3  [ ] 1/3  [ ] 2/3  [ ] 3/3 ✅**

---

## 📊 Summary Score

Complete all tests and fill in the score:

```
Group 1 (Desktop):          [ ]/4
Group 2 (Mobile):           [ ]/4
Group 3 (Drawer):           [ ]/4
Group 4 (Interactions):     [ ]/4
Group 5 (Touch/Swipe):      [ ]/5
Group 6 (Breakpoints):      [ ]/6
Group 7 (Accessibility):    [ ]/4
Group 8 (Performance):      [ ]/3
                            -----
TOTAL SCORE:                [ ]/34

Percentage: [ ]%
```

### Pass Criteria
- **100% (34/34)**: ✅ FULL PASS - All criteria met
- **≥90% (≥31/34)**: ⚠️ PASS WITH NOTES - Minor issues only
- **<90%**: ❌ NEEDS WORK - Significant issues found

---

## 🐛 Issue Tracking

If you find any failures, document them here:

### Issue 1
```
Test: [Group#, Test#.#]
Issue: [Description]
Expected: [What should happen]
Actual: [What actually happened]
Steps to Reproduce: [Steps]
Severity: [ ] Critical  [ ] High  [ ] Medium  [ ] Low
```

### Issue 2
```
Test: [Group#, Test#.#]
Issue: [Description]
Expected: [What should happen]
Actual: [What actually happened]
Steps to Reproduce: [Steps]
Severity: [ ] Critical  [ ] High  [ ] Medium  [ ] Low
```

---

## 📝 Tester Information

```
Tester Name: ___________________
Date: ___________________
Browser: [ ] Chrome  [ ] Firefox  [ ] Safari  [ ] Edge
Device: [ ] Desktop  [ ] Mobile Device  [ ] Tablet
OS: ___________________
Tested URL: http://localhost:5173
```

---

**Testing Complete!**
When finished, submit this document with all checks marked and scores recorded.
