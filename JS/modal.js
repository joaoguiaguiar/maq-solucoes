const modal = document.getElementById('successModal');

// Criação do modal dinâmico
const modalHTML = `
<div id="successModal" class="success-modal">
    <div class="success-content">
        <button class="btn-close" id="modalCloseX">&times;</button>
        <div class="mb-4">
            <i class="bi bi-check-circle-fill" style="font-size: 4rem; color: #28a745;"></i>
        </div>
        <h3>Mensagem Enviada!</h3>
        <p class="mb-4">Obrigado pelo seu contato. Retornaremos em breve.</p>
        <button class="btn btn-primary" id="modalCloseBtn">Fechar</button>
    </div>
</div>
`;

// Adiciona o modal ao final do body
document.body.insertAdjacentHTML('beforeend', modalHTML);



// Modal functions
window.showSuccessModal = function() {
    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
};

function closeSuccessModal() {
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Função para configurar os eventos
function setupModalEvents() {
    // Botão de fechar (X)
    const closeX = document.getElementById('modalCloseX');
    if (closeX) {
        closeX.addEventListener('click', closeSuccessModal);
    }
    
    // Botão de fechar (Fechar)
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Fechar ao clicar fora do conteúdo
    modal.addEventListener('click', e => {
        if (e.target === modal) closeSuccessModal();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeSuccessModal();
    });
}

// Configura os eventos após o modal ser criado
setupModalEvents();

