 // Mock data for notices
        const mockNotices = [
            { id: 1, title: "Mid-Term Exam Schedule Released", date: "2024-11-15", category: "exam", content: "The schedule for all mid-term examinations is now available for download on the Academic tab.", isNew: true },
            { id: 2, title: "Library Annual Closure for Audit", date: "2024-11-01", category: "admin", content: "The Central Library will be closed from Nov 1st to Nov 5th for mandatory annual inventory and audit.", isNew: false },
            { id: 3, title: "Registration for Winter Semester", date: "2024-10-28", category: "academic", content: "All students must complete course registration for the Winter Semester by November 15th.", isNew: true },
            { id: 4, title: "Cultural Fest Auditions Announced", date: "2024-10-25", category: "event", content: "Auditions for the annual Cultural Fest will be held next week. Check the Club portal for details.", isNew: false },
            { id: 5, title: "Changes to Grading Policy (2025)", date: "2024-10-20", category: "academic", content: "Important update regarding the weighted calculation of final grades starting from the 2025 session.", isNew: false },
        ];

        const noticesContainer = document.getElementById('notices-container');
        const noNoticesMessage = document.getElementById('no-notices-message');
        const searchInput = document.getElementById('search-input');
        const categorySelect = document.getElementById('category-select');

        // Function to render a single notice card
        const createNoticeCard = (notice) => {
            const card = document.createElement('div');
            card.id = `notice-${notice.id}`;
            card.className = 'notice-card bg-white p-6 rounded-xl border-l-4 border-portal-primary cursor-pointer hover:border-portal-blue';
            card.setAttribute('data-category', notice.category);

            const isNewBadge = notice.isNew ? 
                `<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600 ml-3">NEW</span>` : '';

            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-semibold text-gray-800 flex items-center">
                        ${notice.title}
                        ${isNewBadge}
                    </h3>
                    <p class="text-sm text-gray-500">${new Date(notice.date).toLocaleDateString()}</p>
                </div>
                <p class="text-gray-600 mb-3">${notice.content}</p>
                <div class="text-xs font-medium text-portal-primary bg-portal-light-accent px-2 py-1 inline-block rounded-full">
                    ${notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                </div>
            `;
            // Add a mock click handler for viewing details
            card.onclick = () => showNoticeDetail(notice);
            return card;
        };

        // Function to render all notices
        const renderNotices = (notices) => {
            noticesContainer.innerHTML = '';
            if (notices.length === 0) {
                noNoticesMessage.classList.remove('hidden');
                return;
            }
            noNoticesMessage.classList.add('hidden');
            notices.forEach(notice => {
                noticesContainer.appendChild(createNoticeCard(notice));
            });
        };

        // Function to filter notices based on search and category
        window.filterNotices = () => {
            const query = searchInput.value.toLowerCase().trim();
            const category = categorySelect.value;

            const filtered = mockNotices.filter(notice => {
                const matchesQuery = notice.title.toLowerCase().includes(query) || 
                                     notice.content.toLowerCase().includes(query);
                
                const matchesCategory = category === 'all' || notice.category === category;

                return matchesQuery && matchesCategory;
            });

            renderNotices(filtered);
        };

        // Mock detail view (in a real app, this would open a modal or new page)
        const showNoticeDetail = (notice) => {
             // Instead of alert, we'll temporarily replace the main content
            const mainContent = document.querySelector('main');
            mainContent.innerHTML = `
                <div class="p-8 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
                    <button onclick="window.location.reload()" class="mb-4 text-portal-primary hover:text-portal-blue flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                        </svg>
                        Back to Notice Board
                    </button>
                    <h2 class="text-3xl font-bold text-gray-800 mb-4">${notice.title}</h2>
                    <div class="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                        <span>Published: ${new Date(notice.date).toLocaleDateString()}</span>
                        <span class="text-xs font-medium text-portal-primary bg-portal-light-accent px-2 py-1 inline-block rounded-full">${notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}</span>
                    </div>
                    <div class="prose max-w-none text-gray-700 leading-relaxed">
                        <p>${notice.content}</p>
                        <p class="mt-4 italic border-l-4 border-gray-200 pl-4">
                            This is the detailed content area. In a real application, clicking the card would load the full, multi-paragraph circular or document related to this notice.
                        </p>
                    </div>
                </div>
            `;
        };
        
        // Initial render on page load
        document.addEventListener('DOMContentLoaded', () => {
            renderNotices(mockNotices);
        });
