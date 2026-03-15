const form = document.getElementById("authForm");
const message = document.getElementById("message");

function loadUsers() {
    return JSON.parse(localStorage.getItem('aseda_users') || JSON.stringify({ owner: [], staff: [], customer: [] }));
}

function saveUsers(users) {
    localStorage.setItem('aseda_users', JSON.stringify(users));
}

function setCurrentUser(userType, username) {
    localStorage.setItem('aseda_current_user', JSON.stringify({ userType, username }));
}

async function hashString(str) {
    const enc = new TextEncoder();
    const data = enc.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userType = document.getElementById('userType').value;
    const username = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!username) {
        message.textContent = 'Please enter your name.';
        return;
    }

    if (!email) {
        message.textContent = 'Please enter your email.';
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = 'Please enter a valid email address.';
        return;
    }

    const users = loadUsers();
    if (!users[userType]) users[userType] = [];

    // Check if username or email already exists across all types
    const allUsers = Object.values(users).flat();
    const existingUser = allUsers.find(user => user.username === username || user.email === email);

    if (existingUser) {
        if (existingUser.username === username) {
            message.textContent = 'This name is already registered. Please choose a different name or log in.';
        } else {
            message.textContent = 'This email is already registered. Please use a different email or log in.';
        }
        return;
    }

    // basic inline validation
    if (password.length < 6) {
        message.textContent = 'Password must be at least 6 characters.';
        return;
    }

    // new user: save hashed password and send to first-info page
    const pwdHash = await hashString(password);
    users[userType].push({ username, email, password: pwdHash, createdAt: Date.now() });
    saveUsers(users);
    setCurrentUser(userType, username);
    // redirect new users to the first info page
    window.location.href = '1st_infopg.html';

    form.reset();
});
