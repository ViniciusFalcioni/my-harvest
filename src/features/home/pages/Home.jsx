import React from "react"
import Featured from "../components/Featured"
import Hero from "../components/Hero"
import Location from "../Location"
import Price from "../../staticContent/pages/Price"
import Recent from "../components/Recent"
import Team from "../components/Team"

const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
      <Recent />
      <Location />
      <Team />
      <Price />
    </>
  )
}

export default Home
