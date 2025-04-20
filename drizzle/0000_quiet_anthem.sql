CREATE TABLE `authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `authors_id` PRIMARY KEY(`id`),
	CONSTRAINT `authors_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `badTokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`token` varchar(255) NOT NULL,
	CONSTRAINT `badTokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `badTokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `bookCategories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(255) NOT NULL,
	CONSTRAINT `bookCategories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookStatus` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` varchar(255) NOT NULL,
	CONSTRAINT `bookStatus_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bookToCategoryTable` (
	`bookId` int NOT NULL,
	`categoryId` int NOT NULL
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`issuedDate` date DEFAULT '2025-04-20',
	`authorId` int NOT NULL,
	`userId` int,
	`statusId` int,
	CONSTRAINT `books_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviewsAuthor` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`authorId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` varchar(1000),
	`createdAt` date DEFAULT '2025-04-20',
	CONSTRAINT `reviewsAuthor_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviewsBook` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bookId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` varchar(1000),
	`createdAt` date DEFAULT '2025-04-20',
	CONSTRAINT `reviewsBook_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `bookToCategoryTable` ADD CONSTRAINT `bookToCategoryTable_bookId_books_id_fk` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookToCategoryTable` ADD CONSTRAINT `bookToCategoryTable_categoryId_bookCategories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `bookCategories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_authorId_authors_id_fk` FOREIGN KEY (`authorId`) REFERENCES `authors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `books` ADD CONSTRAINT `books_statusId_bookStatus_id_fk` FOREIGN KEY (`statusId`) REFERENCES `bookStatus`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviewsAuthor` ADD CONSTRAINT `reviewsAuthor_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviewsAuthor` ADD CONSTRAINT `reviewsAuthor_authorId_authors_id_fk` FOREIGN KEY (`authorId`) REFERENCES `authors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviewsBook` ADD CONSTRAINT `reviewsBook_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviewsBook` ADD CONSTRAINT `reviewsBook_bookId_books_id_fk` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE no action ON UPDATE no action;