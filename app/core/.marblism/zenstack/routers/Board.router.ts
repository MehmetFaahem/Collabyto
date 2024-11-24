/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.BoardInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.createMany(input as any))),

        create: procedure.input($Schema.BoardInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.create(input as any))),

        deleteMany: procedure.input($Schema.BoardInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.deleteMany(input as any))),

        delete: procedure.input($Schema.BoardInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.delete(input as any))),

        findFirst: procedure.input($Schema.BoardInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).board.findFirst(input as any))),

        findMany: procedure.input($Schema.BoardInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).board.findMany(input as any))),

        findUnique: procedure.input($Schema.BoardInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).board.findUnique(input as any))),

        updateMany: procedure.input($Schema.BoardInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.updateMany(input as any))),

        update: procedure.input($Schema.BoardInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).board.update(input as any))),

        count: procedure.input($Schema.BoardInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).board.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.BoardCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.BoardCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BoardGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BoardGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BoardGetPayload<T>, Context>) => Promise<Prisma.BoardGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.BoardDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.BoardDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BoardGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BoardGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BoardGetPayload<T>, Context>) => Promise<Prisma.BoardGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.BoardFindFirstArgs, TData = Prisma.BoardGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.BoardFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BoardGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BoardFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BoardFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BoardGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BoardGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.BoardFindManyArgs, TData = Array<Prisma.BoardGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.BoardFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.BoardGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BoardFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.BoardFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.BoardGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.BoardGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.BoardFindUniqueArgs, TData = Prisma.BoardGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.BoardFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.BoardGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.BoardFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.BoardFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.BoardGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.BoardGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.BoardUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.BoardUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.BoardUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BoardGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BoardGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.BoardUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.BoardUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BoardGetPayload<T>, Context>) => Promise<Prisma.BoardGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.BoardCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BoardCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.BoardCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.BoardCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.BoardCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.BoardCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.BoardCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.BoardCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
