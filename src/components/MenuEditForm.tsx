"use client";

import React, { useState, useMemo } from "react";
import { Save, PlusCircle, FolderTree } from "lucide-react";
import { flattenTreeForDropdown } from "../utils/treeUtils";

// --- DEFINISI TIPE DATA ---
export interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  sortOrder?: number;
  children?: MenuItem[];
}

// Tipe khusus untuk State Form agar ketat
interface MenuFormData {
  id: string;
  name: string;
  parentId: string;
  sortOrder: number;
}

interface MenuEditFormProps {
  selectedNode: MenuItem | null;
  treeData: MenuItem[];
  mode: "edit" | "create";
  onSave: (data: Partial<MenuItem>) => void;
}

interface DropdownOption {
  id: string;
  label: string;
  // Tambahkan properti lain jika fungsi helper kamu mengembalikan data lain
}

export default function MenuEditForm({
  selectedNode,
  treeData,
  mode,
  onSave,
}: MenuEditFormProps) {
  // --- INISIALISASI STATE ---
  // Kita hitung nilai awal langsung disini, jadi TIDAK PERLU useEffect.
  // Form akan otomatis ter-reset karena parent (MenuManager) menggunakan prop 'key'.

  const initialParentId = () => {
    if (mode === "create") {
      return selectedNode ? selectedNode.id : ""; // Kalau create, parentnya adalah node yang diklik
    }
    return selectedNode?.parentId || ""; // Kalau edit, ambil parent dari node tersebut
  };

  const [formData, setFormData] = useState<MenuFormData>({
    id: mode === "edit" && selectedNode ? selectedNode.id : "",
    name: mode === "edit" && selectedNode ? selectedNode.name : "",
    parentId: initialParentId(),
    sortOrder:
      mode === "edit" && selectedNode?.sortOrder ? selectedNode.sortOrder : 0,
  });

  const parentOptions = useMemo(() => {
    // Casting hasil fungsi ke array DropdownOption
    const options = flattenTreeForDropdown(treeData) as DropdownOption[];

    // Cegah circular reference: Item tidak boleh menjadi parent bagi dirinya sendiri
    return mode === "edit"
      ? options.filter((opt: DropdownOption) => opt.id !== formData.id) // Ganti 'any' disini
      : options;
  }, [treeData, formData.id, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // --- TAMPILAN KOSONG (BELUM PILIH MENU) ---
  if (!selectedNode && mode === "edit") {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white rounded-xl border border-gray-200 border-dashed p-8 text-center">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <FolderTree size={48} className="text-blue-200" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          No Menu Selected
        </h3>
        <p className="text-gray-500 max-w-xs mx-auto mt-2">
          Select an item from the tree structure to edit its details, or create
          a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white flex flex-col rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full">
      {/* HEADER */}
      <div className="px-6 py-5 border-b border-gray-100 bg-white flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            mode === "create"
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {mode === "create" ? <PlusCircle size={20} /> : <Save size={20} />}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {mode === "create" ? "Create New Menu" : "Edit Menu Configuration"}
          </h2>
          <p className="text-sm text-gray-500">
            {mode === "create"
              ? `Parent: ${selectedNode?.name || "Root Level"}`
              : `Editing: ${formData.name || "..."}`}
          </p>
        </div>
      </div>

      {/* FORM CONTENT (Scrollable) */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        <form
          id="menu-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
        >
          {mode === "edit" && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Menu ID
              </label>
              <div className="w-full bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-mono">
                {formData.id}
              </div>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Menu Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 bg-white px-3 py-2.5 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Parent Menu
            </label>
            <div className="relative">
              <select
                name="parentId"
                value={formData.parentId}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-300 bg-white px-3 py-2.5 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              >
                <option value="">(Root Level)</option>
                {parentOptions.map((opt: DropdownOption) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mode === "edit" && (
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sort Order
              </label>
              <input
                type="number"
                name="sortOrder"
                value={formData.sortOrder}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white px-3 py-2.5 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>
          )}
        </form>
      </div>

      {/* FOOTER ACTION */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
        <button
          type="submit"
          form="menu-form"
          className={`w-full py-2.5 px-4 rounded-lg text-white font-medium shadow-sm transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
            ${mode === "create" ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-900 hover:bg-slate-800"}`}
        >
          <Save size={18} />
          {mode === "create" ? "Create Item" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
