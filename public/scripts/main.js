// This file contains the JavaScript code for the website. It handles user interactions, such as submitting evaluations and fetching existing evaluations to display on the page.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const evaluationList = document.getElementById('evaluation-list');

    // Carrega avaliações anteriores
    fetch('/api/evaluations')
        .then(response => response.json())
        .then(data => {
            // Suporta tanto { evaluations: [...] } quanto [ ... ]
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

    // Envio do formulário
    form.addEventListener('submit', (event) => {
        // Limpa mensagens antigas
        const campos = [
            { id: 'professor', msg: 'Por favor, preencha o nome do(a) professor(a).' },
            { id: 'subject', msg: 'Por favor, preencha a disciplina.' },
            { id: 'rating', msg: 'Por favor, informe uma nota de 1 a 10.' },
            { id: 'comments', msg: 'Por favor, escreva um comentário.' }
        ];
        let valido = true;
        let primeiraMsg = '';
        campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            if (!el.value || (campo.id === 'rating' && (el.value < 1 || el.value > 10))) {
                valido = false;
                if (!primeiraMsg) primeiraMsg = campo.msg;
                el.classList.add('input-erro');
            } else {
                el.classList.remove('input-erro');
            }
        });
        if (!valido) {
            event.preventDefault();
            alert(primeiraMsg);
            return;
        }

        // Adiciona confirmação antes de enviar
        const confirmacao = window.confirm('Atenção!! Cheque todos os campos e confirme se tem certeza que deseja enviar esta avaliação!');
        if (!confirmacao) {
            event.preventDefault();
            return;
        }

        const professor = document.getElementById('professor').value;
        const subject = document.getElementById('subject').value;
        const rating = document.getElementById('rating').value;
        const comments = document.getElementById('comments').value;

        const evaluation = { professor, subject, rating, comments };

        fetch('/api/evaluations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(evaluation)
        })
        .then(response => response.json())
        .then(ev => {
            const div = document.createElement('div');
            div.className = 'evaluation-item';
            div.innerHTML = `
                <h3>${ev.professor} — ${ev.subject}</h3>
                <p><strong>Nota:</strong> ${ev.rating}</p>
                <p>${ev.comments}</p>
            `;
            evaluationList.appendChild(div);
            form.reset();
        });
    });

    // Ajusta altura da caixa de comentários automaticamente
    const commentsBox = document.getElementById('comments');
    if (commentsBox) {
        commentsBox.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Mostrar/ocultar avaliações anteriores
    const showBtn = document.getElementById('show-evaluations');
    const hideBtn = document.getElementById('hide-evaluations');
    const evaluationsSection = document.getElementById('evaluations');
    if (showBtn && hideBtn && evaluationsSection) {
        showBtn.addEventListener('click', () => {
            evaluationsSection.style.display = 'block';
            showBtn.style.display = 'none';
        });
        hideBtn.addEventListener('click', () => {
            evaluationsSection.style.display = 'none';
            showBtn.style.display = 'inline-block';
        });
    }
});