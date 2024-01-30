import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from '@material-ui/core'
import React from 'react'
import useStyle from './PlaceDetailsStyles'
import { LocationOnOutlined, PhoneAndroidOutlined } from '@material-ui/icons'
import  Rating  from '@material-ui/lab/Rating'

const PlaceDetails = ({place,selected,refProp}) => {

  if(selected) refProp?.current?.scrollIntoView({behavior:"smooth",block:'start'})

  const classes = useStyle()
  return (
    <Card elevation={6}>
      <CardMedia 
      
      style={{height:300}}
      image={place.photo?place.photo.images.large.url:""}
       title={place.name}
      />
      <CardContent >
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display='flex' justifyContent="space-between">
        <Rating size="small" value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant="subtitle2">out of {place.num_reviews} review</Typography>
        </Box>
        <Box display='flex' justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
        </Box>
       
        {place?.awards?.map((award)=>(
          <Box  display='flex' justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>

          </Box>
       
        ))}

{place?.cuisine?.map(({name})=>(
          <Chip key={name} size="small" label={name} className={classes.chip}></Chip>
         ))}

       {place?.address && (
        <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.subtitle}>
          <LocationOnOutlined/> {place.address}
        </Typography>
       )}
       {place?.phone && (
        <Typography gutterBottom variant='subtitle2' color="textSecondary" className={classes.spacing}>
          <PhoneAndroidOutlined/> {place.phone}
        </Typography>
       )}
       <CardActions>
        <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')}>
          Trip Adviser
        </Button>
        <Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')}>
          Website
        </Button>
       </CardActions>
        </CardContent>



    </Card>
  )
}

export default PlaceDetails