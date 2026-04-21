// ===== DATA =====
const DATA = {
    completed: [
        { id: 1, title: "Variables & Data Types", course: "javascript", date: "Apr 15, 2026", grade: 95, status: "completed" },
        { id: 2, title: "Functions & Closures", course: "javascript", date: "Apr 18, 2026", grade: 88, status: "completed" },
        { id: 3, title: "OOP in Python", course: "python", date: "Apr 12, 2026", grade: 92, status: "completed" },
        { id: 4, title: "SQL Joins Practice", course: "sql", date: "Apr 19, 2026", grade: 95, status: "completed" },
        { id: 5, title: "React Components", course: "react", date: "Apr 10, 2026", grade: 80, status: "completed" },
        { id: 6, title: "DOM Manipulation", course: "javascript", date: "Apr 14, 2026", grade: 91, status: "completed" },
        { id: 7, title: "List Comprehensions", course: "python", date: "Apr 16, 2026", grade: 78, status: "completed" },
        { id: 8, title: "Subqueries & Aggregates", course: "sql", date: "Apr 17, 2026", grade: 89, status: "completed" },
        { id: 9, title: "Props & State Management", course: "react", date: "Apr 11, 2026", grade: 85, status: "completed" },
        { id: 10, title: "Error Handling", course: "javascript", date: "Apr 13, 2026", grade: 93, status: "completed" },
        { id: 11, title: "File I/O Operations", course: "python", date: "Apr 9, 2026", grade: 76, status: "completed" },
        { id: 12, title: "Indexes & Query Optimization", course: "sql", date: "Apr 8, 2026", grade: 97, status: "completed" },
    ],
    pending: [
        { id: 13, title: "React: Hooks & Context API", course: "react", deadline: "Today, 23:59", desc: "Build an app using useState, useEffect, and Context API to manage global state.", type: "overdue", daysLeft: 0 },
        { id: 14, title: "Python: Decorators & Generators", course: "python", deadline: "Apr 21, 18:00", desc: "Create a decorator for function logging and a generator for processing large files.", type: "pending", daysLeft: 1 },
        { id: 15, title: "JS: Async & Promises", course: "javascript", deadline: "Apr 25, 12:00", desc: "Implement a Promise chain with error handling and async/await patterns.", type: "pending", daysLeft: 5 },
        { id: 16, title: "SQL: Stored Procedures", course: "sql", deadline: "Apr 22, 20:00", desc: "Create stored procedures for CRUD operations in a mock e-commerce database.", type: "overdue", daysLeft: -1 },
        { id: 17, title: "React: Routing & Navigation", course: "react", deadline: "Apr 28, 15:00", desc: "Set up React Router with protected routes and lazy-loaded components.", type: "pending", daysLeft: 8 },
    ],
    messages: {
        conversations: [
            {
                id: 1,
                name: "John Doe",
                initials: "JD",
                color: "#6366f1",
                lastMsg: "Could you review my React solution...",
                time: "2h ago",
                unread: true,
                messages: [
                    { text: "Hey! How's the React assignment going?", type: "received", time: "10:00" },
                    { text: "Hi! Almost done. Just wrapping up the hooks.", type: "sent", time: "10:15" },
                    { text: "Could you review my React solution for the context API? Not sure if I'm passing state correctly.", type: "received", time: "10:30" },
                    { text: "Sure, send the repo link and I'll take a look!", type: "sent", time: "10:45" },
                ]
            },
            {
                id: 2,
                name: "Maria Ivanova",
                initials: "MI",
                color: "#10b981",
                lastMsg: "Great work! Just one minor suggestion...",
                time: "5h ago",
                unread: true,
                messages: [
                    { text: "I've graded your SQL Joins assignment.", type: "received", time: "09:00" },                    { text: "Great work! Just one minor suggestion — you could optimize the query in Task 3.", type: "received", time: "09:01" },
                    { text: "Thanks! I'll rewrite it and submit the updated version.", type: "sent", time: "09:30" },
                ]
            },
            {
                id: 3,
                name: "Instructor",
                initials: "IN",
                color: "#f59e0b",
                lastMsg: "Reminder: Assignment due by end of week...",
                time: "Yesterday",
                unread: false,
                messages: [
                    { text: "Reminder: The 'React Hooks' assignment is due today by 23:59.", type: "received", time: "Yesterday, 16:00" },
                    { text: "Make sure to submit on time to avoid penalties.", type: "received", time: "Yesterday, 16:05" },
                    { text: "Understood, thanks for the reminder! Already working on it.", type: "sent", time: "Yesterday, 17:00" },
                ]
            },
            {
                id: 4,
                name: "Anna Kozlova",
                initials: "AK",
                color: "#ec4899",
                lastMsg: "Let's prepare for the Python quiz together",
                time: "2 days ago",
                unread: false,
                messages: [
                    { text: "Hey! Want to study together for Friday's Python quiz?", type: "received", time: "2 days ago" },
                    { text: "Sounds good! Let's meet on Zoom at 6 PM.", type: "sent", time: "2 days ago" },
                ]
            },
        ]
    }
};

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const sidebar = $('#sidebar');
const overlay = $('#overlay');
const menuToggle = $('#menuToggle');
const notifBell = $('#notifBell');
const notifPanel = $('#notifPanel');
const pageTitle = $('#pageTitle');
const searchInput = $('#searchInput');
const messageInput = $('#messageInput');
const sendBtn = $('#sendBtn');

