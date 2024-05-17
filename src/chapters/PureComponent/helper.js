// 浅比较
export function objectEqual(a, b) {
  for (const attr in a) {
    if (!Object.is(a[attr], b[attr])) {
      return false
    }
  }
  return true
}