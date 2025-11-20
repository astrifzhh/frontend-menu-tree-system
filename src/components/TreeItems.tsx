import React from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";
import { MenuItem } from "./MenuEditForm";

// 1. Interface untuk Komponen Utama (List)
interface TreeItemsProps {
  items: MenuItem[];
  selectedId?: string;
  onSelect: (node: MenuItem) => void;
  onAdd: (node: MenuItem) => void;
  onDelete: (node: MenuItem) => void;
  level?: number;
}

// 2. Interface untuk Komponen Anak (Single Node) - Hapus 'any' disini
interface TreeNodeProps {
  item: MenuItem;
  selectedId?: string;
  onSelect: (node: MenuItem) => void;
  onAdd: (node: MenuItem) => void;
  onDelete: (node: MenuItem) => void;
  level: number;
}

export default function TreeItems({
  items,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
  level = 0,
}: TreeItemsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          selectedId={selectedId}
          onSelect={onSelect}
          onAdd={onAdd}
          onDelete={onDelete}
          level={level}
        />
      ))}
    </div>
  );
}

// --- Sub-Component TreeNode ---
// 3. Gunakan Interface TreeNodeProps menggantikan 'any'
function TreeNode({
  item,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
  level,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = item.id === selectedId;

  return (
    <div>
      <div
        className={`
                flex items-center gap-2 py-2 px-2 rounded-lg cursor-pointer transition-colors group
                ${isSelected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}
            `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(item)}
      >
        {/* Toggle Expand Icon */}
        <div
          className="p-1 rounded-md hover:bg-black/5 text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <div className="w-[14px]" />
          )}
        </div>

        {/* Icon Folder/File */}
        {hasChildren ? (
          <Folder size={16} className="text-blue-400" />
        ) : (
          <FileText size={16} className="text-gray-400" />
        )}

        {/* Nama Menu */}
        <span className="flex-1 text-sm font-medium truncate select-none">
          {item.name}
        </span>

        {/* Action Buttons */}
        <div
          className={`flex items-center gap-1 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(item);
            }}
            className="p-1 hover:bg-blue-200 rounded text-blue-600"
            title="Add Child"
          >
            <Plus size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item);
            }}
            className="p-1 hover:bg-red-200 rounded text-red-600"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Render Anak-anaknya (Rekursif) */}
      {isExpanded && hasChildren && (
        <TreeItems
          // Gunakan '|| []' atau '!' untuk meyakinkan TS bahwa children ada (karena sudah dicek hasChildren)
          items={item.children!}
          selectedId={selectedId}
          onSelect={onSelect}
          onAdd={onAdd}
          onDelete={onDelete}
          level={level + 1}
        />
      )}
    </div>
  );
}
