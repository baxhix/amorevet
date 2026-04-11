import AdminLayout from "@/components/admin/AdminLayout";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function MensagensPage() {
  const messages = await getMessages();

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Mensagens de Contato</h1>

        {messages.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
            <div className="text-5xl mb-3">✉️</div>
            <p className="text-gray-400">Nenhuma mensagem recebida.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-white rounded-xl border shadow-sm p-5 ${
                  !msg.read ? "border-secondary bg-primary-50/30" : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-primary-500 inline-block flex-shrink-0"></span>
                      )}
                      <p className="font-semibold text-gray-900">{msg.name}</p>
                      <span className="text-gray-300">•</span>
                      <p className="text-sm text-gray-500">{msg.email}</p>
                      {msg.phone && (
                        <>
                          <span className="text-gray-300">•</span>
                          <p className="text-sm text-gray-500">{msg.phone}</p>
                        </>
                      )}
                    </div>
                    <p className="font-medium text-gray-800 text-sm mb-2">{msg.subject}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-400 flex-shrink-0">{formatDate(msg.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
