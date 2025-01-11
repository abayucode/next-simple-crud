"use client"

import FormOrderComponent from "@/components/form-order/page";
import styles from '@/app/page.module.css'

export default function BookingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <FormOrderComponent header="Booking Order" data={[0, 21, 2]} />
      </div>
    </div>
  )
}

// Component
//   ChildComponent 1
//     p1
//   ChildComponent 2 
//
//
//
//
//
//
//
//
//
