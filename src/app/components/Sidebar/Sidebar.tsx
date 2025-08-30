"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { menuItems, MenuItem } from "./menuItems";
import { useRouter } from "next/navigation";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [activePath, setActivePath] = useState<string>("");
  const router = useRouter();

  const toggleMenu = (path: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleItemClick = (
    menuItem: MenuItem,
    path: string,
    hasSubmenu: boolean
  ) => {
    setActivePath(path);

    if (menuItem.path) {
      router.push(menuItem.path);
    }

    if (hasSubmenu) toggleMenu(path);
  };

  const renderMenu = (items: MenuItem[], pathPrefix = "") => {
    return items.map((item, index) => {
      const path = `${pathPrefix}${item.title}-${index}`;
      const Icon = item.icon;
      const isOpenMenu = openMenus[path];
      const hasSubmenu = !!item.submenu;
      const isActive = activePath === path;

      return (
        <div key={path} className="mb-1">
          <button
            onClick={() => handleItemClick(item, path, hasSubmenu)}
            className={clsx(
              "flex items-center w-full px-2 py-2 text-sm font-medium rounded transition cursor-pointer",
              isActive && !hasSubmenu && "bg-green-500 text-white",
              hasSubmenu &&
                isActive &&
                "bg-orange-400 text-white hover:bg-orange-500",
              !isActive && "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {(isOpen || hovered) && (
              <>
                <span className="ml-3 flex-1 text-left">{item.title}</span>
                {hasSubmenu && (
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 transition-transform ml-2",
                      isOpenMenu ? "rotate-180" : "rotate-0"
                    )}
                  />
                )}
              </>
            )}
          </button>

          {(isOpen || hovered) && hasSubmenu && isOpenMenu && (
            <div className="ml-6 mt-1 border-l border-gray-200 dark:border-gray-700 pl-2">
              {renderMenu(item.submenu!, `${path}-`)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        "bg-white dark:bg-gray-900 h-full overflow-y-auto transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800",
        isOpen || hovered ? "min-w-fit" : "w-16"
      )}
    >
      <div className="pt-2 px-2">{renderMenu(menuItems)}</div>
    </aside>
  );
};

export default Sidebar;
