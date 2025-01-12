import apiFetch from "@/utils/apiFetch"

export async function getAllCarTypesByBrandId(accessToken: string, brandId: number) {
  try {
    const result = await apiFetch(`http://103.127.136.166:1801/api/carType/get-all/getByBrandId/${brandId}?page=0&size=10`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return result
  } catch (error) {
    console.error(error)
  }
}
