# real-estate-chatbot
Mini Real Estate Analysis Chatbot — Django + React (SigmaValue Assignment)

1. Project Structure
Chatbot Project/
│
├── backend/       
│   ├── manage.py
│   ├── reanalysis/
│   ├── chatbot/
│   └── sample_data/
│
└── frontend/      
    ├── package.json
    ├── src/
    └── public/

2. How to Run the Backend (Django)
Step 1 — Open PowerShell
cd "D:\Chatbot Project\backend"

Step 2 — Create Virtual Environment (only once)
python -m venv venv

Step 3 — Activate Virtual Environment
& "D:\Chatbot Project\backend\venv\Scripts\Activate.ps1"
If you get a script error:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned -Force
Then activate again.

Step 4 — Install Dependencies
pip install -r requirements.txt

Step 5 — Run Migrations
python manage.py migrate

Step 6 — Start Backend Server
python manage.py runserver
You will see:
Starting development server at http://127.0.0.1:8000/

Step 7 — Test Backend API
Open in browser:

http://127.0.0.1:8000/api/chatbot/health/

Expected output:
{"status": "ok"}

3. How to Run the Frontend (React)

Open another terminal window (backend must stay running).

Step 1 — Go to frontend folder
cd "D:\Chatbot Project\frontend"

Step 2 — Install Node modules (only once)
npm install
If asked:
We're unable to detect target browsers. Add defaults? (Y/n)
Type Y and press Enter.

Step 3 — Start React App
npm start
Your browser will open:

 http://localhost:3000/

4. How to Use the Application
Upload your Excel dataset using the Upload button

(The app accepts ANY Excel as long as it contains a locality column)

Enter queries in chat:

Examples:
Analyze Akurdi
Analyze Aundh
Show price trend for Wakad

The chatbot will return:

Summary

Chart

Filtered table

CSV download button

Excel Requirements

The Excel file must contain at least one of these columns:

area

locality

location

place

region

final location 

The backend automatically detects and uses whichever exists.


5. Technologies Used
Backend:

Python

Django

Django REST Framework

Pandas

OpenPyXL

CORS Headers

Frontend:

React

React Bootstrap

Chart.js

Axios / Fetch API
