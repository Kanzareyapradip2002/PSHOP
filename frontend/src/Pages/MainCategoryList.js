import React from 'react'
import { useParams } from 'react-router-dom'
import ElectronicList from '../Components/ElectronicList'
import GroceryList from '../Components/GroceryList'
import MedicinesList from '../Components/MedicinesList'
import AutoAccessoriesList from '../Components/AutoAccessoriesList'
import SportsList from '../Components/SportsList'
import FoodHealthcareList from '../Components/FoodHealthcareList'
import ToysBabyBooksList from '../Components/ToysBabyBooksList'
import BeautyPersonalCareList from '../Components/BeautyPersonalCareList'
import FurnitureList from '../Components/FurnitureList'
import HomeList from '../Components/HomeList'
import FashionList from '../Components/FashionList'

const MainCategoryList = () => {
    const params = useParams()
    const MainCategory = params.categoryName
    if(MainCategory === "grocery"){
        return(
            <GroceryList/>
        )
    }else if(MainCategory === "electronics"){
        return(
            <ElectronicList/>
        )
    }else if(MainCategory === "medicines"){
        return(
            <MedicinesList/>
        )
    }else if(MainCategory === "autoAccessories"){
        return(
            <AutoAccessoriesList/>
        )
    }else if(MainCategory === "sports"){
        return(
            <SportsList/>
        )
    }else if(MainCategory === "foodHealthcare"){
        return(
            <FoodHealthcareList/>
        )
    }else if(MainCategory === "toysBabyBooks"){
        return(
            <ToysBabyBooksList/>
        )
    }else if(MainCategory === "beautyPersonalCare"){
        return(
            <BeautyPersonalCareList/>
        )
    }else if(MainCategory === "furniture"){
        return(
            <FurnitureList/>
        )
    }else if(MainCategory === "home"){
        return(
            <HomeList/>
        )
    }else if(MainCategory === "fashion"){
        return(
            <FashionList/>
        )
    }
    

}

export default MainCategoryList