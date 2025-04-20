CREATE TABLE `author` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `author_id` PRIMARY KEY(`id`),
	CONSTRAINT `author_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `badTokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	CONSTRAINT `badTokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` varchar(255) NOT NULL,
	`issuedDate` date DEFAULT '2025-04-20',
	`status` varchar(255) NOT NULL,
	`authorId` int NOT NULL,
	`userId` int,
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_authorId_author_id_fk` FOREIGN KEY (`authorId`) REFERENCES `author`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;