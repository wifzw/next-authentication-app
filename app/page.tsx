import AuthForm from "@/components/auth-form";

export default async function Home({
  searchParams,
}: {
  searchParams: { mode?: "login" | "signup" };
}) {
  const formMode =
    searchParams.mode === "login" || searchParams.mode === "signup"
      ? searchParams.mode
      : false || "login";

  return <AuthForm mode={formMode} />;
}
