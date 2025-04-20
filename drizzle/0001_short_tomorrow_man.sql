ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);