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

        createMany: procedure.input($Schema.FolderInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.createMany(input as any))),

        create: procedure.input($Schema.FolderInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.create(input as any))),

        deleteMany: procedure.input($Schema.FolderInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.deleteMany(input as any))),

        delete: procedure.input($Schema.FolderInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.delete(input as any))),

        findFirst: procedure.input($Schema.FolderInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).folder.findFirst(input as any))),

        findMany: procedure.input($Schema.FolderInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).folder.findMany(input as any))),

        findUnique: procedure.input($Schema.FolderInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).folder.findUnique(input as any))),

        updateMany: procedure.input($Schema.FolderInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.updateMany(input as any))),

        update: procedure.input($Schema.FolderInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).folder.update(input as any))),

        count: procedure.input($Schema.FolderInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).folder.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FolderCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FolderCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FolderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FolderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FolderGetPayload<T>, Context>) => Promise<Prisma.FolderGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FolderDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FolderDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FolderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FolderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FolderGetPayload<T>, Context>) => Promise<Prisma.FolderGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FolderFindFirstArgs, TData = Prisma.FolderGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.FolderFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FolderGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FolderFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FolderFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FolderGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FolderGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FolderFindManyArgs, TData = Array<Prisma.FolderGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.FolderFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FolderGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FolderFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FolderFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FolderGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FolderGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FolderFindUniqueArgs, TData = Prisma.FolderGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FolderFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FolderGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FolderFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FolderFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FolderGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FolderGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FolderUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FolderUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FolderUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FolderGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FolderGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FolderUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FolderUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FolderGetPayload<T>, Context>) => Promise<Prisma.FolderGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.FolderCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FolderCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.FolderCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.FolderCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.FolderCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.FolderCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.FolderCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FolderCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
