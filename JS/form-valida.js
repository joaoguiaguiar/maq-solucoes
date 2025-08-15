async function validaFormulario() {
    const elementoForm = document.getElementById('contactForm');
    const telefoneInput = document.getElementById('telefone');

    if (elementoForm) {
        elementoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!validaForm(elementoForm)) return;

            const submitBtn = elementoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
            submitBtn.disabled = true;

            try {
                const conexao = await fetch('https://api.staticforms.xyz/submit', {
                    method: 'POST',
                    body: new FormData(elementoForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (!conexao.ok) {
                    throw new Error(`Erro HTTP: ${conexao.status}`);
                }

                // Processa a resposta 
                const conexaoConvertida = await conexao.json();
                
                // Log para debug (opcional)
                console.log('Resposta da API:', conexaoConvertida);
                
                // Sucesso
                if (typeof showSuccessModal === 'function') {
                    showSuccessModal();
                } else {
                    alert('Mensagem enviada com sucesso!');
                }
                elementoForm.reset();
                
            } catch (error) {
                console.error('Erro no envio:', error);
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
                
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Máscara de telefone 
    if (telefoneInput) {
        telefoneInput.addEventListener('input', maskTelefone);
    }
}