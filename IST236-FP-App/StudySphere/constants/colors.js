const Colors = {
  white: '#FFFFFF',
  black: '#111827',
  danger: '#DC2626',
  warning: '#F59E0B',
  success: '#16A34A',
};

const ThemePalettes = {
  Blue: {
    primary: '#4F46E5',
    secondary: '#7C3AED',
  },
  Purple: {
    primary: '#7C3AED',
    secondary: '#A855F7',
  },
  Green: {
    primary: '#15803D',
    secondary: '#22C55E',
  },
};

export const themeChoices = [
  { name: 'Blue', color: ThemePalettes.Blue.primary },
  { name: 'Purple', color: ThemePalettes.Purple.primary },
  { name: 'Green', color: ThemePalettes.Green.primary },
];

export function getThemeColors(darkMode = false, selectedTheme = 'Blue') {
  const activePalette = ThemePalettes[selectedTheme] || ThemePalettes.Blue;

  if (darkMode) {
    return {
      primary: activePalette.primary,
      secondary: activePalette.secondary,
      background: '#111827',
      card: '#1F2937',
      input: '#374151',
      text: '#F9FAFB',
      lightText: '#D1D5DB',
      border: '#4B5563',
      inactive: '#9CA3AF',
      overlay: 'rgba(0,0,0,0.6)',
      success: Colors.success,
      warning: Colors.warning,
      danger: Colors.danger,
      white: Colors.white,
    };
  }

  return {
    primary: activePalette.primary,
    secondary: activePalette.secondary,
    background: '#F4F7FB',
    card: '#FFFFFF',
    input: '#F3F4F6',
    text: '#1F2937',
    lightText: '#6B7280',
    border: '#E5E7EB',
    inactive: '#4B5563',
    overlay: 'rgba(17,24,39,0.45)',
    success: Colors.success,
    warning: Colors.warning,
    danger: Colors.danger,
    white: Colors.white,
  };
}

export default Colors;