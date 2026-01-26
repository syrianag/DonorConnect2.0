## **�� Overview: The BUILDD Framework**

This guide helps you transform any business problem into a working technology solution using AI as your development partner. Each phase includes specific activities, AI prompts, and deliverables.

---

# **Phase 1: BREAK DOWN the Problem**

## **Objective**

DonorConnect is an API-driven platform for managing donors, donations, and campaigns. It enables clean client–server communication using structured JSON, supports endpoints for recent donors, top donations, and active campaigns, and demonstrates full frontend-to-backend data flow.

---

## **Step 1.1: Understand the Business Context**

### **Activities**

- Read the business case/problem statement carefully
- Identify the target audience and their pain points
- Define success criteria

### **AI Prompt Template**

```
I'm working on a business problem: [DESCRIBE PROBLEM]

Help me understand:
1. Who are the primary users/stakeholders? - 
2. What are the main pain points this solves?
3. What would success look like for this solution?
4. What are potential risks or constraints?

```

### **Deliverable: Business Context Document**

```markdown
# Business Context## Problem Statement
Companies are receiving donations but dont have the capacity to keep up with the donations that are coming in or know how to track them the correct way. 

## Target Audience- Primary users: [who they are]
The target audience is "Internal Staff" , "Developers / Engineers", "Event Corrdinators", "Campaign Owners", & "Donors"

## Pain Points1. [Current problem 1]
2. Donor Information can easily get scattered throughout spreadsheets, email exports, payment report. 
This can casue slow reporting cycles like having to do work manually. 

## Success Criteria- [Measurable outcome 1]
The opportunity to have staff log into their portal to manage donors, donations and campaigns without needing spreadsheets. 
- Having improvement on visibility with recent donots, top donations and active campaigns

## Constraints- Budget: [if applicable]
- Timeline: [if applicable]
- Technical: [any limitations]

```

---

## **Step 1.2: Identify Core Components**

### **Activities**

### Core Components + Explanation

A. Frontend (Web UI)
Tech: Next.js (per README)
Purpose: Staff-facing interface to view/manage donors, donations, and campaigns; display “recent donors,” “top donations,” “active campaigns.”

B. Backend (API layer)
Tech: RESTful JSON API (your Next.js API routes could serve this, or a separate service)
Purpose: Exposes endpoints like:
GET /api/donors/recent
GET /api/donations/top
GET /api/campaigns/active

C. Database (persistent storage)
Purpose: Store and query:
donors
donations
campaigns
staff users / roles 

D. Authentication & Authorization (RBAC)
Purpose: Staff login + permissioning (who can view vs manage donors/donations/campaigns).
(README mentions staff passwords + an instructor password, which implies an auth system is needed.)

E. Configuration/Secrets Management
Purpose: Manage environment variables (.env.local), API keys, database connection strings—keep secrets out of README/code.

```
# Responsibilites of each component 

Frontend (Next.js UI)
Render pages/dashboards for donors, donations, campaigns
Call backend endpoints and display results
Handle client-side state (filters, sorting, loading states, errors)
Collect staff actions (create/update campaign, add donor, record donation) if those features exist/are added

Backend (REST API)
Validate requests and enforce auth/RBAC
Implement business logic:
define “recent donors” (by date)
define “top donations” (by amount, time window, etc.)
define “active campaigns” (by status/date range)
Read/write data in the database
Return consistent JSON responses matching documented shapes

Database
Persist records and relationships (donor ↔ donations ↔ campaign)
Support efficient queries for “recent,” “top,” and “active”
Enforce constraints (unique IDs, required fields, referential integrity)

Auth/RBAC
Authenticate staff users (login)
Authorize actions (role-based permissions)
Manage sessions/tokens and password security

Config/Secrets
Provide environment-specific settings (dev/prod)
Prevent sensitive data leakage (e.g., remove passwords from README)

```
# Communication between components 

Frontend ↔ Backend
Frontend calls REST endpoints (/api/...) to fetch and update data
Backend returns JSON responses to drive UI

Backend ↔ Database
Backend reads/writes donors, donations, campaigns, users

Frontend ↔ Auth
Frontend submits login, stores session (cookie/token), attaches credentials to API calls

Backend ↔ Auth
Backend verifies sessions/tokens and enforces RBAC on each endpoint

### **Example Reference**

Use the ProjectForge case study structure:

- Frontend (User Interface)
- Backend API (Business Logic)
- Database (Data Persistence)
- Cache (Performance)
- Authentication (Security)
- File Storage (Media Management)

