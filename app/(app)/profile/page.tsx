import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, timezone")
    .eq("id", user.id)
    .single();

  async function updateProfile(formData: FormData) {
    "use server";

    const serverSupabase = await createServerSupabaseClient();
    const {
      data: { user: currentUser }
    } = await serverSupabase.auth.getUser();

    if (!currentUser) {
      redirect("/login");
    }

    const fullName = String(formData.get("full_name") ?? "").trim();
    const timezone = String(formData.get("timezone") ?? "Europe/Madrid").trim() || "Europe/Madrid";

    await serverSupabase.from("profiles").upsert({
      id: currentUser.id,
      full_name: fullName || null,
      timezone
    });

    revalidatePath("/profile");
  }

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Perfil</h1>
          <p className="text-sm text-foreground/70">Base de usuario para tu ERP personal.</p>
        </div>
        <LogoutButton />
      </header>

      <Card className="space-y-4">
        <div>
          <p className="text-xs text-foreground/60">Email</p>
          <p className="text-sm font-medium">{user.email}</p>
        </div>

        <form action={updateProfile} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="full_name" className="text-sm font-medium">
              Nombre
            </label>
            <input
              id="full_name"
              name="full_name"
              defaultValue={profile?.full_name ?? ""}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="timezone" className="text-sm font-medium">
              Zona horaria
            </label>
            <input
              id="timezone"
              name="timezone"
              defaultValue={profile?.timezone ?? "Europe/Madrid"}
              placeholder="Europe/Madrid"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            />
          </div>

          <Button type="submit">Guardar perfil</Button>
        </form>
      </Card>
    </div>
  );
}