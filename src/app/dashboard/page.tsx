"use client"

import styles from '@/app/page.module.css'
import FormCar from '@/components/form-car/page'
import { getAllCar } from '@/services/carService'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Dashboard() {

  const [cars, setCars] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [initialValueForm, setInitialValueForm] = useState();

  useEffect(() => {
    const handleGetAllCar = async () => {
      const result = await getAllCar()

      setCars(result)
    }

    handleGetAllCar()
  }, [])

  const renderModalForm = () => {
    return (
      <FormCar
        visible={isVisible}
        initialValue={initialValueForm}
      />
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <button className="bg-blue-500 px-5 py-2 rounded-xl" onClick={() => setIsVisible(!isVisible)}>+ Add Car</button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Years
                </th>
                <th scope="col" className="px-6 py-3">
                  Model
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                cars.map((car, key) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={key}>
                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <Image className="w-10 h-10 rounded-full" width={100} height={100} src="https://cdn.motor1.com/images/mgl/kv4Re/s1/mobile-charging-ev-hyundai.jpg" alt="Jese image" />
                      <div className="ps-3">
                        <div className="text-base font-semibold">{car.brandName}</div>
                        <div className="font-normal text-gray-500">{car.nameCar}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {car.carYears}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {car.carModel}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={
                        () => {
                          setIsVisible(!isVisible)
                          setInitialValueForm(car)
                        }
                      } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit Car</button>
                      <span> | </span>
                      <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete Car</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {/* <div onClick={() => setIsVisible(!isVisible)}> */}
          {renderModalForm()}
        {/* </div> */}
      </div>
    </div>
  )
}