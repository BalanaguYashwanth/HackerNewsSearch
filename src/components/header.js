import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <div className="shadow p-3 bg-white rounded ">
      <Navbar>
        <Container className="justify-content-center">
          {/* <Nav.Item>
            <span class="sub-title"> Videos </span>
          </Nav.Item>
          <Nav.Item>
            <span class="sub-title"> Companies </span>
          </Nav.Item> */}
          <Navbar.Brand className="brand-container">
            <strong className="main-title"> NewsStory </strong>
          </Navbar.Brand>
          {/* <Nav.Item>
            <span class="sub-title"> Events </span>
          </Nav.Item>
          <Nav.Item>
            <span class="sub-title"> More </span>
          </Nav.Item> */}
        </Container>
      </Navbar>
    </div>
  );
}
