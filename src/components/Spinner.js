import React from 'react'
import spinner from '../assets/svg/spinner.svg'


export default function Spinner() {
  return (
    <div className='flex items-center justify-center'>
      <img src={spinner} alt="spinner" className='h-24'/>
    </div>
  )
}
