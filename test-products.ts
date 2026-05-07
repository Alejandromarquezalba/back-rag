import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('🔍 Probando con _prisma_migrations...');
    
    const { data, error } = await supabase
        .from('_prisma_migrations')
        .select('*')
        .limit(5);
    
    console.log('Datos:', data);
    if (error) console.error('Error:', error);
}

test();