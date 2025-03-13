import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '@luminera/trpc';

export const trpc = createTRPCReact<AppRouter>();
