import React from "react";

interface MenuItem {
  id: string;
  parentId?: string | null;
  name: string;
  sortOrder: number;
  children?: MenuItem[];
}

export default function MenuTree({ items }: { items: MenuItem[] }) {
  return (
    <ul className="pl-4 space-y-2">
      {items.map((item) => (
        <li key={item.id} className="border p-2 rounded bg-white shadow-sm">
          <div className="flex justify-between items-center">
            <span>{item.name}</span>

            <div className="flex gap-2 text-sm">
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600">Delete</button>
            </div>
          </div>

          {item.children && item.children.length > 0 && (
            <MenuTree items={item.children} />
          )}
        </li>
      ))}
    </ul>
  );
}
