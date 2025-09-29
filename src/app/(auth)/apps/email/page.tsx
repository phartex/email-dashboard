"use client";
import React, { useState, useMemo } from "react";
import {
  Mail,
  Star,
  Trash,
  Edit2,
  Search,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import Image from "next/image";
import { useEmails } from "@/app/hooks/useBackOffice";

const PAGE_SIZE = 15;

const EmailPage = () => {
  const { data: emails = [], isLoading } = useEmails();
  const [activeTab, setActiveTab] = useState("Inbox");
  const [currentPage, setCurrentPage] = useState(1);

  // Move useMemo BEFORE the conditional return
  const filteredEmails = useMemo(() => {
    switch (activeTab) {
      case "Starred":
        return emails.filter((e: any) => e.starred);
      case "Sent":
        return emails.filter((e: any) => e.folder === "sent");
      case "Important":
        return emails.filter((e: any) => e.important);
      case "Drafts":
        return emails.filter((e: any) => e.folder === "drafts");
      case "Trash":
        return emails.filter((e: any) => e.folder === "trash");
      default:
        return emails; // Inbox
    }
  }, [emails, activeTab]);

  const totalPages = Math.ceil(filteredEmails.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEmails = filteredEmails.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // NOW you can conditionally return AFTER all hooks have been called
  if (isLoading) {
    return <p className="p-4">Loading emails...</p>;
  }

  return (
    <div className="flex h-screen bg-white border border-black rounded-md p-5 mt-7">
      {/* Sidebar */}
      <aside className="w-64 p-4 flex flex-col">
        {/* Profile */}
        <div className="flex items-center space-x-3 mb-6">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">Ari Budin</h2>
            <p className="text-xs text-gray-500">Web developer</p>
          </div>
        </div>

        {/* Compose Button */}
        <button className="mb-6 flex items-center justify-center rounded-md bg-[#d7f596] px-4 py-2 text-black font-semibold border-black border-2">
          <Edit2 className="mr-2 h-4 w-4" /> Compose
        </button>

        {/* Menu */}
        <nav className="space-y-2">
          {["Inbox", "Starred", "Sent", "Important", "Drafts", "Trash"].map(
            (tab) => (
              <div
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`flex items-center justify-between cursor-pointer rounded-md px-4 py-2 ${
                  activeTab === tab
                    ? "font-semibold bg-[#f5f5f5] border border-black"
                    : "hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab === "Inbox" && <Mail className="h-4 w-4" />}
                  {tab === "Drafts" && "(30)"}
                  {tab}
                </span>
                {tab === "Inbox" && (
                  <span className="rounded bg-gray-200 px-2 text-sm">
                    {emails.length}
                  </span>
                )}
              </div>
            )
          )}
        </nav>

        {/* Labels */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-600 mb-2">Labels</h4>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-green-600 py-3">🏢 Work</li>
            <li className="cursor-pointer hover:text-green-600 py-3">
              👨‍👩‍👧 Family
            </li>
            <li className="cursor-pointer hover:text-green-600 py-3">👥 Friends</li>
            <li className="cursor-pointer hover:text-green-600 py-3">🏢 Office</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col border-b">
          {/* Row 1: Title + Refresh */}
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-xl font-semibold">{activeTab}</h2>
            <div className="flex items-center border bg-[#f5f5f5] rounded px-2 py-3 w-64">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <Search className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Row 2: Select all + Search + Pagination */}
          <div className="flex items-center justify-between px-4 py-2">
            {/* Select All */}
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">Select all</span>
            </div>

            {/* Search + Pagination grouped */}
            <div className="flex items-center gap-6">
              {/* Pagination */}
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>
                  {startIndex + 1}-
                  {Math.min(startIndex + PAGE_SIZE, filteredEmails.length)} of{" "}
                  {filteredEmails.length}
                </span>
                <ChevronLeft
                  color={currentPage === 1 ? "#D1D5DB" : "#000000"}
                  className={`h-8 w-8 bg-[#f5f5f5] rounded-2xl border border-black ${
                    currentPage === 1
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:text-blue-600"
                  }`}
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                />

                <ChevronRight
                  className={`h-8 w-8 cursor-pointer bg-[#f5f5f5] rounded-2xl border-black border ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:text-black"
                  }`}
                  onClick={() =>
                    currentPage < totalPages && setCurrentPage(currentPage + 1)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {paginatedEmails.map((email: any) => (
            <div
              key={email.id}
              className="flex items-center border-b border-black px-4 py-5 hover:bg-gray-50 cursor-pointer"
            >
              {/* Checkbox */}
              <input type="checkbox" className="mr-3" />

              {/* Star */}
              <Star
                className={`h-4 w-4 mr-3 cursor-pointer ${
                  email.starred ? "text-yellow-400" : "text-gray-400"
                }`}
              />

              {/* Sender + Subject */}
              <div className="flex-1">
                <p className="font-semibold">{email.sender}</p>
                <p className="text-sm text-gray-600 truncate">
                  {email.subject} — {email.preview}
                </p>
              </div>

              {/* Time */}
              <div className="ml-auto text-sm text-gray-500">{email.time}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmailPage;