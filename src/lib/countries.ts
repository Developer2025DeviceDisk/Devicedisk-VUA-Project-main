export const countries = [
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png', dialCode: '+61' },
  { code: 'BD', name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png', dialCode: '+880' },
  { code: 'BR', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png', dialCode: '+55' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png', dialCode: '+1' },
  { code: 'CN', name: 'China', flag: 'https://flagcdn.com/w40/cn.png', dialCode: '+86' },
  { code: 'EG', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png', dialCode: '+20' },
  { code: 'FR', name: 'France', flag: 'https://flagcdn.com/w40/fr.png', dialCode: '+33' },
  { code: 'DE', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png', dialCode: '+49' },
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w40/in.png', dialCode: '+91' },
  { code: 'ID', name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png', dialCode: '+62' },
  { code: 'IR', name: 'Iran, Islamic Republic of', flag: 'https://flagcdn.com/w40/ir.png', dialCode: '+98' },
  { code: 'IT', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png', dialCode: '+39' },
  { code: 'JP', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png', dialCode: '+81' },
  { code: 'KR', name: 'Korea, Republic of', flag: 'https://flagcdn.com/w40/kr.png', dialCode: '+82' },
  { code: 'MX', name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png', dialCode: '+52' },
  { code: 'NG', name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png', dialCode: '+234' },
  { code: 'PK', name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png', dialCode: '+92' },
  { code: 'RU', name: 'Russian Federation', flag: 'https://flagcdn.com/w40/ru.png', dialCode: '+7' },
  { code: 'ZA', name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png', dialCode: '+27' },
  { code: 'ES', name: 'Spain', flag: 'https://flagcdn.com/w40/es.png', dialCode: '+34' },
  { code: 'TR', name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png', dialCode: '+90' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png', dialCode: '+44' },
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w40/us.png', dialCode: '+1' }
] as const;

export type Country = typeof countries[number];