import { rank } from '~/utils/rank'

describe('rank', () => {
  it('スコアが100点のとき、「awesome」 が返ること', () => {
    expect(rank(100)).toBe('awesome')
  })
  it('スコアが91点のとき、「awesome」 が返ること', () => {
    expect(rank(91)).toBe('awesome')
  })
  it('スコアが90点のとき、「awesome」 が返ること', () => {
    expect(rank(90)).toBe('awesome')
  })
  it('スコアが89点のとき、「soso」 が返ること', () => {
    expect(rank(89)).toBe('soso')
  })
  it('スコアが51点のとき、「soso」 が返ること', () => {
    expect(rank(51)).toBe('soso')
  })
  it('スコアが50点のとき、「soso」 が返ること', () => {
    expect(rank(50)).toBe('soso')
  })
  it('スコアが49点のとき、「bad」 が返ること', () => {
    expect(rank(49)).toBe('bad')
  })
  it('スコアが0点のとき、「bad」 が返ること', () => {
    expect(rank(0)).toBe('bad')
  })
})
