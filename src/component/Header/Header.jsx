import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import useStyle from "./HeaderStyles";



const Header = ({setCoordinates}) => {
  const classes = useStyle();
  const [autoComplete,setAutocomplete]= useState()

  const onLoad =(autoC)=> setAutocomplete(autoC)
  const onPlaceChanged =()=>{
    const lat= autoComplete.getPlace().geometry?.location.lat();
    const lng= autoComplete.getPlace().geometry?.location.lng();
    setCoordinates({lat,lng})
  }
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Adviser
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore New Places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search..."
              className={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
