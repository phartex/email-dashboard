"use client";
import React, { useState, useMemo, useEffect } from "react";
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

const PAGE_SIZE = 10;

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

  const filteredEmailsByTab = useMemo(() => {
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
        return emails;
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

  const totalPages = Math.ceil(filteredEmails.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedEmails = filteredEmails.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  if (isLoading) return <p className="p-4">Loading emails...</p>;

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white border border-black rounded-md p-2 sm:p-5 mt-2 sm:mt-7">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:relative w-64 p-4 bg-white flex-col border-r">
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
            <h2 className="font-semibold text-sm sm:text-base">Ari Budin</h2>
            <p className="text-xs text-gray-500">Web Developer</p>
          </div>
        </div>

        {/* Compose Button */}
        <button className="mb-6 flex items-center justify-center rounded-md bg-[#d7f596] px-3 sm:px-4 py-2 text-sm sm:text-base text-black font-semibold border-black border-2 hover:bg-[#c9e887] transition-colors">
          <Edit2 className="mr-2 h-4 w-4" /> Compose
        </button>

        {/* Menu */}
        <nav className="space-y-2">
          {["Inbox", "Starred", "Sent", "Important", "Drafts", "Trash"].map(
            (tab) => (
              <div
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center justify-between cursor-pointer rounded-md px-3 sm:px-4 py-2 text-sm sm:text-base transition-colors ${
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
                  <span className="rounded bg-gray-200 px-2 text-xs sm:text-sm">
                    {emails.length}
                  </span>
                )}
              </div>
            )
          )}
        </nav>

        {/* Labels */}
        <div className="mt-6 hidden sm:block">
          <h4 className="font-semibold text-gray-600 mb-2 text-sm">Labels</h4>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-green-600 py-2 transition-colors">🏢 Work</li>
            <li className="cursor-pointer hover:text-green-600 py-2 transition-colors">
              👨‍👩‍👧 Family
            </li>
            <li className="cursor-pointer hover:text-green-600 py-2 transition-colors">👥 Friends</li>
            <li className="cursor-pointer hover:text-green-600 py-2 transition-colors">🏢 Office</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:ml-0">
        {/* Mobile Tab Navigation - Only visible on mobile */}
        <div className="lg:hidden border-b overflow-x-auto">
          <div className="flex gap-1 p-2 min-w-max">
            {["Inbox", "Starred", "Sent", "Important", "Drafts", "Trash"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-3 py-1.5 rounded text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "bg-[#d7f596] border border-black font-semibold"
                      : "bg-gray-100 border border-gray-300"
                  }`}
                >
                  {tab}
                  {tab === "Inbox" && (
                    <span className="ml-1 text-xs">({emails.length})</span>
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col border-b">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 sm:px-4 py-2 gap-2 sm:gap-0">
            <h2 className="text-lg sm:text-xl font-semibold">
              {activeTab}
            </h2>
            <div className="flex items-center border bg-[#f5f5f5] rounded px-2 py-2 sm:py-3 w-full sm:w-64">
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
          <div className="flex items-center justify-between px-2 sm:px-4 py-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-xs sm:text-sm hidden sm:inline">Select all</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
              <span className="hidden sm:inline">
                {filteredEmails.length === 0
                  ? "0 of 0"
                  : `${startIndex + 1}-${Math.min(
                      startIndex + PAGE_SIZE,
                      filteredEmails.length
                    )} of ${filteredEmails.length}`}
              </span>
              <span className="sm:hidden">
                {filteredEmails.length === 0
                  ? "0/0"
                  : `${startIndex + 1}-${Math.min(
                      startIndex + PAGE_SIZE,
                      filteredEmails.length
                    )}/${filteredEmails.length}`}
              </span>

              <ChevronLeft
                onClick={handlePrevPage}
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-black bg-[#f5f5f5] p-1 ${
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-300"
                    : "cursor-pointer hover:text-black"
                }`}
              />

              <ChevronRight
                onClick={handleNextPage}
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-black bg-[#f5f5f5] p-1 ${
                  currentPage === totalPages || filteredEmails.length === 0
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
            <p className="text-center text-gray-500 mt-10 text-sm">No emails found.</p>
          ) : (
            paginatedEmails.map((email: any) => (
              <div
                key={email.id}
                className="flex items-start sm:items-center border-b border-black px-2 sm:px-4 py-3 sm:py-5 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input type="checkbox" className="mr-2 sm:mr-3 mt-1 sm:mt-0 w-4 h-4 flex-shrink-0" />
                <Star
                  className={`h-4 w-4 mr-2 sm:mr-3 cursor-pointer flex-shrink-0 mt-1 sm:mt-0 transition-colors ${
                    email.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {email.from}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                    {email.subject} — {email.body}
                  </p>
                </div>
                <div className="ml-2 sm:ml-auto text-xs sm:text-sm text-gray-500 flex-shrink-0">
                  <span className="hidden sm:inline">
                    {new Date(email.date).toLocaleDateString()}
                  </span>
                  <span className="sm:hidden">
                    {new Date(email.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
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