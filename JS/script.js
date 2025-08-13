// ========================================
// JAVASCRIPT - FUNCIONALIDADES INTERATIVAS
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // INICIALIZAÇÃO DO AOS (ANIMAÇÕES NO SCROLL)
    // ========================================
    AOS.init({
        duration: 1000,
        once: true
    });

    // ========================================
    // ROLAGEM SUAVE PARA ÂNCORAS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // FUNÇÕES DO MODAL DE SUCESSO (COMPLETO)
    // ========================================
    
    // Mostrar modal de sucesso
    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Fechar modal ao clicar fora do conteúdo
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSuccessModal();
            }
        });
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSuccessModal();
            }
        });
        
        // Conectar o botão de fechar (X)
        const closeButtons = modal.querySelectorAll('.btn-close, .btn-primary');
        closeButtons.forEach(button => {
            button.addEventListener('click', closeSuccessModal);
        });
    }

    // Fechar modal de sucesso
    function closeSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        
        // Remover event listeners para evitar vazamento de memória
        modal.removeEventListener('click', closeSuccessModal);
        document.removeEventListener('keydown', closeSuccessModal);
        
        // Remover listeners dos botões de fechar
        const closeButtons = modal.querySelectorAll('.btn-close, .btn-primary');
        closeButtons.forEach(button => {
            button.removeEventListener('click', closeSuccessModal);
        });
    }

    // ========================================
    // VALIDAÇÃO E ENVIO DO FORMULÁRIO (COMPLETO)
    // ========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obter dados do formulário
            const formData = new FormData(this);
            const nome = formData.get('nome').trim();
            const email = formData.get('email').trim();
            const telefone = formData.get('telefone').trim();
            const empresa = formData.get('empresa').trim();
            const mensagem = formData.get('mensagem').trim();

            // Validação aprimorada
            if (!nome || nome.length < 3) {
                alert('Por favor, insira um nome válido (mínimo 3 caracteres)');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido');
                return;
            }

            if (!mensagem || mensagem.length < 10) {
                alert('Por favor, insira uma mensagem com pelo menos 10 caracteres');
                return;
            }

            // Feedback visual
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
            submitBtn.disabled = true;

            // Simular envio (substituir por integração real)
            setTimeout(() => {
                // Aqui você faria a integração com o backend
                console.log('Dados do formulário:', {
                    nome, email, telefone, empresa, mensagem
                });

                // Mostrar modal de sucesso
                showSuccessModal();
                
                // Resetar formulário após 3 segundos
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
                
            }, 1500);
        });
    }

    // ========================================
    // MÁSCARA DE TELEFONE (COMPLETA)
    // ========================================
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            e.target.value = value;
        });
    }
});

// Adicionando estilo dinâmico para o modal
const style = document.createElement('style');
style.textContent = `
    /* Estilos do Modal */
    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .success-content {
        position: relative;
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    /* Botão de fechar (X) */
    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .btn-close:hover {
        color: #000;
    }
    
    /* Botão Fechar */
    .btn-primary {
        margin-top: 1rem;
        padding: 0.5rem 1.5rem;
    }
    
    /* Ícone de sucesso */
    .bi-check-circle-fill {
        color: #28a745;
    }
    
    /* Spinner de carregamento */
    .spinner-border {
        vertical-align: middle;
    }
`;
document.head.appendChild(style);