### **Deliverable: Component Architecture Document**

```markdown
# System Components## Component 1: [Name]**Type:** Frontend/Backend/Database/Service
**Technology:** [Suggested tech stack]
**Responsibilities:**- [What it does 1]
- [What it does 2]

**Interfaces:**- Receives from: [component name]
- Sends to: [component name]

## Component 2: [Name]
[Repeat structure]

## External Services- [Service name]: [purpose]

```

---

## **Step 1.3: Map Dependencies & Data Flow**

### **Activities**

- Create a dependency diagram
- Map how data flows through the system
- Identify critical paths

### **AI Prompt Template**

```
Based on these components: [LIST YOUR COMPONENTS]

Help me create:
1. A dependency map showing which components depend on others
2. The data flow for key user actions like: [LIST KEY ACTIONS]
3. Critical paths that must work for the app to function

Please format this as a textual diagram I can visualize.

```

### **Deliverable: Architecture Diagram (Text or Visual)**

```
User Browser
    ↓
Frontend (React)
    ↓ (API calls)
Backend API (Node.js)
    ↓ (queries)
Database (PostgreSQL)
    ↑ (cached data)
Cache (Redis)

```

### **Reference Materials**

- Review: "Requirement Gathering Sample - NixOS" for architecture decomposition
- Example: Online photo gallery exercise (Document 2)

---

## **✅ Phase 1 Checkpoint**

### **Before moving to Phase 2, you should have:**

- [ ]  Business Context Document
- [ ]  Component Architecture Document
- [ ]  Dependency/Data Flow Diagram
- [ ]  Clear understanding of what you're building

### **Self-Assessment Questions**

1. Can you explain each component's purpose in one sentence?
2. Do you know what technologies you'll use for each layer?
3. Have you identified all the data entities your app needs?


# Phase 2 = Understand & Document
## **Objective**

Define technical terms, document your understanding, and create clear specifications before writing code.

---

### **Step 2.1: Define Technical Terms**

**Activities:**

- List unfamiliar technologies and concepts
- Get clear definitions for each term
- Understand how they relate to your project

**AI Prompt Template:**

```
I'm building [YOUR APP] using [TECHNOLOGIES].

I need clear definitions for these terms/concepts in the context of my project:
1. [Term 1 - e.g., "REST API"]
2. [Term 2 - e.g., "JWT authentication"]
3. [Term 3 - e.g., "Database normalization"]

For each term, explain:
- What it is (simple definition)
- Why it's relevant to my project
- A simple example in my context

```

### **Deliverable: Technical Glossary**

```markdown
## [Term 1]**Definition:** [Clear, simple explanation]
**Relevance:** [Why this matters for your project]
**Example:** [How you'll use it]
**Resources:**- [Link to documentation]
- [Tutorial reference]

## [Term 2]
[Repeat structure]

```

---

### **Step 2.2: Research Technology Stack**

**Activities:**

- Research recommended technologies for each component
- Understand trade-offs between options
- Document your technology choices

**AI Prompt Template:**

```
For my [TYPE OF APPLICATION], I need to choose technologies for:
- Frontend framework
- Backend framework
- Database
- [Other components]

My constraints are:
- Team experience: [your skill level]
- Project timeline: [timeframe]
- Scalability needs: [small/medium/large]

Please compare 2-3 options for each component and recommend the best fit, explaining why.

```

### **Reference Materials**

- Review prerequisite resources for each TS domain
- Research documentation:
    - Frontend: React.dev, Vite.dev
    - Backend: Node.js docs, Fastify/Express
    - Database: PostgreSQL docs

### **Deliverable: Technology Decision Document**

```markdown
## Frontend**Chosen:** React + Vite
**Alternatives Considered:** Vue, Svelte
**Justification:** [Why you chose this]
**Learning Resources:**- [Link 1]
- [Link 2]

## Backend**Chosen:** Node.js + Express
[Repeat structure]

## Database**Chosen:** PostgreSQL
[Repeat structure]

```

---

### **Step 2.3: Document User Stories & Features**

**Activities:**

- Write user stories for main features
- Prioritize features (MVP vs. Nice-to-have)
- Define acceptance criteria

**AI Prompt Template:**

```
For my application: [DESCRIBE APP]

Help me create user stories for these features:
1. [Feature 1]
2. [Feature 2]
3. [Feature 3]

For each feature, provide:
- User story format: "As a [user type], I want [action] so that [benefit]"
- Acceptance criteria (what must be true when it's done)
- Priority level (MVP, Important, Nice-to-have)

```

