export function useUtilities() {
  function deepCopy<T>(object: T) {
    return JSON.parse(JSON.stringify(object))
  }

  function deepCopyAny<T>(object: T) {
    return JSON.parse(JSON.stringify(object)) as any
  }

  return {
    deepCopy,
    deepCopyAny
  }
}
