import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

import { corsHeaders } from '../_shared/cors.ts';
import { supabaseAdmin } from '../_shared/supabaseAdmin.ts';

serve(async (req: Request) => {
  console.log('delete-user function started');
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const origin = req.headers.get('origin');
  if (origin !== 'https://snipshot.dev') {
    return new Response(null, { headers: corsHeaders, status: 403 });
  }

  const authToken = req.headers.get('Authorization')?.split('Bearer ')[1];
  if (!authToken) {
    return new Response(null, { headers: corsHeaders, status: 401 });
  }

  const {
    data: { user }
  } = await supabaseAdmin.auth.getUser(authToken);

  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    return new Response(JSON.stringify(error), {
      headers: corsHeaders,
      status: 500
    });
  }

  console.log(
    `User ID ${user.id}, name: ${user.user_metadata.user_name} was deleted.`
  );

  return new Response(null, {
    headers: corsHeaders,
    status: 200
  });
});
