import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <div className="shadow p-3 bg-white rounded ">
      <Navbar>
        <Container className="justify-content-center">
          <Navbar.Brand className="brand-container">
            <strong className="main-title"> HackerNewsStory </strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
