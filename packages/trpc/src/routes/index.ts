import { z } from "zod";
import { t } from "../trpc";
import { palettesRouter } from "./palettes";

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),
  palettes: palettesRouter
});

export type AppRouter = typeof appRouter;
