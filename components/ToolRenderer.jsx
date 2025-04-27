// components/ToolRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ToolRenderer = ({ toolSlug }) => {
  const ToolComponent = dynamic(() => import(`@/tools/${toolSlug}`), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
    ssr: false,
  });

  try {
    return (
      <div className="  grid  justify-center items-center w-full">
        <ToolComponent />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 p-4 border rounded-lg bg-red-50">
        Error loading tool. Please try again later.
      </div>
    );
  }
};

export default ToolRenderer;
