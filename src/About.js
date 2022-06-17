import { Card } from 'react-bootstrap';

export default function About(){
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>About</Card.Title>
                    <Card.Text>
                        All about me - the developer.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <p>
                Hi, my name is Eun Dong Kim, currently at 4th semester of Computer Programming Analysis program at Seneca College. 
                I have completed several computer programming courses such as WEB222, WEB322, IPC144, OOP244, OOP345, DBS211, and DBS311.
                I often enjoy playing computer games and taking care of indoor plants during free times.
                I am currently interested in programming related to robotics/objects and web services. My future goal is to become a web developer.
            </p>
        </>
    );
}