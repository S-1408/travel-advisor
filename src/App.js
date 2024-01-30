import React, { useState, useEffect } from "react";
import Header from "./component/Header/Header";
import List from "./component/List/List";
import Map from "./component/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading,setIsLoading]= useState(false)
  const [type,setType]= useState('restaurants')
  const [rating,setRating]= useState('')
  const [filteredPlaces,setFilteredPlaces]= useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if(bounds.sw && bounds.ne){
      setIsLoading(true)
      getPlacesData(type,bounds?.sw, bounds?.ne).then((data) => {
        console.log("data", data);
        setPlaces(data?.filter((place)=> place.name &&place.num_reviews>0));
        setFilteredPlaces([])
        setIsLoading(false)
      });
    }
    
  }, [type,bounds, coordinates]);

  useEffect(()=>{
  const filteredPlaces = places?.filter((place)=>place.rating>rating)
  setFilteredPlaces(filteredPlaces)
  },[rating])

  return (
    <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length? filteredPlaces:places}
          childClicked={childClicked} 
          loader={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length? filteredPlaces:places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
