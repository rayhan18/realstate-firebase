import { async } from '@firebase/util'
import { collection, getDocs, limit, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore'
import React, { useEffect,useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

export default function Offers() {
  const [listings ,setListing]= useState(null) 
const [loading ,setLoading]= useState(true)
const [lastFetchListing ,setLastFetchListing]= useState(null)


useEffect(()=>{
 async function fetchListings(){
  try {
    const listingRef = collection(db , "listings")
    const q =query(listingRef ,where("offer" ,"==",true),
    orderBy('timestamp','desc'),
    limit(10)
    )
   const  querySnap = await getDocs(q)
   const lastvigibale = querySnap.docs[querySnap.docs.length -1]
  setLastFetchListing(lastvigibale)
   const listings =[]
   querySnap.forEach(doc => {
    return listings.push({
      id: doc.id,
      data: doc.data()
    })
   })
   setListing(listings)
   //console.log(listings ,'offers')
   setLoading(false)
  } catch (error) {
    toast.error("could not fetch listing")
  }
 }
 fetchListings()
},[])

// add more button
async function onfatchMoreListing(){
  try {
    const listingRef = collection(db , "listings")
    const q =query(listingRef ,where("offer" ,"==",true),
    orderBy('timestamp','desc'),
    startAfter(lastFetchListing),
    limit(4)
    )
   const  querySnap = await getDocs(q)
   const lastvigibale = querySnap.docs[querySnap.docs.length -1]
  setLastFetchListing(lastvigibale)
   const listings =[]
   querySnap.forEach(doc => {
    return listings.push({
      id: doc.id,
      data: doc.data()
    })
   })
   setListing((prevState)=>[...prevState , ...listings])
   //console.log(listings ,'offers')
   setLoading(false)
  } catch (error) {
    toast.error("could not fetch listing")
  }
 }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h2 className='text-3xl text-center mt-6 font-bold mb-6'> Offers</h2>
   {loading ? (<Spinner/>):
    listings && listings.length > 0 ? (
    <>
    <main>
      <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-4  xl:grid-cols-4 '>
        {listings.map((listing)=>(
          <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
        ))}
      </ul>
    </main>
    {lastFetchListing && (
      <div className=' flex justify-center items-center'>
        <button onClick={onfatchMoreListing} className='bg-white px-3 py-1.5 text-gray-700 border-color-gray-300 mb-6 mt-6 hover:border-slate-800 rounded transition duration-150 ease-in-out'>Load more</button>
      </div>
    )}
    </>):(
      <p> there are no Offers</p>
    )
   }
    </div>
  )
}
