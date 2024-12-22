import React from 'react'
import { useParams } from 'react-router-dom'
import PrinterList from './PrinterList'
import AirpodesList from './AirpodesList'
import TyresList from './TyresList'
import ShampooList from './ShampooList'
import JeansList from './JeansList'
import SweetList from './SweetList'
import SofasList from './SofasList'
import DetergentList from './DetergentList'
import GasstovesList from './GasstovesList'
import TabletsList from './TabletsList'
import BycycleList from './BycycleList'
import MusicinstrumentsList from './MusicinstrumentsList'

const Category = () => {
  const data = useParams()
  const Category = data.categoryName
  //----------------ElectronicList--------------------------//
  if (Category === "printers") {
    return (
      <PrinterList />
    )
  }
  if (Category === "airpodes") {
    return (
      <AirpodesList />
    )
  }
  //----------------AutoAccessoriesList--------------------------//
  if (Category === "tyres") {
    return (
      <TyresList/>
    )
  }
  //-------------------Beauty&PersonalCareList-----------------------//
  if (Category === "shampoo") {
    return (
      <ShampooList/>
    )
  }
  //-------------------FashionList-----------------------//
  if (Category === "jeans") {
    return (
      <JeansList/>
    )
  }
  //-------------------Food&HealthcareList-----------------------//
   if (Category === "sweet") {
    return (
      <SweetList/>
    )
  }
  //-------------------FurnitureList-----------------------//
   if (Category === "sofas") {
    return (
      <SofasList/>
    )
  }
  //-------------------GroceryList-----------------------//
  if (Category === "detergent") {
    return (
      <DetergentList/>
    )
  }
  //-------------------HomeList-----------------------//
  if (Category === "gasstoves") {
    return (
      <GasstovesList/>
    )
  }
  //-------------------MedicinesList-----------------------//
  if (Category === "tablets") {
    return (
      <TabletsList/>
    )
  }
  //-------------------SportsList-----------------------//
  if (Category === "bicycle") {
    return (
      <BycycleList/>
    )
  }
  //-------------------Toys_Baby_BooksList-----------------------//
  if (Category === "musicinstruments") {
    return (
      <MusicinstrumentsList/>
    )
  }
}

export default Category