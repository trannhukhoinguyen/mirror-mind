export default function initTypewriter() {
  const terminals = document.querySelectorAll('.typewriter');

  terminals.forEach((el) => {
    const text = el.dataset.content;
    let index = 0;
    el.textContent = ''; // clear initial

    const interval = setInterval(() => {
      el.textContent += text[index];
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 25); // typing speed (ms per character)
  });
}

initTypewriter();
