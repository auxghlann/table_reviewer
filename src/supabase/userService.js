import { supabase } from './client';

export const userService = {
  async signIn(username, password) {
    const { data, error } = await supabase
      .from('table_reviewer')
      .select('*')
      .eq('username', username)
      .eq('hash_pass', password)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error signing in:', error);
      return null;
    }

    if (data) {
      return data;
    } else {
      console.error('Error signing in: User not found');
      return null;
    }
  },
};
