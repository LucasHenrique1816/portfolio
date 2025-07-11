function typeEffect(element, text, speed, callback, keepCursor) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  element.textContent = '';
  element.appendChild(cursor);

  function typeChar() {
    if (i < text.length) {
      cursor.before(document.createTextNode(text.charAt(i)));
      i++;
      // Simula digitação mais realista: espaço é mais lento
      const char = text.charAt(i - 1);
      let delay = speed + Math.random() * 60;
      if (char === ' ') delay += 120;
      setTimeout(typeChar, delay);
    } else {
      if (!keepCursor) cursor.remove();
      if (callback) callback();
    }
  }
  typeChar();
}

window.addEventListener('DOMContentLoaded', () => {
  const nome = document.getElementById('typing-nome');
  const desc = document.getElementById('typing-desc');
  typeEffect(nome, 'Lucas Henrique', 70, () => {
    // Simula pressionar a barra de espaço após o nome
    const cursor = nome.querySelector('.cursor');
    setTimeout(() => {
      if (cursor) cursor.before(document.createTextNode(' '));
      setTimeout(() => {
        typeEffect(desc, 'Web Developer', 70, () => {
          // O cursor permanece apenas no final do "Web Developer"
        }, true);
      }, 350); // Pequena pausa após o "espaço"
    }, 350);
  });
});