const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

/**
 * Prompt builder (kept strict but practical)
 */
function buildPrompt(csvData) {
  return `You are a senior customer support analyst for Cubelelo.

Analyze this support ticket data and return ONLY JSON.

TICKET DATA:
${csvData}

IMPORTANT:
- Return ONLY valid JSON
- Do NOT include markdown or explanation
- Use EXACT keys

Format:
{
  "manager_summary": "",
  "risk_score": 50,
  "risk_description": "",
  "top_categories": [
    { "name": "", "count": 0, "pct": 0, "color": "" }
  ],
  "unresolved_reasons": [
    {
      "ticket_id": "",
      "issue": "",
      "product": "",
      "priority": "",
      "days_open": 0,
      "status": "",
      "why_stuck": ""
    }
  ],
  "patterns": [
    { "icon": "", "title": "", "description": "" }
  ],
  "escalation_recommendations": "",
  "full_analysis": ""
}`;
}

/**
 * 🔥 Normalize AI response (VERY IMPORTANT FIX)
 */
function normalizeAIResponse(parsed) {
  return {
    manager_summary: parsed.manager_summary || "",
    risk_score: parsed.risk_score || 0,
    risk_description: parsed.risk_description || "",

    // ✅ Fix categories
    top_categories: (parsed.top_categories || []).map((c, i) => {
      if (typeof c === "string") {
        return {
          name: c,
          count: 1,
          pct: 0,
          color: ["#ff6b6b", "#f9ca24", "#7c6fff", "#43e97b"][
            i % 4
          ],
        };
      }
      return c;
    }),

    // ✅ Fix unresolved reasons
    unresolved_reasons: (parsed.unresolved_reasons || []).map(
      (r, i) => {
        if (typeof r === "string") {
          return {
            ticket_id: `AUTO-${i}`,
            issue: r,
            product: "N/A",
            priority: "Medium",
            days_open: 0,
            status: "Open",
            why_stuck: r,
          };
        }
        return r;
      }
    ),

    // ✅ Fix patterns
    patterns: (parsed.patterns || []).map((p) => {
      if (typeof p === "string") {
        return {
          icon: "⚠️",
          title: p.split(":")[0] || "Pattern",
          description: p,
        };
      }
      return p;
    }),

    escalation_recommendations:
      parsed.escalation_recommendations || "",
    full_analysis: parsed.full_analysis || "",
  };
}

/**
 * 🚀 Main AI function
 */
export async function analyzeTicketsWithAI(csvData) {
  try {
    const response = await fetch(
      `${GEMINI_API_URL}?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: buildPrompt(csvData),
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini error:", errText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    const rawText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // console.log("RAW AI RESPONSE:", rawText); // 🔥 DEBUG

    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", rawText);
      throw new Error("Failed to parse Gemini response");
    }

   
    return normalizeAIResponse(parsed);
  } catch (err) {
    console.error("AI service error:", err);
    throw err;
  }
}