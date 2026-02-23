// Research Page Logic
// Handles dynamic loading of publications and conferences with academic formatting

document.addEventListener('DOMContentLoaded', () => {
    loadPublications();
    loadConferences();
    feather.replace();
});

function loadPublications() {
    const container = document.getElementById('publications-container');
    if (!container || !config.research.publications) return;

    if (config.research.publications.length === 0) {
        container.innerHTML = '<p class="text-slate-500 italic">No publications listed yet.</p>';
        return;
    }

    container.innerHTML = config.research.publications.map((pub, index) => {
        const isUnderReview = pub.status && pub.status.toLowerCase().includes('review');
        const statusBadge = isUnderReview
            ? `<span class="align-middle inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 ml-2">Under Review</span>`
            : '';

        return `
        <div class="group py-4 border-l-2 border-transparent hover:border-primary-500 pl-4 transition-all">
            <h3 class="text-lg font-bold text-white mb-2 group-hover:text-primary-500 transition-colors">
                ${pub.title}
            </h3>
            <p class="text-slate-300 text-sm mb-2 font-serif leading-relaxed">
                ${highlightAuthor(pub.authors, "Amin")}
            </p>
            <div class="flex flex-wrap items-center gap-4 text-sm font-mono text-slate-500">
                <span class="text-slate-400 italic">${pub.journal || pub.conference || 'Preprint'}${statusBadge}</span>
                <span>${pub.year || '2025'}</span>
            </div>

            <div class="flex gap-4 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                 ${pub.link ? `
                    <a href="${pub.link}" target="_blank" class="text-xs font-mono text-primary-500 hover:underline uppercase tracking-wide">
                        [View Paper]
                    </a>` : ''}
                ${pub.pdf ? `
                    <a href="${pub.pdf}" target="_blank" class="text-xs font-mono text-primary-500 hover:underline uppercase tracking-wide">
                        [PDF]
                    </a>` : ''}
                <button onclick="toggleBibtex('bibtex-${index}')" class="text-xs font-mono text-slate-400 hover:text-white hover:underline uppercase tracking-wide">
                    [BibTeX]
                </button>
            </div>
            
            <div id="bibtex-${index}" class="hidden mt-4">
                <div class="relative">
                    <pre class="bg-gray-900 rounded p-4 text-xs font-mono text-slate-400 overflow-x-auto border border-gray-800 select-all">${pub.bibtex || 'BibTeX not available.'}</pre>
                    <button onclick="copyToClipboard('${escapeJs(pub.bibtex)}')" class="absolute top-2 right-2 text-xs text-slate-500 hover:text-white">
                        Copy
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
}

function loadConferences() {
    const container = document.getElementById('conferences-container');
    if (!container || !config.research.conferences) return;

    if (config.research.conferences.length === 0) {
        container.innerHTML = '<p class="text-slate-500 italic">No conferences listed yet.</p>';
        return;
    }

    container.innerHTML = config.research.conferences.map(conf => `
        <div class="flex gap-6 items-baseline group py-2">
            <span class="flex-shrink-0 w-24 text-right text-xs font-mono text-secondary-500 uppercase tracking-wider">${conf.venue.split(' ')[1] || '2025'}</span>
            <div class="flex-1 border-l border-gray-800 pl-6 pb-2 relative">
                <div class="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-gray-800 border-2 border-secondary-500 group-hover:bg-secondary-500 transition-colors"></div>
                <h4 class="text-white font-bold text-lg mb-1 group-hover:text-secondary-500 transition-colors">${conf.title}</h4>
                <p class="text-slate-400 text-sm mb-1 italic">${conf.venue}</p>
                <p class="text-slate-500 text-sm mb-2">${conf.description}</p>
                ${conf.link ? `
                    <a href="${conf.link}" target="_blank" class="inline-flex items-center gap-1 text-xs font-mono text-secondary-500 hover:text-white transition-colors uppercase tracking-wider">
                        <i data-feather="external-link" class="w-3 h-3"></i> [View Abstract]
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Helpers
function highlightAuthor(authors, myName) {
    if (!authors) return '';
    // Bold specific parts of the name if found
    return authors.replace(new RegExp(myName, 'gi'), '<strong>$&</strong>');
}

function toggleBibtex(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

function escapeJs(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/\n/g, "\\n");
}
