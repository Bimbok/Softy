# Project Context: Fun Fact / Newsletter Topics

## Overview
This is a Next.js application designed to manage and display newsletter topics or "fun facts". It features a public-facing landing page with a newsletter subscription form and an administrative backend for content creation. The content supports Markdown and LaTeX for rich text and mathematical equations.

## Tech Stack
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript / React 19
*   **Styling:** Tailwind CSS
*   **UI Library:** Shadcn UI (`@radix-ui/*`)
*   **Database:** MongoDB (using native `mongodb` driver)
*   **Validation:** Zod
*   **Math Rendering:** KaTeX

## Project Structure
*   `app/`: Main application routes (App Router).
    *   `page.tsx`: Landing page with background video and newsletter form.
    *   `admin/`: Admin interface for creating topics.
    *   `api/`: Backend API routes (`auth`, `topics`).
    *   `topics/`: Page for viewing topics (implied).
*   `components/`: React components.
    *   `ui/`: Reusable UI components (buttons, inputs, etc.) from Shadcn UI.
    *   `topic-form.tsx`: Form for creating new topics (Admin).
    *   `newsletter.tsx`: Subscription component.
*   `lib/`: Utility functions and backend logic.
    *   `mongodb.ts`: MongoDB connection handler.
    *   `schema.ts`: Zod schemas (e.g., for newsletter subscription).
    *   `topics.ts`: Database operations for topics.
    *   `auth.ts`: Authentication utilities.

## Key Features
1.  **Newsletter Subscription:** Users can sign up via the homepage.
2.  **Topic Management:** Admin interface (`/admin`) to create topics with Title and Content.
3.  **Rich Content:** Support for Markdown and LaTeX (e.g., `$$E=mc^2$$`).
4.  **Authentication:** Cookie-based admin session management.

## Setup & Running
1.  **Install Dependencies:**
    ```bash
    pnpm install
    # or
    bun install
    ```

2.  **Environment Variables:**
    Ensure `MONGODB_URI` is set in your `.env.local` file.

3.  **Development Server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

4.  **Build:**
    ```bash
    npm run build
    ```

## Conventions
*   **Styling:** Use Tailwind CSS classes.
*   **Components:** Prefer Shadcn UI components in `components/ui`.
*   **Data Fetching:** Use Server Actions or API routes in `app/api`.
*   **Validation:** Use Zod schemas for form and API data validation.
