import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Trip(){

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);

        // fetch heroku link with specific id param
        fetch(`https://agile-woodland-00111.herokuapp.com/api/trips/${id}`)
        .then(res=>res.json())
        .then(result=>{
            setLoading(false);
            if(result.hasOwnProperty("_id")){ // save result value into trips if proper _id exists
                setTrips(result);
            }else{
                setTrips(null);
            }
        })
    }, [])


    // function to handle data change within form
    function handleChange(e){
        const target = e.target;
        let value = target.value;
        const name = target.name;

        setTrips(currentTrip => {
            return {...currentTrip, [name]: value };
        })
    }


    // function to handle submit
    function handleSubmit(e){
        e.preventDefault();

        // fetch heroku link(id) to update values
        fetch (`https://agile-woodland-00111.herokuapp.com/api/trips/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(trips)
        })
        .then(res=> res.json())
        .then(result=>{
            console.log("The form was submitted: " + JSON.stringify(result));
            navigate("/trips");
        })
    };

    if (loading) { // if setLoading is true..
        return(
            <>
            <Card>
                <Card.Body>
                    <Card.Text>
                        Loading Trip Data...
                    </Card.Text>
                </Card.Body>
            </Card>
            </>
        )
    }
    else if (!trips) { // if setLoading is false, but data is null..
        return(
            <>
            <Card>
                <Card.Body>
                    <Card.Text>
                        Unable to find Trip with id: {id}
                    </Card.Text>
                </Card.Body>
            </Card>
            </>
        )
    }
    else { // data loaded
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Bike: {trips.bikeid} ({trips.usertype})</Card.Title>
                        <Card.Text>
                            {trips['start station name']} - {trips['end station name']}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <br />

                <MapContainer style={{ "height": "400px" }} center={[trips['start station location'].coordinates[1], trips['start station location'].coordinates[0]]} zoom={15}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[trips['start station location'].coordinates[1], trips['start station location'].coordinates[0]]}>
                            <Tooltip permanent direction='right'>Start: {trips['start station name']}</Tooltip>
                        </Marker>
                        <Marker position={[trips['end station location'].coordinates[1], trips['end station location'].coordinates[0]]}>
                            <Tooltip permanent direction='right'>End: {trips['end station name']}</Tooltip>
                        </Marker>
                </MapContainer>

                <br />

                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Bike ID</Form.Label>
                        <Form.Control type="number" name="bikeid" value={trips.bikeid} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birth Year</Form.Label>
                        <Form.Control type="number" name="birth year" value={trips['birth year']} onChange={handleChange} />
                    </Form.Group>
                    <Form.Check
                        type="radio"
                        label="Subscriber"
                        name="usertype"
                        value="Subscriber"
                        id="subscriber"
                        checked={trips.usertype === "Subscriber"}
                        onChange={handleChange}
                    />
                    <Form.Check
                        type="radio"
                        label="Customer"
                        name="usertype"
                        value="Customer"
                        id="customer"
                        checked={trips.usertype === "Customer"}
                        onChange={handleChange}
                    />
                    <hr />
                    <Link to="/Trips" className="btn btn-secondary float-right ml-1">Back to Trips</Link>
                    <Button type="submit" className="float-right" >Update Trip User</Button>
                </Form>
            </>
        );
    }

}
