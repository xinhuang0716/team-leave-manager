# Team Leave Manager

> A lightweight team leave planner for viewing, creating, and maintaining upcoming leave records.

![python-image] ![duckdb-image] ![fastapi-image] ![react-image] ![vite-image]

## Overview

Team Leave Manager is a web application that helps teams coordinate upcoming leave in one shared workspace. The frontend is built with React and Vite, the backend is powered by FastAPI, and DuckDB stores the leave records locally.

The application includes a five-week workday calendar, a records workspace with filtering and sorting tools, and dedicated Tools and About pages. The frontend keeps its data in sync with the backend after records are created or removed.

### Landing page

The landing page displays Monday-to-Friday leave schedules for the upcoming five weeks. Each day is divided into AM and PM periods, and the current day is highlighted for quick orientation.

<img src="./README_img/calendar.png" width="80%" />

### Create new leave

Users can create leave records from the calendar page by entering a name, start and end dates, AM/PM periods, and an optional reason. A multi-day request is split into individual daily records and appears on both the calendar and records page after submission.

<img src="./README_img/add.png" width="80%" />

### Records page

The records page lists upcoming active leave records. Users can search by name, filter by date, sort by date or name, clear filters, and delete a record after confirmation. Deletion is handled as a soft delete in the backend so removed records are excluded from the active view.

<img src="./README_img/records.png" width="80%" />

### Backend API doc

FastAPI automatically generates interactive API documentation using Swagger UI. The documentation covers the health check, create, change, and records endpoints, allowing developers to inspect and test the backend API.

<img src="./README_img/swagger.png" width="80%" />

## Prerequisites

Make sure the following software is installed:

|         | version               |
| ------- | --------------------- |
| Python  | 3.12 or later         |
| uv      | latest stable version |
| Node.js | latest stable version |

## Installation

To set up the project locally, follow these steps:

- Clone the repository :

  ```bash
  git clone https://github.com/xinhuang0716/team-leave-manager.git
  ```

- Frontend
  - Install Node.js modules:

    ```bash
    cd team-leave-manager
    npm install
    ```

- Backend
  - Create the virtual environment and install Python dependencies:

    ```bash
    cd team-leave-manager/backend
    uv sync
    ```

## Usage

Start the backend server with:

```bash
cd team-leave-manager/backend
uv run main.py
```

In a second terminal, start the frontend development server with:

```bash
cd team-leave-manager
npm run dev
```

You can browse the frontend at `http://localhost:5173`. It calls the backend at `http://localhost:8000` to fetch and manage leave records.

By default, the backend creates the DuckDB database at `backend/DB/leave.db`. To use another database directory, set the `DB_PATH` environment variable before starting the backend (If you need to mount a volume for the database on your host platform).

To access the API documentation, navigate to `http://localhost:8000/docs` in your web browser. This will open the Swagger UI, where you can explore and test the available API endpoints.

## Release History

- 0.1
  - Beta release; further polishing is still needed.
- 0.2
  - Refactored the code structure and polished the UI design.
  - Fixed bugs and streamlined the backend logic.
- 0.3
  - Optimized the backend implementation.
  - Enhanced frontend functionality with record filtering and sorting.
  - Automatically fills in the end date after a start date is selected.
  - Further refined the UI design and user experience.

## TO-DO

- Authentication (optional)
- Audit log for record changes

## Contributing

- tom.h.huang
- jason.hp.hsu

## Contact

If you encounter any problems or have suggestions, please feel free to get in touch.

```
Name:  HSIN, HUANG
Email: tom.h.huang@fubon.com
Tel:   02-6608-0879 #69175
Dept:  證券 數據科學部 模型建置科(5F)
```

<!-- Markdown link & img dfn's -->

[python-image]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[react-image]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[fastapi-image]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[vite-image]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[duckdb-image]: https://img.shields.io/badge/Duckdb-000000?style=for-the-badge&logo=Duckdb&logoColor=yellow
