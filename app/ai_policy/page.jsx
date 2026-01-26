import React from 'react';
import { Database, Shield, Brain, Lock, CheckCircle } from 'lucide-react';
import './ai_policy.css';

export default function AIPolicyPage() {
  return (
    <div className="ai-root">
      <main className="ai-main">
        <section className="ai-hero">
          <div className="ai-hero-inner">
            <h1>AI Policy & Safeguards</h1>
            <p>
              Transparency and responsibility guide our AI implementation. Learn how we
              leverage artificial intelligence to enhance donor management while
              protecting your data and maintaining ethical standards.
            </p>
          </div>
        </section>

        <section className="ai-section card">
          <h2>How We Use AI Responsibly</h2>
          <div className="ai-text">
            <p>
              At DonorConnect, we believe AI should augment human decision-making,
              not replace it. Our AI features are designed to help nonprofit
              professionals work more efficiently while maintaining full control and
              oversight of donor relationships.
            </p>

            <p>
              We implement multiple safeguards to ensure our AI-powered features
              operate ethically and accurately. This includes careful prompt
              engineering, content filtering, human review processes, and strict data
              privacy controls. Our AI never makes final decisions about donor
              outreach or fundraising strategies—it provides insights and suggestions
              that empower your team to make informed choices.
            </p>

            <p>
              Privacy is paramount. All donor data processed by our AI systems is
              encrypted, anonymized where possible, and handled in accordance with
              GDPR, CCPA, and other applicable data protection regulations. We never
              use your donor data to train external AI models, and we maintain
              complete data separation between organizations.
            </p>
          </div>
        </section>

        <section className="ai-section card">
          <h2>AI APIs & Models Used</h2>

          <div className="ai-sub card-left">
            <h3>Primary AI Model</h3>
            <p><strong>Model:</strong> Anthropic Claude (Claude Sonnet 4.5)</p>
            <p><strong>API:</strong> Anthropic API v1</p>
            <p>
              We selected Claude for its strong performance in natural language
              understanding, content generation, and analytical reasoning. Claude's
              constitutional AI approach aligns with our commitment to ethical AI
              deployment, and its ability to follow detailed instructions ensures
              consistent, high-quality outputs.
            </p>
          </div>

          <div className="ai-sub card-right">
            <h3>Supporting Technologies</h3>
            <p><strong>Data Processing:</strong> Custom aggregation algorithms for donor insights</p>
            <p><strong>Security:</strong> End-to-end encryption for all AI API communications</p>
            <p><strong>Monitoring:</strong> Real-time quality checks and output validation</p>
          </div>
        </section>

        <section className="ai-section card">
          <h2>Crafting Prompts for Accurate Results</h2>
          <p>
            Our prompt engineering strategy focuses on precision, context, and safety.
            We've developed a multi-layered prompting system that ensures
            AI-generated content is relevant, accurate, and aligned with nonprofit
            best practices.
          </p>

          <div className="ai-list">
            <div>
              <h4>1. Contextual Priming</h4>
              <p>
                We provide Claude with aggregated, consented data about donor
                behavior, campaign performance, and organizational goals to ensure
                recommendations are tailored to each nonprofit's unique context.
              </p>
            </div>

            <div>
              <h4>2. Constraint Specification</h4>
              <p>
                Our prompts explicitly define boundaries—avoiding sensitive
                information exposure, preventing bias, and ensuring outputs follow
                fundraising ethics and compliance requirements.
              </p>
            </div>

            <div>
              <h4>3. Output Formatting</h4>
              <p>
                We structure prompts to generate actionable insights in consistent
                formats—summaries, bullet points, trend analyses—making it easy for
                users to quickly understand and act on AI recommendations.
              </p>
            </div>

            <div>
              <h4>4. Validation & Filtering</h4>
              <p>
                Post-generation, we apply automated checks to verify outputs don't
                contain sensitive data, maintain appropriate tone, and provide
                genuinely helpful guidance rather than generic advice.
              </p>
            </div>

            <div className="ai-example">
              <p>
                For example, when generating donor activity summaries, our prompts
                instruct Claude to focus on actionable patterns (giving frequency,
                preferred communication channels, campaign interests) while avoiding
                personally identifiable details or speculative predictions about
                donor motivations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="ai-footer">
        <p>Built with Next.js, React 19, Tailwind CSS, and Neon DB</p>
      </footer>
    </div>
  );
}
