ALTER TABLE `books` MODIFY COLUMN `issuedDate` date DEFAULT '2025-04-26';--> statement-breakpoint
ALTER TABLE `reviewsAuthor` MODIFY COLUMN `createdAt` date DEFAULT '2025-04-26';--> statement-breakpoint
ALTER TABLE `reviewsBook` MODIFY COLUMN `createdAt` date DEFAULT '2025-04-26';