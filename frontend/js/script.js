// Global variables
let currentUser = null;
let authToken = null;
let sports = [];
let sessions = [];
let currentSessionToCancel = null;

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadInitialData();
    setupEventListeners();
});

// Authentication Functions
function checkAuthStatus() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    
    if (token && user) {
        authToken = token;
        currentUser = JSON.parse(user);
        updateUIForAuthenticatedUser();
    } else {
        updateUIForGuest();
    }
}

function updateUIForAuthenticatedUser() {
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userNav').style.display = 'flex';
    document.getElementById('authNav').style.display = 'none';
    document.getElementById('mySessionsNav').style.display = 'block';
    document.getElementById('activityNav').style.display = 'block';
    document.getElementById('createSessionBtn').style.display = 'block';
    
    if (currentUser.role === 'admin') {
        document.getElementById('adminNav').style.display = 'block';
    }
    
    showSection('home');
    loadUserActivity();
}

function updateUIForGuest() {
    document.getElementById('userNav').style.display = 'none';
    document.getElementById('authNav').style.display = 'block';
    document.getElementById('mySessionsNav').style.display = 'none';
    document.getElementById('adminNav').style.display = 'none';
    document.getElementById('createSessionBtn').style.display = 'none';
}

function signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    authToken = null;
    currentUser = null;
    updateUIForGuest();
    showToast('Signed out successfully', 'info');
}

// Event Listeners
function setupEventListeners() {
    // Auth forms
    document.getElementById('signinForm').addEventListener('submit', handleSignIn);
    document.getElementById('signupForm').addEventListener('submit', handleSignUp);
    
    // Session forms
    document.getElementById('createSessionForm').addEventListener('submit', handleCreateSession);
    document.getElementById('cancelSessionForm').addEventListener('submit', handleCancelSession);
    
    // Password change form
    document.getElementById('changePasswordForm').addEventListener('submit', handleChangePassword);
    
    // Forgot password forms
    document.getElementById('forgotPasswordForm').addEventListener('submit', handleForgotPassword);
    document.getElementById('resetPasswordForm').addEventListener('submit', handleResetPassword);
    
    // Admin forms
    document.getElementById('sportForm').addEventListener('submit', handleCreateSport);
    
    // Mobile menu toggle
    document.querySelector('.hamburger').addEventListener('click', toggleMobileMenu);
}

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        ...options
    };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        showToast(error.message, 'error');
        throw error;
    }
}

// Authentication Handlers
async function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    
    try {
        showLoading(true);
        const response = await apiRequest('/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        authToken = response.token;
        currentUser = response.user;
        
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        updateUIForAuthenticatedUser();
        showToast('Signed in successfully!', 'success');
        
        // Clear form
        document.getElementById('signinForm').reset();
        
    } catch (error) {
        console.error('Sign in error:', error);
    } finally {
        showLoading(false);
    }
}

async function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    
    try {
        showLoading(true);
        const response = await apiRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role })
        });
        
        authToken = response.token;
        currentUser = response.user;
        
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        updateUIForAuthenticatedUser();
        showToast('Account created successfully!', 'success');
        
        // Clear form
        document.getElementById('signupForm').reset();
        
    } catch (error) {
        console.error('Sign up error:', error);
    } finally {
        showLoading(false);
    }
}

// UI Navigation Functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Load section-specific data
    switch(sectionName) {
        case 'sessions':
            loadSessions();
            break;
        case 'mySessions':
            loadUserSessions();
            break;
        case 'admin':
            if (currentUser && currentUser.role === 'admin') {
                loadSports();
                loadAdminReports();
            }
            break;
    }
}

