import { Folder, File } from "lucide-react";

export type File = {
  id: string;
  name: string;
  type: "file";
  parentId: string;
  url: string;
};
export type Folder = {
  id: string;
  name: string;
  type: "folder";
  parentId: string | null;
};

export const mockFolders: (File | Folder)[] = [
  {
    id: "0",
    name: "Home",
    type: "folder",
    parentId: null,
  },
  {
    id: "1",
    name: "Documents",
    type: "folder",
    parentId: "0",
  },
  {
    id: "4",
    name: "Images",
    type: "folder",
    parentId: "0",
  },
  {
    id: "10",
    name: "another folder",
    type: "folder",
    parentId: "0",
  },
  {
    id: "8",
    name: "yet another folder",
    type: "folder",
    parentId: "10",
  },
  {
    id: "2",
    name: "Report.pdf",
    type: "file",
    parentId: "1",
    url: "https://example.com/report.pdf",
  },
  {
    id: "3",
    name: "Spreadsheet.xlsx",
    type: "file",
    parentId: "1",
    url: "https://example.com/spreadsheet.xlsx",
  },
  {
    id: "9",
    name: "another file",
    type: "file",
    parentId: "10",
    url: "https://example.com/anotherfile.txt",
  },
  {
    id: "7",
    name: "Notes.txt",
    type: "file",
    parentId: "0",
    url: "https://example.com/notes.txt",
  },
  {
    id: "11",
    name: "Photo1.jpg",
    type: "file",
    parentId: "4",
    url: "https://example.com/notes.txt",
  },
  {
    id: "12",
    name: "Photo2.jpg",
    type: "file",
    parentId: "4",
    url: "https://example.com/notes.txt",
  },
  {
    id: "13",
    name: "Photo3.jpg",
    type: "file",
    parentId: "8",
    url: "https://example.com/notes.txt",
  },
  {
    id: "14",
    name: "yet another friggin folder",
    type: "folder",
    parentId: "8",
  },
];

export function getItemsByParentId(id: string): (File | Folder)[] {
  return mockFolders.filter((item) => item.parentId === id);
}

export function getItemIcon(item: File | Folder) {
  return item.type === "folder" ? Folder : File;
}

export function findItemById(id: string): (File | Folder) | null {
  for (const item of mockFolders) {
    if (item.id === id) return item;
  }
  return null;
}

export function getBreadcrumbPath(
  items: (File | Folder)[],
  targetId: string,
): string[] {
  const path: string[] = [];

  function search(
    currentItems: (File | Folder)[],
    currentPath: string[],
  ): boolean {
    for (const item of currentItems) {
      const newPath = [...currentPath, item.name];
      if (item.id === targetId) {
        path.push(...newPath);
        return true;
      }
    }
    return false;
  }

  search(items, []);
  return path;
}
