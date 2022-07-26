/// <reference types='vitest/globals' />

interface ImportMetaEnv extends Readonly<import('vite').ImportMetaEnv> {
  readonly BASE_URL: string
  readonly CI?: 'false' | 'true'
  readonly DEV: '1' | import('@flex-development/tutils').EmptyString
  readonly MODE: import('@flex-development/tutils').NodeEnv
  readonly PROD: '1' | import('@flex-development/tutils').EmptyString
  readonly SSR: '1' | import('@flex-development/tutils').EmptyString
  readonly TEST: 'true'
  readonly VITEST: 'true'
  readonly VITE_USER_NODE_ENV: import('@flex-development/tutils').NodeEnv
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
