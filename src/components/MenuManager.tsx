"use client";

import React, { useState, useMemo } from "react";
import {
  Menu as MenuIcon,
  ChevronDown,
  Menu as HamburgerIcon,
} from "lucide-react";
import { MenuService } from "../services/menu.service";
import TreeItems from "./TreeItems";
import MenuEditForm, { MenuItem } from "./MenuEditForm"; // 1. IMPORT MenuItem
import Breadcrumbs from "./Breadcrumbs";
import { findPathToNode } from "../utils/treeUtils";

// 2. Ganti 'any[]' dengan 'MenuItem[]' pada Props
export default function MenuManager({ items }: { items: MenuItem[] }) {
  const [activeRootMenuId, setActiveRootMenuId] = useState<string | null>(null);

  // 3. Ganti 'any' pada useState menjadi 'MenuItem | null'
  const [selectedNode, setSelectedNode] = useState<MenuItem | null>(null);
  const [formMode, setFormMode] = useState<"edit" | "create">("edit");

  // --- Logic Filter & Breadcrumbs ---
  const filteredTreeItems = useMemo(() => {
    if (!activeRootMenuId) return items;
    const rootItem = items.find((item) => item.id === activeRootMenuId);
    return rootItem ? [rootItem] : [];
  }, [items, activeRootMenuId]);

  const breadcrumbsPath = useMemo(() => {
    if (!selectedNode) return [];
    return findPathToNode(
      items,
      // Karena selectedNode bisa null (meski dicek diatas), TS butuh kepastian
      selectedNode.id,
    );
  }, [items, selectedNode]); // Hapus formMode dari dependency agar lebih efisien

  // 4. Ganti 'any' dengan 'MenuItem' di handler functions
  const handleSelect = (node: MenuItem) => {
    setSelectedNode(node);
    setFormMode("edit");
  };

  const handleAddClick = (parentNode: MenuItem) => {
    setSelectedNode(parentNode);
    setFormMode("create");
  };

  const handleDeleteClick = async (node: MenuItem) => {
    if (window.confirm(`Delete "${node.name}"?`)) {
      try {
        await MenuService.delete(node.id);
        alert("Deleted!");
        window.location.reload();
      } catch (e) {
        alert("Failed to delete.");
      }
    }
  };

  // 5. Ganti 'any' dengan 'Partial<MenuItem>' karena data dari form mungkin tidak lengkap
  const handleSaveForm = async (formData: Partial<MenuItem>) => {
    try {
      // Pastikan casting tipe data aman
      const payload = {
        name: formData.name!, // Gunakan ! jika yakin ada, atau default value
        parentId: formData.parentId || null,
        sortOrder: Number(formData.sortOrder || 0),
      };

      if (formMode === "create") {
        await MenuService.create(payload);
      } else {
        // Pastikan ID ada saat update
        if (formData.id) {
          await MenuService.update(formData.id, payload);
        }
      }
      alert(formMode === "create" ? "Created!" : "Updated!");
      window.location.reload();
    } catch (e) {
      alert("Failed to save.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-gray-50">
      {/* --- PANEL TREE LIST --- */}
      <div className="flex flex-col w-full h-[40%] lg:h-full lg:w-[750px] lg:flex-none bg-white border-b lg:border-b-0 lg:border-r border-gray-200 shadow-sm z-10">
        {/* Header */}
        <div className="flex-none px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="lg:hidden text-gray-500">
                <HamburgerIcon size={20} />
              </div>
              <div className="flex items-center gap-2">
                <MenuIcon size={22} className="text-blue-600" />
                <h1 className="text-lg font-bold text-gray-900">Menus</h1>
              </div>
            </div>
          </div>

          {/* Dropdown */}
          <div className="relative w-full h-aut">
            <select
              value={activeRootMenuId || ""}
              onChange={(e) => setActiveRootMenuId(e.target.value || null)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-8 text-sm focus:outline-none focus:border-blue-600 transition-all"
            >
              <option value="">All Root Menus</option>
              {items.map((root) => (
                <option key={root.id} value={root.id}>
                  {root.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-3 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex-none px-6 py-2 bg-white border-b border-gray-50 overflow-x-auto">
          <Breadcrumbs path={breadcrumbsPath} />
        </div>

        {/* List Item */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[500vh]">
          <TreeItems
            items={filteredTreeItems}
            selectedId={selectedNode?.id}
            onSelect={handleSelect}
            onAdd={handleAddClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* --- PANEL FORM --- */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-50 relative">
        <div className="w-full min-h-full p-4 lg:p-8">
          <MenuEditForm
            key={`${selectedNode?.id}-${formMode}`}
            selectedNode={selectedNode}
            treeData={items}
            mode={formMode}
            onSave={handleSaveForm}
          />
        </div>
      </div>
    </div>
  );
}
