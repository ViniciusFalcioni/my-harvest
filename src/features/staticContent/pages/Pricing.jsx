import React from "react"
import Back from "../../../components/UI/Back"
import PriceCard from "./PriceCard"
import img from "../../../components/images/pricing.jpg"
import "./price.css"

const Pricing = () => {
  return (
    <>
      <section className='pricing mb'>
        <Back name='30 days money back guarantee' title='No Extra Fees. Friendly Support' cover={img} />
        <div className='price container'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Pricing