### **Deliverable: Feature Specification Document**

```markdown
## Feature 1: [Name]**User Story:** As a [user], I want [action] so that [benefit]

**Priority:** MVP / Important / Nice-to-have

**Acceptance Criteria:**- [ ] [Specific testable requirement 1]
- [ ] [Specific testable requirement 2]
- [ ] [Specific testable requirement 3]

**Technical Notes:**- [What components are involved]
- [Any special considerations]

## Feature 2: [Name]
[Repeat structure]

```

---

### **Step 2.4: Define Data Models**

**Activities:**

- Identify all data entities
- Define relationships between entities
- Plan database schema

**AI Prompt Template:**

```
For my application: [DESCRIBE APP]

I need to store information about: [LIST MAIN ENTITIES]

Help me:
1. Identify all the data entities I need
2. List the attributes for each entity
3. Define relationships between entities (one-to-one, one-to-many, many-to-many)
4. Suggest a database schema

Please provide this in a clear format with explanations.

```

### **Reference**

Review TS.4.1 (Create a data structure) competency

### **Deliverable: Data Model Document**

```markdown
## Entity 1: User**Attributes:**- id (Primary Key, UUID)
- email (String, Unique, Required)
- password (String, Hashed, Required)
- createdAt (Timestamp)

**Relationships:**- Has many: Projects
- Has many: Tasks (through Projects)

## Entity 2: Project**Attributes:**- id (Primary Key, UUID)
- name (String, Required)
- description (Text)
- userId (Foreign Key → User)
- createdAt (Timestamp)

**Relationships:**- Belongs to: User
- Has many: Tasks

## Schema Diagram
```

User (1) ──→ (Many) Project (1) ──→ (Many) Task

```

```

---

### **✅ Phase 2 Checkpoint**

**Before moving to Phase 3, you should have:**

- [ ]  Technical Glossary with key terms defined
- [ ]  Technology Stack documented with justifications
- [ ]  Feature Specifications with user stories
- [ ]  Data Model with entities and relationships

**Self-Assessment Questions:**

1. Can you explain your technology choices to someone else?
2. Do you understand the key concepts you'll be working with?
3. Have you documented what "done" looks like for each feature?

## **Objective**

Strategically use AI to generate code, solve problems, and learn best practices while maintaining understanding.

---

# Phase 3 = INTERROGATE AI Tools
### **Step 3.1: Set Up Development Environment**

**Activities:**

- Create project structure
- Initialize tools (Git, package managers)
- Set up development dependencies

**AI Prompt Template:**

```
I'm starting a [TYPE] project using:
- Frontend: [technology]
- Backend: [technology]
- Database: [technology]

Help me:
1. Create a recommended folder structure
2. List all the dependencies I need to install
3. Provide the initialization commands
4. Create a basic .gitignore file
5. Suggest environment variables I'll need

Please provide step-by-step commands I can run.

```

**Deliverable:** Initialized Project Repository

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── server.js
│   └── package.json
├── .gitignore
├── README.md
└── docker-compose.yml

```

---

### **Step 3.2: Generate Boilerplate Code with Understanding**

**Activities:**

- Request AI to generate starter code
- Ask for explanations of generated code
- Modify and customize the code

**AI Prompt Template (Frontend Component):**

```
Create a React component for [SPECIFIC FEATURE] that:
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Include:
1. Proper error handling
2. Loading states
3. Comments explaining key parts
4. TypeScript types (if using TS)

After generating the code, explain:
- What each major section does
- Why you made specific design choices
- What best practices are being followed

```

**AI Prompt Template (Backend API):**

```
Create a Node.js Express route for [SPECIFIC ENDPOINT] that:
- Method: [GET/POST/PUT/DELETE]
- Purpose: [what it does]
- Accepts: [input parameters]
- Returns: [response format]

Include:
1. Input validation
2. Error handling
3. Proper HTTP status codes
4. Comments explaining the logic

Then explain the security considerations for this endpoint.

```

**AI Prompt Template (Database):**

```
Create a database schema for [ENTITY] with these requirements:
[LIST REQUIREMENTS FROM YOUR DATA MODEL]

Provide:
1. SQL CREATE TABLE statement
2. Any indexes needed for performance
3. Foreign key constraints
4. Sample INSERT statements

Explain why you structured it this way.

```

**⚠️ Critical Rule:**