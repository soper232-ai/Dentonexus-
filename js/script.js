// DOM Elements
const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

// Language switcher
const langBtns = document.querySelectorAll('.lang-btn');
const modalCloses = document.querySelectorAll('.modal-close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeAnimations();
    initializeAI();
});

// Event Listeners
function initializeEventListeners() {
    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', openSearchModal);
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', closeSearchModal);
    }
    
    // Authentication modals
    if (loginBtn) {
        loginBtn.addEventListener('click', openLoginModal);
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', openRegisterModal);
    }
    
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeLoginModal();
            openRegisterModal();
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeRegisterModal();
            openLoginModal();
        });
    }
    
    // Modal close buttons
    modalCloses.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modalId = btn.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Language switcher
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.getAttribute('data-lang')));
    });
    
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Specialty cards
    const specialtyCards = document.querySelectorAll('.specialty-card');
    specialtyCards.forEach(card => {
        card.addEventListener('click', () => {
            const specialty = card.getAttribute('data-specialty');
            navigateToSpecialty(specialty);
        });
    });
    
    // Research actions
    const aiButtons = document.querySelectorAll('.btn:contains("تلخيص AI")');
    aiButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showAISummary();
        });
    });
    
    // Hero search
    const heroSearchBtn = document.querySelector('.hero-search-btn');
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', performHeroSearch);
    }
    
    // AI feature buttons
    const aiFeatureBtns = document.querySelectorAll('.ai-card .btn');
    aiFeatureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const feature = btn.closest('.ai-card').querySelector('.ai-title').textContent;
            showAIFeature(feature);
        });
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search Modal Functions
function openSearchModal() {
    searchModal.classList.add('active');
    const searchInput = searchModal.querySelector('.search-input');
    if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
    }
}

function closeSearchModal() {
    searchModal.classList.remove('active');
}

// Authentication Modal Functions
function openLoginModal() {
    loginModal.classList.add('active');
}

function closeLoginModal() {
    loginModal.classList.remove('active');
}

function openRegisterModal() {
    registerModal.classList.add('active');
}

