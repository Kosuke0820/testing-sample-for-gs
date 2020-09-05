export const rank = (score) => {
  if (score >= 90) return 'awesome'
  if (score >= 50) return 'soso'
  return 'bad'
}
