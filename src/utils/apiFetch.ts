export default async function apiFetch(url: string, request: any) {
  const result = await fetch(url, request)
  return result.json()
}
