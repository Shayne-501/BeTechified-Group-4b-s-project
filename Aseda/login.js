const form = document.getElementById('loginForm');
const message = document.getElementById('message');

function loadUsers() {
    return JSON.parse(localStorage.getItem('aseda_users') || JSON.stringify({ owner: [], staff: [], customer: [] }));
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

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username) {
        message.textContent = 'Please enter your username.';
        return;
    }

    const users = loadUsers();
    const userTypes = ['owner', 'staff', 'customer'];
    let foundUser = null;
    let foundUserType = null;

    for (const type of userTypes) {
        const list = users[type] || [];
        const user = list.find(u => u.username === username);
        if (user) {
            foundUser = user;
            foundUserType = type;
            break;
        }
    }

    if (foundUser) {
        const pwdHash = await hashString(password);
        if (foundUser.password === pwdHash) {
            setCurrentUser(foundUserType, username);
            // successful login -> Aseda FP
            window.location.href = 'Aseda FP.html';
        } else {
            message.textContent = 'Incorrect password.';
        }
    } else {
        message.innerHTML = 'User not found. <a href="signup.html">Create an account</a>';
    }
});
