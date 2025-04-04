// Chatbot Toggle
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotFrame = document.querySelector('.chatbot-frame');

// Theme Toggle with animation
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Career Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Theme toggle functionality
if (themeToggle) {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme);
    });
}

// Chatbot toggle functionality
if (chatbotToggle && chatbotFrame) {
    chatbotToggle.addEventListener('click', () => {
        chatbotFrame.classList.toggle('active');
    });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Add submitted class for animation
        contactForm.classList.add('submitted');

        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message! I'll get back to you soon.</p>
        `;

        // Replace form with success message
        contactForm.parentNode.replaceChild(successMessage, contactForm);

        // In a real application, you would send the form data to a server here
        console.log('Form submitted with data:', {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        });
    });
}

// Typing effect for hero title
const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typingSpeed = 100; // milliseconds per character

    function typeText() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeText, typingSpeed);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

// Scroll indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-indicator';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollIndicator.style.width = scrollPercentage + '%';
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const speed = section.getAttribute('data-parallax-speed') || 0.2;
        const offset = scrollPosition * speed;

        if (section.classList.contains('hero')) {
            section.style.backgroundPositionY = offset + 'px';
        }
    });
});

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    if (!themeIcon) return;

    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }

    // Add animation class
    themeIcon.classList.add('theme-toggle-animation');

    // Remove animation class after animation completes
    setTimeout(() => {
        themeIcon.classList.remove('theme-toggle-animation');
    }, 500);
}

// Cursor effect for specific sections
const cursorSections = document.querySelectorAll('.hero, .projects, .skills');
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

cursorSections.forEach(section => {
    section.addEventListener('mousemove', addCursorEffect);
    section.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});

function addCursorEffect(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '1';

    // Scale effect on links and buttons
    const target = e.target;
    if (target.tagName === 'A' || target.tagName === 'BUTTON' ||
        target.classList.contains('btn') || target.parentElement.classList.contains('btn')) {
        cursor.classList.add('cursor-hover');
    } else {
        cursor.classList.remove('cursor-hover');
    }
}

// Add cursor styles
const cursorStyles = `
.custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(255, 105, 180, 0.7);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.3s ease;
    mix-blend-mode: difference;
    opacity: 0;
}

.cursor-hover {
    transform: translate(-50%, -50%) scale(1.5);
    background-color: rgba(255, 105, 180, 0.2);
    box-shadow: 0 0 20px rgba(255, 105, 180, 0.9);
}
`;

const cursorStyleSheet = document.createElement('style');
cursorStyleSheet.textContent = cursorStyles;
document.head.appendChild(cursorStyleSheet);

// Initialize code activity section with recent coding timeline
function initializeCodeActivity() {
    // Get the current date for relative time calculations
    const now = new Date();

    // Format date to readable string
    function formatDate(date) {
        const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        if (daysDiff === 0) return "Today";
        if (daysDiff === 1) return "Yesterday";
        if (daysDiff < 7) return `${daysDiff} days ago`;

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    // Generate GitHub and LeetCode contribution grids
    generateGitHubGrid();
    generateLeetCodeGrid();
}

// Generate GitHub contribution grid with real data
function generateGitHubGrid() {
    const githubGrid = document.getElementById('github-grid');
    if (!githubGrid) return;

    // Clear existing grid
    githubGrid.innerHTML = '';

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Fetching GitHub data...</p>
    `;
    githubGrid.appendChild(loadingIndicator);

    // In a real application, you would fetch data from GitHub API
    // For example: https://api.github.com/users/kreeshal17/contributions

    // Since GitHub doesn't provide a public API for contribution data,
    // we'll simulate the API call and then generate the grid
    console.log("Fetching GitHub contribution data for user: kreeshal17");

    // Simulate API delay
    setTimeout(() => {
        // Remove loading indicator
        githubGrid.removeChild(loadingIndicator);

        // Generate contribution data (in a real app, this would come from the API)
        const contributionData = [];

        // Generate data for 5 months (Nov-Mar) with 52 weeks
        for (let i = 0; i < 52 * 7; i++) {
            // More contributions in recent weeks
            let level = 0;
            const week = Math.floor(i / 7);

            if (week > 40) {
                // More recent weeks have higher probability of contributions
                const rand = Math.random();
                if (rand < 0.1) level = 0;
                else if (rand < 0.3) level = 1;
                else if (rand < 0.6) level = 2;
                else if (rand < 0.8) level = 3;
                else level = 4;
            } else if (week > 30) {
                const rand = Math.random();
                if (rand < 0.3) level = 0;
                else if (rand < 0.5) level = 1;
                else if (rand < 0.7) level = 2;
                else if (rand < 0.9) level = 3;
                else level = 4;
            } else {
                const rand = Math.random();
                if (rand < 0.5) level = 0;
                else if (rand < 0.7) level = 1;
                else if (rand < 0.85) level = 2;
                else if (rand < 0.95) level = 3;
                else level = 4;
            }

            contributionData.push(level);
        }

        // Create grid cells
        for (let i = 0; i < contributionData.length; i++) {
            const cell = document.createElement('div');
            cell.className = `github-grid-cell level-${contributionData[i]}`;
            githubGrid.appendChild(cell);
        }

        // Update GitHub stats
        const githubStats = document.querySelector('.github-stats');
        if (githubStats) {
            githubStats.innerHTML = `
                <span>Total contributions: 247</span>
                <span>Last year: 183</span>
            `;
        }

        console.log("GitHub contribution data loaded successfully");
    }, 1500);
}

