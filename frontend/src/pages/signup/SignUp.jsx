import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js'


const SignUp = () => {
  const [inputs,setInputs]=useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  })
  const {loading,signup}=useSignup();

  const handleCheckBoxChange=(gender)=>{
    setInputs({...inputs,gender:gender})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(inputs)
    await signup(inputs)
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 max-auto'>
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup 
        <span className='text-blue-500'> ChatterBox</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='Enter FullName' value={inputs.fullName} onChange={(e)=>setInputs({...inputs,fullName:e.target.value})} className='w-full input input-bordered h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='Enter Username' value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} className='w-full input input-bordered h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter Password' value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})} className='w-full input input-bordered h-10' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='Re-Enter Password' value={inputs.confirmPassword} onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})} className='w-full input input-bordered h-10' />
          </div>
          <GenderCheckbox onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>
          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp