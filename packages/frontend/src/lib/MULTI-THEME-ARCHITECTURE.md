# Multi-Theme Architecture - Dynamic Theme System

## Overview
Dynamic theme system that supports unlimited theme files without code duplication. Follows Rule 8 (Use Config) by avoiding theme-specific hardcoding.

## Architecture

### Theme Files Structure
```
src/lib/themes/
├── grim-outlook.json
├── montana-madness.json 
├── noir-night.json
└── [future-themes].json
```

### Dynamic Theme Loader
```typescript
interface ThemeLoader {
  loadTheme(themeName: string): ThemeData;
  generateCSSVars(themeData: ThemeData): CSSProperties;
  switchTheme(themeName: string): void;
  getCurrentTheme(): ThemeData;
}
```

### CSS Variable Generation
- Universal CSS property mapping
- Works with any theme structure
- Runtime CSS injection
- No hardcoded theme values

### Theme Switching
- Runtime theme changes
- Automatic CSS variable updates
- Component re-rendering
- User preference persistence

## Benefits

### Rule 8 Compliance
✅ No hardcoded theme values  
✅ Single configuration source per theme  
✅ Dynamic loading from config files  
✅ No theme-specific code duplication  

### Scalability  
✅ Add new themes without code changes  
✅ Runtime theme switching  
✅ User customization support  
✅ Theme inheritance/composition  

### Maintainability
✅ Single codebase for all themes  
✅ Consistent theme structure  
✅ Type-safe theme access  
✅ Easy testing and validation  

## Implementation Plan
1. Create dynamic theme loader interface
2. Build universal CSS generator  
3. Implement theme switching system
4. Add theme validation and testing
5. Document usage patterns