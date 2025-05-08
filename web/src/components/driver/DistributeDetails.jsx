import React from 'react'
import './body/main.css'

// import Header from'./Components/'
import Sidebar from './sidebar/Sidebar'
import Distribute from './body/distributeDetails/Distribute'



const DistributeDetails = () => {
  return (
    <div>
      {/* <Header /> */}
      <Sidebar />
      <Distribute />
    </div>
  )
}

export default DistributeDetails