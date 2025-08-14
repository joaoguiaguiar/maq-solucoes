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

// Referência ao modal
const modal = document.getElementById('successModal');

// Modal functions
window.showSuccessModal = function() {
    modal.style.display = 'flex';
    setTimeout(() => modal.style.opacity = '1', 10);
};

function closeSuccessModal() {
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Função para configurar os event listeners
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

// Estilos do modal (mantido igual)
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
.btn-close:hover { color: #000; }
.btn-primary {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.btn-primary:hover { background-color: #218838; }
`;
document.head.appendChild(style);