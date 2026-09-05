import fs from 'fs';
import path from 'path';
import { Theme, css } from '@primeuix/styled';
import Aura from '@primeng/themes/aura';

Theme.setTheme({ preset: Aura, options: { darkModeSelector: '.dark' } });

const common = Theme.getCommon('base');

let cssOutput = `/* PrimeNG Aura Complete Theme Bundle */\n`;

// 1. Primitive Tokens
if (common.primitive?.css) {
  cssOutput += `/* --- Primitive Tokens --- */\n${common.primitive.css}\n\n`;
}

// 2. Semantic Tokens (Light & Dark)
if (common.semantic?.css) {
  cssOutput += `/* --- Semantic Tokens --- */\n${common.semantic.css}\n\n`;
}

// 3. Components list
const components = [
  'accordion', 'badge', 'button', 'card', 'checkbox', 'datepicker',
  'dialog', 'divider', 'iconfield', 'inputtext', 'menu',
  'multiselect', 'paginator', 'progressbar', 'progressspinner', 'radiobutton',
  'ripple', 'select', 'slider', 'stepper', 'datatable', 'tabs', 'tabview',
  'tag', 'toggleswitch', 'toolbar', 'tooltip'
];

// Component tokens
for (const comp of components) {
  try {
    const themeDef = Theme.getComponent(comp);
    if (themeDef?.css) {
      cssOutput += `/* --- ${comp} Tokens --- */\n${themeDef.css}\n\n`;
    }
  } catch (e) {
    console.warn(`Could not get tokens for ${comp}:`, e.message);
  }
}

// Component styles
for (const comp of components) {
  try {
    // Dynamically import component style
    const stylePath = `@primeuix/styles/${comp}`;
    const mod = await import(stylePath);
    if (mod?.style) {
      const compiled = css`${mod.style}`;
      cssOutput += `/* --- ${comp} Styles --- */\n${compiled}\n\n`;
    }
  } catch (e) {
    console.warn(`Could not get styles for ${comp}:`, e.message);
  }
}

const shellDest = path.resolve('apps/shell/src/primeng-theme.css');
const mfeDest = path.resolve('apps/mfe-primeng/src/primeng-theme.css');

fs.writeFileSync(shellDest, cssOutput, 'utf8');
fs.writeFileSync(mfeDest, cssOutput, 'utf8');

console.log(`Generated ${cssOutput.length} bytes to ${shellDest} and ${mfeDest}`);
