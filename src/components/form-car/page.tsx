import { getBrandCars } from "@/services/brandService"
import { addNewCar } from "@/services/carService"
import { getAllCarTypesByBrandId } from "@/services/carTypeService"
import { getAccessToken } from "@/utils/utility"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function FormCar(props: any) {

  const [brandCars, setBrandCars] = useState([])
  const [carTypes, setCarTypes] = useState([])
  const [accessToken, setAccessToken] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  const [formData, setFormData] = useState({
    brandId: 0,
    carModel: "",
    carYears: "",
    carsAvailable: 0,
    carTypeId: 0,
    imageUrls: ""
  })

  const handleInputForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resultSubmit = await addNewCar(formData, accessToken);

    if (!resultSubmit?.id) {
        Swal.fire({
              title: 'Error',
              text: resultSubmit.message,
              icon: 'error',
              confirmButtonText: 'OK',
              })
        } else {
          Swal.fire({
            title: 'Successfully',
            text: 'Success Booking',
            icon: 'success',
            confirmButtonText: 'OK',
          })
      window.location.reload()
    }
  }

  useEffect(() => {
    const token = getAccessToken()
    setAccessToken(token)
    
    const handleGetMasterData = async () => {
      setBrandCars(await getBrandCars(token))
    }
    
    handleGetMasterData()
  }, [])

  useEffect(() => {
    const getMasterDataBrand = async () => {
      setCarTypes(await getAllCarTypesByBrandId(accessToken, formData.brandId))
    }

    if (formData.brandId != 0) {
      getMasterDataBrand()
    }    

  }, [formData.brandId, accessToken])

  useEffect(() => {
    const getMasterDataBrand = async () => {
      if (props.initialValue) {
        setCarTypes(await getAllCarTypesByBrandId(accessToken, props?.initialValue.brandId))
      }
    }
    getMasterDataBrand()

    setIsVisible(!isVisible)

  }, [props, accessToken])

  if (isVisible) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <form className="mx-auto bg-slate-500 rounded-lg shadow-lg p-6 z-10 w-96" onSubmit={handleSubmit}>
          <h1 className="text-center mb-5 text-2xl font-bold">Car Input Form</h1>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand Car</label>
            <select name="brandId" onChange={(e) => handleInputForm(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="0">--Please Choose--</option>
              {
                brandCars.map((item, key) => (
                  <option selected={item.id === props?.initialValue?.brandId} value={item.id} key={key}>{item.brandName}</option>
                ))
              }
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Model</label>
            <input onChange={handleInputForm} value={props?.initialValue?.carModel} type="text" name="carModel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Urls</label>
            <input onChange={handleInputForm} value={props?.initialValue?.imageUrls} type="text" name="imageUrls" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Years</label>
            <input onChange={handleInputForm} value={props?.initialValue?.carYears} type="text" name="carYears" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cars Available</label>
            <input onChange={handleInputForm} value={props?.initialValue?.carsAvailable} type="text" name="carsAvailable" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Type</label>
            <select name="carTypeId" onChange={(e) => handleInputForm(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="0">--Please Choose--</option>
              {
                carTypes.map((item, key) => (
                  <option selected={item.id === props?.initialValue?.carTypeId} key={key} value={item.id}>{item.type}</option>
                ))
              }
            </select>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          <button onClick={() => setIsVisible(!isVisible)} type="reset" className="text-white ml-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
        </form>
      </div>
    )
  }
}
