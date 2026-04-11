import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLayout from "@/components/admin/AdminLayout";
import UserForm from "@/components/admin/UserForm";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

async function getUser(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });
  } catch {
    return null;
  }
}

export default async function EditUsuarioPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") redirect("/admin/dashboard");

  const { id } = await params;
  const user = await getUser(id);
  if (!user) notFound();

  const selfId = (session.user as any).id;

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Editar Usuário</h1>
        <p className="text-sm text-gray-400 mb-8">{user.email}</p>
        <UserForm user={user} selfId={selfId} />
      </div>
    </AdminLayout>
  );
}