function switchAuthTab(tab) {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tabBtn => tabBtn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'signin') {
        signinForm.style.display = 'flex';
        signupForm.style.display = 'none';
    } else {
        signinForm.style.display = 'none';
        signupForm.style.display = 'flex';
    }
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Data Loading Functions
async function loadInitialData() {
    if (authToken) {
        try {
            await Promise.all([
                loadSports(),
                loadSessions()
            ]);
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }
}

async function loadSports() {
    try {
        const data = await apiRequest('/sports');
        sports = data;
        updateSportsDropdown();
        updateSportsList();
    } catch (error) {
        console.error('Error loading sports:', error);
    }
}

async function loadSessions() {
    try {
        const data = await apiRequest('/sessions');
        sessions = data;
        updateSessionsList();
    } catch (error) {
        console.error('Error loading sessions:', error);
    }
}

async function loadUserSessions() {
    try {
        const data = await apiRequest('/sessions/user/sessions');
        updateUserSessionsList(data);
    } catch (error) {
        console.error('Error loading user sessions:', error);
    }
}

// UI Update Functions
function updateSportsDropdown() {
    const dropdown = document.getElementById('sessionSport');
    const filterDropdown = document.getElementById('sportFilter');
    
    // Update create session dropdown - show all unique sports without pre-selection
    if (dropdown) {
        dropdown.innerHTML = ''; // Start with empty dropdown
        
        if (sports.length === 0) {
            // If no sports available, show message
            dropdown.innerHTML = '<option value="" disabled>No sports available - Contact admin</option>';
        } else {
            // Add default unselected option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Choose your sport';
            defaultOption.selected = true;
            dropdown.appendChild(defaultOption);
            
            // Create a map to track unique sport names and avoid duplicates in display
            const uniqueSportNames = new Set();
            const uniqueSports = [];
            
            // Filter for unique sport names but keep the first occurrence of each
            sports.forEach(sport => {
                if (sport && sport.name && !uniqueSportNames.has(sport.name)) {
                    uniqueSportNames.add(sport.name);
                    uniqueSports.push(sport);
                }
            });
            
            // Sort unique sports alphabetically for better organization
            uniqueSports.sort((a, b) => a.name.localeCompare(b.name));
            
            // Add all unique sports to dropdown (no pre-selection)
            uniqueSports.forEach((sport) => {
                const option = document.createElement('option');
                option.value = sport._id;
                option.textContent = sport.name;
                dropdown.appendChild(option);
            });
            
            console.log(`🎮 Dropdown populated with ${uniqueSports.length} unique sports from ${sports.length} total entries`);
        }
    }
    
    // Update filter dropdown
    if (filterDropdown) {
        filterDropdown.innerHTML = '<option value="">All Sports</option>';
        sports.forEach(sport => {
            const option = document.createElement('option');
            option.value = sport._id;
            option.textContent = sport.name;
            filterDropdown.appendChild(option);
        });
    }
}

function updateSportsList() {
    const sportsList = document.getElementById('sportsList');
    sportsList.innerHTML = '';
    
    sports.forEach(sport => {
        const sportItem = document.createElement('div');
        sportItem.className = 'sport-item';
        sportItem.innerHTML = `
            <span class="sport-name">${sport.name}</span>
            <small>Created by ${sport.createdBy.name}</small>
        `;
        sportsList.appendChild(sportItem);
    });
}

function updateSessionsList() {
    const sessionsList = document.getElementById('sessionsList');
    sessionsList.innerHTML = '';
    
    if (sessions.length === 0) {
        sessionsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No sessions available</p>';
        return;
    }
    
    sessions.forEach(session => {
        const sessionCard = createSessionCard(session);
        sessionsList.appendChild(sessionCard);
    });
}

function updateUserSessionsList(data) {
    const { createdSessions, joinedSessions } = data;
    
    // Update created sessions
    const createdSessionsList = document.getElementById('createdSessionsList');
    if (createdSessionsList) {
        createdSessionsList.innerHTML = '';
        
        if (createdSessions.length === 0) {
            createdSessionsList.innerHTML = '<p style="text-align: center; color: #666;">No sessions created yet</p>';
        } else {
            createdSessions.forEach(session => {
                const sessionCard = createSessionCard(session, true);
                createdSessionsList.appendChild(sessionCard);
            });
        }
    }
    
    // Update joined sessions
    const joinedSessionsList = document.getElementById('joinedSessionsList');
    if (joinedSessionsList) {
        joinedSessionsList.innerHTML = '';
        
        if (joinedSessions.length === 0) {
            joinedSessionsList.innerHTML = '<p style="text-align: center; color: #666;">No sessions joined yet</p>';
        } else {
            joinedSessions.forEach(session => {
                const sessionCard = createSessionCard(session, false);
                joinedSessionsList.appendChild(sessionCard);
            });
        }
    }
}

function createSessionCard(session, isCreated = false) {
    const card = document.createElement('div');
    card.className = `session-card ${session.status === 'cancelled' ? 'cancelled' : ''}`;
    
    const isJoined = session.joinedPlayers.some(player => 
        player.user._id === currentUser?.id
    );
    
    // Check if current user created this session
    const isSessionCreator = session.createdBy._id === currentUser?.id;
    
    const canJoin = !isJoined && 
                   !isSessionCreator &&
                   session.status === 'active' && 
                   new Date(session.date) > new Date() &&
                   session.joinedPlayers.length < session.additionalPlayersNeeded;
    
    const canCancel = isSessionCreator && 
                     session.status === 'active' && 
                     new Date(session.date) > new Date();
    
    card.innerHTML = `
        <div class="session-header">
            <div class="session-sport">${session.sport.name}</div>
            <div class="session-date">${formatDateTime(session.date)}</div>
        </div>
        
        <div class="session-details">
            <div class="session-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${session.venue}</span>
            </div>
            <div class="session-detail">
                <i class="fas fa-users"></i>
                <span>${session.joinedPlayers.length}/${session.additionalPlayersNeeded} players</span>
            </div>
            <div class="session-detail">
                <i class="fas fa-user"></i>
                <span>Created by ${session.createdBy.name}</span>
            </div>
        </div>
        
        <div class="session-teams">
            <div class="team-section">
                <div class="team-label">Team 1:</div>
                <div class="team-players">
                    ${session.team1Players.map(player => `<span class="player-tag">${player}</span>`).join('')}
                </div>
            </div>
            <div class="team-section">
                <div class="team-label">Team 2:</div>
                <div class="team-players">
                    ${session.team2Players.map(player => `<span class="player-tag">${player}</span>`).join('')}
                </div>
            </div>
            ${session.joinedPlayers.length > 0 ? `
                <div class="team-section">
                    <div class="team-label">Joined Players:</div>
                    <div class="team-players">
                        ${session.joinedPlayers.map(player => `<span class="player-tag">${player.user.name}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        ${session.status === 'cancelled' ? `
            <div class="session-detail">
                <i class="fas fa-exclamation-triangle"></i>
                <span style="color: #dc3545;">Cancelled: ${session.cancellationReason}</span>
            </div>
        ` : ''}
        
        <div class="session-actions">
            ${canJoin ? `<button class="btn btn-success" onclick="joinSession('${session._id}')">Join Session</button>` : ''}
            ${canCancel ? `<button class="btn btn-danger" onclick="showCancelSessionModal('${session._id}')">Cancel Session</button>` : ''}
        </div>
    `;
    
    return card;
}

// Session Management Functions
async function showCreateSessionForm() {
    if (!authToken) {
        showToast('Please sign in to create a session', 'error');
        showSection('auth');
        return;
    }
    
    // Ensure sports are loaded before showing the modal
    if (sports.length === 0) {
        try {
            await loadSports();
        } catch (error) {
            console.error('Error loading sports for create session:', error);
            showToast('Error loading sports. Please try again.', 'error');
            return;
        }
    }
    
    document.getElementById('createSessionModal').style.display = 'block';
}

function closeCreateSessionModal() {
    document.getElementById('createSessionModal').style.display = 'none';
    document.getElementById('createSessionForm').reset();
}

async function handleCreateSession(e) {
    e.preventDefault();
    
    const sportId = document.getElementById('sessionSport').value;
    const date = document.getElementById('sessionDate').value;
    const venue = document.getElementById('sessionVenue').value;
    const description = document.getElementById('sessionDescription').value;
    const skillLevel = document.getElementById('skillLevel').value;
    const maxPlayers = parseInt(document.getElementById('maxPlayers').value);
    const team1Players = document.getElementById('team1Players').value.split(',').map(p => p.trim()).filter(p => p);
    const team2Players = document.getElementById('team2Players').value.split(',').map(p => p.trim()).filter(p => p);
    const additionalPlayers = parseInt(document.getElementById('additionalPlayers').value);
    
    // Validate required fields - user must select a sport
    if (!sportId || sportId === '') {
        showToast('Please select a sport from the dropdown', 'error');
        return;
    }
    if (!skillLevel) {
        showToast('Please select a skill level', 'error');
        return;
    }
    if (!maxPlayers || maxPlayers < 2) {
        showToast('Please enter a valid maximum number of players (minimum 2)', 'error');
        return;
    }
    
    try {
        showLoading(true);
        const response = await apiRequest('/sessions', {
            method: 'POST',
            body: JSON.stringify({
                sportId,
                date,
                venue,
                description,
                skillLevel,
                maxPlayers,
                team1Players,
                team2Players,
                additionalPlayersNeeded: additionalPlayers
            })
        });
        
        showToast('Session created successfully!', 'success');
        closeCreateSessionModal();
        loadSessions();
        loadUserActivity(); // Refresh activity stats
        
    } catch (error) {
        console.error('Error creating session:', error);
    } finally {
        showLoading(false);
    }
}

async function joinSession(sessionId) {
    try {
        showLoading(true);
        await apiRequest(`/sessions/${sessionId}/join`, {
            method: 'POST'
        });
        
        showToast('Successfully joined the session!', 'success');
        loadSessions();
        
    } catch (error) {
        console.error('Error joining session:', error);
    } finally {
        showLoading(false);
    }
}

function showCancelSessionModal(sessionId) {
    currentSessionToCancel = sessionId;
    document.getElementById('cancelSessionModal').style.display = 'block';
}

function closeCancelSessionModal() {
    document.getElementById('cancelSessionModal').style.display = 'none';
    document.getElementById('cancelSessionForm').reset();
    currentSessionToCancel = null;
}

async function handleCancelSession(e) {
    e.preventDefault();
    
    const reason = document.getElementById('cancellationReason').value;
    
    try {
        showLoading(true);
        await apiRequest(`/sessions/${currentSessionToCancel}/cancel`, {
            method: 'POST',
            body: JSON.stringify({ reason })
        });
        
        showToast('Session cancelled successfully', 'success');
        closeCancelSessionModal();
        loadSessions();
        loadUserSessions();
        
    } catch (error) {
        console.error('Error cancelling session:', error);
    } finally {
        showLoading(false);
    }
}

// Admin Functions
async function handleCreateSport(e) {
    e.preventDefault();
    
    const name = document.getElementById('sportName').value;
    
    try {
        showLoading(true);
        await apiRequest('/sports', {
            method: 'POST',
            body: JSON.stringify({ name })
        });
        
        showToast('Sport created successfully!', 'success');
        document.getElementById('sportForm').reset();
        loadSports();
        
    } catch (error) {
        console.error('Error creating sport:', error);
    } finally {
        showLoading(false);
    }
}

async function generateReport() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    try {
        showLoading(true);
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);
        
        const data = await apiRequest(`/admin/reports?${params}`);
        updateReportResults(data);
        
    } catch (error) {
        console.error('Error generating report:', error);
    } finally {
        showLoading(false);
    }
}

function updateReportResults(data) {
    const reportResults = document.getElementById('reportResults');
    
    reportResults.innerHTML = `
        <div class="report-stat">
            <span class="report-stat-label">Total Sessions</span>
            <span class="report-stat-value">${data.totalSessions}</span>
        </div>
        <h4>Sport Statistics</h4>
        ${Object.entries(data.sportStats).map(([sport, stats]) => `
            <div class="report-stat">
                <span class="report-stat-label">${sport}</span>
                <span class="report-stat-value">${stats.sessions} sessions, ${stats.totalPlayers} players</span>
            </div>
        `).join('')}
    `;
}

// Utility Functions
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'flex' : 'none';
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Password Change Functions
function showChangePasswordModal() {
    if (!authToken) {
        showToast('Please sign in to change password', 'error');
        showSection('auth');
        return;
    }
    
    document.getElementById('changePasswordModal').style.display = 'block';
}

function closeChangePasswordModal() {
    document.getElementById('changePasswordModal').style.display = 'none';
    document.getElementById('changePasswordForm').reset();
}

async function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('New password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        showLoading(true);
        await apiRequest('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        });
        
        showToast('Password changed successfully!', 'success');
        closeChangePasswordModal();
        
    } catch (error) {
        console.error('Error changing password:', error);
    } finally {
        showLoading(false);
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const createModal = document.getElementById('createSessionModal');
    const cancelModal = document.getElementById('cancelSessionModal');
    const changePasswordModal = document.getElementById('changePasswordModal');
    
    if (event.target === createModal) {
        closeCreateSessionModal();
    }
    if (event.target === cancelModal) {
        closeCancelSessionModal();
    }
    if (event.target === changePasswordModal) {
        closeChangePasswordModal();
    }
    
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    if (event.target === forgotPasswordModal) {
        closeForgotPasswordModal();
    }
    
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    if (event.target === resetPasswordModal) {
        closeResetPasswordModal();
    }
}

// Forgot Password Functions
function showForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'block';
}

function closeForgotPasswordModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
    document.getElementById('forgotPasswordForm').reset();
}

