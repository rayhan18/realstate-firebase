
import { collection, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import Slider from '../components/Slider'
import { db } from '../firebase'


export default function Home() {
//offers the home page 

const [offerListings , setOfferListings] =useState(null)

useEffect(()=>{
async function fachListings() {
   try {
    //get listing
    const listingRef = collection(db , "listings")
    //create query
    const q = query(listingRef,where("offer", "==",true),orderBy('timestamp','desc'),limit(4))
    const querySnap = await getDocs(q)
    const listings = []
    querySnap.forEach(element => {
      return listings.push({
        id: element.id,
        data: element.data()
      })
    });
    setOfferListings(listings)
    //console.log(listings ,'listing')
   } catch (error) {
    console.log(error)
   }
}
fachListings()
},[])

//plase for rent
const [rentListings , setRentListings] =useState(null)

useEffect(()=>{
async function fachListings() {
   try {
    //get listing
    const listingRef = collection(db , "listings")
    //create query
    const q = query(
      listingRef,
      where("type", "==","rent"),
      orderBy('timestamp','desc'),
      limit(4))
    const querySnap = await getDocs(q)
    const listings = []
    querySnap.forEach(element => {
      return listings.push({
        id: element.id,
        data: element.data()
      })
    });
    setRentListings(listings)
    //console.log(listings ,'rent')
   } catch (error) {
    console.log(error)
   }
}
fachListings()
},[])

//plase for sell 
const [saleListings , setSaleListings] =useState(null)

useEffect(()=>{
async function fachListings() {
   try {
    //get listing
    const listingRef = collection(db , "listings")
    //create query
    const q = query(
      listingRef,
      where("type", "==","sale"),
      orderBy('timestamp','desc'),
      limit(4))
    const querySnap = await getDocs(q)
    const listings = []
    querySnap.forEach(element => {
      return listings.push({
        id: element.id,
        data: element.data()
      })
    });
    setSaleListings(listings)
    console.log(listings ,'rent')
   } catch (error) {
    console.log(error)
   }
}
fachListings()
},[])
  return (
    <div>
       <Slider/>
       <div className='max-w-6xl mx-auto pt-4 space-y-6'>
        {/* //offerListings */}
        {offerListings && offerListings.length > 0 && (
          <div className='m-2 mb-16'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent offers</h2>
            <Link to="/offers">
             <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>

            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
            {offerListings.map((listing)=>(
               <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {/* //rentListings */}
         {rentListings && rentListings.length > 0 && (
          <div className='m-2 mb-16'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent rents</h2>
            <Link to="/category/rent">
             <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more pleses for rent</p>

            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
            {rentListings.map((listing)=>(
               <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}

         {/* // sales Listings */}
         {saleListings && saleListings.length > 0 && (
          <div className='m-2 mb-16'>
            <h2 className='px-3 text-2xl mt-6 font-semibold'>Recent sale</h2>
            <Link to="/category/sale ">
             <p className='px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more pleses for rent</p>

            </Link>
            <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4'>
            {saleListings.map((listing)=>(
               <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
       </div>
    </div>
  )
}
