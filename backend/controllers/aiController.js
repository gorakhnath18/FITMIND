 const { GoogleGenerativeAI } = require('@google/generative-ai');

// Fail-fast check to ensure the API key is loaded from the .env file.
if (!process.env.GEMINI_API_KEY) {
    throw new Error("FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.");
}

//  the Google AI client with your API key.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


exports.generatePlan = async (req, res) => {
    try {
         const { 
            age, weight, height, gender, goal, fitnessLevel, days, diet, split, meals,
            useCustomNutrition, totalCalories, proteinPercentage, carbsPercentage, fatPercentage 
        } = req.body;

        // 2. Perform validation to ensure all required data was sent from the frontend.
        if (!age || !weight || !height || !gender || !goal || !fitnessLevel || !days || !diet || !split || !meals) {
            return res.status(400).json({ message: "Please ensure all primary fields are filled out." });
        }

        // 3. Select the generative model to use.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        // 4. Conditionally build the nutrition part of the prompt based on user choice.
        let nutritionPromptSection = '';
        if (useCustomNutrition && totalCalories) {
            // Scenario 1: User provides their own calorie and macro targets.
            nutritionPromptSection = `
            The user has provided specific nutritional targets. The daily meal plan MUST adhere to these targets as closely as possible:
            - **Total Daily Calories:** ~${totalCalories} kcal
            - **Macronutrient Split:** ${proteinPercentage}% Protein, ${carbsPercentage}% Carbohydrates, ${fatPercentage}% Fat.
            
            Based on these targets, create a sample one-day menu with **${meals}** meals that fits the user's **${diet}** preference.
            `;
        } else {
            // Scenario 2: User wants the AI to calculate the nutrition.
            nutritionPromptSection = `
            The user wants you to determine the optimal nutrition. Based on their goal of **${goal}**, calculate an appropriate daily calorie and macronutrient target.
            
            Then, create a sample one-day menu with **${meals}** meals that fits your calculated targets and the user's **${diet}** preference.
            `;
        }

        // 5. Assemble the final, master prompt with detailed instructions.
        const prompt = `
            You are "FitMind", an expert AI personal trainer and a pragmatic nutritionist specializing in creating effective, affordable, and simple Indian meal plans.
            Your task is to generate a personalized, realistic, and culturally relevant one-week fitness plan and a daily nutrition plan.

            **USER DETAILS:**
            - Age: ${age}
            - Gender: ${gender}
            - Weight: ${weight} kg
            - Height: ${height} cm
            - Primary Goal: ${goal}
            - Current Fitness Level: ${fitnessLevel}
            - Workout Days Per Week: ${days}
            - Preferred Workout Split: ${split}
            - Dietary Preference: ${diet} (Indian Style)
            - Desired Meals Per Day: ${meals}

            **YOUR TASK & FORMATTING RULES (MANDATORY):**

            Your entire response MUST be plain text. You MUST use the exact separators "### WORKOUT PLAN ###" and "### NUTRITION PLAN ###".
            To highlight a heading, enclose it in <HL> and </HL> tags. DO NOT use markdown asterisks for bolding. Use hyphens (-) for list items.

            ---

            ### WORKOUT PLAN ###

            <HL>Weekly Goal:</HL> [Provide a 1-2 sentence summary of the workout week's objective.]

            [Create a workout schedule for exactly **${days}** days based on the **${split}** split type. List exercises with specific sets and reps suitable for a **${fitnessLevel}** individual. Focus on exercises that require minimal equipment where possible.]

            ---

            ### NUTRITION PLAN ###

            <HL>Nutritional Strategy:</HL> [Provide a 1-2 sentence summary of the diet strategy. If you calculated the targets, state them here.]

            [Provide a sample menu for one full day, broken down into exactly **${meals}** meals, based on the user's **${diet}** preference.]
            **IMPORTANT CULTURAL & PRACTICAL CONTEXT:**
            - The plan MUST be realistic, simple, and affordable for a person in a standard Indian household.
            - **Focus on staple, everyday ingredients.** Prioritize foods like dal (lentils), chana (chickpeas), rajma (kidney beans), seasonal vegetables (sabzi), paneer, tofu, eggs, chicken, rice, roti (chapati), dahi (yogurt), and basic salads.
            - **AVOID FANCY OR EXPENSIVE INGREDIENTS** like quinoa, avocado, broccoli, asparagus, or imported berries unless absolutely necessary.
            - **Suggest simple cooking methods:** boiled, steamed, basic stir-fry, or simple curries. Do not suggest complex or restaurant-style dishes like "chicken tikka masala" or "paneer butter masala". Instead, suggest "simple chicken curry" or "matar paneer".

            **FOR EACH MEAL, YOU MUST:**
            1.  Suggest 1-2 main dishes from the staple list.
            2.  Suggest accompaniments (e.g., Roti, Rice, Salad, Dahi).
            3.  Provide realistic portion sizes (e.g., 2 rotis, 1 katori dal, 1 bowl of salad).
            4.  On a new line below the food items, provide an estimated breakdown of the meal's nutritional content in the format: "(Calories: ~XXX kcal, P: ~XXg, C: ~XXg, F: ~XXg)".

            **Example Meal Format:**
            <HL>Lunch:</HL>
            - Dal Tadka (1 katori)
            - Aloo Gobi Sabzi (1 bowl)
            - Brown Rice (1 small bowl)
            - Cucumber Salad (1 plate)
            (Calories: ~450 kcal, P: ~20g, C: ~60g, F: ~15g)

            ${nutritionPromptSection}
        `;

        // 6. Send the prompt to Gemini and get the response.
        const result = await model.generateContent(prompt);
        const response = await result.response;

        // 7. Check for safety blocks from the AI.
        if (response.promptFeedback && response.promptFeedback.blockReason) {
            console.error("AI response blocked for safety reasons:", response.promptFeedback.blockReason);
            return res.status(400).json({ message: `Plan generation blocked due to: ${response.promptFeedback.blockReason}` });
        }
        
        const aiTextResponse = response.text();
        
        // 8. Parse the response into workout and nutrition plans.
        const parts = aiTextResponse.split('### NUTRITION PLAN ###');
        const workoutPlan = parts[0].replace('### WORKOUT PLAN ###', '').trim();
        const nutritionPlan = parts.length > 1 ? parts[1].trim() : "Sorry, the AI could not generate a nutrition plan at this time.";

        if (!workoutPlan || parts.length < 2) {
            throw new Error("AI failed to generate a plan in the expected format.");
        }
        
        // 9. Send the structured data back to the frontend.
        res.status(200).json({
            workoutPlan: workoutPlan,
            nutritionPlan: nutritionPlan,
        });

    } catch (error) {
        // 10. Handle any unexpected errors during the process.
        console.error("AI Generation Error:", error);
        res.status(500).json({ message: "An error occurred while generating the AI plan." });
    }
};