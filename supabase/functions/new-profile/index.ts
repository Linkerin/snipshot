import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Creates a random string using Math.random() method and Date.now().
 * @returns Random string
 * @example randomString(); // 'a35cb487380'
 */
function randomString(): string {
  return (
    Math.random().toString(16).slice(2, 7) + Date.now().toString().slice(7)
  );
}

serve(async (req: Request) => {
  try {
    const userAgent = req.headers.get('user-agent') ?? '';
    if (!/pg_net/.test(userAgent)) throw new Error('Invalid client');

    const { record } = await req.json();

    if (!record.id || !record.raw_user_meta_data) {
      return new Response(
        JSON.stringify({ message: 'ID and meta data are required fields.' }),
        {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        }
      );
    }

    console.log(`New profile function for user ID ${record.id}.`);

    const user = {
      id: record.id,
      avatar: record.raw_user_meta_data?.avatar_url,
      name: record.raw_user_meta_data?.user_name,
      githubId: record.raw_user_meta_data?.provider_id
    };

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('name')
      .eq('name', user.name);
    if (profileError) throw profileError;

    // The case when the name already exists
    if (profileData.length > 0) {
      // Check whether name in the format of `username-GithubID` is unique
      const nameWithId = `${user.name}-${user.githubId}`;
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('name', nameWithId);
      if (error) throw error;

      if (data.length > 0) {
        // Generate a random appendix to the username
        let unique = false;
        while (!unique) {
          let randomName = `${user.name}-${randomString()}`;
          const { data, error } = await supabase
            .from('profiles')
            .select('name')
            .eq('name', randomName);
          if (error) throw error;
          if (data.length === 0) {
            user.name = randomName;
            unique = true;
          }
        }
      } else {
        // Set the name in the formar of `username-GithubID` that proved to be unique
        user.name = nameWithId;
      }
    }

    const { error: profileCreateError } = await supabase
      .from('profiles')
      .insert({ id: user.id, name: user.name, avatar: user.avatar });
    if (profileCreateError) throw profileCreateError;
    const { error: roleCreateError } = await supabase
      .from('users_roles')
      .insert({ id: user.id, roles: ['user'] });
    if (roleCreateError) throw roleCreateError;

    console.log('New profile function successfully ended.');
    return new Response(
      JSON.stringify({ message: 'User profile was recorded', userId: user.id }),
      { headers: { 'Content-Type': 'application/json' }, status: 201 }
    );
  } catch (err) {
    const body = {
      message: 'Error occured while recording user profile',
      err
    };
    console.warn(body.message);
    console.warn(err);

    return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    });
  }
});