function closeRegisterModal() {
    registerModal.classList.remove('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Language Switching
function switchLanguage(lang) {
    // Update active language button
    langBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update document direction and language
    if (lang === 'en') {
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.style.fontFamily = "'Inter', 'Roboto', sans-serif";
    } else {
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.style.fontFamily = "'Cairo', 'Tajawal', sans-serif";
    }
    
    // Here you would typically load different content or translations
    console.log(`Language switched to: ${lang}`);
}

// Mobile Menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
}

// Navigation Functions
function navigateToSpecialty(specialty) {
    // This would typically navigate to a specialty page
    console.log(`Navigating to specialty: ${specialty}`);
    // For demo purposes, show an alert
    showNotification(`تم الانتقال إلى قسم ${specialty}`, 'info');
}

function performHeroSearch() {
    const searchInput = document.querySelector('.hero-search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        console.log(`Searching for: ${query}`);
        showNotification(`جاري البحث عن: ${query}`, 'info');
        // Here you would typically perform the actual search
    } else {
        showNotification('يرجى إدخال كلمة البحث', 'warning');
    }
}

// AI Features
function initializeAI() {
    // Initialize AI-related functionality
    console.log('AI features initialized');
}

function showAISummary() {
    // Simulate AI summary generation
    const summaryModal = createAIModal('تلخيص البحث بالذكاء الاصطناعي', 
        'جاري تحليل البحث وإنشاء ملخص ذكي...');
    
    setTimeout(() => {
        const content = summaryModal.querySelector('.ai-content');
        content.innerHTML = `
            <h4>الملخص الذكي:</h4>
            <ul>
                <li>يتناول البحث دراسة تأثير التقويم الشفاف على حركة الأسنان</li>
                <li>تم إجراء الدراسة على 100 مريض لمدة 12 شهر</li>
                <li>النتائج أظهرت تحسناً بنسبة 85% في حركة الأسنان</li>
                <li>التقويم الشفاف أثبت فعالية مماثلة للتقويم التقليدي</li>
                <li>ينصح باستخدام هذه التقنية للحالات البسيطة والمتوسطة</li>
            </ul>
            <div class="ai-actions">
                <button class="btn btn-primary" onclick="closeAIModal()">إغلاق</button>
                <button class="btn btn-outline" onclick="askAIQuestion()">طرح سؤال</button>
            </div>
        `;
    }, 2000);
}

function showAIFeature(feature) {
    let content = '';
    let title = '';
    
    switch(feature) {
        case 'تلخيص البحوث':
            title = 'تلخيص البحوث بالذكاء الاصطناعي';
            content = 'قم برفع أي بحث أو أدخل رابطه وسيقوم الذكاء الاصطناعي بتلخيصه في نقاط واضحة ومفيدة.';
            break;
        case 'الإجابة على الأسئلة':
            title = 'مساعد الذكاء الاصطناعي';
            content = 'اطرح أي سؤال متعلق بطب الأسنان وسيجيب عليك الذكاء الاصطناعي بناءً على قاعدة البيانات الضخمة.';
            break;
        case 'تحليل الاتجاهات':
            title = 'تحليل الاتجاهات البحثية';
            content = 'استكشف أحدث الاتجاهات في البحوث السنية والمجالات الواعدة للمستقبل.';
            break;
    }
    
    const modal = createAIModal(title, content);
}

function createAIModal(title, content) {
    // Remove existing AI modal if any
    const existingModal = document.getElementById('ai-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'ai-modal';
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeAIModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="ai-content">${content}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function closeAIModal() {
    const modal = document.getElementById('ai-modal');
    if (modal) {
        modal.remove();
    }
}

function askAIQuestion() {
    const question = prompt('ما هو سؤالك حول هذا البحث؟');
    if (question) {
        showNotification('جاري معالجة سؤالك...', 'info');
        setTimeout(() => {
            showNotification('تم إرسال سؤالك إلى الذكاء الاصطناعي. ستصلك الإجابة قريباً.', 'success');
        }, 1500);
    }
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.research-card, .specialty-card, .ai-card, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
    
    // Counter animation for statistics
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.textContent.includes('+') ? '+' : '';
            counter.textContent = Math.floor(current) + suffix;
        }, 16);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#2563EB'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#EF4444';
        } else {
            input.style.borderColor = '#DBEAFE';
        }
        
        if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            isValid = false;
            input.style.borderColor = '#EF4444';
        }
    });
    
    return isValid;
}

// Handle form submissions
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('auth-form')) {
        e.preventDefault();
        
        if (validateForm(e.target)) {
            const formType = e.target.closest('#login-modal') ? 'login' : 'register';
            showNotification(`تم ${formType === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'} بنجاح!`, 'success');
            
            // Close modal after successful submission
            setTimeout(() => {
                if (formType === 'login') {
                    closeLoginModal();
                } else {
                    closeRegisterModal();
                }
            }, 1000);
        } else {
            showNotification('يرجى ملء جميع الحقول المطلوبة بشكل صحيح', 'warning');
        }
    }
});

// Search functionality
function performSearch(query) {
    if (!query.trim()) {
        showNotification('يرجى إدخال كلمة البحث', 'warning');
        return;
    }
    
    showNotification(`جاري البحث عن: ${query}`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
        showNotification(`تم العثور على ${Math.floor(Math.random() * 50) + 10} نتيجة`, 'success');
        closeSearchModal();
    }, 1500);
}

// Add search functionality to search inputs
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (e.target.classList.contains('search-input')) {
            performSearch(e.target.value);
        } else if (e.target.classList.contains('hero-search-input')) {
            performHeroSearch();
        }
    }
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: #2563EB;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    document.body.appendChild(scrollBtn);
}

// Initialize scroll to top button
addScrollToTop();

console.log('Dentonexus website initialized successfully!');

