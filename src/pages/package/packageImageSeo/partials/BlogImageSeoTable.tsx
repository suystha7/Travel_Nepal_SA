import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { getColumns } from './BlogImageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetBlogImageSeo } from '../hooks/useGetBlogImageSeo';
import { useDeleteBlogImageSeo } from '../hooks/useDeleteBlogImageSeo';
import type { IBlogImageSeoListItem } from '../interface/IBlogImageSeo';
import BlogImageSeoFilterList from './BlogImageSeoFilterList';
import CreateBlogImageSeoModal from '../modal/CreateBlogImageSeoModal';
import UpdateBlogImageSeoModal from '../modal/UpdateBlogImageSeoModal';

const BlogImageSeoTable: React.FC = () => {
  const {
    blogImageSeoData,
    isLoading: isGetBlogLoading,
    isSuccess: isGetBlogSuccess,
    createModal,
    updateId,
    updateModal,
    page,
    pageSize,
    setPage,
    setPageSize,
    rowSelection,
    setRowSelection,
    search,
    setSearch,
  } = useGetBlogImageSeo();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteBlogImageSeo();

  const columns = getColumns({
    blogImageSeoData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center h-12 gap-4">
        <BlogImageSeoFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetBlogSuccess ? (
          <Table<IBlogImageSeoListItem>
            columns={columns}
            data={blogImageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={blogImageSeoData?.data?.totalPages}
            pages={{
              page: blogImageSeoData?.data?.currentPage || page,
              pageSize: blogImageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={blogImageSeoData?.data?.totalRecords}
            maxHeight="400px"
          />
        ) : isGetBlogLoading ? (
          <LoadingScreen />
        ) : (
          <ErrorMessage />
        )}
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onDelete={handleDelete}
        isLoading={isDeleteLoading}
      />

      <Modal isOpen={createModal.isOpen} name="Create Blog Image Seo" onOpenChange={createModal.toggle}>
        <CreateBlogImageSeoModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Blog Image Seo" onOpenChange={updateModal.toggle}>
        <UpdateBlogImageSeoModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BlogImageSeoTable;
