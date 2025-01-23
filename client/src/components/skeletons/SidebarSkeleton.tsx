import React, { FC } from "react";
import { FaUsers } from "react-icons/fa";

const SidebarSkeleton: FC = (): React.JSX.Element => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <FaUsers />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, index) => (
          <div className="w-full p-3 flex items-center gap-3" key={index}>
            <div className="relative max-xl: lg:mx-0">
              <div className="skeleton size-1/2 rounded-full"></div>
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
