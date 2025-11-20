# 🖥️ FE Menu Tree System (Next.js)

## Overview

This repository hosts the front-end application for the Menu Tree System. It is built using **Next.js** and focuses on providing an interactive and responsive user interface for viewing, managing, and manipulating the hierarchical menu structure exposed by the backend API.

### Key Features

* **Menu Visualization:** Displays the menu items in a clear, nested tree structure.
* **CRUD Operations:** Interfaces for creating, viewing, updating, and deleting menu items.
* **Drag-and-Drop Reordering:** Allows users to easily reorder and move menu items within the tree structure.
* **Performance:** Utilizes Next.js features for fast loading and optimized rendering.

## 🚀 Getting Started

### Prerequisites

You need the following installed on your local machine:

* [Node.js](https://nodejs.org/) (version 18 or later is recommended)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [Your FE Repository URL]
    cd fe-menu-tree-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Setup Environment Variables:**
    Create a file named `.env.local` in the root directory. This is crucial for linking the front end to your backend API.

    ```
    # .env.local file
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
    # Replace with the actual URL of your backend API
    ```

### Running the App

| Command | Description | Notes |
| :--- | :--- | :--- |
| `npm run dev` | Runs the application in development mode with **Hot Module Reloading (HMR)**. | Access the app at `http://localhost:3000`. |
| `npm run build` | Creates an optimized production build of the application. | The output includes optimized static assets and server code. |
| `npm run start` | Serves the application from the optimized production build (`.next` folder). | Requires running `npm run build` first. |

---

## 📂 Project Structure

The project follows the standard Next.js 13+ App Router structure:

| Path | Description |
| :--- | :--- |
| `app/` | Contains all route segments and pages (App Router). |
| `app/layout.tsx` | Root layout file for the entire application. |
| `app/page.tsx` | The root page of the application (`/`). |
| `components/` | Reusable UI components (e.g., button, card, tree-node). |
| `lib/` | Utility functions, API clients, and helper code (e.g., `apiClient.ts`). |
| `styles/` | Global styles, themes, and configuration. |
| `public/` | Static assets like images, fonts, and favicons. |
| `tsconfig.json` | TypeScript configuration for the Next.js project. |

## ⚙️ Configuration & Technology

### Key Technologies

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [CSS Modules / Tailwind CSS / Styled Components] (Specify which one you are using)
* **Data Fetching:** [fetch API / React Query / SWR] (Specify your data fetching library)

### TypeScript Path Aliases

The project is configured to use path aliases for cleaner imports, resolving from the project root (`./`).

| Alias | Resolves To | Example Usage |
| :--- | :--- | :--- |
| `@/` | `./` (Project Root) | `import { TreeUtils } from '@/lib/tree-utils';` |

---

## 🤝 Contribution

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Commit your changes (`git commit -m 'feat: Add new feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Create a Pull Request.

---
