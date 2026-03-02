// Dominion Helper - Overlay UI
// Renders analysis results as an overlay panel on dominion.games

import { analyzeKingdom } from '../analysis/engine.js';

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
    .map((item) => `<div class="dh-item">${item}</div>`)
    .join('');

  return `
    <div class="dh-section ${className}">
      <div class="dh-section-title">${title}</div>
      ${itemsHtml}
    </div>
  `;
}

export function renderOverlay(cardNames) {
  const analysis = analyzeKingdom(cardNames);
  const panel = createPanel();

  let html = `
    <div class="dh-header">
      <span class="dh-title">Dominion Helper</span>
      <button class="dh-toggle" id="dh-toggle-btn">_</button>
    </div>
    <div class="dh-body" id="dh-body">
  `;

  // Kingdom overview
  html += renderSection(
    'Kingdom Components',
    analysis.components,
    'dh-components'
  );

  // Synergies
  html += renderSection('Synergies', analysis.synergies, 'dh-synergies');

  // Strategy archetypes
  html += renderSection(
    'Viable Strategies',
    analysis.archetypes,
    'dh-archetypes'
  );

  // Warnings / things to note
  html += renderSection('Key Notes', analysis.notes, 'dh-notes');

  html += '</div>';

  panel.innerHTML = html;

  // Toggle minimize
  document.getElementById('dh-toggle-btn').addEventListener('click', () => {
    const body = document.getElementById('dh-body');
    body.classList.toggle('dh-collapsed');
  });
}