async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    
    try {
        showLoading(true);
        const response = await apiRequest('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
        
        showToast('Password reset instructions sent!', 'success');
        closeForgotPasswordModal();
        
        // Show reset password modal with token (in production, user would get this via email)
        if (response.resetToken) {
            document.getElementById('resetToken').value = response.resetToken;
            showResetPasswordModal();
            showToast('For demo purposes, the reset token has been pre-filled. In production, you would receive this via email.', 'info');
        }
        
    } catch (error) {
        console.error('Error sending forgot password request:', error);
    } finally {
        showLoading(false);
    }
}

// Reset Password Functions
function showResetPasswordModal() {
    document.getElementById('resetPasswordModal').style.display = 'block';
}

function closeResetPasswordModal() {
    document.getElementById('resetPasswordModal').style.display = 'none';
    document.getElementById('resetPasswordForm').reset();
}

async function handleResetPassword(e) {
    e.preventDefault();
    const token = document.getElementById('resetToken').value;
    const newPassword = document.getElementById('resetNewPassword').value;
    const confirmPassword = document.getElementById('resetConfirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    try {
        showLoading(true);
        await apiRequest('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({
                token,
                newPassword
            })
        });
        
        showToast('Password reset successfully! Please sign in with your new password.', 'success');
        closeResetPasswordModal();
        showSection('auth');
        
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        showLoading(false);
    }
}

