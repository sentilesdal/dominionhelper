// Dominion Helper - Overlay UI
// Renders analysis results as an overlay panel on dominion.games

(function () {
  'use strict';

  const DH = window.DominionHelper;
  const PANEL_ID = 'dominion-helper-panel';

  function createPanel() {
    let panel = document.getElementById(PANEL_ID);
    if (panel) return panel;

    panel = document.createElement('div');
    panel.id = PANEL_ID;
    document.body.appendChild(panel);
    return panel;
  }

  function renderSection(title, items, className) {
    if (!items || items.length === 0) return '';

    const itemsHtml = items
      .map((item) => `<div class="dh-item">${escapeHtml(item)}</div>`)
      .join('');

    return `
      <div class="dh-section ${className}">
        <div class="dh-section-title">${escapeHtml(title)}</div>
        ${itemsHtml}
      </div>
    `;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderOverlay(cardNames) {
    const analysis = DH.analyzeKingdom(cardNames);
    const panel = createPanel();

    let html = `
      <div class="dh-header">
        <span class="dh-title">Dominion Helper</span>
        <button class="dh-toggle" id="dh-toggle-btn">_</button>
      </div>
      <div class="dh-body" id="dh-body">
    `;

    // Show detected kingdom cards
    if (analysis.kingdom && analysis.kingdom.length > 0) {
      html += renderSection(
        'Detected Kingdom (' + analysis.kingdom.length + ' cards)',
        [analysis.kingdom.join(', ')],
        'dh-kingdom'
      );
    }

    if (analysis.unknown && analysis.unknown.length > 0) {
      html += renderSection(
        'Not In Database (' + analysis.unknown.length + ')',
        [analysis.unknown.join(', ')],
        'dh-unknown'
      );
    }

    html += renderSection(
      'Kingdom Components',
      analysis.components,
      'dh-components'
    );
    html += renderSection('Synergies', analysis.synergies, 'dh-synergies');
    html += renderSection(
      'Viable Strategies',
      analysis.archetypes,
      'dh-archetypes'
    );
    html += renderSection('Key Notes', analysis.notes, 'dh-notes');

    html += '</div>';

    panel.innerHTML = html;

    document.getElementById('dh-toggle-btn').addEventListener('click', () => {
      const body = document.getElementById('dh-body');
      body.classList.toggle('dh-collapsed');
    });
  }

  DH.renderOverlay = renderOverlay;
})();
