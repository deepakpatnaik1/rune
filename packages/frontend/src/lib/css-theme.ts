// CSS Custom Properties generator from theme
import { extractThemeValues } from './theme';

const themeValues = extractThemeValues();

// Generate CSS custom properties string
export const generateCSSProperties = () => {
  return `:root {
    --bg-color: ${themeValues.backgroundColor};
    --text-color: ${themeValues.textColor};
    --text-muted: ${themeValues.textMuted};
    
    --input-background: ${themeValues.inputBackground};
    --input-backdrop-filter: ${themeValues.inputBackdropFilter};
    --input-border-width: ${themeValues.inputBorderWidth};
    --input-border-top: ${themeValues.inputBorderTop};
    --input-border-bottom: ${themeValues.inputBorderBottom};
    --input-border-radius: ${themeValues.inputBorderRadius};
    --input-shadow-outer: ${themeValues.inputShadowOuter};
    --input-shadow-inner: ${themeValues.inputShadowInner};
    
    --font-size: ${themeValues.fontSize};
    --line-height: ${themeValues.lineHeight};
    --font-family: ${themeValues.fontFamily};
    
    --user-text: ${themeValues.userTextColor};
    --user-bg: ${themeValues.userBackground};
    --user-border: ${themeValues.userBorder};
    --assistant-text: ${themeValues.assistantTextColor};
    --assistant-bg: ${themeValues.assistantBackground};
    --assistant-border: ${themeValues.assistantBorder};
    
    --message-spacing: ${themeValues.messageSpacing};
    --content-indent: ${themeValues.contentIndent};
    --header-spacing: ${themeValues.headerSpacing};
    
    --controls-icon-color: ${themeValues.controlsIconColor};
    --controls-text-color: ${themeValues.controlsTextColor};
    --controls-chevron-color: ${themeValues.controlsChevronColor};
    --controls-hover-background: ${themeValues.controlsHoverBackground};
    --status-color: ${themeValues.statusColor};
    --status-shadow: ${themeValues.statusShadow};
    
    /* Messages container layout */
    --messages-bottom: 120px;
    --messages-width: ${themeValues.messagesDefaultWidth};
    --messages-max-width: ${themeValues.messagesMaxWidth};
    --messages-height: ${themeValues.messagesHeight};
    --scrollback-padding: ${themeValues.messagesPadding};
    
    /* Input container layout */
    --input-bottom: 20px;
    
    /* Role label styling */
    --label-font-size: ${themeValues.labelFontSize};
    --label-font-weight: ${themeValues.labelFontWeight};
    --label-text-transform: ${themeValues.labelTextTransform};
    --label-letter-spacing: ${themeValues.labelLetterSpacing};
    --label-padding: ${themeValues.labelPadding};
    --label-border-radius: ${themeValues.labelBorderRadius};
    
    /* Input component variables */
    --input-gap: ${themeValues.inputGap};
    --input-padding: ${themeValues.inputPadding};
    --textarea-min-height: ${themeValues.textareaMinHeight};
    --button-padding: ${themeValues.buttonPadding};
    --disabled-opacity: ${themeValues.disabledOpacity};
    --border-width: ${themeValues.borderWidth};
    --transition-duration: ${themeValues.transitionDuration};
  }`;
};

// CSS custom properties object for inline styles
export const cssVars = themeValues;