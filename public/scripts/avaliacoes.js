// scripts/avaliacoes.js
// Exibe as avaliações anteriores na página avaliacoes.html

document.addEventListener('DOMContentLoaded', () => {
    const evaluationList = document.getElementById('evaluation-list');
    fetch('/api/evaluations')
        .then(response => response.json())
        .then(data => {
            const evaluations = Array.isArray(data) ? data : data.evaluations;
            if (evaluations && evaluations.length > 0) {
                evaluations.forEach(ev => {
                    const div = document.createElement('div');
                    div.className = 'evaluation-item';
                    div.innerHTML = `
                        <h3>${ev.professor} — ${ev.subject}</h3>
                        <p><strong>Nota:</strong> ${ev.rating}</p>
                        <p>${ev.comments}</p>
                    `;
                    evaluationList.appendChild(div);
                });
            } else {
                evaluationList.innerHTML = '<p>Nenhuma avaliação encontrada.</p>';
            }
        })
        .catch(() => {
            evaluationList.innerHTML = '<p>Erro ao carregar avaliações.</p>';
        });
});
