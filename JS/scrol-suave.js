function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const offsetTop = target.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
}

// Scroll suave para todas as âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', smoothScroll));