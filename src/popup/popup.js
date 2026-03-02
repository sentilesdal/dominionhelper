document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const kingdomEl = document.getElementById('kingdom');

  chrome.runtime.sendMessage({ type: 'GET_KINGDOM' }, (response) => {
    if (response && response.cards && response.cards.length > 0) {
      statusEl.textContent = `Kingdom detected (${response.cards.length} cards)`;
      kingdomEl.textContent = response.cards.join(', ');
    } else {
      statusEl.textContent = 'No kingdom detected yet. Start a game on dominion.games!';
    }
  });
});
