"use client"

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";


export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [carType, setCarType] = useState("");
  const [brand, setBrand] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");

  const handleInputName = (event: React.FormEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const handleInputEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handleInputNumber = (event: React.FormEvent<HTMLInputElement>) => {
    setPhoneNumber(event.currentTarget.value)
  }

  const handleInputCarType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCarType(event.currentTarget.value)
  }

  const handleBookDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookDate(event.currentTarget.value)
  }

  const handleBookTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBookTime(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const reqBody = {
      name,
      email,
      phoneNumber,
      carType,
      bookDate,
      bookTime
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="flex flex-row w-96 justify-between">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
              <input onChange={handleInputName} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required />
            </div>
            <div className="mb-5 ml-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input onChange={handleInputEmail} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter name" required />
            </div>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No HP</label>
            <input onChange={handleInputNumber} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Car Type</label>
            <select onChange={(e) => handleInputCarType(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="matic">Matic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Date</label>
              <input onChange={handleBookDate} type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Book Time</label>
              <select onChange={(e) => handleBookTime(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value="07:00">07:00</option>
                <option value="09:00">09:00</option>
                <option value="11:00<">11:00</option>
              </select>
            </div>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </main>
    </div>
  );
}
