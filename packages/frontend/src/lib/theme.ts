// Rule 8: Use Config - Theme configuration utility
import themeData from './theme.json';

export const theme = themeData;

// Extract specific theme values for CSS
export const extractThemeValues = () => {
  return {
    // Colors
    backgroundColor: theme.globalBody.background,
    textColor: theme.textInput.typography.color,
    textMuted: theme.textInput.typography.placeholderColor,
    
    // Input bar
    inputBackground: theme.inputBar.background.color,
    inputBackdropFilter: theme.inputBar.background.backdropFilter,
    inputBorderWidth: theme.inputBar.border.width,
    inputBorderTop: theme.inputBar.border.gradientTop,
    inputBorderBottom: theme.inputBar.border.gradientBottom,
    inputBorderRadius: theme.inputBar.border.radius,
    inputShadowOuter: theme.inputBar.shadow.outer,
    inputShadowInner: theme.inputBar.shadow.inner,
    
    // Typography
    fontSize: theme.scrollback.typography.fontSize,
    lineHeight: theme.scrollback.typography.lineHeight,
    fontFamily: theme.scrollback.typography.fontFamily,
    
    // Role labels
    userTextColor: theme.scrollback.roleLabel.user.textColor,
    userBackground: theme.scrollback.roleLabel.user.background,
    userBorder: theme.scrollback.roleLabel.user.borderColor,
    assistantTextColor: theme.scrollback.roleLabel.assistant.textColor,
    assistantBackground: theme.scrollback.roleLabel.assistant.background,
    assistantBorder: theme.scrollback.roleLabel.assistant.borderColor,
    
    // Layout
    messageSpacing: theme.scrollback.layout.message.marginBottom,
    contentIndent: theme.scrollback.layout.messageContent.marginLeft,
    headerSpacing: theme.scrollback.layout.messageHeader.marginBottom,
    messagesHeight: theme.scrollback.layout.container.height,
    messagesDefaultWidth: theme.scrollback.layout.container.defaultWidth,
    messagesLargeWidth: theme.scrollback.layout.container.largeWidth,
    messagesMaxWidth: theme.scrollback.layout.container.maxWidth,
    messagesPadding: `${theme.scrollback.layout.messages.paddingTop} ${theme.scrollback.layout.messages.paddingRight} ${theme.scrollback.layout.messages.paddingBottom} 20px`,
    
    // Controls
    controlsIconColor: theme.controlsRow.plusButton.icon.color,
    controlsTextColor: theme.controlsRow.dropdownTrigger.color,
    controlsChevronColor: theme.controlsRow.dropdownTrigger.chevron.color,
    controlsHoverBackground: theme.controlsRow.plusButton.backgroundHover,
    statusColor: theme.controlsRow.statusIndicator.color,
    statusShadow: theme.controlsRow.statusIndicator.shadow,
    
    // Role label styling
    labelFontSize: theme.scrollback.roleLabel.fontSize,
    labelFontWeight: theme.scrollback.roleLabel.fontWeight,
    labelTextTransform: theme.scrollback.roleLabel.textTransform,
    labelLetterSpacing: theme.scrollback.roleLabel.letterSpacing,
    labelPadding: theme.scrollback.layout.roleLabel.padding,
    labelBorderRadius: theme.scrollback.roleLabel.borderRadius,
    
    // Input component styling
    inputGap: theme.inputBar.layout.gap,
    inputPadding: theme.inputBar.layout.padding,
    textareaMinHeight: theme.textInput.layout.minHeight,
    buttonPadding: theme.inputBar.button.padding,
    disabledOpacity: theme.inputBar.button.disabledOpacity,
    borderWidth: theme.inputBar.border.width,
    transitionDuration: theme.inputBar.button.transitionDuration,
  };
};