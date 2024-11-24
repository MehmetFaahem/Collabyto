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

        createMany: procedure.input($Schema.ChannelInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.createMany(input as any))),

        create: procedure.input($Schema.ChannelInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.create(input as any))),

        deleteMany: procedure.input($Schema.ChannelInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.deleteMany(input as any))),

        delete: procedure.input($Schema.ChannelInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.delete(input as any))),

        findFirst: procedure.input($Schema.ChannelInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).channel.findFirst(input as any))),

        findMany: procedure.input($Schema.ChannelInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).channel.findMany(input as any))),

        findUnique: procedure.input($Schema.ChannelInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).channel.findUnique(input as any))),

        updateMany: procedure.input($Schema.ChannelInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.updateMany(input as any))),

        update: procedure.input($Schema.ChannelInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).channel.update(input as any))),

        count: procedure.input($Schema.ChannelInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).channel.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.ChannelCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.ChannelCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChannelGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChannelGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChannelGetPayload<T>, Context>) => Promise<Prisma.ChannelGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.ChannelDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.ChannelDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChannelGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChannelGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChannelGetPayload<T>, Context>) => Promise<Prisma.ChannelGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.ChannelFindFirstArgs, TData = Prisma.ChannelGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.ChannelFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChannelGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChannelFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChannelFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChannelGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChannelGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.ChannelFindManyArgs, TData = Array<Prisma.ChannelGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.ChannelFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.ChannelGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChannelFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.ChannelFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.ChannelGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.ChannelGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.ChannelFindUniqueArgs, TData = Prisma.ChannelGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.ChannelFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.ChannelGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.ChannelFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.ChannelFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.ChannelGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.ChannelGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.ChannelUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.ChannelUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.ChannelUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.ChannelGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.ChannelGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.ChannelUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.ChannelUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.ChannelGetPayload<T>, Context>) => Promise<Prisma.ChannelGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.ChannelCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChannelCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.ChannelCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.ChannelCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.ChannelCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.ChannelCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.ChannelCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.ChannelCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
