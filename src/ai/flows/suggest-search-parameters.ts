'use server';

/**
 * @fileOverview A flow that suggests alternative search parameters or related listings based on the current search and browsing history.
 *
 * - suggestSearchParameters - A function that handles the search parameter suggestion process.
 * - SuggestSearchParametersInput - The input type for the suggestSearchParameters function.
 * - SuggestSearchParametersOutput - The return type for the suggestSearchParameters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSearchParametersInputSchema = z.object({
  currentSearchCriteria: z
    .string()
    .describe('The current search criteria entered by the user.'),
  browsingHistory: z
    .string()
    .describe('The recent browsing history of the user on the website.'),
});
export type SuggestSearchParametersInput = z.infer<typeof SuggestSearchParametersInputSchema>;

const SuggestSearchParametersOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'A list of suggested search parameters or related listings based on the current search criteria and browsing history.'
    ),
  reasoning: z
    .string()
    .describe('Explanation of why the suggestions were made.'),
});
export type SuggestSearchParametersOutput = z.infer<typeof SuggestSearchParametersOutputSchema>;

export async function suggestSearchParameters(
  input: SuggestSearchParametersInput
): Promise<SuggestSearchParametersOutput> {
  return suggestSearchParametersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSearchParametersPrompt',
  input: {schema: SuggestSearchParametersInputSchema},
  output: {schema: SuggestSearchParametersOutputSchema},
  prompt: `You are an AI real estate expert that helps users find properties.

  Based on the user's current search criteria and browsing history, suggest alternative search parameters or related listings that the user might find interesting.
  Explain why you are making each suggestion.

Current Search Criteria: {{{currentSearchCriteria}}}
Browsing History: {{{browsingHistory}}}

Suggestions:`,
});

const suggestSearchParametersFlow = ai.defineFlow(
  {
    name: 'suggestSearchParametersFlow',
    inputSchema: SuggestSearchParametersInputSchema,
    outputSchema: SuggestSearchParametersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
