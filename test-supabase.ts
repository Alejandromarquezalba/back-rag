import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Faltan SUPABASE_URL o SUPABASE_KEY en .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('🔍 Probando conexión a Supabase...');
    console.log('URL:', supabaseUrl);
    
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5);
    
    if (error) {
        console.error('❌ Error:', error);
    } else {
        console.log('✅ Datos encontrados:', data);
        console.log('📊 Cantidad:', data.length);
    }
}

test();