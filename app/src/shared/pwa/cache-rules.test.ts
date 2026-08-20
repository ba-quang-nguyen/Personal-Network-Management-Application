import { describe, expect, it } from 'vitest'

import { shouldCache } from './cache-rules'

describe('shouldCache', () => {
  it('caches normal same-origin assets', () => {
    expect(shouldCache('http://localhost/assets/index.js')).toBe(true)
    expect(shouldCache('http://localhost/index.html')).toBe(true)
  })

  it('never caches Firebase/Google hosts', () => {
    expect(shouldCache('https://app.firebaseapp.com/__/auth')).toBe(false)
    expect(shouldCache('https://firestore.googleapis.com/v1/projects')).toBe(false)
    expect(shouldCache('https://www.gstatic.com/firebasejs/12/app.js')).toBe(false)
    expect(shouldCache('https://identitytoolkit.googleapis.com/v1/accounts')).toBe(false)
  })

  it('never caches Firebase reserved path', () => {
    expect(shouldCache('https://myapp.web.app/__/auth')).toBe(false)
  })

  it('returns false for invalid URL', () => {
    expect(shouldCache('http://')).toBe(false)
  })
})
