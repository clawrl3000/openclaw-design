import { pgTable, uuid, text, integer, boolean, timestamp, varchar, smallint, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// NextAuth.js tables
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 255 }),
});

export const sessions = pgTable('sessions', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

export const verificationTokens = pgTable(
  'verificationTokens',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires').notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// Skills table
export const skills = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  price_cents: integer('price_cents').notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  hero_image_url: text('hero_image_url'),
  category: varchar('category', { length: 100 }).notNull(),
  published: boolean('published').notNull().default(false),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow(),
});

// Skill versions table
export const skill_versions = pgTable('skill_versions', {
  id: uuid('id').primaryKey().defaultRandom(),
  skill_id: uuid('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  version: varchar('version', { length: 50 }).notNull(),
  changelog: text('changelog'),
  bundle_url: text('bundle_url'),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('emailVerified'),
  image: text('image'),
  // Additional fields for marketplace functionality
  stripe_customer_id: varchar('stripe_customer_id', { length: 255 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

// Purchases table
export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  skill_id: uuid('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  skill_version_id: uuid('skill_version_id').references(() => skill_versions.id, { onDelete: 'set null' }),
  stripe_payment_intent_id: varchar('stripe_payment_intent_id', { length: 255 }).notNull(),
  amount_cents: integer('amount_cents').notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  purchased_at: timestamp('purchased_at').notNull().defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  skill_id: uuid('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
  rating: smallint('rating').notNull(), // 1-5 rating
  body: text('body'),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

// Relations
export const skillsRelations = relations(skills, ({ many }) => ({
  versions: many(skill_versions),
  purchases: many(purchases),
  reviews: many(reviews),
}));

export const skillVersionsRelations = relations(skill_versions, ({ one, many }) => ({
  skill: one(skills, {
    fields: [skill_versions.skill_id],
    references: [skills.id],
  }),
  purchases: many(purchases),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  purchases: many(purchases),
  reviews: many(reviews),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const purchasesRelations = relations(purchases, ({ one }) => ({
  user: one(users, {
    fields: [purchases.user_id],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [purchases.skill_id],
    references: [skills.id],
  }),
  skillVersion: one(skill_versions, {
    fields: [purchases.skill_version_id],
    references: [skill_versions.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.user_id],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [reviews.skill_id],
    references: [skills.id],
  }),
}));

// Type exports for use in the application
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
export type SkillVersion = typeof skill_versions.$inferSelect;
export type NewSkillVersion = typeof skill_versions.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;