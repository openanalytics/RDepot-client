interface PatchField {
  op: string
  path: string
  value: any
}

export function preparePatchBody(
  fields: Map<string, any>
): PatchField[] {
  const patch: PatchField[] = []
  fields.forEach((value, key) => {
    patch.push({
      op: 'replace',
      path: '/' + key,
      value: value
    })
  })
  return patch
}
