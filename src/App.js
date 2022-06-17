import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Trips from './Trips';
import Trip from './Trip';
import About from './About';
import NotFound from './NotFound';

function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Citibike Trips</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/trips">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Navigate to="/Trips" />} />
              <Route path="/About" element={<About />} />
              <Route path="/Trips" element={<Trips />} />
              <Route path="/Trip/:id" element={<Trip />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <br /><br />
    </>
  );
}

export default App;
