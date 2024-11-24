import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c609212b-ff39-4f66-928f-5d4e1bb5dd88', '1Estelle.Erdman-Lubowitz@gmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=3', 'invitationToken112', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('5e602319-e2cf-4837-8f2b-962ea3b7479a', '9Arturo75@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=11', 'invitationToken789', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('10034e55-1100-4a73-bbf6-9a0775b05b05', '17Rosalia_Franey62@yahoo.com', 'Charlie Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', 'invitationToken112', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b853ef0b-f009-4354-a2ba-d946dceeb674', '25Tania.Schiller68@gmail.com', 'Dave Wilson', 'https://i.imgur.com/YfJQV5z.png?id=27', 'invitationToken789', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('422f5063-ef33-4c56-8c3d-e06bf46f2f10', '33Leslie74@hotmail.com', 'Bob Smith', 'https://i.imgur.com/YfJQV5z.png?id=35', 'invitationToken123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('fdf238ea-bf5a-4ab6-9d1a-12698211c401', '41Donald1@gmail.com', 'Dave Wilson', 'https://i.imgur.com/YfJQV5z.png?id=43', 'invitationToken789', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('3f9f33e0-a843-4fc8-948e-94cbd4e30551', '49Jena_Kihn75@yahoo.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=51', 'invitationToken112', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('35967d78-b587-4b96-90ff-807aabd212d4', '57Berenice58@hotmail.com', 'Alice Johnson', 'https://i.imgur.com/YfJQV5z.png?id=59', 'invitationToken123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('6537af9c-8fab-4213-b213-41c626bc1a51', '73Kristy15@gmail.com', 'Eve Davis', 'https://i.imgur.com/YfJQV5z.png?id=75', 'invitationToken123', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('92d8daca-5bb3-4f84-b5e8-1eabef1378b1', 'Visionary Group LLC', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('cb0d979d-ed46-46d5-b912-cf3e52a43b95', 'Global Solutions Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('24a53ed1-bb60-4ef3-b014-dd9bae54a49a', 'Global Solutions Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('785225a5-92f6-417b-8f19-15807db1e492', 'Visionary Group LLC', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('be224a5b-d8f4-4f8b-b006-5ab63536a630', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('4772a648-16e0-4091-921d-2ecbd6efc4ff', 'Global Solutions Ltd.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ec251f64-48ab-49a7-85b1-2b484ffcf655', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('1288ff17-ada7-40aa-a1ae-cd9950f72c5c', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('5e2904cc-8507-44f9-bd73-a9e0509ef11e', 'Visionary Group LLC', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('d94cfb33-cedf-4d64-817a-127fde93ec8d', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('3bdf4d57-b192-42c7-a5cc-8b870437221a', 'Editor', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ff9eed58-5449-48cc-a405-04de78cafe24', 'Viewer', '422f5063-ef33-4c56-8c3d-e06bf46f2f10', 'cb0d979d-ed46-46d5-b912-cf3e52a43b95');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('6c94ffa1-de46-429a-8e0e-03a78ea37aaa', 'Administrator', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('fa880ca7-caaf-4787-b057-07e907aeb6e3', 'Viewer', 'b853ef0b-f009-4354-a2ba-d946dceeb674', '1288ff17-ada7-40aa-a1ae-cd9950f72c5c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('c596e70f-2f5a-4eb5-b382-8858fb15085f', 'Contributor', '422f5063-ef33-4c56-8c3d-e06bf46f2f10', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('1b74d8b0-1f73-4cf6-92fe-84068a3e9b30', 'Contributor', '6537af9c-8fab-4213-b213-41c626bc1a51', '785225a5-92f6-417b-8f19-15807db1e492');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('335a161b-3e4e-4f30-972d-2a2e0e27a6c7', 'Viewer', '35967d78-b587-4b96-90ff-807aabd212d4', '785225a5-92f6-417b-8f19-15807db1e492');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('c22c495e-54dd-4525-952f-bd9d0b2b9dbc', 'Moderator', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '1288ff17-ada7-40aa-a1ae-cd9950f72c5c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('38f929e8-9b0e-4c49-a7d9-e28cdf560ae1', 'Editor', 'fdf238ea-bf5a-4ab6-9d1a-12698211c401', '5e2904cc-8507-44f9-bd73-a9e0509ef11e');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('c684b21e-086e-4d91-a07d-26a78dbda7cd', 'Moderator', 'c609212b-ff39-4f66-928f-5d4e1bb5dd88', 'be224a5b-d8f4-4f8b-b006-5ab63536a630');

INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('eb546b42-b89a-41c9-8827-5c15ffbe9fe7', 'Development Notes', NULL, '24a53ed1-bb60-4ef3-b014-dd9bae54a49a');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('9a3a64c5-13b0-4a97-84cd-05184f8c27cf', 'Design Resources', 'eb546b42-b89a-41c9-8827-5c15ffbe9fe7', 'be224a5b-d8f4-4f8b-b006-5ab63536a630');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('84ada0ef-dc12-4ab9-a7d8-23dba4c71436', 'Marketing Assets', 'eb546b42-b89a-41c9-8827-5c15ffbe9fe7', '4772a648-16e0-4091-921d-2ecbd6efc4ff');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('aff19090-0c4f-43a1-bdd3-ce19b2438af1', 'Design Resources', '9a3a64c5-13b0-4a97-84cd-05184f8c27cf', '1288ff17-ada7-40aa-a1ae-cd9950f72c5c');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('cd34ffcd-4ccd-4f71-b379-55fb3635346d', 'Development Notes', '84ada0ef-dc12-4ab9-a7d8-23dba4c71436', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('d213f5e6-31b0-4da5-a0ca-64544d8c396d', 'Development Notes', 'eb546b42-b89a-41c9-8827-5c15ffbe9fe7', '1288ff17-ada7-40aa-a1ae-cd9950f72c5c');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('737869bd-2298-420e-affb-446afba83b6b', 'Development Notes', '84ada0ef-dc12-4ab9-a7d8-23dba4c71436', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('4573629f-6c37-4b0e-9de5-6ef234752b6c', 'Design Resources', 'd213f5e6-31b0-4da5-a0ca-64544d8c396d', '785225a5-92f6-417b-8f19-15807db1e492');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('c5944c36-00b4-4b7e-945f-4304bb1d17a3', 'Client Documents', 'aff19090-0c4f-43a1-bdd3-ce19b2438af1', 'be224a5b-d8f4-4f8b-b006-5ab63536a630');
INSERT INTO "Folder" ("id", "name", "parentFolderId", "organizationId") VALUES ('09666e04-9b83-48c4-8ef7-5f588a52a840', 'Development Notes', '4573629f-6c37-4b0e-9de5-6ef234752b6c', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');

INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('a2c62b64-1590-47e7-b8a3-b3e293afb662', 'Team Meeting Notes', 'This document outlines the project plan for the upcoming quarter including key milestones and deliverables.', '785225a5-92f6-417b-8f19-15807db1e492', '09666e04-9b83-48c4-8ef7-5f588a52a840', '5e602319-e2cf-4837-8f2b-962ea3b7479a');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('4f195404-ccc2-4217-bc03-d6497fcfbfa9', 'Team Meeting Notes', 'This financial report provides an analysis of the companys performance in the third quarter highlighting revenue and expenses.', 'd94cfb33-cedf-4d64-817a-127fde93ec8d', '9a3a64c5-13b0-4a97-84cd-05184f8c27cf', '3f9f33e0-a843-4fc8-948e-94cbd4e30551');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('3daa42a2-24e7-45c2-8673-1a45d4f064c5', 'Team Meeting Notes', 'This document outlines the project plan for the upcoming quarter including key milestones and deliverables.', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1', 'd213f5e6-31b0-4da5-a0ca-64544d8c396d', '6537af9c-8fab-4213-b213-41c626bc1a51');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('e3303c9b-b392-41ad-8601-814fb1478a83', 'Financial Report Q3', 'Notes from the team meeting held on October 15th covering project updates and action items.', 'd94cfb33-cedf-4d64-817a-127fde93ec8d', 'aff19090-0c4f-43a1-bdd3-ce19b2438af1', 'b853ef0b-f009-4354-a2ba-d946dceeb674');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('220d72d3-baa5-4719-a4f8-3d6390f18407', 'Team Meeting Notes', 'Notes from the team meeting held on October 15th covering project updates and action items.', '785225a5-92f6-417b-8f19-15807db1e492', '84ada0ef-dc12-4ab9-a7d8-23dba4c71436', '3f9f33e0-a843-4fc8-948e-94cbd4e30551');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('e29d9bd1-d4e6-4f02-92c5-a17ef668c1cd', 'Team Meeting Notes', 'Our marketing strategy for 2024 focuses on expanding digital presence and increasing brand awareness.', '785225a5-92f6-417b-8f19-15807db1e492', '9a3a64c5-13b0-4a97-84cd-05184f8c27cf', 'c609212b-ff39-4f66-928f-5d4e1bb5dd88');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('6aebe019-4432-4130-936d-1dced26a2b05', 'Design Specifications', 'This document outlines the project plan for the upcoming quarter including key milestones and deliverables.', '24a53ed1-bb60-4ef3-b014-dd9bae54a49a', 'd213f5e6-31b0-4da5-a0ca-64544d8c396d', '35967d78-b587-4b96-90ff-807aabd212d4');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('1f4c5a31-4869-4579-bcd3-3fb01e3aae7b', 'Project Plan Overview', 'The design specifications detail the requirements for the new product line including dimensions and materials.', 'be224a5b-d8f4-4f8b-b006-5ab63536a630', 'd213f5e6-31b0-4da5-a0ca-64544d8c396d', '10034e55-1100-4a73-bbf6-9a0775b05b05');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('be3a5b73-1013-4e6b-9d99-2d39138486b6', 'Financial Report Q3', 'Our marketing strategy for 2024 focuses on expanding digital presence and increasing brand awareness.', 'ec251f64-48ab-49a7-85b1-2b484ffcf655', 'aff19090-0c4f-43a1-bdd3-ce19b2438af1', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Document" ("id", "title", "content", "organizationId", "folderId", "ownerId") VALUES ('1812f590-6973-48a0-a025-644c978b88e9', 'Project Plan Overview', 'Notes from the team meeting held on October 15th covering project updates and action items.', '785225a5-92f6-417b-8f19-15807db1e492', '84ada0ef-dc12-4ab9-a7d8-23dba4c71436', '3f9f33e0-a843-4fc8-948e-94cbd4e30551');

INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('9573fea4-09ed-49fd-8ffb-e5847e2154f5', 'Marketing Strategy', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('b095c489-e7c6-452b-95d3-68989ec2635e', 'Customer Feedback', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('a9db50ed-6422-449e-b1b3-f24cdd7324b9', 'Marketing Strategy', 'cb0d979d-ed46-46d5-b912-cf3e52a43b95');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('4d36c57e-d700-4815-b99e-c554b4005793', 'Project Launch', '5e2904cc-8507-44f9-bd73-a9e0509ef11e');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('ab68feb5-8ee7-4760-8fbf-d71aa26730cb', 'Customer Feedback', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('f6c52350-4836-4e7c-b135-61bd67d2844c', 'Sales Pipeline', '5e2904cc-8507-44f9-bd73-a9e0509ef11e');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('e348c1c9-882d-4dda-8b05-76fa253b5905', 'Marketing Strategy', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('bc6dff29-0c93-402b-bcf0-541d78772c38', 'Sales Pipeline', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('a9c1dafb-04fd-49bb-a79e-b34d15abf234', 'Project Launch', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "Board" ("id", "name", "organizationId") VALUES ('1c9eabbc-f0fd-4ed6-a9ce-12188ba50509', 'Sales Pipeline', '24a53ed1-bb60-4ef3-b014-dd9bae54a49a');

INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('327d5eca-18a6-4fcc-a6ee-b6c3e60d88a7', 'Design Landing Page', 'Create a responsive design for the homepage.', '2025-07-30T12:59:36.770Z', 'Low', 'In Progress', 'ab68feb5-8ee7-4760-8fbf-d71aa26730cb', 'c609212b-ff39-4f66-928f-5d4e1bb5dd88');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('90b767df-02d3-4e13-b07c-e5c52d2b55b5', 'Conduct User Research', 'Compile quarterly financial data for review.', '2025-10-11T03:38:39.274Z', 'Critical', 'On Hold', '1c9eabbc-f0fd-4ed6-a9ce-12188ba50509', '10034e55-1100-4a73-bbf6-9a0775b05b05');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('9f547799-2c51-41ad-af53-90695062be62', 'Develop API Endpoints', 'Gather insights from target users through surveys.', '2024-08-13T07:03:13.351Z', 'High', 'Cancelled', '4d36c57e-d700-4815-b99e-c554b4005793', '422f5063-ef33-4c56-8c3d-e06bf46f2f10');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('dff864c4-0381-433e-96c9-487f7ba36a9e', 'Plan Marketing Strategy', 'Implement RESTful API for user management.', '2024-12-12T18:46:44.729Z', 'Low', 'On Hold', 'e348c1c9-882d-4dda-8b05-76fa253b5905', 'b853ef0b-f009-4354-a2ba-d946dceeb674');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('077ea1c8-ec29-4972-8094-453ea7c37eb2', 'Prepare Financial Report', 'Create a responsive design for the homepage.', '2025-07-23T03:41:06.867Z', 'Low', 'Cancelled', 'ab68feb5-8ee7-4760-8fbf-d71aa26730cb', 'b853ef0b-f009-4354-a2ba-d946dceeb674');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('c699130f-52c3-4182-a13d-096cb93cc62e', 'Plan Marketing Strategy', 'Create a responsive design for the homepage.', '2024-06-24T02:49:39.273Z', 'Normal', 'Cancelled', 'f6c52350-4836-4e7c-b135-61bd67d2844c', 'c609212b-ff39-4f66-928f-5d4e1bb5dd88');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('a5f25619-7b1a-4dba-b46d-61053d40d854', 'Prepare Financial Report', 'Implement RESTful API for user management.', '2025-04-04T07:28:30.638Z', 'Low', 'To Do', 'a9db50ed-6422-449e-b1b3-f24cdd7324b9', 'c609212b-ff39-4f66-928f-5d4e1bb5dd88');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('80e8094e-ee7b-415b-b06f-f3ce35cac490', 'Plan Marketing Strategy', 'Implement RESTful API for user management.', '2023-12-05T13:40:06.812Z', 'Medium', 'In Progress', 'f6c52350-4836-4e7c-b135-61bd67d2844c', '422f5063-ef33-4c56-8c3d-e06bf46f2f10');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('78630848-3234-4b3c-9c26-2da751e0b487', 'Develop API Endpoints', 'Gather insights from target users through surveys.', '2024-05-14T01:35:33.988Z', 'High', 'Completed', 'e348c1c9-882d-4dda-8b05-76fa253b5905', '6537af9c-8fab-4213-b213-41c626bc1a51');
INSERT INTO "Task" ("id", "title", "description", "dueDate", "priority", "status", "boardId", "assigneeId") VALUES ('909d4f8d-afc6-486f-9cc3-a2a428a4c656', 'Design Landing Page', 'Implement RESTful API for user management.', '2025-10-14T10:06:43.703Z', 'Critical', 'Cancelled', 'bc6dff29-0c93-402b-bcf0-541d78772c38', '422f5063-ef33-4c56-8c3d-e06bf46f2f10');

INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('f9dfdb56-e5ff-4f68-be9f-23efc0574c01', 'Project Updates', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('7dd8361a-7740-4d05-b1f7-f6f01e29a99a', 'Development Chat', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('535af145-0372-4b34-91c4-6f1178b24e68', 'Development Chat', '785225a5-92f6-417b-8f19-15807db1e492');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('1cde89cf-b695-4b67-b79c-5ab9b1aa6a21', 'Development Chat', '4772a648-16e0-4091-921d-2ecbd6efc4ff');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('ffae8ccc-35f9-4acc-91e3-676d738722c8', 'Project Updates', 'be224a5b-d8f4-4f8b-b006-5ab63536a630');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('cac47354-f364-43f6-8484-d96b761f8e5c', 'Marketing Strategies', 'cb0d979d-ed46-46d5-b912-cf3e52a43b95');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('6c3df306-3302-487b-a07c-f1057699e42e', 'Marketing Strategies', 'd94cfb33-cedf-4d64-817a-127fde93ec8d');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('0de027c3-431a-4ffb-8187-26635fc28762', 'General Discussion', '785225a5-92f6-417b-8f19-15807db1e492');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('8f4d7089-3d1e-48fc-966d-d65f396b63c5', 'Design Team', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1');
INSERT INTO "Channel" ("id", "name", "organizationId") VALUES ('31fdcf7c-0f75-4a67-b910-1007bb5911a0', 'Project Updates', 'ec251f64-48ab-49a7-85b1-2b484ffcf655');

INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('db1ea9bb-b49e-43ef-9c37-a783943575aa', 'Lets brainstorm ideas for the upcoming product launch.', '31fdcf7c-0f75-4a67-b910-1007bb5911a0', '35967d78-b587-4b96-90ff-807aabd212d4');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('8c9ce893-cd89-4c7c-9c8d-6f08569deaff', 'Ive uploaded the new project files to the shared folder.', '7dd8361a-7740-4d05-b1f7-f6f01e29a99a', '6537af9c-8fab-4213-b213-41c626bc1a51');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('fa97153d-d0e9-477b-8bfc-36554aac8343', 'Lets brainstorm ideas for the upcoming product launch.', '7dd8361a-7740-4d05-b1f7-f6f01e29a99a', '3f9f33e0-a843-4fc8-948e-94cbd4e30551');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('2ce8c230-9ed6-4083-9232-977ee6fd40f0', 'Ive uploaded the new project files to the shared folder.', '7dd8361a-7740-4d05-b1f7-f6f01e29a99a', '10034e55-1100-4a73-bbf6-9a0775b05b05');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('3149e2c4-0057-4621-b20d-740c7989ad09', 'Lets brainstorm ideas for the upcoming product launch.', 'cac47354-f364-43f6-8484-d96b761f8e5c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('8f07c9ff-bc76-491d-a623-b4a1816b8d90', 'Can someone review the latest document draft and provide feedback', '7dd8361a-7740-4d05-b1f7-f6f01e29a99a', '10034e55-1100-4a73-bbf6-9a0775b05b05');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('b671fa15-d6cd-44a5-a0c8-6db67eda1d1a', 'Can someone review the latest document draft and provide feedback', '0de027c3-431a-4ffb-8187-26635fc28762', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('017e9e84-4fa5-4d45-ace9-c277b47a8c58', 'Please make sure to update your tasks before the end of the day.', '1cde89cf-b695-4b67-b79c-5ab9b1aa6a21', '422f5063-ef33-4c56-8c3d-e06bf46f2f10');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('a07cf2f1-9797-4159-83a6-1c2df3892225', 'Please make sure to update your tasks before the end of the day.', '8f4d7089-3d1e-48fc-966d-d65f396b63c5', '5e602319-e2cf-4837-8f2b-962ea3b7479a');
INSERT INTO "Message" ("id", "content", "channelId", "userId") VALUES ('70bf1d60-8e0d-4484-a63e-9e46b96ab9e1', 'Lets brainstorm ideas for the upcoming product launch.', '1cde89cf-b695-4b67-b79c-5ab9b1aa6a21', '35967d78-b587-4b96-90ff-807aabd212d4');

INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('d34e83f3-6e87-4a6a-a0bc-ac13f187b38d', 'Product_Design.sketch', 'https://i.imgur.com/YfJQV5z.png?id=302', 'applicationpdf', '2025-03-03T17:33:48.494Z', '4573629f-6c37-4b0e-9de5-6ef234752b6c', '4772a648-16e0-4091-921d-2ecbd6efc4ff', '6537af9c-8fab-4213-b213-41c626bc1a51');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('d4f2298d-b347-48bd-b706-f37c3ba48bba', 'Budget_Spreadsheet.xlsx', 'https://i.imgur.com/YfJQV5z.png?id=307', 'applicationvnd.openxmlformatsofficedocument.spreadsheetml.sheet', '2024-04-21T15:47:06.331Z', 'd213f5e6-31b0-4da5-a0ca-64544d8c396d', '785225a5-92f6-417b-8f19-15807db1e492', 'fdf238ea-bf5a-4ab6-9d1a-12698211c401');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('2b43267a-fa27-4034-aa38-1d595d49d4da', 'Marketing_Strategy.docx', 'https://i.imgur.com/YfJQV5z.png?id=312', 'applicationvnd.openxmlformatsofficedocument.wordprocessingml.document', '2024-11-10T06:25:18.734Z', 'cd34ffcd-4ccd-4f71-b379-55fb3635346d', '4772a648-16e0-4091-921d-2ecbd6efc4ff', '35967d78-b587-4b96-90ff-807aabd212d4');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('b30d7663-2ca3-4927-b6ca-3971cb3e5135', 'Project_Plan_v1.pdf', 'https://i.imgur.com/YfJQV5z.png?id=317', 'imagejpeg', '2025-06-04T08:23:00.887Z', 'cd34ffcd-4ccd-4f71-b379-55fb3635346d', '24a53ed1-bb60-4ef3-b014-dd9bae54a49a', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('ee7a33f1-ae77-4e0b-ae53-e87cc33951fb', 'Project_Plan_v1.pdf', 'https://i.imgur.com/YfJQV5z.png?id=322', 'applicationpdf', '2025-07-24T10:03:42.214Z', '09666e04-9b83-48c4-8ef7-5f588a52a840', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('8851cafa-1052-42f3-9dff-c5c8b72a5aa5', 'Budget_Spreadsheet.xlsx', 'https://i.imgur.com/YfJQV5z.png?id=327', 'imagejpeg', '2024-10-05T12:47:04.593Z', '09666e04-9b83-48c4-8ef7-5f588a52a840', '4772a648-16e0-4091-921d-2ecbd6efc4ff', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('8068d102-dad9-4534-a6ac-3e1ebb876cde', 'Product_Design.sketch', 'https://i.imgur.com/YfJQV5z.png?id=332', 'applicationvnd.openxmlformatsofficedocument.spreadsheetml.sheet', '2024-02-21T10:59:34.438Z', '09666e04-9b83-48c4-8ef7-5f588a52a840', 'cb0d979d-ed46-46d5-b912-cf3e52a43b95', '5e602319-e2cf-4837-8f2b-962ea3b7479a');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('7a174889-0093-4ab2-97ca-43b8eb7df2d8', 'Budget_Spreadsheet.xlsx', 'https://i.imgur.com/YfJQV5z.png?id=337', 'applicationpdf', '2024-07-17T18:28:02.686Z', '737869bd-2298-420e-affb-446afba83b6b', 'be224a5b-d8f4-4f8b-b006-5ab63536a630', 'fdf238ea-bf5a-4ab6-9d1a-12698211c401');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('71751139-7575-4306-b488-6720b96f1182', 'Project_Plan_v1.pdf', 'https://i.imgur.com/YfJQV5z.png?id=342', 'applicationxsketch', '2024-03-30T02:50:36.336Z', 'cd34ffcd-4ccd-4f71-b379-55fb3635346d', '92d8daca-5bb3-4f84-b5e8-1eabef1378b1', '3f9f33e0-a843-4fc8-948e-94cbd4e30551');
INSERT INTO "File" ("id", "name", "url", "type", "size", "folderId", "organizationId", "ownerId") VALUES ('4bf4faf2-35f5-47fa-966c-7e5edbf070d3', 'Team_Photo.jpg', 'https://i.imgur.com/YfJQV5z.png?id=347', 'applicationpdf', '2024-12-18T05:40:15.340Z', '4573629f-6c37-4b0e-9de5-6ef234752b6c', '1288ff17-ada7-40aa-a1ae-cd9950f72c5c', 'b853ef0b-f009-4354-a2ba-d946dceeb674');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
