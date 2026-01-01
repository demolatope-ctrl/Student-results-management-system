
import { GoogleGenAI, Type } from "@google/genai";
import { Student } from '../types';

// FIX: Per @google/genai guidelines, initialize directly with process.env.API_KEY.
// The API key's availability is a hard requirement and handled externally.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const studentSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The full name of the student."
    },
    id: {
      type: Type.STRING,
      description: "The student's unique identifier or ID."
    },
    results: {
      type: Type.ARRAY,
      description: "An array of the student's results.",
      items: {
        type: Type.OBJECT,
        properties: {
          subject: {
            type: Type.STRING,
            description: "The name of the subject."
          },
          score: {
            type: Type.NUMBER,
            description: "The score achieved in the subject, as a number."
          }
        },
        required: ['subject', 'score'],
      }
    }
  },
  required: ['name', 'id', 'results'],
};

export const parseStudentInfo = async (text: string): Promise<Student> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Parse the following text and extract student information according to the provided schema. If a student ID is provided, use it. Otherwise, create a suitable one. Text: "${text}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: studentSchema,
        },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
        throw new Error("AI returned an empty response.");
    }

    const parsedData = JSON.parse(jsonString);

    if (!parsedData.name || !parsedData.id || !Array.isArray(parsedData.results)) {
      throw new Error("AI returned incomplete data. Please try again with more specific details.");
    }
    
    // Create a full student object, filling in missing details with defaults
    const newStudent: Student = {
        name: parsedData.name,
        id: parsedData.id,
        gender: 'Female', // Default
        class: 'JS 1A', // Default
        session: '2025/2026', // Default
        term: 'First', // Default
        status: 'Active', // Default
        position: { rank: 0, totalStudents: 0 }, // Default
        attendance: { daysRecorded: 0, present: 0, absent: 0, leave: 0 }, // Default
        results: parsedData.results.map((r: {subject: string, score: number}) => ({
            subject: r.subject,
            scores: { ca: Math.round(r.score * 0.4), exam: Math.round(r.score * 0.6) }, // Split score
            highestInClass: 98, // Dummy data
            lowestInClass: 40, // Dummy data
            classAverage: 75.5 // Dummy data
        })),
        performanceSummary: 'AI analysis pending.'
    };
    
    return newStudent;

  } catch (error) {
    console.error("Error parsing student info with Gemini:", error);
    throw new Error("Failed to parse student information. Please check your input and try again.");
  }
};


export const generatePerformanceSummary = async (student: Student): Promise<string> => {
    const resultsText = student.results.map(r => `${r.subject}: ${r.scores.ca + r.scores.exam}`).join(', ');
    const attendanceRate = student.attendance.daysRecorded > 0 ? (student.attendance.present / student.attendance.daysRecorded) * 100 : 0;

    const prompt = `
    Generate a concise, three-part performance analysis for a student named ${student.name} based on their mid-term results and attendance.
    Format the output exactly as follows, with each section on a new line, and using the exact labels "Performance:", "Attendance:", and "Recommendations:".
    Provide two bulleted recommendations using '•'.

    Student's scores: ${resultsText}
    Attendance: ${attendanceRate.toFixed(0)}% present.

    Example format:
    Performance: [One sentence analysis of academic performance.]
    Attendance: [One sentence analysis of attendance and its impact.]
    Recommendations:
    • [First recommendation.]
    • [Second recommendation.]
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });
        return response.text.trim();
    } catch(error) {
        console.error("Error generating summary with Gemini:", error);
        throw new Error("Failed to generate AI performance summary.");
    }
}