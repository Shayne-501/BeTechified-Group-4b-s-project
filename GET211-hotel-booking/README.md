Simple Hotel Booking

Files:
- index.html — main page (open in browser)
- styles.css — basic styling
- app.js — client-side booking logic code (stores bookings in localStorage)

How to run:
1. Open `c:\Users\fayom\OneDrive\Desktop\Coded\hotel-booking\index.html` in your browser.
   Example (Microsoft PowerShell):

2. Start-Process "c:\Users\fayom\OneDrive\Desktop\Coded\hotel-booking\index.html"

Notes:
- This is a small client-side demo without a backend. Bookings are kept in browser localStorage.
- To reset bookings: 
   . open DevTools → Application → Local Storage → remove the `hotel_demo_bookings` key, or 
   . run `localStorage.clear()` in console.

Next improvements we may add for future updates:
- Add availability calendar and overlapping-date checks.
- Add user accounts and server-side persistence (API + DB).
- Improve UI/UX and accessibility.