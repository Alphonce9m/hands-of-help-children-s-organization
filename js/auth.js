// Authentication state management
let currentUser = null;

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        currentUser = JSON.parse(localStorage.getItem('user'));
        updateUIForAuth();
    }
}

// Update UI based on auth state
function updateUIForAuth() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        document.querySelector('.user-name').textContent = currentUser.name;
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        action: 'register',
        name: form.name.value,
        email: form.email.value,
        password: form.password.value
    };

    try {
        const response = await fetch('/.netlify/functions/auth', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ name: data.name }));
            currentUser = { name: data.name };
            updateUIForAuth();
            showNotification('Registration successful!', 'success');
            closeModal('register-modal');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        action: 'login',
        email: form.email.value,
        password: form.password.value
    };

    try {
        const response = await fetch('/.netlify/functions/auth', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ name: data.name }));
            currentUser = { name: data.name };
            updateUIForAuth();
            showNotification('Login successful!', 'success');
            closeModal('login-modal');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    updateUIForAuth();
    showNotification('Logged out successfully', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize auth
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    // Add event listeners
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}); 