// ===== NAVIGATION =====const pageTitles = {
    dashboard: 'Dashboard',
    completed: 'Completed Assignments',
    pending: 'Active / Overdue',
    grades: 'Grades',
    messages: 'Messages'
};

$$('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        navigateTo(page);
    });
});

function navigateTo(page) {
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $(`.nav-item[data-page="${page}"]`).classList.add('active');

    $$('.page').forEach(p => p.classList.remove('active'));
    $(`#page-${page}`).classList.add('active');

    pageTitle.textContent = pageTitles[page];

    sidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    notifPanel.classList.remove('open');
    overlay.classList.remove('active');
});

// ===== NOTIFICATIONS =====
notifBell.addEventListener('click', () => {
    notifPanel.classList.toggle('open');
    overlay.classList.toggle('active');
});

$('#clearNotifs').addEventListener('click', () => {
    $('#notifList').innerHTML = '<p style="padding:24px;text-align:center;color:var(--text-muted);">No notifications</p>';
});
// ===== RENDER COMPLETED TABLE =====
function renderCompleted(filter = 'all') {
    const tbody = $('#completedTableBody');
    const filtered = filter === 'all'
        ? DATA.completed
        : DATA.completed.filter(a => a.course === filter);

    tbody.innerHTML = filtered.map(a => {
        const courseLabels = {
            javascript: { label: 'JavaScript', class: 'course-tag--js' },
            python: { label: 'Python', class: 'course-tag--python' },
            react: { label: 'React', class: 'course-tag--react' },
            sql: { label: 'SQL', class: 'course-tag--sql' },
        };
        const course = courseLabels[a.course];
        const gradeClass = a.grade >= 90 ? 'grade-badge--excellent'
            : a.grade >= 80 ? 'grade-badge--good'
            : a.grade >= 70 ? 'grade-badge--average'
            : 'grade-badge--poor';

        return `
            <tr>
                <td><strong>${a.title}</strong></td>
                <td><span class="course-tag ${course.class}">${course.label}</span></td>
                <td>${a.date}</td>
                <td><span class="grade-badge ${gradeClass}">${a.grade}/100</span></td>
                <td><span class="status-badge status-badge--completed">Completed</span></td>
            </tr>
        `;
    }).join('');
}

$('#filterCompleted').addEventListener('change', (e) => {
    renderCompleted(e.target.value);
});

