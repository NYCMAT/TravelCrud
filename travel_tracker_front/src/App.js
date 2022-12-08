import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [newLocation, setNewLocation] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newImage, setNewImage] = useState();
  const [newBeenBefore, setNewBeenBefore] = useState(false);
  const [travels, setTravels] = useState([])
 
  

  const handleNewLocationChange =  (event) => {
    // console.log(event.target.value);
    setNewLocation(event.target.value);
  }
  const handleNewDescriptionChange =  (event) => {
    // console.log(event.target.value);
    setNewDescription(event.target.value);
  }
  const handleNewImageChange =  (event) => {
    // console.log(event.target.value);
    setNewImage(event.target.value);
  }

  const handleNewBeenBeforeChange =  (event) => {
    // console.log(event.target.value);
    setNewBeenBefore(event.target.checked);
  }

  const handleNewTravelFormSubmit = (event) => {
    event.preventDefault();
    // console.log(newDescription);
    // console.log(newComplete);
    axios.post(
      'http://localhost:3000/travels',
      { 
        location: newLocation,
        description: newDescription,
        image: newImage,
        beenbefore: newBeenBefore
      }
    ).then (() => {
      axios
        .get('http://localhost:3000/travels')
        .then((response) => {
          setTravels(response.data)
        })
    })
  }

  useEffect (() => {
    axios
      .get('http://localhost:3000/travels')
      .then((response) => {
        // console.log(response.data);
        setTravels(response.data)
      })
  }, [])

  const handleDelete = (travelData) => {
    // console.log(todoData);
    axios.delete(`http://localhost:3000/travels/${travelData._id}`)
    .then(() => {
      axios
        .get('http://localhost:3000/travels')
          .then((response) => {
            setTravels(response.data)
    })
  })
}


//Update Name

const handleUpdateTravel = ( travelData)=>{
  // event.preventDefault()
  
	axios
		.put(
			`http://localhost:3000/travels/${travelData._id}`,
			{
				location: newLocation,
        description: newDescription,
        image: newImage,
        beenbefore: newBeenBefore
			}
		).then((response) => {
			axios
				.get('http://localhost:3000/travels')
				.then((response) => {
					setTravels(response.data);
				})
	})
}




  return (
    <main>
      <div>
          
          <h1>Travel Tracker!</h1>
      </div>  
      <section>
        <div class='intro'>
        <h3></h3>
        </div>
        <h2>Enter a Destination into the system</h2><br/>
        <form onSubmit={handleNewTravelFormSubmit}>
          Location: <input type="text" onChange={handleNewLocationChange}/><br/>
          Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
          Image: <input type="text" onChange={handleNewImageChange}/><br/>
          Been Before: <input type="checkbox" onChange={handleNewBeenBeforeChange}/><br/>
          <input class='submit-button' type="submit" value="Submit"/>
        </form>
      </section>
      <section>
        <h2>Destinations</h2>
        <ul>
          {
            travels.map((travel)=> {
              return <ul
                key={travel._id}
                
                >
                <div class='name'>
                  Location:<> </>
                  {travel.location}
                  <br />
                  Description: {travel.description}
                  <br />
                </div> 
                <div class="container">
                    <img src={travel.image} class='image'/><br/>
                  <div class="overlay">
                    Location: <input type="text" defaultValue={travel.location} onChange={handleNewLocationChange} /><br/>
                    Description:<input type="text" defaultValue={travel.description} onChange={handleNewDescriptionChange} /><br/>
                    Image Url: <input type="text" defaultValue={travel.image} onChange={handleNewImageChange} /><br/>
                    Been Before: {
                      (travel.beenbefore) ?
                        <input type="checkbox" defaultChecked={travel.beenbefore} onChange={handleNewBeenBeforeChange} />
                        :
                        <input type="checkbox" onChange={handleNewBeenBeforeChange} />
                    }

                    <button onClick={() => { handleUpdateTravel(travel) }}>Update Info</button>
                    
                        <button
                          onClick={(event) => {
                            handleDelete(travel)
                          }}>
                          Delete
                        </button>
              
                  </div> 
                </div>
                  
                
                
            
              
                
              </ul>
            })
            
          }
        </ul>
      </section>
    </main>
  )
}
export default App;
