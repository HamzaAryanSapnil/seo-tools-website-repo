import BlogCategoriesTable from '@/components/BlogCategories/BlogCategoriesTable';
import CreateBlogCategoryForm from '@/components/BlogCategories/CreateBlogCategory';
import React from 'react'

const  page= () => {
  return (
    <div className="min-h-screen w-full container mx-auto py-10 max-w-7xl  p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* categories form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Blog Category</h2>
        <CreateBlogCategoryForm />
      </div>
      {/* categories table */}
      <BlogCategoriesTable  />
    </div>
  );
}

export default page