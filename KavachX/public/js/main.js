// Tiny demo module for standalone index.html
// Safe to keep in public/ for static serving. Next.js will ignore files in public during SSR bundling.

window.addEventListener('DOMContentLoaded', () => {
  console.info('public/js/main.js: module loaded — KavachX static demo.');

  // Add a persistent indicator
  const indicator = document.createElement('div');
  indicator.id = 'demo-indicator';
  indicator.textContent = 'Demo script loaded';
  document.body.appendChild(indicator);

  // Wire demo button if present
  const btn = document.getElementById('demo-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      indicator.textContent = 'Button clicked!';
      indicator.style.opacity = '1';
      setTimeout(() => {
        indicator.textContent = 'Demo script loaded';
      }, 1800);
    });
  }
});
