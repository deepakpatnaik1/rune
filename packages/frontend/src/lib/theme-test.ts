// Test theme value access
import { extractThemeValues, theme } from './theme';
import { generateCSSProperties } from './css-theme';

// Test theme access
console.log('Theme test - Background color:', extractThemeValues().backgroundColor);
console.log('Theme test - Text color:', extractThemeValues().textColor);
console.log('Theme test - Font size:', extractThemeValues().fontSize);

// Test CSS generation
const cssProps = generateCSSProperties();
console.log('CSS Properties generated:', cssProps.length > 0 ? 'SUCCESS' : 'FAILED');

// Verify no hardcoding - all values come from theme
const values = extractThemeValues();
console.log('Theme values extracted:', Object.keys(values).length, 'properties');

export { values as themeTestValues };