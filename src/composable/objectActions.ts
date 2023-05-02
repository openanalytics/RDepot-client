export function useObjectActions() {
  function setAllFields(object: any, value: any) {
    Object.keys(object).forEach((key) => {
      object[key] = value
    })
  }

  return {
    setAllFields
  }
}