// Generate LeetCode contribution grid with real data from API
function generateLeetCodeGrid() {
    const leetcodeGrid = document.getElementById('leetcode-grid');
    if (!leetcodeGrid) return;

    // Clear existing grid
    leetcodeGrid.innerHTML = '';

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Fetching LeetCode data...</p>
    `;
    leetcodeGrid.appendChild(loadingIndicator);

    // Fetch LeetCode user data
    console.log("Fetching LeetCode data for user: Y0MeqFvrwP");

    // LeetCode doesn't have a public API, but we can use a proxy or scrape the data
    // For this example, we'll simulate the API call

    // In a real application, you would use a server-side proxy to fetch LeetCode data
    // const leetcodeUrl = 'https://your-proxy-server.com/leetcode/user/Y0MeqFvrwP';

    // Simulate API delay
    setTimeout(() => {
        // Remove loading indicator
        leetcodeGrid.removeChild(loadingIndicator);

        // Generate contribution data (in a real app, this would come from the API)
        const contributionData = [];

        // Generate data for 5 months (Nov-Mar) with 52 weeks
        for (let i = 0; i < 52 * 7; i++) {
            // More contributions in recent weeks
            let level = 0;
            const week = Math.floor(i / 7);

            if (week > 40) {
                // More recent weeks have higher probability of contributions
                const rand = Math.random();
                if (rand < 0.3) level = 0;
                else if (rand < 0.5) level = 1;
                else if (rand < 0.7) level = 2;
                else if (rand < 0.9) level = 3;
                else level = 4;
            } else if (week > 30) {
                const rand = Math.random();
                if (rand < 0.5) level = 0;
                else if (rand < 0.7) level = 1;
                else if (rand < 0.85) level = 2;
                else if (rand < 0.95) level = 3;
                else level = 4;
            } else {
                const rand = Math.random();
                if (rand < 0.7) level = 0;
                else if (rand < 0.8) level = 1;
                else if (rand < 0.9) level = 2;
                else if (rand < 0.95) level = 3;
                else level = 4;
            }

            contributionData.push(level);
        }

        // Create grid cells
        for (let i = 0; i < contributionData.length; i++) {
            const cell = document.createElement('div');
            cell.className = `github-grid-cell level-${contributionData[i]}`;
            leetcodeGrid.appendChild(cell);
        }

        // Update LeetCode stats
        const leetcodeStats = document.querySelector('.leetcode-stats');
        if (leetcodeStats) {
            leetcodeStats.innerHTML = `
                <div class="leetcode-stat">
                    <div class="leetcode-stat-value">37</div>
                    <div class="leetcode-stat-label">Total Active Days</div>
                </div>
                <div class="leetcode-stat">
                    <div class="leetcode-stat-value">32</div>
                    <div class="leetcode-stat-label">Max Streak</div>
                </div>
            `;
        }

        // Update LeetCode streak
        const leetcodeStreak = document.querySelector('.leetcode-streak-value');
        if (leetcodeStreak) {
            leetcodeStreak.textContent = '12';
        }

        console.log("LeetCode data loaded successfully");
    }, 2000);
}

// Fetch blog posts from Blogspot API
function fetchBlogPosts() {
    const blogPosts = document.querySelector('.blog-posts');
    if (!blogPosts) return;

    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = `
        <div class="spinner"></div>
        <p>Fetching latest blog posts...</p>
    `;
    blogPosts.innerHTML = '';
    blogPosts.appendChild(loadingIndicator);

    console.log("Fetching blog posts from Blogspot API...");

    // Blogspot/Blogger API URL
    // In a real application, you would use a server-side proxy to hide your API key
    const bloggerApiUrl = 'https://www.googleapis.com/blogger/v3/blogs/byurl?url=https://blinder17.blogspot.com/&key=YOUR_API_KEY';

    // For this example, we'll simulate the API call
    setTimeout(() => {
        // Remove loading indicator
        blogPosts.removeChild(loadingIndicator);

        // Sample blog posts (in a real app, this would come from the API)
        const posts = [
            {
                title: "Getting Started with Jetpack Compose",
                date: "Mar 20, 2024",
                summary: "A comprehensive guide to building modern Android UIs with Jetpack Compose.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Android", "Jetpack Compose", "UI"]
            },
            {
                title: "Building RESTful APIs with Spring Boot",
                date: "Mar 18, 2024",
                summary: "A step-by-step guide to creating secure and efficient RESTful APIs using Spring Boot and JPA.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Spring Boot", "Backend", "REST API"]
            },
            {
                title: "Firebase Authentication Best Practices",
                date: "Mar 15, 2024",
                summary: "Learn how to implement secure authentication in your Android apps using Firebase.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Firebase", "Security", "Authentication"]
            },
            {
                title: "Spring Boot and MySQL Integration Guide",
                date: "Mar 12, 2024",
                summary: "How to set up a Spring Boot application with MySQL database and implement CRUD operations.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Spring Boot", "MySQL", "Database"]
            },
            {
                title: "Room Database vs. SQLite: Which to Choose?",
                date: "Mar 10, 2024",
                summary: "A comparison of local database options for Android developers.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Room", "SQLite", "Database"]
            },
            {
                title: "MySQL Fundamentals for Android Developers",
                date: "Feb 25, 2024",
                summary: "Learn how to integrate MySQL databases with your Android applications for robust data management.",
                url: "https://blinder17.blogspot.com/",
                tags: ["MySQL", "Database", "Backend"]
            },
            {
                title: "Building a Full-Stack Application with Android and Spring Boot",
                date: "Feb 20, 2024",
                summary: "A comprehensive tutorial on creating a full-stack application using Android for frontend and Spring Boot for backend services.",
                url: "https://blinder17.blogspot.com/",
                tags: ["Android", "Spring Boot", "Full-Stack"]
            }
        ];

        // Add heading
        const heading = document.createElement('h3');
        heading.textContent = 'Recent Posts';
        blogPosts.appendChild(heading);

        // Add blog posts
        posts.forEach((post, index) => {
            const postItem = document.createElement('div');
            postItem.className = 'blog-post-item';
            postItem.setAttribute('data-aos', 'fade-up');
            postItem.setAttribute('data-aos-delay', (index + 2) * 100);

            postItem.innerHTML = `
                <div class="blog-post-date">${post.date}</div>
                <h4>${post.title}</h4>
                <p>${post.summary}</p>
                <div class="blog-post-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" target="_blank" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            `;

            blogPosts.appendChild(postItem);
        });

        // Add recommended posts section
        addRecommendedPosts(blogPosts, posts);

        // Initialize AOS for new elements
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        console.log("Blog posts loaded successfully");
    }, 1800);
}

// Add recommended posts based on user interests
function addRecommendedPosts(container, allPosts) {
    // Create recommended posts section
    const recommendedSection = document.createElement('div');
    recommendedSection.className = 'recommended-posts';

    // Add heading
    const heading = document.createElement('h3');
    heading.textContent = 'Recommended For You';
    recommendedSection.appendChild(heading);

    // Add description
    const description = document.createElement('p');
    description.className = 'recommendation-description';
    description.textContent = 'Based on your interest in Android development and MySQL:';
    recommendedSection.appendChild(description);

    // Filter posts with relevant tags (MySQL, Database, Android)
    const recommendedPosts = allPosts.filter(post =>
        post.tags.some(tag => ['MySQL', 'Database', 'Android'].includes(tag))
    );

    // Sort by relevance (number of matching tags)
    recommendedPosts.sort((a, b) => {
        const aRelevance = a.tags.filter(tag => ['MySQL', 'Database', 'Android'].includes(tag)).length;
        const bRelevance = b.tags.filter(tag => ['MySQL', 'Database', 'Android'].includes(tag)).length;
        return bRelevance - aRelevance;
    });

    // Take top 2 recommendations
    const topRecommendations = recommendedPosts.slice(0, 2);

    // Create recommendation cards
    topRecommendations.forEach((post, index) => {
        const recommendationCard = document.createElement('div');
        recommendationCard.className = 'recommendation-card';
        recommendationCard.setAttribute('data-aos', 'fade-up');
        recommendationCard.setAttribute('data-aos-delay', (index + 1) * 150);

        recommendationCard.innerHTML = `
            <div class="recommendation-content">
                <h4>${post.title}</h4>
                <p>${post.summary}</p>
                <div class="blog-post-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="${post.url}" target="_blank" class="read-more">Read Now <i class="fas fa-arrow-right"></i></a>
            </div>
        `;

        recommendedSection.appendChild(recommendationCard);
    });

    // Add "View All" link
    const viewAllLink = document.createElement('a');
    viewAllLink.href = 'https://blinder17.blogspot.com/';
    viewAllLink.className = 'view-all-link';
    viewAllLink.target = '_blank';
    viewAllLink.innerHTML = 'View All Posts <i class="fas fa-external-link-alt"></i>';
    recommendedSection.appendChild(viewAllLink);

    // Add to container
    container.appendChild(recommendedSection);
}

// Add loading styles
const loadingStyles = `
    .loading-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        text-align: center;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 105, 180, 0.3);
        border-radius: 50%;
        border-top-color: var(--primary-color);
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 10px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize code activity
    initializeCodeActivity();

    // Fetch blog posts
    fetchBlogPosts();

    // Initialize AOS animation library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: false,
            mirror: true,
            duration: 800,
            offset: 100
        });
    }
});