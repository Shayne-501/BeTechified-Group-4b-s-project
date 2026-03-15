// Simple client-side hotel booking demo
// Data: sample rooms (add `quantity` to represent multiple identical units)
const rooms = [
    { id: 'r1', name: 'Standard Room', type: 'Standard', price: 8000, quantity: 40, features: ['Ensuite bathroom', 'Free Wi-Fi', 'Queen bed', 'Standard amenities'] },
    { id: 'r2', name: 'Deluxe Room', type: 'Deluxe', price: 12000, quantity: 20, features: ['City view', 'King bed', 'Mini fridge', 'Premium toiletries', 'High-quality amenities'] },
    { id: 'r3', name: 'Exclusive Suite', type: 'Suite', price: 22000, quantity: 10, features: ['Sea view', 'King bed', 'Private balcony'] },
    { id: 'r4', name: 'Apartment', type: 'Standard', price: 300000, quantity: 8, features: ['Utmost privacy', '3 bedrooms', 'Cleaning services', 'Standard amenities'] },
    { id: 'r5', name: 'Studio', type: 'Suite', price: 500000, quantity: 10, features: ['Sound-proofing', 'Island kitchen', 'Indoor pool'] },
    { id: 'r6', name: 'Penthouse', type: 'Penthouse', price: 1000000, quantity: 2, features: ['Panoramic sea view', 'Private rooftop', 'Outdoor Jacuzzi', 'Concierge service'] }
];

// Simple localStorage-backed bookings
const STORAGE_KEY = 'hotel_bookings';
const getBookings = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveBooking = (b) => { const arr = getBookings(); arr.push(b); localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); };

// Availability helpers (date-overlap aware + quantity)
function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    const A1 = new Date(aStart).getTime();
    const A2 = new Date(aEnd).getTime();
    const B1 = new Date(bStart).getTime();
    const B2 = new Date(bEnd).getTime();
    return (A1 < B2) && (B1 < A2);
}

function reservedForRange(roomId, reqCheckIn, reqCheckOut) {
    return getBookings().filter(b => b.roomId === roomId && rangesOverlap(b.checkIn, b.checkOut, reqCheckIn, reqCheckOut)).length;
}

function availableForRange(roomId, reqCheckIn, reqCheckOut) {
    const room = rooms.find(r => r.id === roomId);
    const qty = room?.quantity ?? 1;
    if (!reqCheckIn || !reqCheckOut) {
        // fallback: show units minus total bookings (not date-aware)
        return Math.max(0, qty - getBookings().filter(b => b.roomId === roomId).length);
    }
    return Math.max(0, qty - reservedForRange(roomId, reqCheckIn, reqCheckOut));
}

function reservedCount(roomId) {
    return getBookings().filter(b => b.roomId === roomId).length;
}

// Elements
const roomsList = document.getElementById('roomsList');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

