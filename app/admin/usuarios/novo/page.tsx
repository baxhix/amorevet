import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import UserForm from "@/components/admin/UserForm";

export default async function NovoUsuarioPage() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/admin/dashboard");

  const selfId = (session.user as any).id;

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Novo Usuário</h1>
        <UserForm selfId={selfId} />
      </div>
    </AdminLayout>
  );
}
