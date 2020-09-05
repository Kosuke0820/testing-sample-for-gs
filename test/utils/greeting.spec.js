import { greeting } from '~/utils/greeting'

describe('greeting', () => {
  it('日本語のとき、「こんにちは」が返ること', () => {
    expect(greeting('ja')).toBe('こんにちは')
  })
  it('中国語のとき、「你好」が返ること', () => {
    expect(greeting('cn')).toBe('你好')
  })
  it('言語指定がないとき、「hello」が返ること', () => {
    expect(greeting()).toBe('hello')
  })
})
