import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.nav`
  width: 180px;
  min-width: 180px;
  height: 100vh;
  background: linear-gradient(180deg, #1e3448 0%, #2e4661 40%, #34506e 100%);
  padding: 28px 20px 20px;
  box-shadow: 3px 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    height: auto;
    flex-direction: row;
    align-items: center;
    padding: 12px 20px;
  }
`;

const Title = styled.h2`
  margin: 0 0 32px 0;
  color: rgb(252, 215, 252);
  white-space: nowrap;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 16px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgb(252, 215, 252) 20%, transparent);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    margin: 0 28px 0 0;
    font-size: 1.1rem;
    padding-bottom: 0;

    &::after {
      display: none;
    }
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 4px;
  }
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(252, 215, 252, ${({ $active }) => ($active ? "1" : "0.75")});
  display: block;
  padding: 12px 16px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  white-space: nowrap;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  letter-spacing: 0.5px;
  position: relative;
  background-color: ${({ $active }) =>
    $active ? "rgba(255, 255, 255, 0.12)" : "transparent"};

  ${({ $active }) =>
    $active &&
    `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 60%;
      background: rgb(252, 215, 252);
      border-radius: 0 3px 3px 0;
    }
  `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
    color: rgb(252, 215, 252);
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 0.9rem;

    &::before {
      display: none;
    }

    &:hover {
      transform: none;
    }
  }
`;

const NAV_ITEMS = [
  { to: "/", label: "Calendar" },
  { to: "/records", label: "Records" },
  { to: "/about", label: "About" },
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
