'use server';
/**
 * @fileOverview An AI agent that suggests suitable doctors or specialties based on natural language input.
 *
 * - aiDoctorMatchmaker - A function that handles the doctor matchmaking process.
 * - AiDoctorMatchmakerInput - The input type for the aiDoctorMatchmaker function.
 * - AiDoctorMatchmakerOutput - The return type for the aiDoctorMatchmaker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDoctorMatchmakerInputSchema = z.object({
  symptomsOrDetails: z
    .string()
    .describe(
      'Natural language description of symptoms, medical concerns, or preferred appointment details (e.g., time, day).'+
      'Example: "I have a persistent cough and fever for three days, and I prefer an appointment on a weekday afternoon."'
    ),
});
export type AiDoctorMatchmakerInput = z.infer<typeof AiDoctorMatchmakerInputSchema>;

const AiDoctorMatchmakerOutputSchema = z.object({
  suggestedSpecialties: z
    .array(z.string())
    .describe(
      'An array of suggested medical specialties that best match the user\'s input. ' +
      'Examples: ["General Practitioner", "Pediatrics", "Dermatology", "Cardiology"].'+
      'If the user specifies preferred appointment times, consider that when suggesting specialties (e.g., if a user wants an evening appointment, suggest specialties that typically offer those hours).'+
      'If no specific specialty can be determined, suggest "General Practitioner".'
    ),
  summary: z
    .string()
    .describe(
      'A brief summary explaining the suggestions based on the user\'s input.'
    ),
});
export type AiDoctorMatchmakerOutput = z.infer<typeof AiDoctorMatchmakerOutputSchema>;

export async function aiDoctorMatchmaker(
  input: AiDoctorMatchmakerInput
): Promise<AiDoctorMatchmakerOutput> {
  return aiDoctorMatchmakerFlow(input);
}

const aiDoctorMatchmakerPrompt = ai.definePrompt({
  name: 'aiDoctorMatchmakerPrompt',
  input: {schema: AiDoctorMatchmakerInputSchema},
  output: {schema: AiDoctorMatchmakerOutputSchema},
  prompt: `You are an AI assistant for a hospital appointment system. Your goal is to help patients find the most suitable medical specialty based on their natural language description of symptoms or appointment preferences.

Analyze the provided "symptomsOrDetails" and recommend one or more relevant medical specialties. Also, provide a brief summary of why these specialties are suggested.

If the user mentions specific symptoms or medical conditions, prioritize medical specialties that treat those conditions. If the user expresses preferences for appointment times (e.g., "weekday afternoon"), consider this information when formulating your suggestions, though the primary focus is on medical need.

If no clear medical specialty can be determined from the input, suggest "General Practitioner".

Symptoms or Details: {{{symptomsOrDetails}}}`,
});

const aiDoctorMatchmakerFlow = ai.defineFlow(
  {
    name: 'aiDoctorMatchmakerFlow',
    inputSchema: AiDoctorMatchmakerInputSchema,
    outputSchema: AiDoctorMatchmakerOutputSchema,
  },
  async (input) => {
    const {output} = await aiDoctorMatchmakerPrompt(input);
    return output!;
  }
);
