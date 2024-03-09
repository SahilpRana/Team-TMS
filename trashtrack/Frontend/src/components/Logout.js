import React from 'react'
import LoginPage from './LoginPage'

export default function Logout() {
  return (<>
  
    <div className=' logout mx auto text-green-700 py-2 text-xl text-center'>
      Session logged out succesfully ! Login again
    </div>
    <LoginPage></LoginPage>
  </>
  )
}
