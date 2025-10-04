"use client";
import React, { useState, useMemo,useEffect } from "react";
import {
  Mail,
  Star,
  Edit2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useEmails } from "@/app/hooks/useBackOffice";

const PAGE_SIZE = 10; // 👈 show 10 per page

const EmailPage = () => {
  const { data: emails = [], isLoading } = useEmails();
  const [activeTab, setActiveTab] = useState("Inbox");
  const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");


    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter emails based on tab
  const filteredEmailsByTab  = useMemo(() => {
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

    const filteredEmails = useMemo(() => {
    if (!debouncedSearchTerm) return filteredEmailsByTab;

    const lowerSearch = debouncedSearchTerm.toLowerCase();
    return filteredEmailsByTab.filter(
      (email: any) =>
        email.sender?.toLowerCase().includes(lowerSearch) ||
        email.subject?.toLowerCase().includes(lowerSearch) ||
        email.preview?.toLowerCase().includes(lowerSearch)
    );
  }, [filteredEmailsByTab, debouncedSearchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmails.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEmails = filteredEmails.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) return <p className="p-4">Loading emails...</p>;

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
            <p className="text-xs text-gray-500">Web Developer</p>
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
          {/* Top Row */}
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-xl font-semibold">{activeTab}</h2>
            <div className="flex items-center border bg-[#f5f5f5] rounded px-2 py-3 w-64">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm bg-transparent"
                  value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          {/* Pagination Row */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">Select all</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>
                {filteredEmails.length === 0
                  ? "0 of 0"
                  : `${startIndex + 1}-${Math.min(
                      startIndex + PAGE_SIZE,
                      filteredEmails.length
                    )} of ${filteredEmails.length}`}
              </span>

              <ChevronLeft
                onClick={handlePrevPage}
                className={`h-8 w-8 rounded-full border border-black bg-[#f5f5f5] ${
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-300"
                    : "cursor-pointer hover:text-black"
                }`}
              />

              <ChevronRight
                onClick={handleNextPage}
                className={`h-8 w-8 rounded-full border border-black bg-[#f5f5f5] ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-300"
                    : "cursor-pointer hover:text-black"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {paginatedEmails.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No emails found.</p>
          ) : (
            paginatedEmails.map((email: any) => (
              <div
                key={email.id}
                className="flex items-center border-b border-black px-4 py-5 hover:bg-gray-50 cursor-pointer"
              >
                <input type="checkbox" className="mr-3" />
                <Star
                  className={`h-4 w-4 mr-3 cursor-pointer ${
                    email.starred ? "text-yellow-400" : "text-gray-400"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-semibold">{email.from}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {email.subject} — {email.body}
                  </p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  {new Date(email.date).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default EmailPage;
