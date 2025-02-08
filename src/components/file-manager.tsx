"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";
import {
  type File,
  type Folder,
  getItemIcon,
  findItemById,
  getItemsByParentId,
} from "~/lib/file-manager-utils";
import { Button } from "~/components/ui/button";

export function FileManager() {
  const [currentFolderId, setCurrentFolderId] = useState<string>("0");

  const [breadcrumb, setBreadcrumb] = useState<string[]>(["0"]);

  const handleItemClick = (item: File | Folder) => {
    if (item.type === "folder") {
      setCurrentFolderId(item.id);
      setBreadcrumb([...breadcrumb, item.id]);
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentFolderId("0");
      setBreadcrumb(["0"]);
    } else {
      const newBreadcrumb = breadcrumb.slice(0, index + 1);
      const lastItem = findItemById(newBreadcrumb[newBreadcrumb.length - 1]!);
      if (lastItem && lastItem.type === "folder") {
        setCurrentFolderId(lastItem.id);
        setBreadcrumb(newBreadcrumb);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <div className="flex items-center justify-between border-b border-border p-4">
        <Breadcrumb items={breadcrumb} onItemClick={handleBreadcrumbClick} />
        <NewButton />
      </div>
      <div className="flex-grow overflow-auto">
        <FileList
          items={getItemsByParentId(currentFolderId)}
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  );
}

function Breadcrumb({
  items,
  onItemClick,
}: {
  items: string[];
  onItemClick: (index: number) => void;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <button
              onClick={() => onItemClick(index)}
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {findItemById(item)?.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FileList({
  items,
  onItemClick,
}: {
  items: (File | Folder)[];
  onItemClick: (item: File | Folder) => void;
}) {
  return (
    <ul className="space-y-1 p-4">
      {items.map((item) => {
        const Icon = getItemIcon(item);
        return (
          <li key={item.id}>
            <button
              onClick={() => onItemClick(item)}
              className="flex w-full items-center space-x-2 rounded p-2 transition-colors hover:bg-muted/50"
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span>{item.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function NewButton() {
  return (
    <Button size="sm" variant="outline">
      <Plus className="mr-2 h-4 w-4" />
      New
    </Button>
  );
}
