// Blog page JavaScript - Compact Grid Layout

// Load all blog posts
function loadBlogPosts(filter = 'all') {
    const container = document.getElementById('blog-grid');
    const emptyState = document.getElementById('empty-state');

    if (!container) return;

    // Get posts from config
    let posts = (typeof config !== 'undefined' && config.blogPosts) ? config.blogPosts : [];

    // Filter by category
    if (filter !== 'all') {
        posts = posts.filter(p => p.category.includes(filter) || p.category === filter);
    }

    // Handle empty state
    if (posts.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    // Render posts in compact grid cards
    container.innerHTML = posts.map((post, index) => {
        return `
            <article class="blog-card rounded-lg overflow-hidden flex flex-col h-full">
                <a href="blog-posts/${post.slug}.html" class="flex flex-col h-full">
                    <!-- Image -->
                    ${post.coverImage ? `
                        <div class="card-image-wrapper h-48 flex-shrink-0">
                            <img src="${post.coverImage}" alt="${post.title}" 
                                class="w-full h-full object-cover" loading="lazy">
                        </div>
                    ` : `
                        <div class="card-image-wrapper h-48 flex-shrink-0 flex items-center justify-center">
                            <i data-feather="file-text" class="w-16 h-16 text-[#30363d]"></i>
                        </div>
                    `}
                    
                    <!-- Content -->
                    <div class="p-5 flex flex-col flex-1">
                        <!-- Category -->
                        <div class="flex items-center gap-2 mb-3">
                            <span class="category-tag px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                                ${post.category}
                            </span>
                        </div>

                        <!-- Title -->
                        <h2 class="card-title text-lg font-bold text-white mb-2 leading-snug line-clamp-2 flex-shrink-0">
                            ${post.title}
                        </h2>

                        <!-- Excerpt -->
                        <p class="text-[#8b949e] text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                            ${post.excerpt}
                        </p>

                        <!-- Footer -->
                        <div class="flex items-center justify-between pt-3 border-t border-[#21262d] mt-auto">
                            <span class="text-xs text-[#6e7681] font-mono">${post.date}</span>
                            <span class="flex items-center gap-1.5 text-xs text-[#6e7681]">
                                <i data-feather="clock" class="w-3.5 h-3.5"></i>
                                <span>${post.readTime}</span>
                            </span>
                        </div>

                        <!-- Tags (optional) -->
                        ${post.tags && post.tags.length > 0 ? `
                            <div class="flex flex-wrap gap-1.5 mt-3">
                                ${post.tags.slice(0, 2).map(tag => `
                                    <span class="px-2 py-0.5 text-xs font-mono bg-[#0d1117] text-[#6e7681] rounded border border-[#30363d]">
                                        ${tag}
                                    </span>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </a>
            </article>
        `;
    }).join('');

    // Re-initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter posts
            const category = btn.dataset.category;
            loadBlogPosts(category);
        });
    });

    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
