import React, { createRef, useEffect, useState } from 'react'
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import useStyle from './ListStyles'
import PlaceDetails from '../PlaceDetails/PlaceDetails';


const List = ({places,childClicked,loader,type,setType,rating,setRating}) => {

const [elRefs,setEleRefs]= useState([])
 

// to achive when you click on any paper image on map list automatic  scroll to that restaurant

useEffect(()=>{

const refs = Array(places?.length).fill().map((_,i)=> elRefs[i] || createRef())
setEleRefs(refs)
},[places])


  const classes = useStyle()
  return (
    <div className={classes.container}>
      <Typography>Restaurants, Hotels & Attractions around you</Typography>
      {
    loader? (
      <div className={classes.loading}>
     <CircularProgress size="5rem"/>
      </div>
    ):
      
(<>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={e=>setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
          
        </Select>

      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Ratings</InputLabel>
        <Select value={rating} onChange={e=>setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>above 3.0</MenuItem>
          <MenuItem value={4}>above 4.0</MenuItem>
          <MenuItem value={4.5}>above 4.5</MenuItem>

          
        </Select>

      </FormControl>
      <Grid container spacing={3} className={classes.list} >

         {places?.map((place,i)=>(
       <Grid ref={elRefs[i]} item key={i} xs={12}>
          <PlaceDetails 
          place={place}
          selected={Number(childClicked )=== i}
          refProp = {elRefs[i]}
          />
       </Grid>
         ))}
      </Grid>
    </>)
}
    </div>
  )
}

export default List