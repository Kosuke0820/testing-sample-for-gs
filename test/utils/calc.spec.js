import { calc } from '~/utils/calc'

describe('utils/calc', () => {
  it('1 と 2 を渡すと 3 が返ること', () => {
    expect(calc(1, 2)).toBe(3)
  })
})
