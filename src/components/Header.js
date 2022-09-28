import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    //console.log(location)


    function pathMatchRoute(route) {
        if (route === location.pathname) {
          return true;
        }
      }



  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
          {/* logo */}
            <div className=''>
                    <img  className="h-5 cursor-pointer"
               onClick={() => navigate("/")} src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt='logo'/>
 
                </div>

                {/* menu */}
                <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sign-in") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {/* {pageState} */}
            </li>

           
          </ul>
        </div>
        </header>
    </div>
  )
}
