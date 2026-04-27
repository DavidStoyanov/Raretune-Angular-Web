# Raretune-Angular-Web

### This application main purpose is to provide functionality for their users to discover and share songs they like. Users can create accounts and upload their songs, like them, see their activity in profile page.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Development API server

[Raretune Api](https://github.com/DavidStoyanov/Raretune-Api) repository

To start a local development Node.js backend server:

```bash
npm run dev
```

The backend server will run, on port `http://localhost:3000/` by default.

## Music App — Full‑Stack Project

#### A simple music platform built with Angular, Node.js, and Express, offering secure authentication and full song management.

## User Flows

#### Register / Login / Logout (Authentication for users)
#### View catalog of all songs with details (Available for any viewer)
#### Upload songs with metadata (Only authenticated)
#### Liked and Review your favorite songs (Only authenticated)
#### Edit and Delete songs (Only owner of the post)

## Core Features

#### Secure Auth using encrypted, HTTP‑only JWT cookies
#### Song Management: upload, edit, delete, like
#### Catalog View: browse all songs with details
#### Angular Frontend for a smooth, modern UI
#### Node.js + Express Backend for API and logic

## Angular Features

#### Implements guards (AuthGuard, GuestGuard) that are going to check if user have right to visit the concrete page route
#### Lazy‑Loaded Routes – faster site initial load, and lazy loaded components only when visitor need them
#### Service will be shown as feature-api.ts at most of the time using new angular naming convention
#### Most components are structured in a modular way, allowing them to be imported and reused in multiple areas of the application.
#### Dynamic Page Titles – visible in browser tab title names
#### Bootstrap + SCSS Styling – modular and maintainable styles, the goal is to create intuitive, modern, responsive user interface design, as-well as maximize usability and ensure a pleasant user experience
#### TypeScript Interfaces – strong typing across the app
#### Pipes where used too, mainly to manipulate component template content

## Pitfalls Notes

#### Unless the song finishes uploading to 100%, no audio file will be attached to the post.

## Additional Pages

#### About Page – project overview and purpose
#### FAQ Page – common questions and answers