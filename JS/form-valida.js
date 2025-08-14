// Configuração do envio do formulário (com try/catch)
async function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const telefoneInput = document.getElementById('telefone');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validaForm(contactForm)) return;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
            submitBtn.disabled = true;

            try {
                // Tentativa de envio
                const response = await fetch('https://api.staticforms.xyz/submit', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Erro no envio');
                }

                // Processa a resposta
                await response.json();
                
                // Sucesso
                if (typeof showSuccessModal === 'function') {
                    showSuccessModal();
                } else {
                    alert('Mensagem enviada com sucesso!');
                }
                contactForm.reset();
                
            } catch (error) {
                // Tratamento de erros
                console.error('Erro no envio:', error);
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
                
            } finally {
                // Restaura o botão em qualquer caso
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Máscara de telefone (mantida igual)
    if (telefoneInput) {
        telefoneInput.addEventListener('input', maskTelefone);
    }
}