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

        createMany: procedure.input($Schema.FileInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.createMany(input as any))),

        create: procedure.input($Schema.FileInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.create(input as any))),

        deleteMany: procedure.input($Schema.FileInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.deleteMany(input as any))),

        delete: procedure.input($Schema.FileInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.delete(input as any))),

        findFirst: procedure.input($Schema.FileInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).file.findFirst(input as any))),

        findMany: procedure.input($Schema.FileInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).file.findMany(input as any))),

        findUnique: procedure.input($Schema.FileInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).file.findUnique(input as any))),

        updateMany: procedure.input($Schema.FileInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.updateMany(input as any))),

        update: procedure.input($Schema.FileInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).file.update(input as any))),

        count: procedure.input($Schema.FileInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).file.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.FileCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.FileCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FileGetPayload<T>, Context>) => Promise<Prisma.FileGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.FileDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.FileDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FileGetPayload<T>, Context>) => Promise<Prisma.FileGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.FileFindFirstArgs, TData = Prisma.FileGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.FileFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FileFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FileFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.FileFindManyArgs, TData = Array<Prisma.FileGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.FileFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.FileGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FileFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.FileFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.FileGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.FileGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.FileFindUniqueArgs, TData = Prisma.FileGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.FileFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.FileGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.FileFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.FileFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.FileGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.FileGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.FileUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.FileUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.FileUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.FileGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.FileGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.FileUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.FileUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.FileGetPayload<T>, Context>) => Promise<Prisma.FileGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.FileCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FileCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.FileCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.FileCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.FileCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.FileCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.FileCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.FileCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
