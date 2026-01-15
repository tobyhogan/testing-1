import React, { useEffect } from 'react'
import { useAppContext } from "../appContext";



function Account() {
  const { username, session } = useAppContext();

  console.log(session)



  try {

    var displayEmail = session.user.email
    var displayName = session.user.user_metadata.name
    var avatarUrl = session.user.user_metadata.avatar_url
    

  } catch (e) {
    console.log(e)

    var displayEmail = "'Cannot get email'"
    var displayName = "-"
    var avatarUrl = ""



  }



  


  return (
      <div className='w-fit flex-row m-auto'>
        <h1 className='text-2xl text-center mt-5 underline'>
          Your Account
        </h1>

        <img src={avatarUrl} className='w-16 rounded-lg m-auto mt-4'></img>
        <h2 className='text-center mt-4'>Name: {displayName}</h2>
        <h2 className='text-center mt-4'>Email: {displayEmail}</h2>



      </div>
  )
}

export default Account;