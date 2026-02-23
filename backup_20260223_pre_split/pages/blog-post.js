document.addEventListener('DOMContentLoaded', () => {
    // Get post slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (!postSlug || typeof config === 'undefined') {
        window.location.href = 'blog.html';
        return;
    }

    // Find post data
    const post = config.blogPosts ? config.blogPosts.find(p => p.slug === postSlug) : null;

    if (!post) {
        document.getElementById('post-loading').innerHTML = `
            <span class="text-red-500">[ERROR] ARTICLE_NOT_FOUND</span>
            <br>
            <a href="blog.html" class="underline mt-4 inline-block text-white">Return to Blog</a>
        `;
        return;
    }

    // Populate metadata
    document.title = `${post.title} | Technical Blog`;
    document.getElementById('post-category').innerText = post.category;
    document.getElementById('post-date').innerText = post.date;
    document.getElementById('post-readtime').innerText = post.readTime;
    document.getElementById('post-title').innerText = post.title;

    // Populate body content
    document.getElementById('post-body').innerHTML = post.content;

    // Populate tags
    if (post.tags && post.tags.length > 0) {
        document.getElementById('post-tags').innerHTML = post.tags.map(tag =>
            `<span class="px-3 py-1 bg-gray-800 text-slate-300 text-xs font-mono rounded border border-gray-700">#${tag}</span>`
        ).join('');
    }

    // Reveal content
    document.getElementById('post-loading').classList.add('hidden');
    document.getElementById('post-content').classList.remove('hidden');

    if (typeof feather !== 'undefined') feather.replace();
});
