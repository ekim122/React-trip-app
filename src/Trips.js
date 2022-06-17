import { useState, useEffect } from "react";
import { Badge, Card, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Trips(){

    const [trips, setTrips] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        setPage(page);
        const perPage = 10;
        setLoading(true);

        // fetch database from heroku api
        fetch(`https://agile-woodland-00111.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`)
        .then(res=>res.json())
        .then(result=>{
            setTrips(result);
            setLoading(false);
        })
    }, [page]);


    // previous page function
    function previousPage(){
        if (page > 1){
            setPage((page) => page - 1)
        }
    };


    // next page function
    function nextPage(){
        setPage((page) => page + 1)
    };


    if (loading) { // if setLoading is true..
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            Loading Trips...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );
    }
    else { // data loaded
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Trips List</Card.Title>
                        <Card.Text>
                            Full list of Citibike Trips.
                            <span className="float-right">
                                <Badge className="Subscriber">Subscribers</Badge>
                                &nbsp;
                                <Badge className="Customer">Customers</Badge>
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <br />
                
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Bike ID</th>
                            <th>Start Station</th>
                            <th>End Station</th>
                            <th>Duration (Minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            trips?.map(trip=>(
                                 <tr key={trip._id} onClick={(e)=>{navigate(`/trip/${trip._id}`) }} className={trip.usertype}>
                                     <td>{trip.bikeid}</td>
                                     <td>{trip['start station name']}</td>
                                     <td>{trip['end station name']}</td>
                                     <td>{(trip.tripduration/60).toFixed(2)}</td>
                                 </tr>
                            ))
                        }
                    </tbody>
                </Table>

                <Pagination>
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            </>
        );
    }

}