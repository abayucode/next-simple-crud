import apiFetch from "@/utils/apiFetch";

export async function getAllCar() {
  try {
    const result = await apiFetch('http://103.127.136.166:1801/api/cars/get-all?page=0&size=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    return result
  } catch (error) {
    console.error(error)
  }
}

export async function submitOrder(params: any) {
  try {
    const result = await apiFetch('http://103.127.136.166:1801/api/booking/submit', {
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
