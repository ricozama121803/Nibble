import { UserLocationContext } from '@/context/UserLocationContext';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext } from 'react'
import Markers from './Markers';

function GoogleMapView({businessList}) {
    const {userLocation,setUserLocation}=useContext(UserLocationContext);


    const ContainerStyle={
        width:'100%',
        height: '70vh'
    }
   const coordinate = { lat:34.127, lng:-117.882}
   console.log(userLocation)
  return (
    <div>
        <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        mapIds={['b410f7e77f235167']}
        >
            <GoogleMap
            mapContainerStyle={ContainerStyle}
            center={userLocation}
            options={{mapId: 'b410f7e77f235167'}}
            zoom={12}
            >
                
            <MarkerF
            position={userLocation}
            icon={{url:'/user-location.png',
                scaledSize:{
                    width:50,
                    height:50}
            }}
            />
            {businessList.map((item, index)=>index<=7&&(
                <Markers business={item} key={index}/>
            ))}

            </GoogleMap>
        </LoadScript>
    </div>
  )
}

export default GoogleMapView