// Activity Tracking Functions
async function loadUserActivity() {
    if (!authToken) return;
    
    try {
        const response = await apiRequest('/sessions/user/activity');
        updateActivityStats(response.stats);
        updateRecentActivity(response.createdSessions, response.joinedSessions);
    } catch (error) {
        console.error('Error loading user activity:', error);
    }
}

function updateActivityStats(stats) {
    document.getElementById('totalCreated').textContent = stats.totalCreated;
    document.getElementById('totalJoined').textContent = stats.totalJoined;
    document.getElementById('activeSessions').textContent = stats.activeSessions;
    document.getElementById('sportsPlayed').textContent = stats.sportsPlayed.length;
}

function updateRecentActivity(createdSessions, joinedSessions) {
    const activityContainer = document.getElementById('recentActivity');
    const allSessions = [
        ...createdSessions.map(s => ({ ...s, type: 'created' })),
        ...joinedSessions.map(s => ({ ...s, type: 'joined' }))
    ];
    
    // Sort by date (most recent first)
    allSessions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    activityContainer.innerHTML = allSessions.slice(0, 10).map(session => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas ${session.type === 'created' ? 'fa-plus-circle' : 'fa-user-plus'}"></i>
            </div>
            <div class="activity-content">
                <h4>${session.type === 'created' ? 'Created' : 'Joined'} ${session.sport.name} Session</h4>
                <p>${session.venue} • ${new Date(session.date).toLocaleDateString()}</p>
                <span class="activity-status ${session.status}">${session.status}</span>
            </div>
        </div>
    `).join('');
}

// Enhanced session display with more details
function displaySessions(sessions) {
    const container = document.getElementById('sessionsList');
    if (!sessions || sessions.length === 0) {
        container.innerHTML = '<p class="no-sessions">No sessions available at the moment.</p>';
        return;
    }

    container.innerHTML = sessions.map(session => `
        <div class="session-card">
            <div class="session-header">
                <h3>${session.sport.name}</h3>
                <span class="skill-level ${session.skillLevel}">${session.skillLevel.charAt(0).toUpperCase() + session.skillLevel.slice(1)}</span>
            </div>
            <div class="session-details">
                <p><i class="fas fa-calendar"></i> ${new Date(session.date).toLocaleDateString()}</p>
                <p><i class="fas fa-clock"></i> ${new Date(session.date).toLocaleTimeString()}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${session.venue}</p>
                ${session.description ? `<p><i class="fas fa-info-circle"></i> ${session.description}</p>` : ''}
            </div>
            <div class="session-stats">
                <span><i class="fas fa-users"></i> ${session.joinedPlayers.length}/${session.maxPlayers} players</span>
                <span><i class="fas fa-user"></i> Created by ${session.createdBy.name}</span>
            </div>
            <div class="session-actions">
                ${session.createdBy._id === currentUser?.id ? 
                    `<button onclick="showCancelSessionModal('${session._id}')" class="btn btn-danger">Cancel Session</button>` :
                    `<button onclick="joinSession('${session._id}')" class="btn btn-primary">Join Session</button>`
                }
            </div>
        </div>
    `).join('');
}

// Filter sessions by location
async function filterSessionsByLocation(location) {
    try {
        const response = await apiRequest(`/sessions/area/${encodeURIComponent(location)}`);
        displaySessions(response);
    } catch (error) {
        console.error('Error filtering sessions by location:', error);
        showToast('Error filtering sessions', 'error');
    }
}

// Filter sessions by sport
async function filterSessionsBySport(sportId) {
    try {
        const response = await apiRequest(`/sessions/sport/${sportId}`);
        displaySessions(response);
    } catch (error) {
        console.error('Error filtering sessions by sport:', error);
        showToast('Error filtering sessions', 'error');
    }
}

// Combined session filtering
function filterSessions() {
    const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
    const sportFilter = document.getElementById('sportFilter').value;
    const skillFilter = document.getElementById('skillFilter').value;
    
    let filteredSessions = [...sessions];
    
    // Filter by location
    if (locationFilter) {
        filteredSessions = filteredSessions.filter(session => 
            session.venue.toLowerCase().includes(locationFilter)
        );
    }
    
    // Filter by sport
    if (sportFilter) {
        filteredSessions = filteredSessions.filter(session => 
            session.sport._id === sportFilter
        );
    }
    
    // Filter by skill level
    if (skillFilter) {
        filteredSessions = filteredSessions.filter(session => 
            session.skillLevel === skillFilter
        );
    }
    
    displayFilteredSessions(filteredSessions);
}

// Clear all filters
function clearFilters() {
    document.getElementById('locationFilter').value = '';
    document.getElementById('sportFilter').value = '';
    document.getElementById('skillFilter').value = '';
    updateSessionsList();
}

// Display filtered sessions
function displayFilteredSessions(filteredSessions) {
    const sessionsList = document.getElementById('sessionsList');
    sessionsList.innerHTML = '';
    
    if (filteredSessions.length === 0) {
        sessionsList.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No sessions match your filters</p>';
        return;
    }
    
    filteredSessions.forEach(session => {
        const sessionCard = createSessionCard(session);
        sessionsList.appendChild(sessionCard);
    });
}

// Admin Functions
async function loadAdminReports() {
    try {
        const response = await apiRequest('/admin/reports');
        displayReportResults(response);
    } catch (error) {
        console.error('Error loading admin reports:', error);
    }
}

async function generateReport() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let endpoint = '/admin/reports';
    if (startDate && endDate) {
        endpoint += `?startDate=${startDate}&endDate=${endDate}`;
    }
    
    try {
        showLoading(true);
        const response = await apiRequest(endpoint);
        displayReportResults(response);
        showToast('Report generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating report:', error);
    } finally {
        showLoading(false);
    }
}

function displayReportResults(data) {
    const reportResults = document.getElementById('reportResults');
    
    if (!data || data.totalSessions === 0) {
        reportResults.innerHTML = '<p>No data available for the selected period.</p>';
        return;
    }
    
    const sportStatsHtml = Object.entries(data.sportStats)
        .map(([sport, stats]) => `
            <div class="sport-stat">
                <h4>${sport}</h4>
                <p>Sessions: ${stats.sessions}</p>
                <p>Total Players: ${stats.totalPlayers}</p>
                <p>Avg Players/Session: ${(stats.totalPlayers / stats.sessions).toFixed(1)}</p>
            </div>
        `).join('');
    
    reportResults.innerHTML = `
        <div class="report-summary">
            <h4>Report Summary</h4>
            <p><strong>Total Sessions:</strong> ${data.totalSessions}</p>
            ${data.period.startDate ? `<p><strong>Period:</strong> ${data.period.startDate} to ${data.period.endDate}</p>` : ''}
        </div>
        
        <div class="sport-stats">
            <h4>Sport Statistics</h4>
            <div class="sport-stats-grid">
                ${sportStatsHtml}
            </div>
        </div>
    `;
}
