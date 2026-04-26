// Helper functions
function showSuccessMessage(message) {
    let existing = document.querySelector('.success-popup');
    if (existing) existing.remove();
    let div = document.createElement('div');
    div.className = 'success-popup';
    div.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// Page switching
function showPage(pageName) {
    const pages = ['home', 'about', 'projects', 'contact'];
    pages.forEach(pid => {
        let el = document.getElementById(pid + '-page');
        if (el) el.classList.remove('active-page');
    });
    document.getElementById(pageName + '-page').classList.add('active-page');
    updateActiveNav(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateActiveNav(pageName) {
    document.querySelectorAll('nav a').forEach(link => {
        let attr = link.getAttribute('onclick');
        if (attr && attr.includes(`showPage('${pageName}')`)) {
            link.style.background = 'white';
            link.style.color = '#2563eb';
        } else {
            link.style.background = 'rgba(255, 255, 255, 0.12)';
            link.style.color = 'white';
        }
    });
}

function showHomeMessage() {
    let msgDiv = document.getElementById('welcomeMessage');
    if (msgDiv) {
        msgDiv.innerHTML = '<i class="fas fa-smile-wink"></i> Welcome to my portfolio! Check out my projects below.';
        setTimeout(() => msgDiv.innerHTML = '', 2800);
    }
}

// Contact form validation
function validateContact() {
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let message = document.getElementById("contactMsg").value.trim();
    if (!name || !email || !message) {
        alert("Please fill all fields");
        return false;
    }
    if (!email.includes("@")) {
        alert("Valid email required");
        return false;
    }
    alert("✅ Message sent! (demo)");
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMsg").value = "";
    return false;
}

// Login/Register System
let portfolioUsers = JSON.parse(localStorage.getItem('portfolioUsers') || '{"admin":"12345"}');

function registerUser() {
    let username = document.getElementById("regUser").value.trim();
    let password = document.getElementById("regPass").value;
    let confirm = document.getElementById("regConfirm").value;
    
    if (!username || !password) {
        alert("Username and password required");
        return false;
    }
    if (password !== confirm) {
        alert("Passwords do not match");
        return false;
    }
    if (password.length < 4) {
        alert("Password must be at least 4 characters");
        return false;
    }
    
    portfolioUsers[username] = password;
    localStorage.setItem('portfolioUsers', JSON.stringify(portfolioUsers));
    showSuccessMessage(`Successfully registered ${username}!`);
    
    document.getElementById("regUser").value = "";
    document.getElementById("regPass").value = "";
    document.getElementById("regConfirm").value = "";
    closeModals();
    return false;
}

function loginUser() {
    let username = document.getElementById("loginUser").value.trim();
    let password = document.getElementById("loginPass").value;
    
    if (portfolioUsers[username] && portfolioUsers[username] === password) {
        showSuccessMessage(`Welcome back ${username}!`);
        document.getElementById("loginUser").value = "";
        document.getElementById("loginPass").value = "";
        closeModals();
        showPage('home');
    } else {
        alert("Invalid credentials. Use admin/12345 or register a new account.");
    }
    return false;
}

// Modal controls
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModals() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    let loginModal = document.getElementById('loginModal');
    let registerModal = document.getElementById('registerModal');
    if (event.target === loginModal) loginModal.style.display = 'none';
    if (event.target === registerModal) registerModal.style.display = 'none';
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav('home');
});