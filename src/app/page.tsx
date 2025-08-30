import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const isLoggedIn = (await cookieStore).get("loggedIn")?.value === "true";

  redirect(isLoggedIn ? "/dashboard/dash" : "/login");
}
