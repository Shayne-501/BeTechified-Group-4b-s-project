const form = document.getElementById("athForm");
const message = document.getElementById("message");

const users = {
    CEO: [],
    staff: [],
    customer: []
};

// Toggle handler: enable/disable the CEO option using the checkbox in the form
const toggleCEO = document.getElementById('toggleCEO');
const ceoOption = document.getElementById('ceoOption');
const userTypeSelect = document.getElementById('userType');

if (toggleCEO && ceoOption && userTypeSelect) {
    // initialize disabled state (ceoOption is disabled in HTML by default)
    ceoOption.disabled = !toggleCEO.checked;

    toggleCEO.addEventListener('change', () => {
        ceoOption.disabled = !toggleCEO.checked;
        // if CEO was selected but is now disabled, move selection to the first enabled option
        if (ceoOption.disabled && userTypeSelect.value === 'CEO') {
            for (const opt of userTypeSelect.options) {
                if (!opt.disabled) { userTypeSelect.value = opt.value; break; }
            }
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userType = document.getElementById("userType").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // special case for CEO login
    if (userType === 'CEO') {
        const bossName = 'Tinuadewunmi';
        const bossPass = 'Oluwarantimi@1';
        if (username === bossName && password === bossPass) {
            message.textContent = `Welcome back, CEO ${bossName}!`;
        } else {
            message.textContent = 'Invalid CEO credentials. Notification sent.';
            // trigger a mailto as simple notification mechanism
            const subject = encodeURIComponent('CEO login failure');
            const body = encodeURIComponent(`Failed login attempt with username "${username}" and password "${password}".`);
            // replace the email address with a real one when available
            window.location.href = `mailto:${bossName}@example.com?subject=${subject}&body=${body}`;
        }
        form.reset();
        return;
    }

    const existingUser = users[userType].find(user => user.username === username);

    if (existingUser) {
        if (existingUser.password === password) {
            message.textContent = `Welcome back, ${userType} ${username}!`;
        } else {
            message.textContent = "Incorrect password.";
        }
    } else {
        users[userType].push({ username, password });
        message.textContent = `Signup successful for ${userType} ${username}!`;
    }

    form.reset();
});
