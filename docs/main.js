/* ==================================================
   PORTFOLIO LANDING PAGE - MINIMALIST INTERACTIONS
   Matching the clean, functional approach of the planner
   ================================================== */

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializePortfolio);

function initializePortfolio() {
    setupImageHandling();
    setupScrollAnimations();
    setupAnalytics();
    setupModalHandlers();
    console.log('Portfolio initialized');
}

/* ==================================================
   IMAGE HANDLING
   ================================================== */

function setupImageHandling() {
    const images = document.querySelectorAll('.screenshot-item img');
    
    images.forEach(img => {
        img.addEventListener('error', handleImageError);
        img.addEventListener('load', handleImageLoad);
    });
}

function handleImageError(event) {
    const img = event.target;
    const figure = img.closest('.screenshot-item');
    
    // Create clean placeholder
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
        width: 100%;
        height: 240px;
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999999;
        font-size: 14px;
        font-weight: 500;
    `;
    placeholder.textContent = '🖼️ Preview Coming Soon';
    
    if (figure) {
        figure.replaceChild(placeholder, img);
    }
}

function handleImageLoad(event) {
    const img = event.target;
    
    // Subtle fade-in effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        img.style.opacity = '1';
    }, 50);
}

/* ==================================================
   SCROLL ANIMATIONS (SUBTLE)
   ================================================== */

function setupScrollAnimations() {
    // Only add animations if user doesn't prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe sections for subtle animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}

/* ==================================================
   ANALYTICS (PRIVACY-FRIENDLY)
   ================================================== */

function setupAnalytics() {
    // Track basic page engagement locally (no external services)
    trackPageView();
    setupInteractionTracking();
}

function trackPageView() {
    const pageData = {
        timestamp: new Date().toISOString(),
        page: 'portfolio_landing',
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent.split(' ')[0] // Just browser name
    };
    
    // Store locally for insights (no external tracking)
    if (typeof Storage !== 'undefined') {
        const visits = JSON.parse(localStorage.getItem('portfolioVisits') || '[]');
        visits.push(pageData);
        
        // Keep only last 50 visits
        if (visits.length > 50) {
            visits.splice(0, visits.length - 50);
        }
        
        localStorage.setItem('portfolioVisits', JSON.stringify(visits));
    }
}

function setupInteractionTracking() {
    // Track button clicks for engagement insights
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
    
    // Track section visibility for engagement
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(trackSectionView, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

function handleButtonClick(event) {
    const button = event.target.closest('.btn');
    if (!button) return;
    
    const buttonText = button.textContent.trim();
    const href = button.getAttribute('href');
    
    // Visual feedback
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Log interaction locally (no external tracking)
    if (typeof Storage !== 'undefined') {
        const interactions = JSON.parse(localStorage.getItem('portfolioInteractions') || '[]');
        
        interactions.push({
            timestamp: new Date().toISOString(),
            action: 'button_click',
            text: buttonText,
            destination: href,
            section: button.closest('.section')?.querySelector('h2')?.textContent || 'unknown'
        });
        
        // Keep only last 100 interactions
        if (interactions.length > 100) {
            interactions.splice(0, interactions.length - 100);
        }
        
        localStorage.setItem('portfolioInteractions', JSON.stringify(interactions));
    }
}

function trackSectionView(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionTitle = entry.target.querySelector('h2')?.textContent || 'unknown';
            
            // Log section view locally
            if (typeof Storage !== 'undefined') {
                const sectionViews = JSON.parse(localStorage.getItem('portfolioSectionViews') || '[]');
                
                sectionViews.push({
                    timestamp: new Date().toISOString(),
                    section: sectionTitle,
                    viewDuration: 'in_view'
                });
                
                // Keep only last 200 section views
                if (sectionViews.length > 200) {
                    sectionViews.splice(0, sectionViews.length - 200);
                }
                
                localStorage.setItem('portfolioSectionViews', JSON.stringify(sectionViews));
            }
        }
    });
}

/* ==================================================
   SMOOTH SCROLL ENHANCEMENTS
   ================================================== */

function setupSmoothScrolling() {
    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(event) {
    const href = event.target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        
        if (target) {
            event.preventDefault();
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    }
}

/* ==================================================
   PERFORMANCE MONITORING
   ================================================== */

function logPerformanceMetrics() {
    // Simple performance tracking for optimization insights
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        
        console.log(`Portfolio loaded in ${loadTime}ms (DOM ready: ${domReady}ms)`);
        
        // Store performance data locally for optimization insights
        if (typeof Storage !== 'undefined') {
            const perfData = {
                timestamp: new Date().toISOString(),
                loadTime: loadTime,
                domReady: domReady,
                viewport: `${window.innerWidth}x${window.innerHeight}`
            };
            
            localStorage.setItem('portfolioPerformance', JSON.stringify(perfData));
        }
    }
}

/* ==================================================
   UTILITY FUNCTIONS
   ================================================== */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ==================================================
   ERROR HANDLING
   ================================================== */

function setupErrorHandling() {
    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);
}

function handleGlobalError(event) {
    console.warn('Portfolio error:', event.error);
    
    // Log errors locally for debugging (no external reporting)
    if (typeof Storage !== 'undefined') {
        const errors = JSON.parse(localStorage.getItem('portfolioErrors') || '[]');
        
        errors.push({
            timestamp: new Date().toISOString(),
            message: event.error?.message || 'Unknown error',
            filename: event.filename,
            line: event.lineno
        });
        
        // Keep only last 10 errors
        if (errors.length > 10) {
            errors.splice(0, errors.length - 10);
        }
        
        localStorage.setItem('portfolioErrors', JSON.stringify(errors));
    }
}

function handlePromiseRejection(event) {
    console.warn('Unhandled promise rejection:', event.reason);
    
    // Prevent default browser error handling for minor issues
    if (event.reason && typeof event.reason === 'string' && 
        event.reason.includes('NetworkError')) {
        event.preventDefault();
    }
}

/* ==================================================
   INITIALIZATION
   ================================================== */

// Initialize everything when page is fully loaded
window.addEventListener('load', () => {
    logPerformanceMetrics();
    setupErrorHandling();
    setupSmoothScrolling();
});

// Export functions for potential debugging
window.PortfolioDebug = {
    getVisits: () => JSON.parse(localStorage.getItem('portfolioVisits') || '[]'),
    getInteractions: () => JSON.parse(localStorage.getItem('portfolioInteractions') || '[]'),
    getSectionViews: () => JSON.parse(localStorage.getItem('portfolioSectionViews') || '[]'),
    getPerformance: () => JSON.parse(localStorage.getItem('portfolioPerformance') || '{}'),
    getErrors: () => JSON.parse(localStorage.getItem('portfolioErrors') || '[]'),
    clearData: () => {
        localStorage.removeItem('portfolioVisits');
        localStorage.removeItem('portfolioInteractions');
        localStorage.removeItem('portfolioSectionViews');
        localStorage.removeItem('portfolioPerformance');
        localStorage.removeItem('portfolioErrors');
        console.log('Portfolio analytics data cleared');
    }
};

/* ==================================================
   AI TIPS MODAL FUNCTIONALITY
   ================================================== */

function setupModalHandlers() {
    // Ensure modal event listeners are set up
    const modal = document.getElementById('aiTipsModal');
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeAITipsModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const modal = document.getElementById('aiTipsModal');
            if (modal && modal.style.display === 'flex') {
                closeAITipsModal();
            }
        }
    });
}

function openAITipsModal() {
    const modal = document.getElementById('aiTipsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Track modal opening
        if (typeof Storage !== 'undefined') {
            const interactions = JSON.parse(localStorage.getItem('portfolioInteractions') || '[]');
            interactions.push({
                timestamp: new Date().toISOString(),
                action: 'ai_tips_modal_opened',
                section: 'v0.1_version_card'
            });
            localStorage.setItem('portfolioInteractions', JSON.stringify(interactions));
        }
    }
}

function closeAITipsModal() {
    const modal = document.getElementById('aiTipsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Track modal closing
        if (typeof Storage !== 'undefined') {
            const interactions = JSON.parse(localStorage.getItem('portfolioInteractions') || '[]');
            interactions.push({
                timestamp: new Date().toISOString(),
                action: 'ai_tips_modal_closed',
                section: 'modal'
            });
            localStorage.setItem('portfolioInteractions', JSON.stringify(interactions));
        }
    }
}

function copyPrompt(type = 'complete') {
    let promptText;
    
    if (type === 'complete') {
        promptText = `Create a tripData.js file for a [X-day trip to LOCATION].
Use the API functions from the uploaded cheat sheet.

Include:
- 5-8 path points (main cities/areas)
- 10-15 activities and must-dos
- 8-12 restaurants and cafes
- Hotel suggestions for each path point
- Real coordinates (lat/lng)
- Placeholder photo URLs (I'll replace these myself)

Follow the structure from the uploaded example file.`;
    } else if (type === 'custom') {
        promptText = `Create a tripData.js file for [LOCATION] focused on [YOUR INTERESTS].
Use the API functions from the uploaded cheat sheet.

I specifically want to include:
- [Specific place 1] - because [reason]
- [Specific place 2] - because [reason]
- [Activity type] experiences
- [Food preference] restaurants

Build a complete trip around these priorities, adding complementary locations.
Include real coordinates and placeholder photo URLs.
Follow the structure from the uploaded example.`;
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(promptText).then(() => {
            showCopyFeedback(type);
        }).catch(() => {
            fallbackCopyPrompt(promptText, type);
        });
    } else {
        fallbackCopyPrompt(promptText, type);
    }
    
    // Track copy action
    if (typeof Storage !== 'undefined') {
        const interactions = JSON.parse(localStorage.getItem('portfolioInteractions') || '[]');
        interactions.push({
            timestamp: new Date().toISOString(),
            action: 'ai_prompt_copied',
            promptType: type,
            section: 'ai_tips_modal'
        });
        localStorage.setItem('portfolioInteractions', JSON.stringify(interactions));
    }
}

function fallbackCopyPrompt(text, type) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback(type);
    } catch (err) {
        console.error('Failed to copy:', err);
        showCopyFeedback(type, false);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(type, success = true) {
    // Find the correct button based on type
    const buttonSelector = type === 'complete' ? 
        '.prompt-option:first-child .copy-prompt-btn' : 
        '.prompt-option:last-child .copy-prompt-btn';
    
    const button = document.querySelector(buttonSelector);
    if (!button) return;
    
    const originalText = button.textContent;
    button.textContent = success ? '✅ Copied!' : '❌ Failed';
    button.style.background = success ? '#10b981' : '#ef4444';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Make functions globally available for onclick handlers
window.openAITipsModal = openAITipsModal;
window.closeAITipsModal = closeAITipsModal;
window.copyPrompt = copyPrompt;

/* ==================================================
   EMPTY TEMPLATE DOWNLOAD FUNCTIONALITY - REMOVED
   Now links directly to GitHub
   ================================================== */

// Template download functionality removed - now uses direct GitHub link