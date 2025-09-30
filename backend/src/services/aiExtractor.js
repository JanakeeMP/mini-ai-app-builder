import { GoogleGenAI } from "@google/genai";

export async function extractRequirements(description) {
    try {
        const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
        const prompt = `Extract app details from the app description. 
        Return ONLY valid JSON that strictly follows the requested schema.
        
        Schema Definition:
        {
          "appName": "string (from text, or suggest a clear/ethical/concise name)",
          "entities": [
            {
              "name": "entity name",
              "fields": [
                { "name": "field1", "type": "string|number|boolean|date" }
              ]
            }
          ],
          "roles": ["role1", "role2"],
          "features": ["feature1", "feature2"],
          "roleFeatures": {
            "role1": ["feature1", "feature2"],
            "role2": ["feature3"]
          }
        }     
        
        Requirements:
        - Ensure exactly 3 entities overall, each with exactly 3 fields.
        - Roles must be an array of strings only (no objects).
        - Features must be an array of strings only (no nested objects).
        - roleFeatures must map each role string to an array of relevant features.
        - When assigning features to roles, choose the most directly relevant ones based on the description. 
        - If a feature applies to multiple roles, assign it to the most central role.
        - Ensure ethical extraction (no biases) and balanced associations.
        
        Description: "${description}"`;
    
        const response = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }]}],
          config: {
            responseMimeType: "application/json",
            tools: []
          }
        });
        
        const extractedText = response.text;
        //console.log("🔹 Raw AI Output:", extractedText);

        //console.log("✅ Parsed JSON:", JSON.stringify(JSON.parse(extractedText), null, 2));

        //const extractedJson = JSON.parse(jsonText);
        return JSON.parse(extractedText);;
      } catch (err) {
        console.error("AI extraction failed: ", err);
      }
}