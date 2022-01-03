
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import {NavLink as NL} from 'react-router-dom';
import './NavBar.css'

const NavBar = ({doSearch}) => {
  const [isOpen, setIsOpen] = useState(false);
  let style = {};
  return (
    <Navbar
      color="light"
      expand="md"
      light
    >
      <NavbarBrand to="/">
        Lab Results Finder
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck(){setIsOpen(open=>!open);}} />
      <Collapse navbar isOpen={isOpen}>
      <Nav style={style} vertical={isOpen} className='NavBar'>
        <NavItem>
          <NavLink tag={NL} exact to="/" activeClassName='active'>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} exact to="/searchbar" activeClassName='active'>
            Search for Records
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={NL} exact to="/search/" activeClassName='active'>
            Search Results
          </NavLink>
        </NavItem>
      </Nav>
      </Collapse>
    </Navbar>
  )
};

export default NavBar;