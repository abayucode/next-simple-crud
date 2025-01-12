"use client"

import { getAllCar, submitOrder } from "@/services/carService";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


interface CarsData {
  id?: number,
  nameCar?: string,
}

interface FormDataOrder {
  name?: string,
  email?: string,
  phone?: string,
  carsId?: number,
  bookDate: string,
  bookTime: string,
}

export default function FormOrderComponent(props: any) {

  const [formData, setFormData] = useState<FormDataOrder>({
    name: '',
    email: '',
    phone: '',
    carsId: 0,
    bookDate: '',
    bookTime: ''
  })

  const [cars, setCars] = useState<CarsData | []>([])

  const handleInputForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resultSubmit = await submitOrder(formData);
    if (resultSubmit?.status == 500) {
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
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      carsId: 0,
      bookDate: '',
      bookTime: ''
    })
  }

  useEffect(() => {
    const dataCarTypes = async () => {
      const result = await getAllCar()
      setCars(result)
    }

    dataCarTypes()
  }, [])


  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-row w-96 justify-between">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
          <input value={formData.name} onChange={handleInputForm} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required />
        </div>
        <div className="mb-5 ml-10">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input value={formData.email} onChange={handleInputForm} type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required />
        </div>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No HP</label>
        <input value={formData.phone} onChange={handleInputForm} type="text" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car</label>
        <select value={formData.carsId} name="carsId" onChange={(e) => handleInputForm(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          {
            cars.map((item: CarsData, key: number) => (
              <option key={key} value={item.id}>{item.nameCar}</option>
            ))
          }
        </select>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Date</label>
          <input value={formData.bookDate} onChange={handleInputForm} type="date" name="bookDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Time</label>
          <select value={formData.bookTime} name="bookTime" onChange={(e) => handleInputForm(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <option value="07:00">07:00</option>
            <option value="09:00">09:00</option>
            <option value="11:00<">11:00</option>
          </select>
        </div>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  )
}