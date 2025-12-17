// Seguridad - Deshabilitar F12 y herramientas de desarrollador
(function() {
    'use strict';
    
    // Deshabilitar F12
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'U')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Deshabilitar click derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Deshabilitar selección de texto
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Deshabilitar drag
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Limpiar y deshabilitar consola primero
    const noop = () => {};
    const originalLog = console.log;
    console.clear();
    console.log = noop;
    console.warn = noop;
    console.error = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.dir = noop;
    console.dirxml = noop;
    
    // Detectar DevTools
    let devtools = {open: false};
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtools.open = true;
            document.body.innerHTML = '';
            document.body.style.background = '#000';
            document.body.innerHTML = '<h1 style="color: #ff0000; text-align: center; margin-top: 50vh; font-family: monospace;">ACCESO DENEGADO</h1>';
        }
    });
    
    setInterval(function() {
        devtools.open = false;
        try {
            originalLog(element);
        } catch(e) {}
        if (devtools.open) {
            document.body.innerHTML = '';
            document.body.style.background = '#000';
            document.body.innerHTML = '<h1 style="color: #ff0000; text-align: center; margin-top: 50vh; font-family: monospace;">ACCESO DENEGADO</h1>';
        }
    }, 1000);
})();

// Pantalla de Carga
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    if (!loader) return;
    
    // Simular carga de 2 segundos
    setTimeout(function() {
        loader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Remover loader del DOM después de la animación
        setTimeout(function() {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 500);
    }, 2000);
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto parallax suave en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const matrixBg = document.querySelector('.matrix-bg');
    if (matrixBg) {
        matrixBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Efecto parallax en hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    // Efecto de fade en header
    const header = document.querySelector('.header');
    if (header) {
        if (scrolled > 100) {
            header.style.background = 'rgba(13, 17, 23, 0.98)';
            header.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.background = 'rgba(13, 17, 23, 0.9)';
            header.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
        }
    }
});

// Animación de entrada para las cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a todas las cards
document.querySelectorAll('.service-card, .info-box').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// Modal de Contacto
const contactModal = document.getElementById('contactModal');
const modalClose = document.querySelector('.modal-close');

// Abrir modal al hacer click en cualquier card
document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function(e) {
        // No abrir si se hace click en un enlace dentro de la card
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        contactModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
if (modalClose) {
    modalClose.addEventListener('click', function() {
        contactModal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// Cerrar modal al hacer click fuera
contactModal.addEventListener('click', function(e) {
    if (e.target === contactModal) {
        contactModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Cerrar modal con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && contactModal.classList.contains('show')) {
        contactModal.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Efecto hover mejorado para las cards con tilt
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Añadir campos de imagen a todas las cards que no los tengan (si es necesario)
document.querySelectorAll('.service-card').forEach(card => {
    const cardNumber = card.querySelector('.card-number');
    const cardImage = card.querySelector('.card-image');
    const firstChild = card.firstElementChild;
    
    // Si no hay div de imagen y el primer elemento no es card-number, buscar donde insertarlo
    if (!cardImage && firstChild && !firstChild.classList.contains('card-number')) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'card-image';
        imageDiv.innerHTML = '<!-- Imagen para agregar después -->';
        if (cardNumber) {
            cardNumber.after(imageDiv);
        } else {
            card.insertBefore(imageDiv, firstChild.nextSibling);
        }
    }
});

// Añadir año actual al footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// Efecto de typing opcional para hero (descomentar si se desea)
/*
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();
}
*/

// Efecto de cursor personalizado mejorado
let cursor = null;
document.addEventListener('DOMContentLoaded', () => {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #58a6ff;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        box-shadow: 0 0 20px rgba(88, 166, 255, 0.4);
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        }
    });
    
    // Efecto en hover de elementos interactivos
    document.querySelectorAll('a, button, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.style.transform = 'scale(1)';
        });
    });
});

// Efecto de typing en títulos principales
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Aplicar efecto typing al hero title (opcional, descomentar si se desea)
/*
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});
*/

// Animación de contador para estadísticas
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observer para animar contadores cuando son visibles
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Cerrar todas las otras FAQ
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abrir la FAQ clickeada si no estaba activa
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Botones flotantes de contacto
const createFloatingBtn = (href, text, icon, color, bottom) => {
    const btn = document.createElement('a');
    btn.href = href;
    btn.target = '_blank';
    btn.className = 'floating-contact-btn';
    btn.innerHTML = `${icon} ${text}`;
    btn.style.cssText = `
        position: fixed;
        bottom: ${bottom};
        right: 30px;
        background: ${color};
        color: #f0f6fc;
        padding: 15px 25px;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1em;
        box-shadow: 0 8px 32px rgba(88, 166, 255, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        animation: floatBtnIn 0.6s ease-out forwards;
    `;
    
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 12px 40px rgba(88, 166, 255, 0.6)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 8px 32px rgba(88, 166, 255, 0.4)';
    });
    
    return btn;
};

// Esperar a que cargue la página para mostrar los botones
window.addEventListener('load', function() {
    setTimeout(function() {
        const telegramBtn = createFloatingBtn('https://t.me/zGAT0', 'Telegram', '💬', 'linear-gradient(135deg, #58a6ff 0%, #7c3aed 100%)', '100px');
        const whatsappBtn = createFloatingBtn('https://wa.me/51904225973', 'WhatsApp', '📱', 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)', '30px');
        
        document.body.appendChild(telegramBtn);
        document.body.appendChild(whatsappBtn);
    }, 2500);
});

// Console message
console.log('%c zGAT0 - Servicios Profesionales ', 'background: #58a6ff; color: #0d1117; font-size: 18px; font-weight: bold; padding: 10px;');
console.log('%c Contacto: @zGAT0 ', 'background: #7c3aed; color: #f0f6fc; font-size: 12px; padding: 5px;');
