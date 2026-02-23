document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId || typeof config === 'undefined') {
        window.location.href = 'index.html'; // Redirect if invalid
        return;
    }

    // 2. Find Project Data
    const project = config.projects.find(p => p.id === projectId);

    if (!project) {
        document.getElementById('project-loading').innerHTML = `
            <span class="text-red-500">[ERROR] PROJECT_NOT_FOUND</span>
            <br>
            <a href="index.html" class="underline mt-4 inline-block text-white">Return to Base</a>
        `;
        return;
    }

    // 3. Populate DOM

    // Header
    document.title = `${project.title} | Technical Details`;
    setText('p-category', project.category);
    setText('p-title', project.title);
    setText('p-tagline', project.description);

    // Links
    setupLink('link-github', project.links.github);
    setupLink('link-demo', project.links.demo);

    // Tags
    const tagsContainer = document.getElementById('p-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = project.tags.map(tag =>
            `<span class="px-3 py-1 bg-gray-800 text-slate-300 text-sm font-mono rounded border border-gray-700">#${tag}</span>`
        ).join('');
    }

    // Details - Use rich content if available, fallback to description
    const details = project.details || {};

    // Overview
    const overviewHtml = details.problem ?
        `<p class="mb-4"><strong class="text-white">The Challenge:</strong> ${details.problem}</p>
         <p><strong class="text-white">The Solution:</b> ${details.solution}</p>` :
        `<p>${project.description}</p>`;

    document.getElementById('p-overview').innerHTML = overviewHtml;

    // Gallery
    if (details.gallery && details.gallery.length > 0) {
        document.getElementById('p-gallery-section').classList.remove('hidden');
        document.getElementById('p-gallery').innerHTML = details.gallery.map(img => `
            <div class="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
                <img src="${img.url}" alt="${img.caption}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute bottom-0 left-0 right-0 bg-black/80 px-4 py-2 text-xs font-mono text-gray-300">
                    ${img.caption}
                </div>
            </div>
        `).join('');
    }

    // Technical Architecture
    const techContainer = document.getElementById('p-technical');
    if (details.modules) {
        techContainer.innerHTML = details.modules.map(mod => `
            <div class="border-l-2 border-gray-700 pl-4 py-1">
                <h4 class="text-white font-bold text-sm mb-1">${mod.name}</h4>
                <p class="text-slate-400 text-xs leading-relaxed">${mod.desc}</p>
            </div>
        `).join('');
    } else {
        techContainer.innerHTML = '<p class="text-slate-500 italic">Technical breakdown architecture pending declassification...</p>';
    }

    // Features
    const featContainer = document.getElementById('p-features');
    if (details.features) {
        featContainer.innerHTML = details.features.map(feat => `
            <div class="flex items-start gap-3">
                <i data-feather="check-circle" class="w-5 h-5 text-secondary-500 mt-1 flex-shrink-0"></i>
                <span class="text-slate-300">${feat}</span>
            </div>
        `).join('');
    }

    // Tech Stack (Right Column)
    const stackContainer = document.getElementById('p-stack');
    if (details.techStack) {
        stackContainer.innerHTML = Object.entries(details.techStack).map(([category, items]) => `
            <div>
                <span class="text-xs text-slate-500 block mb-1 uppercase">${category}</span>
                <div class="flex flex-wrap gap-2">
                    ${items.map(item => `<span class="text-xs text-primary-400 bg-primary-500/10 px-2 py-1 rounded font-mono">${item}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // 4. Reveal Content
    document.getElementById('project-loading').classList.add('hidden');
    document.getElementById('project-content').classList.remove('hidden');
    if (typeof feather !== 'undefined') feather.replace();
});

// Helpers
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function setupLink(id, url) {
    const el = document.getElementById(id);
    if (el) {
        if (url && url !== '#') {
            el.href = url;
            el.classList.remove('hidden');
            el.classList.add('inline-flex');
        } else {
            el.classList.add('hidden');
        }
    }
}