function renderRooms() {
    roomsList.innerHTML = '';
    const bookings = getBookings();

    for (const r of rooms) {
        // For cards we show quantity and a simple available count (fallback if no dates selected)
        const totalReserved = reservedCount(r.id);
        const qty = r.quantity ?? 1;
        const availableNow = Math.max(0, qty - totalReserved);

        const card = document.createElement('div');
        // add a class for premium rooms so we can style differently
        card.className = 'room' + (r.type && (r.type.toLowerCase().includes('suite') || r.type.toLowerCase().includes('penthouse')) ? ' suite' : '');

        // show features for all room types if available
        const featuresHtml = (r.features || []).map(f => `<li>${escapeHtml(f)}</li>`).join('');

        if (r.type && (r.type.toLowerCase().includes('suite') || r.type.toLowerCase().includes('penthouse'))) {
            // suite/penthouse card — show badge and features
            // only show the badge if the room name doesn't already include the type (avoid "Suite Suite")
            const nameLower = String(r.name || '').toLowerCase();
            const typeLower = String(r.type || '').toLowerCase();
            const badgeHtml = (r.type && !nameLower.includes(typeLower)) ? ` <span class="badge">${escapeHtml(r.type)}</span>` : '';
            card.innerHTML = `
                <div class="room-body">
                    <h3>${escapeHtml(r.name)}${badgeHtml}</h3>
                    <div class="meta">${r.type} — <span class="price">₦${fmt(r.price)}/night</span> — <span class="avail">${availableNow} available</span></div>
                    <ul class="features">${featuresHtml}</ul>
                    <div class="room-actions"><button data-id="${r.id}" ${availableNow === 0 ? 'disabled' : ''}>${availableNow === 0 ? 'Booked' : 'Book now'}</button></div>
                </div>
            `;
        } else {
            // standard/deluxe rooms — show features if available
            card.innerHTML = `
                <h3>${escapeHtml(r.name)}</h3>
                <div class="meta">${r.type} — <span class="price">₦${fmt(r.price)}/night</span> — <span class="avail">${availableNow} available</span></div>
                ${featuresHtml ? `<ul class="features">${featuresHtml}</ul>` : ''}
                <div>
                    <button data-id="${r.id}" ${availableNow === 0 ? 'disabled' : ''}>${availableNow === 0 ? 'Booked' : 'Book now'}</button>
                </div>
            `;
        }

        roomsList.appendChild(card);
    }
}

function openModal(roomId) {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;
    document.getElementById('roomId').value = room.id;
    document.getElementById('modalTitle').textContent = `Book — ${room.name}`;
    formMessage.textContent = '';
    bookingForm.reset();
    modal.classList.remove('hidden');

    // initialize availability message for modal (no dates yet)
    updateModalAvailability();
}

function close() { modal.classList.add('hidden'); }

// helper: basic HTML escaping to avoid injection in demo
function escapeHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// attach events
roomsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    openModal(id);
});

closeModal.addEventListener('click', close);
cancelBtn.addEventListener('click', close);
modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roomId = document.getElementById('roomId').value;
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;

    // minimal validation
    if (!name || !email || !checkIn || !checkOut) { formMessage.textContent = 'Please fill all fields.'; return; }
    if (checkOut <= checkIn) { formMessage.textContent = 'Check-out must be after check-in.'; return; }

    // Check availability for requested dates (date-aware + quantity)
    const avail = availableForRange(roomId, checkIn, checkOut);
    if (avail <= 0) { formMessage.textContent = 'Sorry — no availability for the selected dates.'; renderRooms(); return; }

    const booking = { id: 'b_' + Date.now(), roomId, name, email, checkIn, checkOut, createdAt: new Date().toISOString() };
    saveBooking(booking);
    formMessage.textContent = 'Booking confirmed!';
    renderRooms();
    setTimeout(close, 900);
});

// --- Modal date inputs: update availability live when dates change ---
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');
const submitBtn = bookingForm.querySelector('button[type="submit"]');

function updateModalAvailability() {
    const roomId = document.getElementById('roomId').value;
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;
    if (!roomId) return;
    if (!checkIn || !checkOut) {
        // show fallback availability (units left overall)
        const room = rooms.find(r => r.id === roomId);
        const qty = room?.quantity ?? 1;
        const reserved = reservedCount(roomId);
        formMessage.textContent = `Units: ${qty} — ${Math.max(0, qty - reserved)} available (select dates to check specific availability)`;
        submitBtn.disabled = false;
        return;
    }
    if (checkOut <= checkIn) { formMessage.textContent = 'Check-out must be after check-in.'; submitBtn.disabled = true; return; }
    const avail = availableForRange(roomId, checkIn, checkOut);
    formMessage.textContent = avail > 0 ? `${avail} unit(s) available for selected dates` : 'No availability for selected dates';
    submitBtn.disabled = avail <= 0;
}

if (checkInInput && checkOutInput) {
    checkInInput.addEventListener('change', updateModalAvailability);
    checkOutInput.addEventListener('change', updateModalAvailability);
}

// init
renderRooms();

function fmt(n) { return n.toLocaleString('en-NG'); } // then use `₦${fmt(r.price)}`
