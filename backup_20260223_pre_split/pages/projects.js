// Projects page JavaScript

// Load all projects
function loadAllProjects(filter = 'all', searchTerm = '') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // Get projects from config
    let filteredProjects = (typeof config !== 'undefined' && config.projects) ? config.projects : [];

    // Filter by category
    if (filter !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.category.includes(filter) || p.category === filter);
    }

    // Filter by search term
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredProjects = filteredProjects.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.tags.some(tag => tag.toLowerCase().includes(term))
        );
    }

    if (filteredProjects.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-400 text-lg font-mono">[NO_RESULTS_FOUND]</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProjects.map(project => {
        const hasGithub = project.links.github && project.links.github !== '#';
        // Prefer GitHub link or external link; valid fallback if neither exists
        const projectUrl = hasGithub ? project.links.github : (project.externalLink || '#');
        const isExternal = true; // Always open projects in new tab usually, or check URL
        const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
        const iconName = hasGithub ? 'github' : 'external-link';

        return `
        <article class="blog-grid-card group h-full">
            ${project.image ? `
                <a href="${projectUrl}" ${targetAttr} class="blog-grid-card-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </a>
            ` : `
                <a href="${projectUrl}" ${targetAttr} class="blog-grid-card-image blog-grid-card-placeholder">
                    <i data-feather="folder" class="w-8 h-8 opacity-50"></i>
                </a>
            `}
            <div class="blog-grid-card-content">
                <div class="blog-grid-card-meta">
                    <span class="blog-grid-card-category">${project.category}</span>
                </div>
                <h3 class="blog-grid-card-title">
                    <a href="${projectUrl}" ${targetAttr}>${project.title}</a>
                </h3>
                <p class="blog-grid-card-excerpt">${project.description}</p>
                
                <div class="flex flex-wrap gap-2 mb-4 mt-2">
                    ${project.tags.slice(0, 3).map(tag => `
                        <span class="text-xs px-2 py-0.5 bg-gray-800/50 border border-gray-700/50 rounded text-gray-400 font-mono">#${tag}</span>
                    `).join('')}
                </div>

                <div class="blog-grid-card-footer mt-auto">
                     <a href="${projectUrl}" ${targetAttr} class="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors">
                        <i data-feather="${iconName}" class="w-4 h-4"></i>
                        <span>View Project</span>
                    </a>
                </div>
            </div>
        </article>
        `;
    }).join('');

    // Update project count
    const countEl = document.getElementById('project-count');
    if (countEl) {
        countEl.textContent = `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''}`;
    }

    // Re-initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadAllProjects();

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const category = btn.dataset.category;
            const searchTerm = document.getElementById('project-search')?.value || '';
            loadAllProjects(category, searchTerm);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
            loadAllProjects(activeFilter, e.target.value);
        });
    }

    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
