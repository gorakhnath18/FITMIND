const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generatePlan = async (req, res) => {
    try {
        const { age, gender, weight, height, goal, fitnessLevel } = req.body;

        // For safety, start with a simple model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // A detailed prompt designed to get a JSON response
        const prompt = `
            Act as an expert fitness and nutrition coach.
            Create a personalized 7-day fitness and nutrition plan based on the following user details:
            - Age: ${age}
            - Gender: ${gender}
            - Weight: ${weight} kg
            - Height: ${height} cm
            - Primary Goal: ${goal}
            - Fitness Level: ${fitnessLevel}

            IMPORTANT: Your entire response MUST be in a single, valid JSON format. Do not include any text, titles, or markdown formatting like \`\`\`json before or after the JSON object.
            The JSON object should have two main keys: "workoutPlan" and "nutritionPlan".
            
            - "workoutPlan" should be an array of 7 objects, one for each day ("day": "Monday", "day_number": 1, etc.). Each object must contain a "title" (e.g., "Full Body Strength"), "description", and an array of "exercises" (each with "name", "sets", "reps", and "rest_period").
            - "nutritionPlan" should be an array of 7 objects, one for each day. Each object must contain objects for "breakfast", "lunch", "dinner", and "snack", each with a "name" and estimated "calories".

            Provide a comprehensive and safe plan suitable for the user's level.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // The response should be clean JSON, but we parse it to be sure
        const planJson = JSON.parse(text);

        res.status(200).json(planJson);

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ message: "Failed to generate plan from AI. Please try again." });
    }
};