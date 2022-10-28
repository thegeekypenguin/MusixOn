import React from "react";
import { Card,Button } from "react-bootstrap";
// import Rating from "./Rating";
import { Link } from 'react-router-dom'


function Song({ song }) {

  console.log(song.links.images[0])
  return (
<Card className="my-3 p-3 rounded" style={{ cursor:'pointer' }}>
 
 {/* <Link to={`/item/${item._id}`}> */}
 <Card.Img src={song.links.images[0].url} style={{  height: "15vw" ,  objectFit: "cover" }}/>
 {/* </Link> */}

 <Card.Body>
   {/* <Link to={`/item/${item._id}`}> */}
     <Card.Title>
          <strong>{song.name}</strong>
         
        </Card.Title>
        <div>Singer: {song.author}</div>
   {/* </Link> */}
       {/* use it as a div */}
   
   {/* <Card.Text as="div">
     <div className="my-3">

       <Rating
         value={item.rating}
         text={`${item.numReviews} reviews`}
         color={"#f8e825"}
       />
     </div>
   </Card.Text>

   <Card.Text as="h3">Rs {item.price}</Card.Text> */}
 </Card.Body>
</Card>
//   borders to be rounded
 
  );
}

export default Song;

