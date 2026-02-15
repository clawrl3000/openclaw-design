import { db } from './index';
import { skills, skill_versions } from './schema';
import { SKILLS } from '../data/skills';

/**
 * Seed script to populate the database with initial skills from the hardcoded data
 * This converts the existing SKILLS array to database records
 */
async function seedSkills() {
  console.log('Starting to seed skills...');

  try {
    // Insert all skills
    for (const skillData of SKILLS) {
      console.log(`Inserting skill: ${skillData.name}`);

      // Insert the skill record
      const [insertedSkill] = await db.insert(skills).values({
        slug: skillData.slug,
        name: skillData.name,
        tagline: skillData.tagline,
        description: skillData.description,
        price_cents: skillData.priceNum * 100, // Convert dollars to cents
        currency: 'USD',
        hero_image_url: skillData.heroImage || null,
        category: skillData.category,
        published: true, // All existing skills are published
      }).returning();

      // Insert the initial version for each skill
      await db.insert(skill_versions).values({
        skill_id: insertedSkill.id,
        version: skillData.version,
        changelog: `Initial release of ${skillData.name}`,
        bundle_url: null, // Will be populated when bundles are uploaded
      });

      console.log(`✓ Successfully inserted skill: ${skillData.name} (v${skillData.version})`);
    }

    console.log(`\n🎉 Successfully seeded ${SKILLS.length} skills to the database!`);
    
  } catch (error) {
    console.error('Error seeding skills:', error);
    throw error;
  }
}

/**
 * Main seed function
 */
async function seed() {
  console.log('🌱 Starting database seed...\n');
  
  await seedSkills();
  
  console.log('\n✅ Database seeding completed successfully!');
  process.exit(0);
}

// Run the seed script if this file is executed directly
if (require.main === module) {
  seed().catch((error) => {
    console.error('💥 Seed failed:', error);
    process.exit(1);
  });
}

export { seed, seedSkills };