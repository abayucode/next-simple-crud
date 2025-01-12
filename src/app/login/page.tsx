"use client"

import styles from '@/app/page.module.css'
import { login } from '@/services/authServices'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const router = useRouter()

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })

  const handleInputForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormLogin({
      ...formLogin,
      [name]: value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const loginResult = await login(formLogin)
    const {
      value,
    } = loginResult

    if (value.status != 200) {
        Swal.fire({
          title: 'Login Error',
          text: value.data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      } else {
        Swal.fire({
          title: 'Successfully',
          text: 'Success Login',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      Cookie.set('accessToken', value.data.accessToken)
      router.push('/dashboard')
    }
    
    setFormLogin({
      email: '',
      password: ''
    })
  }
  
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <form className="max-w-sm mx-auto bg-slate-900 px-20 py-24 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <h1 className="text-center pb-10 text-3xl font-bold">Login Page</h1>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              value={formLogin.email}
              onChange={handleInputForm}
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              value={formLogin.password}
              onChange={handleInputForm}
              type="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
      </div>
    </div>
  )
}
