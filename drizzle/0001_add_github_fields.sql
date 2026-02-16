-- Add GitHub repository field to skills table
ALTER TABLE "skills" ADD COLUMN "github_repo" varchar(255);

-- Add GitHub username field to users table  
ALTER TABLE "users" ADD COLUMN "github_username" varchar(255);

-- Add GitHub invite status field to purchases table
ALTER TABLE "purchases" ADD COLUMN "github_invite_status" varchar(50) DEFAULT 'not_sent';