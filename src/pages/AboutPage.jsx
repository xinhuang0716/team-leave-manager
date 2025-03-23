import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
      <div className="about-page">
        <section id="overview">
          <h2>Overview</h2>
          <p>
            This project aims to create a leave management system that provides
            department colleagues with a user-friendly web interface to apply
            for leave and view the leave schedules of other team members.
          </p>
        </section>
        <section id="features">
          <h2>Features</h2>
          <ul>
            <li>Built with full-stack separation architecture.</li>
            <li>
              An intuitive interface that allows users to operate with just a
              few clicks.
            </li>
          </ul>
        </section>
        <section id="usage">
          <h2>Usage</h2>
          <p>
            1. Use Calendar page to view the leave schedules of other team
            members
          </p>
          <p>2. Use Records page to view or delete the leave records</p>
          <p>3. Click Add-Leave-botton on Calendar page to create new leave</p>
          <p>
            4. For further elasbration, refer to the README file in
            team-leave-manager repo
          </p>
        </section>
        <section id="contributing">
          <h2>Contributors</h2>
          <p>tom.h.huangfubon.com</p>
          <p>jason.hp.hsu@fubon.com</p>
        </section>
      </div>
  );
}

export default AboutPage;
