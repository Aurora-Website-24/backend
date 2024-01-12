import React from 'react'

const Home = () => {
  return (
    <>
      <div>Home</div>
      <div className="mt-6 flex items-center justify-center align-center gap-x-6">
        
        <button
        onClick={event =>  window.location.href='/login'}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log in
        </button>

        <button
        onClick={event =>  window.location.href='/register'}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Register
        </button>
      </div>
    </>
  )
}

export default Home