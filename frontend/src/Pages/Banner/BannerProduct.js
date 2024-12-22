import React, { useEffect, useState } from 'react'
import image1 from '../../assest/banner/img1.webp'
import image2 from '../../assest/banner/img2.webp'
import image3 from '../../assest/banner/img3.webp'
import image4 from '../../assest/banner/img4.webp'
import image5 from '../../assest/banner/img5.webp'
import image1Mobile from '../../assest/banner/img1_mobile.jpg'
import image2Mobile from '../../assest/banner/img2_mobile.jpg'
import image3Mobile from '../../assest/banner/img3_mobile.jpg'
import image4Mobile from '../../assest/banner/img4_mobile.jpg'
import image5Mobile from '../../assest/banner/img5_mobile.jpg'
import { FaAngleRight } from 'react-icons/fa6'
import { FaAngleLeft } from 'react-icons/fa6'

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImage = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]
    const mobilesImage = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ]

    const nextImage = () =>{
        if(desktopImage.length-1 > currentImage){
            setCurrentImage(preve => preve+1)
        }
    }
    const PrevImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImage.length-1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }

        },4000)

        return () => clearInterval(interval)
    },[currentImage])
    return (
        <div className=' container mx-2 rounded pb-28 '>
            <div className='h-64 w-[1240px] bg-slate-200 relative'>
                <div className=' absolute  z-10 w-full h-full md:flex items-center hidden '>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={PrevImage} className='bg-white ml-2 shadow-md rounded-full p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white mr-2 shadow-md rounded-full p-1'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <div className='flex w-full h-full overflow-hidden'>
                    {
                        desktopImage.map((imageUrl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full' key={imageUrl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageUrl} className='h-full w-full' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct