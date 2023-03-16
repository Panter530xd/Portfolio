
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type {NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({req,res});
  const data =  await supabase.from("Post").select("*")
  res.status(200).json("cronfinish")
}

