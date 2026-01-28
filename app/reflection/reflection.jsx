import React from 'react';
import RequireRole from '../components/RequireRole';
import Link from 'next/link';
import './reflection.css';

function ReflectionInner({ rbac }) {
  const answers = {
    challenge:
      'What challenged me the most was the CSS Styling. Understanding the different between global.css, layout.css and any other css files created a setback.',
    change:
      'I would add more features to the web-app so it gives a warmer feeling to donors.',
    learned:
      'What ive learned about building real products is that every single piece of information is crucial to having a successful outcome.',
    ai:
      'AI helped with explaining the process of how Role-Based Access is applied. Along with that I had the ability to create different TDL to help get through the project.',
  };

  return (
    <div className="reflection-root">
      <div className="reflection-container">
        <div className="reflection-header">
          <h1 className="reflection-title">Reflection</h1>
          <Link href="/admin" className="reflection-backlink">
            Back to Admin Dashboard
          </Link>
        </div>

        <p className="reflection-purpose">Purpose: Show learning, growth, and decision-making</p>

        <div className="reflection-grid">
          <article className="reflection-card">
            <div className="card-title">What challenged you the most?</div>
            <div className="card-body">{answers.challenge || <span className="no-answer">No answer provided.</span>}</div>
          </article>

          <article className="reflection-card">
            <div className="card-title">What would you change or add if you had more time?</div>
            <div className="card-body">{answers.change || <span className="no-answer">No answer provided.</span>}</div>
          </article>

          <article className="reflection-card">
            <div className="card-title">What you learned about building real products</div>
            <div className="card-body">{answers.learned || <span className="no-answer">No answer provided.</span>}</div>
          </article>

          <article className="reflection-card">
            <div className="card-title">How AI helped (or where it didn’t)</div>
            <div className="card-body">{answers.ai || <span className="no-answer">No answer provided.</span>}</div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function ReflectionWrapper() {
  return (
    <RequireRole>
      <ReflectionInner />
    </RequireRole>
  );
}
