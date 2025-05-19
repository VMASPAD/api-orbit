import React from 'react'

function ConnectApi({apiName, dataUser}: {apiName: string, dataUser: any}) {
    console.log("dataUser", dataUser)
  return (
    <div>
      <h1 className='text-2xl font-bold'>Connect to {apiName}</h1>
      <form>
        <label>
          Get Data:
          <p>{process.env.NEXT_PUBLIC_API_SERVER}/api/content</p>
        </label>
        <label>
          API Keys (HEADERS):
          <p>username: {dataUser.primaryEmailAddressId}</p>
          <p>password: {dataUser.id}</p>
          <p>email: {dataUser.email}</p>
        </label>
      </form>
    </div>
  )
}

export default ConnectApi
