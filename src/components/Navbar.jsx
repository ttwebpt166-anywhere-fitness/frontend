import { useHistory, useRouteMatch } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { NavbarBrand, Button, NavItem, Nav } from 'reactstrap';

const NavbarView = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <NavbarBrand
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push('/');
          }}
          className={'mr-auto'}
        >
          Anywhere Fitness
        </NavbarBrand>
        {path === '/' && (
          <Nav>
            <NavItem>
              <Button
                className="mr-2"
                onClick={() => {
                  history.push('/join');
                }}
                size="sm"
              >
                Register
              </Button>
            </NavItem>
            <NavItem>
              <Button
                color="primary"
                onClick={() => {
                  history.push('/login');
                }}
                size="sm"
              >
                Login
              </Button>
            </NavItem>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarView;
