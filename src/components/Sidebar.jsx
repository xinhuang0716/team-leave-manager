import React from "react";
import { NavLink } from "react-router-dom";
import {
  CalendarBlank,
  ChartDonut,
  Info,
  Toolbox,
} from "@phosphor-icons/react";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  height: 100dvh;
  flex-direction: column;
  padding: 26px 16px 22px;
  overflow: hidden;
  border-right: 1px solid var(--border);
  background: rgba(29, 49, 73, 0.98);

  @media (max-width: 860px) {
    position: fixed;
    top: auto;
    right: 12px;
    bottom: 12px;
    left: 12px;
    width: auto;
    height: 66px;
    padding: 7px;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-surface);
    background: rgba(38, 61, 88, 0.98);
    box-shadow: 0 18px 42px rgba(0, 6, 16, 0.46);
    backdrop-filter: blur(16px);
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px 26px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const BrandMark = styled.div`
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(var(--primary-rgb), 0.25);
  border-radius: var(--radius-control);
  background: var(--primary-soft);

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const BrandName = styled.p`
  margin: 0;
  color: var(--text-primary);
  font-size: 0.94rem;
  font-weight: 700;
  letter-spacing: -0.015em;
`;

const BrandCaption = styled.span`
  display: block;
  margin-top: 1px;
  color: var(--sidebar-muted);
  font-size: 0.72rem;
  font-weight: 500;
`;

const NavLabel = styled.p`
  margin: 16px 10px 9px;
  color: #96a8ba;
  font-size: 0.67rem;
  font-weight: 650;
  letter-spacing: 0.09em;
  text-transform: uppercase;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 860px) {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 3px;
  }
`;

const StyledLink = styled(NavLink)`
  position: relative;
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 11px;
  padding: 0 12px;
  border-radius: var(--radius-control);
  color: var(--sidebar-muted);
  font-size: 0.86rem;
  font-weight: 590;
  text-decoration: none;
  transition:
    background var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);

  svg {
    flex: 0 0 auto;
    color: #a0b3c5;
    transition: color var(--transition-fast);
  }

  &::before {
    position: absolute;
    top: 12px;
    bottom: 12px;
    left: -1px;
    width: 2px;
    border-radius: 2px;
    background: transparent;
    content: "";
  }

  &:hover {
    background: rgba(var(--border-rgb), 0.045);
    color: var(--text-primary);

    svg {
      color: var(--text-secondary);
    }
  }

  &:active {
    transform: scale(0.985);
  }

  &.active {
    background: var(--primary-faint);
    color: var(--primary-strong);

    svg {
      color: var(--primary);
    }

    &::before {
      background: var(--primary);
    }
  }

  @media (max-width: 860px) {
    min-width: 0;
    min-height: auto;
    justify-content: center;
    flex-direction: column;
    gap: 3px;
    padding: 4px 2px;
    font-size: 0.65rem;

    &::before {
      display: none;
    }

    &.active {
      background: var(--primary-soft);
    }
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 18px 10px 0;
  border-top: 1px solid var(--border);
  color: #96a8ba;
  font-size: 0.71rem;
  line-height: 1.55;

  strong {
    display: block;
    margin-bottom: 3px;
    color: var(--text-secondary);
    font-size: 0.76rem;
    font-weight: 620;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const NAV_ITEMS = [
  { to: "/", label: "Calendar", icon: CalendarBlank, end: true },
  { to: "/records", label: "Records", icon: ChartDonut },
  { to: "/tools", label: "Tools", icon: Toolbox },
  { to: "/about", label: "About", icon: Info },
];

const Sidebar = () => (
  <SidebarContainer>
    <Brand>
      <BrandMark>
        <img src="/vite.svg" alt="" aria-hidden="true" />
      </BrandMark>
      <div>
        <BrandName>Team Leave</BrandName>
        <BrandCaption>Planner</BrandCaption>
      </div>
    </Brand>

    <NavLabel>Workspace</NavLabel>
    <NavList aria-label="Primary navigation">
      {NAV_ITEMS.map(({ to, label, icon, end }) => (
        <StyledLink key={to} to={to} end={end}>
          {React.createElement(icon, {
            size: 19,
            weight: "regular",
            "aria-hidden": "true",
          })}
          <span>{label}</span>
        </StyledLink>
      ))}
    </NavList>

    <SidebarFooter>
      <strong>Team workspace</strong>
      Plan time away with clarity.
    </SidebarFooter>
  </SidebarContainer>
);

export default Sidebar;
