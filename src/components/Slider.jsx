
import { async } from '@firebase/util'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { db } from '../firebase'
import { Swiper,SwiperSlide  } from 'swiper/react'
import SwiperCore ,{EffectFade ,Autoplay,Navigation,Pagination} from 'swiper'
import "swiper/css/bundle"
import { useNavigate } from 'react-router-dom'


export default function Slider() {
    const [listings ,setListings] = useState(null)
const [loading ,setLoading] = useState(true)
SwiperCore.use([EffectFade ,Autoplay,Navigation,Pagination])
const navigate =useNavigate()

  useEffect(()=>{
    async function fetchListings(){
      const listingRef =collection(db , "listings")
      const q = query(listingRef ,orderBy("timestamp" ,"desc"),limit(5))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) =>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      setListings(listings)
      console.log(listings)
     setLoading(false)
    }
    fetchListings()
  },[])

  if(loading){
    return(
      <Spinner/>
    )
  }
  if(listings.length === 0){
    return <></>
  }
  return (
   listings && (
    <>
   <Swiper 
    slidesPerView={1}
    navigation
    pagination={{type: "progressbar"}}
    effect='fade'
    modules={{EffectFade}}
    autoplay={{delay:3000}}
   >
   {listings.map((data ,id)=>(
    //console.log(data)
        // <h1 key={listing.id}>{listing.data.imgUrls[0]}</h1>
        <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
              <div style={{background:`url(${data.data.imgUrls[0]}) center ,no-repeat, backgroundSize:cover` }}
              className="relative w-full h-[300px] overflow-hidden"
              >
              <p className='text-[#eccea0] absolute left-1 top-3 font-medium p-1 max-w-[90%] bg-slate-50 '>{data.data.name}</p>
              <p className='text-[#eccea0] absolute left-1 bottom-1 font-medium p-2 max-w-[90%] bg-slate-100 '>
                {data.data.discountedPrice ?? data.data.regularPrice} {data.data.type === 'rent' && '/month'}</p>
              </div>
        </SwiperSlide>
    ))}
   </Swiper>
    </>
   )
  )
}
