# JournoPedia

## What is JournoPedia?

JournoPedia is a comprehensive **academic journal management platform** that streamlines the entire scholarly publication process from article submission to peer review and publication. The platform serves as a digital ecosystem for researchers, editors, and peer reviewers to collaborate in the academic publishing workflow.

### Core Features

- **Journal Management**: Create and manage academic journals with editorial boards
- **Article Submission**: Multi-step article submission process with metadata collection
- **Peer Review System**: Comprehensive peer review workflow with scoring mechanisms
- **User Role Management**: Support for Authors, Editors, Reviewers, and Administrators
- **Article Recommendation**: AI-powered article recommendation system using content similarity
- **Search & Discovery**: Advanced article search and top articles ranking
- **File Management**: Secure document upload and download capabilities
- **Email Notifications**: Automated email notifications for review processes

## Technical Architecture

### Technology Stack

**Backend:**
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **File Upload**: Multer middleware for document handling
- **Email Service**: Nodemailer with SMTP transport
- **Machine Learning**: Python integration for article recommendations

**Frontend:**
- **Framework**: React 18 with functional components and hooks
- **Routing**: React Router DOM for single-page application navigation
- **UI Components**: Bootstrap 5 and React Bootstrap for responsive design
- **State Management**: React hooks (useState, useEffect) and React Cookie for session management
- **HTTP Client**: Axios for API communication
- **Charts**: Chart.js with React Chart.js 2 for data visualization

**Development Tools:**
- **Package Management**: npm with package-lock.json for dependency management
- **Cross-Origin Requests**: CORS middleware for API access
- **Environment Configuration**: dotenv for environment variables

### System Architecture

#### Database Schema

**User Model:**
- User authentication and profile management
- Role-based access control (Author, Editor, Reviewer, Admin)
- Expertise tracking and performance metrics
- Statistics tracking (submissions, acceptances, rejections)

**Article Model:**
- Complete article lifecycle management
- Multi-author support with detailed author information
- Peer review tracking (up to 4 reviews per article)
- Status workflow: Submitted → Under Review → Peer Review → Accepted/Rejected
- Download tracking and rating system

**Journal Model:**
- Journal creation and management
- Editorial board assignment
- Article organization and categorization

#### Authentication & Authorization

- **JWT-based Authentication**: Secure token-based authentication system
- **Role-based Access Control**: Middleware functions (`isLoggedIn`, `isAdmin`) for route protection
- **Password Security**: bcrypt hashing with salt rounds for password storage
- **Session Management**: HTTP-only cookies with secure flags

#### Peer Review Workflow

1. **Article Submission**: Authors submit articles with peer reviewer suggestions
2. **Editorial Review**: Editors review and approve/reject articles for peer review
3. **Peer Review Assignment**: Approved articles sent to selected peer reviewers
4. **Review Collection**: Up to 4 peer reviews collected per article
5. **Scoring System**: 25-point scoring system with 50-point threshold for acceptance
6. **Final Decision**: Automatic status updates based on peer review scores

#### Article Recommendation System

**Technology**: Hybrid Python-Node.js implementation
- **Data Processing**: Python with pandas, nltk, and scikit-learn
- **Text Processing**: Porter Stemmer for text normalization
- **Vectorization**: Bag of Words technique with CountVectorizer
- **Similarity Calculation**: Cosine similarity for content matching
- **Integration**: Node.js child process spawning Python scripts
- **Features Used**: Journal name, article title, abstract, authors, article type, peer reviewers

#### File Management

- **Upload Handler**: Multer middleware for secure file uploads
- **Storage**: Local file system with organized directory structure
- **File Types**: Support for PDF, DOCX, and image files
- **Security**: File type validation and size restrictions

#### API Architecture

**RESTful Design**: Organized route structure with proper HTTP methods
- **User Routes**: Authentication, profile management, password reset
- **Article Routes**: CRUD operations, search, recommendations, peer review
- **Journal Routes**: Journal management, editor assignment, article organization

**Middleware Stack**:
- Express.json() for JSON parsing
- CORS for cross-origin requests
- Custom authentication middleware
- Multer for file uploads

#### Frontend Architecture

**Component Structure**: Modular React components with clear separation of concerns
- **Page Components**: Home, Profile, Journal pages
- **Feature Components**: AddArticle, ReviewPage, SearchArticle
- **Multi-step Forms**: Wizard-style article submission process
- **Popup Components**: Modal dialogs for editing and confirmations

**State Management**: 
- Local component state with useState
- Global state via prop drilling and context
- Cookie-based session persistence
- Real-time UI updates with useEffect

**Responsive Design**: Bootstrap-based responsive layout with mobile-first approach

### Deployment Architecture

- **Development Server**: Express server on port 5000 (backend), React dev server on port 3000 (frontend)
- **Database Connection**: MongoDB connection with connection pooling
- **Environment Configuration**: Separate development and production configurations
- **Static File Serving**: Express static middleware for uploaded files

### Security Features

- **Input Validation**: Server-side validation for all user inputs
- **Authentication Tokens**: Secure JWT implementation with expiration
- **Password Hashing**: bcrypt with configurable salt rounds
- **File Upload Security**: Type and size validation for uploaded files
- **CORS Configuration**: Controlled cross-origin resource sharing
- **Role-based Authorization**: Middleware-enforced access control

This architecture provides a scalable, secure, and maintainable platform for academic journal management with modern web technologies and best practices.