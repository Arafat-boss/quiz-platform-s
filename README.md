**Quiz Platform API**

===Overview===

This is a RESTful API built with Express.js and MongoDB, designed for managing quizzes and user scores in a quiz platform. The API allows users to fetch available quizzes, submit new quizzes, and track scores.

**Features**

1. User Authentication: Users must log in using Gmail.

2. Quiz Management:
        *Fetch all available quizzes.
        *Add new quizzes.

3. Score Management:
        *Retrieve user scores by email.
        *Save new scores.

4. MongoDB Integration: Stores quizzes and scores securely.

5. CORS Enabled: Allows frontend applications to interact seamlessly.


**Technologies Used**

1. Node.js with Express.js
2. MongoDB (Using mongodb native driver)
3. dotenv for environment variable management
4. CORS for cross-origin resource sharingSetup Instructions


Setup Instructions
1. Clone the Repository
        git clone https://github.com/Arafat-boss/quiz-platform-s
        cd quiz-platform-api

2. Install Dependencies
        npm i

3. Run the Server
        npm start


**API Endpoints**

1. Base Endpoint
        GET / → Returns a success message.

2. Quizzes API
        *GET /api/quizzes → Fetch all quizzes.
        *POST /api/quizzes → Add a new quiz (Request Body: { title, questions }).

3. Scores API
        *GET /api/scores/:email → Fetch all scores for a specific user.
        *POST /api/scores → Save a new score (Request Body: { score, email, total }).