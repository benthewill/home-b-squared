import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    },
  );
}

// import { cookies } from "next/headers";
// import { RequestCookies } from "@edge-runtime/cookies";
// import { cache } from "react";
// import { headers } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// export const dynamic = "force-dynamic";

// export const createServerClient = cache(async () => {
//   const cookies = new RequestCookies(headers()); // aaaaany 👋
//   return createServerComponentClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     { cookies: () => cookies },
//   );
// });

// export async function getSession() {
//   const supabase = createServerClient();
//   try {
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();
//     return session;
//   } catch (error) {
//     c;
//     console.error("Error:", error);
//     return null;
//   }
// }
