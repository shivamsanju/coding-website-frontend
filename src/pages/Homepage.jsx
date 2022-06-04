import React from 'react'
import Navbar from "../components/Navbar/Navbar";
import Table from "../components/Table/Table";

const Homepage = () => {
  console.log('Homepage')
  return (
    <div className="home">
      <Navbar/>
      <Table/>
    </div>
  )
}

export default Homepage;