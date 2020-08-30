import { calc } from '~/utils/calc'

describe('utils/calc', () => {
  test('1 と 2 渡すと 3 が返ること', () => {
    expect(calc(1, 2)).toBe(3)
  })
})
