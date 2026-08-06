import React, { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

const AuthMain = () => {
    const [value, setvalue] = useState(true)
  return (
   <>
   <SignIn/>
   <SignUp/>
   </>
  )
}

export default AuthMain