/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createFolderRouter from "./Folder.router";
import createDocumentRouter from "./Document.router";
import createDocumentVersionRouter from "./DocumentVersion.router";
import createBoardRouter from "./Board.router";
import createTaskRouter from "./Task.router";
import createChannelRouter from "./Channel.router";
import createMessageRouter from "./Message.router";
import createFileRouter from "./File.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as FolderClientType } from "./Folder.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as DocumentVersionClientType } from "./DocumentVersion.router";
import { ClientType as BoardClientType } from "./Board.router";
import { ClientType as TaskClientType } from "./Task.router";
import { ClientType as ChannelClientType } from "./Channel.router";
import { ClientType as MessageClientType } from "./Message.router";
import { ClientType as FileClientType } from "./File.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        folder: createFolderRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        documentVersion: createDocumentVersionRouter(router, procedure),
        board: createBoardRouter(router, procedure),
        task: createTaskRouter(router, procedure),
        channel: createChannelRouter(router, procedure),
        message: createMessageRouter(router, procedure),
        file: createFileRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    folder: FolderClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    documentVersion: DocumentVersionClientType<AppRouter>;
    board: BoardClientType<AppRouter>;
    task: TaskClientType<AppRouter>;
    channel: ChannelClientType<AppRouter>;
    message: MessageClientType<AppRouter>;
    file: FileClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
}
