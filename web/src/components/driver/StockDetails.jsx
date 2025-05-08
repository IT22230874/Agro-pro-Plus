import React from 'react'
import './body/main.css'

// import Header from'./Components/'
import Sidebar from './sidebar/Sidebar'
import Stock from './body/stockDetails/Stock'



const StockDetails = () => {
  return (
    <div>
      {/* <Header /> */}
      <Sidebar />
      <Stock />
    </div>
  )
}

export default StockDetails