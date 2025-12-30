import { getContacts, updateContact } from "@/actions";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ContactsList = async () => {
  const contacts = await getContacts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Contacts List</h2>
        <h2>
          {contacts.length} {contacts.length === 1 ? "message" : "messages"}
        </h2>
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center py-12">
          <Mail className="text-red-500 mb-2" />
          <h2 className="text-lg font-semibold">No messages yet</h2>
        </div>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="pb-3">
              <div className="border border-b-blue-600 px-3 py-4 rounded-xl">
                <div className="flex items-start justify-between">
                  {/* LEFT */}
                  <div className="w-full">
                    <h3 className="text-xl font-bold text-green-600">
                      {contact.subject}
                    </h3>

                    <p className="text-sm text-yellow-300">
                      From: {contact.name} ({contact.email})
                    </p>

                    {/* MESSAGE */}
                    <p className="mt-4 text-l text-white">{contact.message}</p>

                    {/* DATE + ACTION */}
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        {new Date(contact.createdAt).toLocaleString()}
                      </span>

                      {contact.status === "new" && (
                        <form
                          action={async () => {
                            "use server";
                            await updateContact(contact._id, "read");
                          }}>
                          <button className="text-xs text-blue-500 hover:underline">
                            Mark as Read
                          </button>
                        </form>
                      )}

                      {contact.status === "read" && (
                        <form 
                         action={async () => {
                            "use server";
                            await updateContact(contact._id, "replied");
                          }}
                        >
                          <button className="text-xs text-green-500 hover:underline">
                            Mark as Replied
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <Badge
                    variant={
                      contact.status === "new" ? "default" : "secondary"
                    }>
                    {contact.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsList;
