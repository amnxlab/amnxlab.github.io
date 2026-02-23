class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-900/50 border-t border-gray-800/50 mt-24 backdrop-blur-sm">
                <div class="container mx-auto px-6 py-12 max-w-6xl">
                    <div class="grid md:grid-cols-2 gap-12 mb-8">
                        <!-- Brand Section -->
                        <div>
                            <h3 class="text-2xl font-bold mb-3">
                                <span class="text-white">Ahmed</span> 
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">Amin</span>
                            </h3>
                            <p class="text-gray-400 mb-6 leading-relaxed text-sm">
                                R&D Engineer | PhD Applicant | Embedded Systems & RF
                            </p>
                            <div class="flex gap-3">
                                <a href="https://github.com/amnxlab" target="_blank" rel="noopener noreferrer" 
                                   class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-primary-500 hover:border-primary-500/50 transition-all">
                                    <i data-feather="github" class="w-5 h-5"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/amnxlab/" target="_blank" rel="noopener noreferrer"
                                   class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-primary-500 hover:border-primary-500/50 transition-all">
                                    <i data-feather="linkedin" class="w-5 h-5"></i>
                                </a>
                                <a href="https://youtube.com/@AMNxLab" target="_blank" rel="noopener noreferrer"
                                   class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-primary-500 hover:border-primary-500/50 transition-all">
                                    <i data-feather="youtube" class="w-5 h-5"></i>
                                </a>
                                <a href="mailto:ahmedamin@suumail.net"
                                   class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-primary-500 hover:border-primary-500/50 transition-all">
                                    <i data-feather="mail" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>

                        <!-- Navigation -->
                        <div>
                            <h4 class="font-bold mb-4 text-white text-sm uppercase tracking-wider">Navigate</h4>
                            <ul class="space-y-3">
                                <li><a href="index.html" class="text-gray-400 hover:text-primary-500 transition-colors text-sm">Home</a></li>
                                <li><a href="projects.html" class="text-gray-400 hover:text-primary-500 transition-colors text-sm">Projects</a></li>
                                <li><a href="research.html" class="text-gray-400 hover:text-primary-500 transition-colors text-sm">Research</a></li>
                                <li><a href="blog.html" class="text-gray-400 hover:text-primary-500 transition-colors text-sm">Blog</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Bottom Bar -->
                    <div class="border-t border-gray-800/50 pt-6">
                        <p class="text-gray-500 text-sm text-center font-mono">
                            © ${new Date().getFullYear()} Ahmed Amin. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        `;

        // Initialize feather icons after rendering
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

customElements.define('custom-footer', CustomFooter);
