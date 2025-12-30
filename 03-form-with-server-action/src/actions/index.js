"use server";
import { connectToDatabase } from "@/lib/db";
import { Contact } from "@/model/contact.model";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

export async function createContact(formData) {
  try {
    await connectToDatabase();

    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !subject || !message) {
      return { success: false, error: "All fields are required." };
    }

    const emailExists = await Contact.findOne({
      email: email.trim().toLowerCase(),
    });

    if (emailExists) {
      return {
        success: false,
        error: "A message from this email already exists.",
      };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    revalidatePath("/");
    revalidateTag("contact-stats");

    return {
      success: true,
      message: "Contact message created successfully.",
      contact,
      contactId: contact._id.toString(),
    };
  } catch (error) {
    console.log(`[Error] createContact: ${error.message}`);
    return {
      success: false,
      error: error.message || "Something went wrong",
    };
  }
}

export async function getContacts() {
  try {
    await connectToDatabase();

    const contacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .lean();

    return contacts.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.log(`[Error] getContacts: ${error.message}`);
    return [];
  }
}

export async function updateContact(contactId, status) {
  try {
    console.log(status);

    await connectToDatabase();
    await Contact.findByIdAndUpdate(contactId, { status });
    revalidatePath("/");
    revalidateTag("contact-stats");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating contact details", error);
    return { success: false, error: "error to update status" };
  }
}

export async function getContactsStats() {
  const getCachedStats = unstable_cache(
    async () => {
      await connectToDatabase();
      const total = await Contact.countDocuments();
      const newCount = await Contact.countDocuments({ status: "new" });
      const readCount = await Contact.countDocuments({ status: "read" });
      const repliedCount = await Contact.countDocuments({ status: "replied" });
      return { total, newCount, readCount, repliedCount };
    },
    ["contact-stats"],
    { tags: ["contact-stats"] }
  );
  return getCachedStats();
}
