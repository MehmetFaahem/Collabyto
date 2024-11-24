# Real-Time Collaboration Platform for Remote Teams

# Project Documentation

## Overview

This project is a comprehensive web application designed to facilitate team collaboration and document management within organizations. It includes features such as real-time chat, document uploads, task management, and workspace dashboards. The application is built using modern web technologies and follows best practices for maintainability and scalability.

## Features

### 1. Real-Time Chat

- **Team Chat**: Communicate with your team in real-time using the chat feature. Users can send messages, create channels, and search through message history.
- **Message Filtering**: Filter messages based on content to quickly find relevant information.
- **Smooth Scrolling**: Automatically scroll to the latest messages for a seamless chat experience.

### 2. Document Management

- **Upload Documents**: Upload both public and private documents securely. The application supports file uploads with proper directory management.
- **Recent Documents**: View a list of recently updated documents along with their owners and last modified dates.

### 3. Task Management

- **Task Overview**: Manage tasks within the organization. View recent tasks, their statuses, and due dates.
- **Assignee Information**: Each task displays the assignee's information for better accountability.

### 4. Workspace Dashboard

- **Statistics**: Get an overview of workspace activities with statistics on total documents, tasks, team members, and active projects.
- **Recent Activities**: View recent documents and tasks to stay updated on the latest changes within the organization.
- **Team Members**: See a list of active team members and their roles within the organization.

### 5. User and Organization Management

- **User Context**: Manage user information and context throughout the application.
- **Organization Roles**: Handle different roles within the organization to ensure proper access control and permissions.

## Technical Details

### Technologies Used

- **Frontend**: React, TypeScript, Ant Design for UI components.
- **Backend**: Node.js, TypeScript, TRPC for API handling.
- **Database**: Prisma ORM for database interactions.
- **Real-Time Communication**: Socket.io for real-time chat functionality.
- **File Management**: Local file system for document storage.

### Code Structure

- **Routes**: Organized by feature, with separate files for chat, documents, and dashboard functionalities.
- **Components**: Reusable UI components built with Ant Design.
- **API**: TRPC for type-safe API calls and data fetching.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A running instance of the database.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/project.git
   ```
2. Install dependencies:
   ```sh
   cd project
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

### Deployment

Follow the deployment guide specific to your hosting provider. Ensure all environment variables are set correctly for production.

## Contributing

We welcome contributions from the community. Please read our contributing guidelines before submitting a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
