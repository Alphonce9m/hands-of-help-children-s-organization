const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyDatabaseStructure() {
  try {
    console.log('Verifying database connection and structure...');

    // Test 1: Basic connection
    await prisma.$connect();
    console.log('✅ Successfully connected to the database');

    // Test 2: Verify tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('✅ Database tables:', tables);

    // Test 3: Verify enums exist
    const enums = await prisma.$queryRaw`
      SELECT t.typname as enum_name, e.enumlabel as enum_value
      FROM pg_type t 
      JOIN pg_enum e ON t.oid = e.enumtypid  
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      WHERE n.nspname = 'public'
      ORDER BY t.typname, e.enumsortorder;
    `;
    console.log('✅ Database enums:', enums);

    // Test 4: Verify indexes
    const indexes = await prisma.$queryRaw`
      SELECT
        tablename,
        indexname,
        indexdef
      FROM
        pg_indexes
      WHERE
        schemaname = 'public'
      ORDER BY
        tablename,
        indexname;
    `;
    console.log('✅ Database indexes:', indexes);

    console.log('\n🎉 Database structure verification completed successfully!');
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabaseStructure(); 