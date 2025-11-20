"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Folder,
  LayoutGrid,
  List,
  ChevronDown,
  Menu as MenuIcon,
  X,
} from "lucide-react";

// --- INTERFACE ---
interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  children?: MenuItem[];
}

// --- SIDEBAR ITEM COMPONENT ---
interface SidebarItemProps {
  item: MenuItem;
  depth?: number;
}

const SidebarItem = ({ item, depth = 0 }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  // Ikon Folder jika ada anak, List jika tidak
  const Icon = hasChildren ? Folder : List;

  // Indentasi bertingkat
  const paddingLeft = depth > 0 ? `${depth * 16 + 12}px` : "12px";

  return (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors text-white hover:bg-[#FFFFFF] hover:text-black`}
        style={{ paddingLeft }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} />
          <span className="text-sm font-medium">{item.name}</span>
        </div>

        {hasChildren && (
          <div
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            <ChevronDown size={16} />
          </div>
        )}
      </div>

      {/* Render Submenu */}
      {hasChildren && isOpen && (
        <div className="bg-[#045FC8] rounded-lg my-1">
          <div className="overflow-hidden transition-all duration-300 ease-in-out py-1">
            {item.children!.map((child) => (
              <SidebarItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN SIDEBAR COMPONENT ---
interface SidebarProps {
  items: MenuItem[];
}

export default function Sidebar({ items = [] }: SidebarProps) {
  // State untuk toggle sidebar di mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter: Hanya tampilkan item root (parentId kosong/null)
  const rootItems = items.filter((item) => !item.parentId);

  return (
    <>
      {/* OVERLAY (Hanya muncul di Mobile saat sidebar terbuka) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0051AF] text-white flex flex-col p-4 z-50 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:h-[96vh] lg:rounded-3xl lg:my-4 lg:ml-4 lg:shadow-2xl
        `}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between mb-8 px-2 mt-2">
          {/* Container Logo */}
          <div className="relative w-32 h-24">
            <Image
              src="/logo_company.png"
              alt="Menu System Logo"
              className="object-contain"
              fill
            />
          </div>

          {/* Tombol Close (Hanya di Mobile) */}
          <button
            className="lg:hidden text-white hover:text-gray-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* List Menu Scrollable */}
        <nav className="flex-1 overflow-y-auto no-scrollbar">
          {rootItems.length > 0 ? (
            rootItems.map((item) => <SidebarItem key={item.id} item={item} />)
          ) : (
            <div className="text-white/70 text-sm text-center mt-10">
              No menu items found
            </div>
          )}
        </nav>
      </aside>

      {/* TOMBOL BURGER MENU (Hanya muncul di Mobile) */}
      {/* Tombol ini menempel di kiri atas layar */}
      <button
        className="fixed top-4 left-4 p-2 bg-[#0051AF] text-white rounded-md shadow-lg z-30 lg:hidden hover:bg-blue-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <MenuIcon size={24} />
      </button>
    </>
  );
}
