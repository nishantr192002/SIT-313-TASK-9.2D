import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Menu stackable inverted color="teal" borderless>
      <Menu.Item as={Link} to="/" header>
        DEV@Deakin
      </Menu.Item>
      <Menu.Item as={Link} to="/" content="Home" />
      <Menu.Item as={Link} to="/post" content="Post" />
      <Menu.Item as={Link} to="/PricingPlans" content="Plans" />
      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/login" name="Login" content="Login" icon="user" />
        <Menu.Item as={Link} to="/signout" name="Logout" content="Sign Out" icon="sign-out" />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;