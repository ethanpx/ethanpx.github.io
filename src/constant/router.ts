export const RouterKeys = {
  Home: '/',
  TermOfUse: 'term-of-use',
  PrivacyPolicy: 'privacy-policy',
  BrandKit: 'brand-kit',
} as const;

export type RouterParams = Record<string, string | number | undefined>

function buildQuery(params?: RouterParams) {
  if (!params) return ''
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&')

  return query ? `?${query}` : ''
}

export const CoreRoutes = {
  home: (params?: RouterParams) => `${RouterKeys.Home}${buildQuery(params)}`,
  termOfUse: (params?: RouterParams) =>
    `/${RouterKeys.TermOfUse}${buildQuery(params)}`,
  privacyPolicy: (params?: RouterParams) =>
    `/${RouterKeys.PrivacyPolicy}${buildQuery(params)}`,
  brandKit: (params?: RouterParams) =>
    `/${RouterKeys.BrandKit}${buildQuery(params)}`,
}
