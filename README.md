# Team Leave Manager

> A user-friendly Leave Management website for fellows

![python-image] ![react-image] ![fastapi-image] 

## Overview

Team Leave Manager is a tool designed to help teams manage and track their leave requests efficiently. It provides a user-friendly interface for submitting, approving, and tracking leave requests.

The backend is developed with python and FastAPI, the database uses Duckdb, while the fronted framework is used React.

## Features

- Submit leave requests
- Alter leave balances
- View leave records

## Dependencies

Describe any prerequisites, libraries, OS version, etc., needed before installing program.

|            | versoin |
| ---------- | ------- |
| python     | 3.10.13 |
| virtualenv | 20.26.1 |

## Installation

To install the Team Leave Manager, follow these steps:

1. Clone the repository :
   ```bash
   git clone https://github.com/xinhuang0716/team-leave-manager.git
   ```
2. Navigate to the project directory:
   ```bash
   cd team-leave-manager
   ```
3. Create virtual environment:

   ```bash
   virtualenv venv
   ```

4. Activate the environment:

   ```bash
   cd venv/Scripts
   activate
   ```

5. Install the dependencies:
   ```bash
   pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org --default-timeout=1000 -r ./requirements.txt
   ```

## Usage example

After activate `venv` environment, run the following script to launch backend server:

```bash
cd team-leave-manager
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Open your browser and navigate to `http://localhost:8000` to access the application.

To check the Swagger API UI, go to `http://localhost:8000/docs`.

#### 0. Initiate Database (for different department)

```bash
curl -X 'POST' \
  'http://localhost:8000/init/test' \
  -H 'accept: application/json' \
  -d ''
```

#### 1. Submit leave requests

```bash
curl -X 'POST' \
  'http://localhost:8000/add/test' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "emp_name": "PERSON 1",
  "date": "2025-09-09",
  "time": "AM",
  "reason": "Sick leave"
}'
```

#### 2. Alter leave balances

```bash
curl -X 'POST' \
  'http://localhost:8000/change/test' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "emp_name": "PERSON 1",
  "date": "2025-09-09",
  "time": "AM"
}'
```

#### 3. View leave records

```bash
curl -X 'GET' \
  'http://localhost:8000/fetch/test' \
  -H 'accept: application/json'
```

## Release History

- 0.1
  - Complete the backend CRUD API prototype
- 0.2
  - Working in progress

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## Contact

Shall you have any problem, please let me knows. Look forward to your feedbacks and suggestions!

```
Name:  HSIN, HUANG
Email: tom.h.huang@fubon.com
Tel:   02-6608-0879 #69190
Dept:  證券 數據科學部 資料服務處(5F)
```

<!-- Markdown link & img dfn's -->

[python-image]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[react-image]: https://shields.io/badge/react-black?logo=react&style=for-the-badge
[fastapi-image]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[duckdb-image]: https://img.shields.io/badge/Duckdb-_-blue
