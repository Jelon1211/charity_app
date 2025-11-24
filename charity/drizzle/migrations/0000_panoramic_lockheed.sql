CREATE TABLE `donations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`donated_at` integer NOT NULL,
	`amount` integer NOT NULL,
	`purpose` text NOT NULL,
	`source` text NOT NULL,
	`created` integer NOT NULL,
	`modified` integer NOT NULL
);
