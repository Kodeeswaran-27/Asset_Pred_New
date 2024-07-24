import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
// import './AboutPage.css';

function AboutPage() {
  // const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="header">
        <h1>Welcome to [Your Company Name]</h1>
        <h2>Innovating Enterprise Asset Management with AI</h2>
      </div>

      <section className="mission card fade-in">
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower enterprises with intelligent tools that provide actionable insights into asset management.
          We strive to transform complex data into strategic decisions, ensuring our clients are always a step ahead in their operations.
        </p>
      </section>

      <section className="problem-solution">
        <div className="card slide-up">
          <h2>The Challenge</h2>
          <p>
            Managing assets effectively is a critical challenge for enterprises worldwide.
            Traditional methods often fall short in providing the agility and foresight needed to adapt to changing business environments.
          </p>
        </div>

        <div className="card slide-up">
          <h2>Our Solution</h2>
          <p>
            Our AI-driven platform bridges this gap by offering predictive analytics that forecast future asset needs.
            By utilizing machine learning models, we deliver precise recommendations, enabling companies to maintain optimal asset levels and reduce costs.
          </p>
        </div>
      </section>

      <section className="features-benefits">
        <div className="card fade-in">
          <h2>Key Features</h2>
          <ul>
            <li><strong>AI-Powered Predictive Analytics:</strong> Harness the power of machine learning to anticipate asset requirements accurately.</li>
            <li><strong>Real-Time Data Insights:</strong> Access up-to-date analytics to make informed decisions swiftly.</li>
            <li><strong>Customizable Dashboards:</strong> Tailor your view to focus on the metrics that matter most to your business.</li>
            <li><strong>Seamless Integration:</strong> Easily integrate with existing enterprise systems for a smooth transition.</li>
          </ul>
        </div>

        <div className="card fade-in">
          <h2>Benefits</h2>
          <ul>
            <li><strong>Enhanced Efficiency:</strong> Optimize asset management processes to save time and resources.</li>
            <li><strong>Cost Reduction:</strong> Minimize excess inventory and reduce unnecessary expenditures.</li>
            <li><strong>Increased Agility:</strong> Adapt quickly to market changes with actionable insights.</li>
            <li><strong>Strategic Planning:</strong> Leverage data-driven strategies for long-term growth and sustainability.</li>
          </ul>
        </div>
      </section>

      <section className="testimonials card fade-in">
        <h2>What Our Clients Say</h2>
        <blockquote>
          "Using [Your Company Name]'s AI platform has transformed our asset management approach,
          providing us with invaluable insights that have saved us both time and money."
          - [Client Name], [Client Position]
        </blockquote>
        <blockquote>
          "The predictive analytics feature is a game-changer for us.
          It helps us stay ahead of demand and manage our assets more effectively."
          - [Client Name], [Client Position]
        </blockquote>
      </section>

      <section className="team card fade-in">
        <h2>Meet Our Team</h2>
        <p>
          Our team consists of industry experts, data scientists, and technology enthusiasts dedicated to delivering the best asset management solutions.
          We believe in fostering a culture of innovation and excellence to drive results for our clients.
        </p>
      </section>

      <section className="contact card fade-in">
        <h2>Get in Touch</h2>
        <p>
          We’re here to help! Contact us for more information about how our AI asset management solutions can benefit your enterprise.
        </p>
        <p>Email: info@yourcompany.com</p>
        <p>Phone: +123-456-7890</p>
        <p>Address: 123 Asset Lane, Enterprise City, Country</p>
      </section>

      <AuthenticatedTemplate>
        <button className="navigate-button">Go to Dashboard</button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <button className="navigate-button">Login</button>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default AboutPage;