"use client";
import { createContact } from "@/actions";
import React, { useState } from "react";
import Link from "next/link";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (fromData) => {
    setSubmitting(true);
    setMessage("");

    const response = await createContact(fromData);
    if (response.success) {
      setMessage("Your message has been sent successfully! ✅");
      // Optionally, you can reset the form here
      const form = document.getElementById("contact-form");
      form.reset();
    } else {
      setMessage(
        `Failed to send message. ${response.error || "Please try again later."}`
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-center">
        Contact Us Form <span className="text-blue-500">(SSR)</span>
      </h1>
      <p className="text-gray-500 text-2xl text-center">
        Contact form with mongodb and revalidation
      </p>

      {message && (
        <div
          className={`my-4 p-4 text-center rounded-md ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
          {message}
        </div>
      )}

      <form action={onSubmit} id="contact-form" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-500">
            Subject
          </label>
          <textarea
            id="subject"
            name="subject"
            rows="3"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-500">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
        </div>
        <div>
          
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Send Message
            </button>
            <Link rel="" href={"/contacts"}>
            <button
              type="button"
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 mt-2">
              View Messages
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
