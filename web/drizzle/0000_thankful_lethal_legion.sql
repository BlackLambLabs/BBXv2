CREATE TABLE `subscribers` (
	`email` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`consent_version` text NOT NULL,
	`removal_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscribers_removal_hash_unique` ON `subscribers` (`removal_hash`);