// utils/greeting.js
export const greeting = (lang) => {
  if (lang === 'ja') return 'こんにちは'
  if (lang === 'cn') return '你好'
  return 'hello'
}
