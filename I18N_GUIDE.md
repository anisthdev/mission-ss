# Internationalization (i18n) Implementation Guide

## Overview
This project uses **i18next** with React for multi-language support. Currently configured for:
- **English (en)** - Default language
- **Odia (odi)** - Native language support

## File Structure
```
src/
├── i18n/
│   ├── config.js              # i18n configuration
│   ├── index.js               # i18n entry point
│   └── locales/
│       ├── en.json            # English translations
│       └── odi.json           # Odia translations
└── components/
    └── common/
        └── LanguageSwitcher.jsx  # Language selector component
```

## How to Use Translations in Components

### 1. Basic Usage with `useTranslation` Hook

```jsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
}
```

### 2. Dynamic Language Switching

```jsx
import { useTranslation } from 'react-i18next';

export default function MyComponent() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <button onClick={() => handleLanguageChange('odi')}>
      Switch to Odia
    </button>
  );
}
```

### 3. Using LanguageSwitcher Component

The pre-built `LanguageSwitcher` component is already integrated in the Header:

```jsx
import LanguageSwitcher from './components/common/LanguageSwitcher';

// Use in your layout/header:
<LanguageSwitcher />
```

## Adding New Translation Keys

### Step 1: Add to English Translations (en.json)
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

### Step 2: Add to Odia Translations (odi.json)
```json
{
  "mySection": {
    "title": "ମୋ ଶୀର୍ଷକ",
    "description": "ମୋ ବର୍ଣନା"
  }
}
```

### Step 3: Use in Component
```jsx
const { t } = useTranslation();
<h1>{t('mySection.title')}</h1>
```

## Features

### Auto Language Detection
- Detects user's browser language preference
- Falls back to English if language not supported
- Stores preference in localStorage

### Dark Mode Support
- All translations work seamlessly with dark mode
- LanguageSwitcher adapts to theme

### Lazy Loading
- Translations loaded on demand
- Minimal performance impact

## Adding a New Language

1. Create new translation file in `src/i18n/locales/{language-code}.json`
2. Update `src/i18n/config.js`:
```js
import newLangTranslations from './locales/{language-code}.json';

const resources = {
  en: { translation: enTranslations },
  odi: { translation: odiaTranslations },
  {language-code}: { translation: newLangTranslations },  // Add this
};
```

3. Update `LanguageSwitcher.jsx` to include new language option

## Translation Keys Structure

Current translation keys are organized by sections:
- `nav.*` - Navigation items
- `hero.*` - Hero section
- `impact.*` - Impact section
- `programs.*` - Programs section
- `initiatives.*` - Initiatives section
- `map.*` - Map section
- `partners.*` - Partners section
- `footer.*` - Footer section

## Tips for Translations

1. **Keep consistent**: Use same terminology throughout
2. **Respect scripts**: Odia uses Odia script (ଓଡିଆ)
3. **Consider context**: Some words may have different meanings
4. **Test thoroughly**: Verify layouts work with longer/shorter text
5. **Update all languages**: When adding new keys, add to all language files

## Resources

- [i18next Documentation](https://www.i18next.com/)
- [React i18next Documentation](https://react.i18next.com/)
- [Odia Language Info](https://en.wikipedia.org/wiki/Odia_language)

## Current Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Complete |
| Odia | `odi` | ✅ Complete |

## Roadmap

Future language additions:
- Hindi (hi)
- Telugu (te)
- Bengali (bn)
- Tamil (ta)
