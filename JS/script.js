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
    // CRIAÇÃO DINÂMICA DO MODAL DE SUCESSO
    // ========================================
    const modalHTML = `
        <div id="successModal" class="success-modal">
            <div class="success-content">
                <button class="btn-close">&times;</button>
                <div class="mb-4">
                    <i class="bi bi-check-circle-fill" style="font-size: 4rem; color: #28a745;"></i>
                </div>
                <h3>Mensagem Enviada!</h3>
                <p class="mb-4">Obrigado pelo seu contato. Retornaremos em breve.</p>
                <button class="btn btn-primary">Fechar</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // ========================================
    // FUNÇÕES DO MODAL DE SUCESSO
    // ========================================
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
    }

    function closeSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Configurar botões de fechar
    document.querySelectorAll('#successModal .btn-close, #successModal .btn-primary').forEach(button => {
        button.addEventListener('click', closeSuccessModal);
    });

    // ========================================
    // VALIDAÇÃO E ENVIO DO FORMULÁRIO
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação dos campos
            const nome = contactForm.querySelector('[name="name"]').value.trim();
            const email = contactForm.querySelector('[name="email"]').value.trim();
            const mensagem = contactForm.querySelector('[name="message"]').value.trim();

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
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
            submitBtn.disabled = true;

            // Envio real para o Static Forms
            fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro no envio');
                return response.json();
            })
            .then(data => {
                showSuccessModal();
                contactForm.reset();
            })
            .catch(error => {
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
                console.error('Erro:', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ========================================
    // MÁSCARA DE TELEFONE
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

    // ========================================
    // ESTILOS DO MODAL (CSS DINÂMICO)
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
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
            animation: modalFadeIn 0.4s ease-out;
        }
        
        @keyframes modalFadeIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
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
        
        .btn-primary {
            margin-top: 1rem;
            padding: 0.5rem 1.5rem;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background-color: #218838;
        }
    `;
    document.head.appendChild(style);
});