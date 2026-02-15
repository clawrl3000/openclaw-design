import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { skills, skill_versions } from './schema';
import { SKILLS } from '../data/skills';

const connectionString = process.env.DATABASE_URL || '';
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log('🌱 Starting database seed (local driver)...\n');

  for (const skillData of SKILLS) {
    console.log(`Inserting skill: ${skillData.name}`);
    const [insertedSkill] = await db.insert(skills).values({
      slug: skillData.slug,
      name: skillData.name,
      tagline: skillData.tagline,
      description: skillData.description,
      price_cents: skillData.priceNum * 100,
      currency: 'USD',
      hero_image_url: skillData.heroImage || null,
      category: skillData.category,
      published: true,
    }).returning();

    await db.insert(skill_versions).values({
      skill_id: insertedSkill.id,
      version: skillData.version,
      changelog: `Initial release of ${skillData.name}`,
      bundle_url: null,
    });

    console.log(`✓ ${skillData.name} (v${skillData.version})`);
  }

  console.log(`\n🎉 Seeded ${SKILLS.length} skills!`);
  await client.end();
  process.exit(0);
}

seed().catch((e) => { console.error('💥 Seed failed:', e); process.exit(1); });
