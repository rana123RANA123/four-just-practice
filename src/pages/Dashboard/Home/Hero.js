import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Hero() {
  const { user } = useAuthContext()
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center  align-items-center justify-content-center d-flex">Dashboard Home</h1>
            <h2 className="text-center  align-items-center justify-content-center d-flex">Welcome Back {user.fullName}</h2> 
            <Link  to="/" className='btn btn-primary align-items-center justify-content-center w-100 mt-5 text-center d-flex'>Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}
