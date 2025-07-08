 const { GoogleGenerativeAI } = require('@google/generative-ai');

if (!process.env.GEMINI_API_KEY) {
    throw new Error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash-latest",
    generationConfig: { response_mime_type: "application/json" }
});

const createAnimationName = (exerciseName) => {
    if (typeof exerciseName !== 'string') return 'default-animation';
    return exerciseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

exports.generatePlan = async (req, res) => {
    try {
        const { 
            age, weight, height, gender, goal, fitnessLevel, days, diet, split, meals,
            exercisesPerWorkout,
            useCustomNutrition, totalCalories, proteinPercentage, carbsPercentage, fatPercentage 
        } = req.body;

        if (!age || !weight || !height || !gender || !goal || !fitnessLevel || !days || !diet || !split || !meals || !exercisesPerWorkout) {
            return res.status(400).json({ message: "Please ensure all primary fields are filled out." });
        }

        let nutritionPromptSection = '';  
        if (useCustomNutrition && totalCalories && proteinPercentage && carbsPercentage && fatPercentage) {
            nutritionPromptSection = `The user has provided specific nutritional targets. The daily meal plan MUST adhere to these targets as closely as possible:
- Total Daily Calories: approximately ${totalCalories} kcal
- Macronutrient Split: ${proteinPercentage}% Protein, ${carbsPercentage}% Carbohydrates, ${fatPercentage}% Fat.
Create a sample one-day menu with EXACTLY ${meals} meals that fits these targets and the user's ${diet} preference.`;
        } else {
            nutritionPromptSection = `The user wants you to determine the optimal nutrition. Based on their goal of ${goal}, calculate an appropriate daily calorie and macronutrient target. Then, create a sample one-day menu with EXACTLY ${meals} meals that fits your calculated targets and the user's ${diet} preference.`;
        }

        const prompt = `
You are "FitMind", an expert AI personal trainer and a pragmatic nutritionist specializing in creating effective, affordable, and simple Indian meal plans.
Your task is to generate a highly personalized fitness and nutrition plan. Your entire response MUST be a single, valid JSON object. DO NOT output plain text or any text before or after the JSON object.

USER DETAILS:
- Age: ${age}
- Gender: ${gender}
- Weight: ${weight} kg
- Height: ${height} cm
- Primary Goal: ${goal}
- Current Fitness Level: ${fitnessLevel}
- Workout Days Per Week: ${days}
- Preferred Workout Split: ${split}
- Desired Exercises Per Workout Session: ${exercisesPerWorkout}
- Dietary Preference: ${diet} (Indian Style)
- Desired Meals Per Day: ${meals}

JSON STRUCTURE (MANDATORY):
The JSON object must have two top-level keys: "workoutPlan" and "nutritionPlan".

1.  "workoutPlan" OBJECT STRUCTURE:
    - Must have a "weeklyGoal" (string) and a "schedule" (array of day objects).
    - Each day object in "schedule" must have a "day" (string, e.g., "Day 1: Push Day (Chest, Shoulders, Triceps)") and an "exercises" (array).
    - For every workout day, the "exercises" array MUST contain EXACTLY ${exercisesPerWorkout} exercise objects. This is a strict, non-negotiable requirement.
    - Each exercise object must have keys: "name" (string), "sets" (string, e.g., "3-4"), "reps" (string, e.g., "8-12"), "description" (string, a 1-2 sentence guide), and "alternatives" (string, 1-2 alternatives).
    - If a day is a rest day, the "exercises" array MUST be an empty array [].

2.  "nutritionPlan" OBJECT STRUCTURE:
    - Must have a "nutritionalStrategy" (string, 1-2 sentences explaining the approach) and a "dailyMeals" (array of meal objects).
    - The "dailyMeals" array must contain EXACTLY ${meals} meal objects.
    - Each meal object must have keys: "mealName" (string, e.g., "Breakfast"), "foodItems" (string, list foods and portions using hyphens and newlines, e.g., "- Dal Tadka (1 katori)\\n- Brown Rice (1 small bowl)"), "nutritionInfo" (string, e.g., "(Calories: ~450 kcal, P: ~20g, C: ~60g, F: ~15g)"), and "alternatives" (string, 1-2 simple alternatives).
    - The meal plan must use simple, affordable, staple Indian ingredients. AVOID expensive or exotic ingredients.
    ${nutritionPromptSection}

EXAMPLE OF THE FINAL JSON OBJECT:
{
  "workoutPlan": {
    "weeklyGoal": "Focus on building foundational strength and muscle endurance.",
    "schedule": [
      {
        "day": "Day 1: Full Body Strength",
        "exercises": [
          { "name": "Squats", "sets": "3", "reps": "8-12", "description": "Keep your back straight, chest up, and descend until thighs are parallel to the floor.", "alternatives": "Goblet Squats, Lunges" },
          { "name": "Push-ups", "sets": "3", "reps": "To failure", "description": "Maintain a straight line from head to heels, lower your body until chest nearly touches the floor.", "alternatives": "Knee Push-ups, Incline Push-ups" }
        ]
      }
    ]
  },
  "nutritionPlan": {
    "nutritionalStrategy": "A balanced diet focusing on whole foods to support your ${goal} goal.",
    "dailyMeals": [
      {
        "mealName": "Breakfast",
        "foodItems": "- Oats (1 cup) with mixed nuts (1 handful)\\n- Apple (1 medium)",
        "nutritionInfo": "(Calories: ~350 kcal, P: ~10g, C: ~60g, F: ~8g)",
        "alternatives": "Poha with vegetables OR 2 Idlis with Sambar."
      }
    ]
  }
}
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (response.promptFeedback && response.promptFeedback.blockReason) {
            console.error("AI response blocked for safety reasons:", response.promptFeedback.blockReason);
            return res.status(400).json({ message: `Plan generation blocked due to: ${response.promptFeedback.blockReason}` });
        }
        
        let aiTextResponse = response.text();
        let parsedPlan;
        try {
            const jsonStart = aiTextResponse.indexOf('{');
            const jsonEnd = aiTextResponse.lastIndexOf('}') + 1;
            if (jsonStart !== -1 && jsonEnd > jsonStart) {
                aiTextResponse = aiTextResponse.substring(jsonStart, jsonEnd);
            }
            parsedPlan = JSON.parse(aiTextResponse);
        } catch (parseError) {
            console.error("JSON PARSE ERROR:", parseError);
            console.error("AI Raw Response that failed to parse:", aiTextResponse);
            return res.status(500).json({ message: "An error occurred while generating the AI plan. The AI may have returned an invalid format." });
        }

        if (parsedPlan.workoutPlan && parsedPlan.workoutPlan.schedule) {
            parsedPlan.workoutPlan.schedule.forEach(day => {
                if (day.exercises && Array.isArray(day.exercises)) {
                    day.exercises.forEach(exercise => {
                        if (exercise && typeof exercise.name === 'string') {
                           exercise.animation_name = createAnimationName(exercise.name);
                        }
                    }); 
                }
            });
        }
        
        res.status(200).json(parsedPlan);

    } catch (error) {
        console.error("AI Generation - General Error:", error);
        res.status(500).json({ message: "An unexpected server error occurred while generating the AI plan." });
    }
};