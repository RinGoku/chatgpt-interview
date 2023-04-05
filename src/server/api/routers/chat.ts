import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { askToGPT } from "~/utils/openai";

export const chatRouter = createTRPCRouter({
  getQuestions: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await askToGPT(input.text);
      return { response: response?.match(/質問: (.+)/)?.[1] };
    }),
});
