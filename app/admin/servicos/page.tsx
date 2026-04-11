import AdminLayout from "@/components/admin/AdminLayout";
import ServiceManager from "@/components/admin/ServiceManager";
import { prisma } from "@/lib/prisma";

async function getServices() {
  try {
    return await prisma.service.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export default async function ServicosAdminPage() {
  const services = await getServices();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Serviços</h1>
        <ServiceManager initialServices={services} />
      </div>
    </AdminLayout>
  );
}
