// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PRIMARY_MENU } from '../graphql/queries';

const Navbar = () => {
  // Replace 'PRIMARY' with your actual menu slug
  const { loading, error, data } = useQuery(GET_PRIMARY_MENU, {
    variables: { id: 'Main Menu' },
  });

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error loading menu: {error.message}</p>;

  // If data is returned successfully, extract menu items
  const menuItems = data.menu?.menuItems?.edges || [];

  return (
    <nav className="nav">
      <ul className="navbar-nav">
        {menuItems.map(({ node }) => {
          // WPGraphQL for Menus typically provides 'url' or 'path'
          // 'url' might be a full URL. If it's an internal link,
          // you can transform it or use 'path' if available.
          // For now, we'll assume you're using React Router internal links.
          return (
            <li className="nav-item" key={node.id}>
              <Link to={node.path} className="nav-link">
                {node.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
