import apiFetch from "@/utils/apiFetch"


export async function login(params: any) {
  try {
    const result = await apiFetch('http://103.127.136.166:1801/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    return result
  } catch (error) {
    console.error(error)
  }
}
