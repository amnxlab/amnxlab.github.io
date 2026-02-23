class CustomNavbar extends HTMLElement {
    getBasePath() {
        // Check if we're in a subdirectory (e.g., blog-posts/)
        const path = window.location.pathname;
        const inSubdir = path.includes('/blog-posts/') || path.includes('/pages/');
        return inSubdir ? '../' : '';
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
                <div class="container mx-auto px-6 py-4">
                    <div class="flex items-center justify-between">
                        <a href="${this.getBasePath()}index.html" class="flex items-center gap-3 text-2xl font-bold font-mono hover:scale-105 transition-transform">
                            <img src="${this.getBasePath()}assets/logo.png" alt="AMNx Lab Logo" class="w-10 h-10">
                            <span class="text-white font-bold tracking-tight">AMN<span class="text-primary-500">x</span><span class="text-slate-400 font-normal ml-1">Lab</span></span>
                        </a>
                        <div class="hidden md:flex items-center gap-8">
                            <a href="${this.getBasePath()}index.html" class="text-gray-300 hover:text-primary-500 transition-colors">Home</a>
                            <a href="${this.getBasePath()}research.html" class="text-gray-300 hover:text-primary-500 transition-colors">Research</a>
                            <a href="${this.getBasePath()}projects.html" class="text-gray-300 hover:text-primary-500 transition-colors">Projects</a>
                            <a href="${this.getBasePath()}blog.html" class="text-gray-300 hover:text-primary-500 transition-colors">Blog</a>
                        </div>
                        <button id="mobile-menu-btn" class="md:hidden text-gray-300 hover:text-white">
                            <i data-feather="menu"></i>
                        </button>
                    </div>
                    <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
                        <div class="flex flex-col gap-4">
                            <a href="${this.getBasePath()}index.html" class="text-gray-300 hover:text-primary-500 transition-colors">Home</a>
                            <a href="${this.getBasePath()}research.html" class="text-gray-300 hover:text-primary-500 transition-colors">Research</a>
                            <a href="${this.getBasePath()}projects.html" class="text-gray-300 hover:text-primary-500 transition-colors">Projects</a>
                            <a href="${this.getBasePath()}blog.html" class="text-gray-300 hover:text-primary-500 transition-colors">Blog</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Mobile menu toggle
        const menuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Initialize feather icons after rendering
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Add active state to current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = this.querySelectorAll('a[href$=".html"]');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('text-primary-500', 'font-semibold');
                link.classList.remove('text-gray-300');
            }
        });
    }
}

customElements.define('custom-navbar', CustomNavbar);