// ===== RENDER PENDING CARDS =====
function renderPending(filter = 'all') {
    const grid = $('#pendingGrid');
    let filtered = DATA.pending;
    if (filter === 'pending') filtered = DATA.pending.filter(a => a.type === 'pending');
    if (filter === 'overdue') filtered = DATA.pending.filter(a => a.type === 'overdue');

    grid.innerHTML = filtered.map(a => {
        const courseLabels = {
            javascript: { label: 'JavaScript', class: 'course-tag--js' },
            python: { label: 'Python', class: 'course-tag--python' },
            react: { label: 'React', class: 'course-tag--react' },
            sql: { label: 'SQL', class: 'course-tag--sql' },        };
        const course = courseLabels[a.course];
        const isOverdue = a.type === 'overdue';
        const tagClass = isOverdue ? 'tag--urgent' : (a.daysLeft <= 2 ? 'tag--soon' : 'tag--normal');
        const tagText = isOverdue ? 'Overdue' : `${a.daysLeft}d left`;

        return `
            <div class="pending-card">
                <div class="pending-card-header">
                    <div class="pending-card-title">${a.title}</div>
                    <span class="course-tag ${course.class}">${course.label}</span>
                </div>
                <div class="pending-card-desc">${a.desc}</div>
                <div class="pending-card-meta">
                    <div class="pending-card-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        ${a.deadline}
                    </div>
                    <span class="deadline-tag ${tagClass}">${tagText}</span>
                </div>
                <div class="pending-card-footer">
                    <button class="btn btn--outline">Details</button>
                    <button class="btn btn--primary">Start</button>
                </div>
            </div>
        `;
    }).join('');
}

$('#filterPending').addEventListener('change', (e) => {
    renderPending(e.target.value);
});

// ===== RENDER GRADES =====
function renderGrades() {
    const list = $('#gradeList');
    list.innerHTML = DATA.completed.map(a => {
        const gradeClass = a.grade >= 90 ? 'grade-badge--excellent'
            : a.grade >= 80 ? 'grade-badge--good'
            : a.grade >= 70 ? 'grade-badge--average'
            : 'grade-badge--poor';

        return `
            <div class="grade-item">
                <div>
                    <div class="grade-item-name">${a.title}</div>
                    <div class="grade-item-course">${a.date}</div>                </div>
                <span class="grade-badge ${gradeClass}">${a.grade}/100</span>
            </div>
        `;
    }).join('');
}

// ===== RENDER MESSAGES =====
function renderConversations() {
    const list = $('#conversationsList');
    list.innerHTML = DATA.messages.conversations.map(c => `
        <div class="conversation-item ${c.id === 1 ? 'active' : ''}" data-id="${c.id}">
            <div class="conversation-avatar" style="background:${c.color};">${c.initials}</div>
            <div class="conversation-info">
                <div class="conversation-name">
                    ${c.name}
                    <span class="conversation-time">${c.time}</span>
                </div>
                <div class="conversation-last">
                    ${c.lastMsg}
                    ${c.unread ? '<span class="conversation-unread"></span>' : ''}
                </div>
            </div>
        </div>
    `).join('');

    $$('.conversation-item').forEach(item => {
        item.addEventListener('click', () => {
            $$('.conversation-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            renderMessages(parseInt(item.dataset.id));
        });
    });
}

function renderMessages(convId) {
    const conv = DATA.messages.conversations.find(c => c.id === convId);
    if (!conv) return;

    const header = $('#messagesHeader');
    header.innerHTML = `
        <div class="messages-header-info">
            <div class="messages-header-avatar" style="background:${conv.color};">${conv.initials}</div>
            <div>
                <strong>${conv.name}</strong>
                <span class="messages-header-status">online</span>
            </div>
        </div>
    `;
    const body = $('#messagesBody');
    body.innerHTML = conv.messages.map(m => `
        <div class="message-bubble message-bubble--${m.type}">
            ${m.text}
            <div class="message-time">${m.time}</div>
        </div>
    `).join('');

    body.scrollTop = body.scrollHeight;
}

// Send message
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const body = $('#messagesBody');
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble message-bubble--sent';
    bubble.innerHTML = `${text}<div class="message-time">${time}</div>`;
    body.appendChild(bubble);

    messageInput.value = '';
    body.scrollTop = body.scrollHeight;
}

// ===== INIT =====
function init() {
    renderCompleted();
    renderPending();
    renderGrades();
    renderConversations();
    renderMessages(1);

    $('#stat-completed').textContent = DATA.completed.length;
    $('#stat-pending').textContent = DATA.pending.filter(a => a.type === 'pending').length;
    $('#stat-overdue').textContent = DATA.pending.filter(a => a.type === 'overdue').length;

    const avg = Math.round(DATA.completed.reduce((sum, a) => sum + a.grade, 0) / DATA.completed.length);
    $('#stat-avg').textContent = avg + '%';
}
init();
