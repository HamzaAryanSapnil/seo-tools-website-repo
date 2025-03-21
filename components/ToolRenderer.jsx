// components/ToolRenderer.tsx
"use client";

import dynamic from "next/dynamic";
// import { Skeleton } from "@/components/ui/skeleton";

const ToolRenderer = ({ toolSlug }) => {
  const ToolComponent = dynamic(() => import(`@/tools/${toolSlug}`), {
    loading: () => <div>Loading...</div>,
    ssr: false,
  });

  try {
    return <ToolComponent />;
  } catch (error) {
    return (
      <div className="text-red-500 p-4 border rounded-lg bg-red-50">
        Error loading tool. Please try again later.
      </div>
    );
  }
};

export default ToolRenderer;
