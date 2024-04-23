import { redirect } from "@/navigation";
import Content from "./content";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { cookies } from "next/headers";

export default async function Login() {
  let currentUser = null;
  try {
    currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
  } catch (e) {
  } finally {
    if (currentUser) redirect("/");
  }

  return (
    <>
      <Content />
    </>
  );
}



