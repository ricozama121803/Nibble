'use client'
import BusinessList from "@/components/Home/BusinessList";
import CategoryList from "@/components/Home/CategoryList";
import GoogleMapView from "@/components/Home/GoogleMapView";
import RangeSelect from "@/components/Home/RangeSelect";
import SelectRating from "@/components/Home/SelectRating";
import SkeletonLoading from "@/components/SkeletonLoading";
import { UserLocationContext } from "@/context/UserLocationContext";
import GlobalApi from "@/Shared/GlobalApi";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [category, setCategory] =useState();
  const [radius, setRadius] = useState(2500);  //if fails enter 2500 here and in RangeSelect file
  const [businessList, setBusinessList] = useState([]);
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {

    if (!session?.user) {
      router.push("/Login")
    }

  }, [session])

useEffect(()=>{
  getGooglePlace();
},[category, radius])

const getGooglePlace=()=>{
  setLoading(true)
  GlobalApi.getGooglePlace(category, radius, userLocation.lat, userLocation.lng).then(resp=>{
    //console.log(resp.data.product.results)
    setBusinessList(resp.data.product.results);
    //setBusinessListOrg(resp.data.product.results);
    setLoading(false)

  })
  
}

  return (
    <div className="grid 
    grid-cols-1
    md:grid-cols-4 h-screen ">
      <div className="p-3 bg-black">
        <CategoryList onCategoryChange={(value)=>setCategory(value)} />
        <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>
        <SelectRating onRatingChange={(value)=>onRatingChange(value)}/>
      </div>
      <div className=" col-span-3">
        <GoogleMapView businessList={businessList} />
        <div className="md:absolute w-[90%] md:w-[71%]
        ml-6 md:ml-10 bottom-36 relative md:bottom-3">
        {!loading? <BusinessList businessList={businessList} />
          :
          <div className="flex gap-3">
            {[1,2,3,4,5].map(item=>(
              <SkeletonLoading/>
            ))}
          </div>
            }
        </div>
      </div>

    </div>

  )
}
