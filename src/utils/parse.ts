export const parse = <T>(data: string) => {
  return JSON.parse(data) as T
}
