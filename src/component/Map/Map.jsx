import React, { useState } from 'react'
import useStyle from './MapStyles'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';
import Rating  from '@material-ui/lab/Rating'

const Map = ({setCoordinates,coordinates,setBounds,places,setChildClicked}) => {
  const classes = useStyle();
  const isDesktop =useMediaQuery('(min-width:600px)')
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
       bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
       defaultCenter={coordinates}
       center={coordinates}
       defaultZoom={14}
       margin={[50,50,50,50]}
       options={''}
       onChange={(e)=>{
        setCoordinates({lat:e.center.lat,lng:e.center.lng})
        setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
       }}
       onChildClick={(child)=>setChildClicked(child)}
      >
     {places?.map((place,i)=>(
     <div 
     className={classes.markerContainer}
     lat={Number(place.latitude)}
     lng={Number(place.longitude)}
     key={i}

     >
  {
    !isDesktop? 
    ( <LocationOnOutlined color="primary" fontSize="large"/>)
    :( <Paper elevation={3} className={classes.paper}>
       <Typography variant='subtitle2' className={classes.typography} gutterBottom>{place.name}</Typography>
       <img 
       className={classes.pointer}
       src={place.photo? place.photo.images.large.url:""}
       alt={place.name}
         />
         <Rating size="small" value={Number(place.rating)} readOnly/>
    </Paper>)
  }
     </div>
     ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map