// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>StudBuddy – Your Smart Study Companion</h1>
        <p>Plan smarter, track progress, and achieve your study goals.</p>
        <div className="buttons">
          <Link to="/login">
            <button className="primary">Get Started</button>
          </Link>
          <Link to="/sessions/create">
            <button className="secondary">Plan a Session</button>
          </Link>
          <Link to="/reflections">
            <button className="secondary">Reflections</button>
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose StudBuddy?</h2>
        <p>Everything you need to stay organized, motivated, and on track with your studies.</p>

        <div className="feature-list">
          <div className="feature">
            <span role="img" aria-label="calendar" className="icon">📅</span>
            <h3>Plan</h3>
            <p>Schedule sessions and set clear goals to maximize your productivity.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="chart" className="icon">📊</span>
            <h3>Track</h3>
            <p>Monitor your progress in real time and stay motivated along the way.</p>
          </div>
          <div className="feature">
            <span role="img" aria-label="notes" className="icon">📝</span>
            <h3>Reflect</h3>
            <p>Review your notes and reflect on what you’ve learned after each session.</p>
          </div>
        </div>
      </section>

      <blockquote className="quote">
        “Small steps every day lead to big results.”
      </blockquote>
    </main>
  );
}
