// Research Site — Dynamic Content Loader
// Loads data from the shared config.js

// ── Sidebar Component ──────────────────────────
function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || typeof config === 'undefined') return;

    const p = config.personal;
    const s = config.social;
    const basePath = '../';

    sidebar.innerHTML = `
        <div class="sidebar-profile">
            <img src="${basePath}assets/profile.jpeg" alt="${p.name}" class="sidebar-photo"
                 onerror="this.src='https://placehold.co/180x180/f0f2f5/2563eb?text=AA'">
            <h2 class="sidebar-name">${p.name}</h2>
            <p class="sidebar-title">Research Scholar</p>
            <p class="sidebar-degree">B.S., Electrical Engineering</p>

            <div class="sidebar-affiliation">
                <span class="sidebar-affiliation-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    Department of Engineering
                </span>
                <span class="sidebar-affiliation-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Southern Utah University
                </span>
            </div>

            <div class="sidebar-links">
                <a href="mailto:${p.email}" class="sidebar-link" title="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email
                </a>
                <a href="${s.github}" target="_blank" class="sidebar-link" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                </a>
                <a href="${s.linkedin}" target="_blank" class="sidebar-link" title="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                </a>
                <a href="${s.researchgate}" target="_blank" class="sidebar-link" title="ResearchGate">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53c.03.145.067.29.112.437.242.744.65 1.303 1.213 1.68.565.376 1.256.565 2.073.565.573 0 1.082-.09 1.527-.27a3.582 3.582 0 0 0 1.14-.724 3.4 3.4 0 0 0 .729-1.08c.17-.417.255-.867.255-1.35 0-.485-.085-.936-.255-1.352a3.4 3.4 0 0 0-.729-1.08 3.582 3.582 0 0 0-1.14-.723 4.033 4.033 0 0 0-1.527-.27c-.406 0-.788.057-1.147.171l.251-.9.001-.002h2.847V.471h-4.217l-.477 1.881a4.5 4.5 0 0 1 1.597-.305zm-16.586.988V24h4.5V12.707c.574.133 1.182.2 1.822.2 1.822.2 1.542 0 2.795-.398 3.758-1.193.963-.795 1.445-1.87 1.445-3.226 0-1.405-.467-2.515-1.402-3.33C12.188 4.343 10.926 3.935 9.336 3.935c-.903 0-1.73.095-2.482.283-.752.189-1.434.466-2.045.83H3v3.94h2V.988H3z"/></svg>
                    ResearchGate
                </a>
                <a href="${s.orcid}" target="_blank" class="sidebar-link" title="ORCID">
                    <svg viewBox="0 0 256 256" fill="currentColor"><path d="M256,128c0,70.7-57.3,128-128,128C57.3,256,0,198.7,0,128C0,57.3,57.3,0,128,0C198.7,0,256,57.3,256,128z M40.5,70.6c6.1,0,11.1-5,11.1-11.1c0-6.1-5-11.1-11.1-11.1c-6.1,0-11.1,5-11.1,11.1C29.4,65.6,34.4,70.6,40.5,70.6z M49.6,185.8V85.9H31.4v99.9H49.6z M88.7,185.8V85.9h41.3c39.8,0,56.9,27.5,56.9,49.9c0,32.5-24.5,49.9-57.1,49.9H88.7z M106.8,169.2h22.8c27.2,0,39.5-16.4,39.5-33.3c0-23.6-17.3-33.3-39.3-33.3h-23V169.2z"/></svg>
                    0009-0000-5211-709X
                </a>
                <a href="${basePath}assets/Ahmed_Academic_Resume.pdf" target="_blank" class="sidebar-link" title="CV">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Download CV
                </a>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-section-title">Research Interests</h3>
                <ul>
                    <li>Radar Systems</li>
                    <li>Communications Networks</li>
                    <li>Software Defined Radio & RF</li>
                    <li>Signal Processing</li>
                    <li>Navigation & Localization</li>
                </ul>
            </div>

            <div class="sidebar-section">
                <h3 class="sidebar-section-title">Education</h3>
                <div style="text-align: left;">
                    <p style="font-weight:600;font-size:0.88rem;color:var(--global-text-color);">B.S. Electrical Engineering</p>
                    <p style="font-size:0.82rem;color:var(--global-text-color-light);">Minor: Mathematics</p>
                    <p style="font-size:0.82rem;color:var(--global-text-color-light);">Southern Utah University</p>
                    <p style="font-size:0.75rem;color:var(--global-text-color-light);margin-top:0.2rem;">2023 – 2025</p>
                </div>
            </div>
        </div>
    `;
}

// ── Navigation Active State ────────────────────
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ── Mobile Menu Toggle ─────────────────────────
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav-links');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
}

// ── Publications Loader ────────────────────────
function loadPublications() {
    const container = document.getElementById('publications-container');
    if (!container || typeof config === 'undefined' || !config.research) return;

    container.innerHTML = config.research.publications.map((pub, i) => `
        <div class="pub-card" style="margin-bottom: 2em; padding-bottom: 1em; border-bottom: 1px solid var(--global-border-color);">
            <h3 class="pub-title"><a href="#">${pub.title}</a></h3>
            <p class="pub-authors">${pub.authors}</p>
            <p class="pub-meta">${pub.journal} &bull; ${pub.status}</p>
            <div class="pub-links">
                <button class="pub-cite-btn" onclick="toggleBibtex(${i})">BibTeX</button>
            </div>
            <div id="bibtex-${i}" class="pub-bibtex" style="display: none;">${pub.bibtex}</div>
        </div>
    `).join('');
}

// ── Conferences/Talks Loader ───────────────────
function loadTalks() {
    const container = document.getElementById('talks-container');
    if (!container || typeof config === 'undefined' || !config.research) return;

    container.innerHTML = config.research.conferences.map(c => `
        <div class="talk-card" style="margin-bottom: 2em;">
            <h3 class="talk-title">${c.title}</h3>
            <p class="talk-venue">${c.venue}</p>
            <p class="talk-date" style="font-family: var(--font-mono); font-size: 0.8em; margin-bottom: 0.5em;">[${c.id}]</p>
            <p>${c.description}</p>
            ${c.link && c.link !== '#' ? `<p><a href="${c.link}" target="_blank">View Details</a></p>` : ''}
        </div>
    `).join('');
}

// ── Teaching Loader ────────────────────────────
function loadTeaching() {
    const container = document.getElementById('teaching-container');
    if (!container || typeof config === 'undefined' || !config.teaching) return;

    container.innerHTML = config.teaching.map(t => `
        <div class="teaching-card" style="margin-bottom: 2.5em;">
            <h3 style="margin-bottom: 0;">${t.role} &mdash; ${t.institution}</h3>
            <p style="font-style: italic; font-size: 0.9em; color: var(--global-text-color-light);">${t.period}</p>
            <p>${t.description}</p>
            <ul style="margin-left: 1.5em; list-style-type: disc;">
                ${t.courses.map(c => `
                    <li><strong>${c.code}:</strong> ${c.name} &mdash; <span style="font-size: 0.9em; color: var(--global-text-color-light);">${c.tasks}</span></li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// ── BibTeX Toggle ──────────────────────────────
window.toggleBibtex = function (index) {
    const el = document.getElementById(`bibtex-${index}`);
    if (el) {
        if (el.style.display === 'none') {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    }
};

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    setActiveNav();
    initMobileMenu();

    // Page-specific loaders
    if (document.getElementById('publications-container')) loadPublications();
    if (document.getElementById('talks-container')) loadTalks();
    if (document.getElementById('teaching-container')) loadTeaching();
});
