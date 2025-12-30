import { getContactsStats } from "@/actions";
import React from "react";

const ContactStats = async () => {
  const stats = await getContactsStats();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 pb-6">
      <div className="border border-b-pink-600 px-3 py-4 rounded-xl">
        <div className="pb-2">
          <h2 className="text-lg font-bold">Total</h2>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
      </div>
      <div className="border border-b-blue-600 px-3 py-4 rounded-xl">
        <div className="pb-2">
          <h2 className="text-lg font-bold">New</h2>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.newCount}</div>
        </div>
      </div>
      <div className="border border-b-yellow-500 px-3 py-4 rounded-xl">
        <div className="pb-2">
          <h2 className="text-lg font-bold">Read</h2>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.readCount}</div>
        </div>
      </div>
      <div className="border border-b-green-600 px-3 py-4 rounded-xl">
        <div className="pb-2">
          <h2 className="text-lg font-bold">Replied</h2>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.repliedCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactStats;
