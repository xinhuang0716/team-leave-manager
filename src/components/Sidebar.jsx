import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 150px;
  min-width: 150px;
  height: 100vh;
  background-color: #2e4661;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(61, 145, 170, 0.5);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    width: 180px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding: 10px 16px;

    &:hover {
      width: 100%;
    }
  }
`;

const Title = styled.h2`
  margin: 0 0 20px 0;
  color: rgb(252, 215, 252);
  white-space: nowrap;

  @media (max-width: 768px) {
    margin: 0 24px 0 0;
    font-size: 1.1rem;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: flex;
    gap: 4px;
  }
`;

const NavItem = styled.li`
  margin: 10px 0;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgb(252, 215, 252);
  display: block;
  padding: 15px;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.3s;
  white-space: nowrap;
  background-color: ${({ $active }) => ($active ? '#807f7f' : 'transparent')};

  &:hover {
    background-color: #807f7f;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 0.9rem;

    &:hover {
      transform: none;
    }
  }
`;

const NAV_ITEMS = [
  { to: '/', label: 'Calendar' },
  { to: '/records', label: 'Records' },
  { to: '/about', label: 'About' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Title>LeaVe ^^</Title>
      <NavList>
        {NAV_ITEMS.map(({ to, label }) => (
          <NavItem key={to}>
            <StyledLink to={to} $active={location.pathname === to}>
              {label}
            </StyledLink>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
