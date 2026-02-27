import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import { getColumns } from './BlogImageSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import { useGetBlogImageSeo } from '../hooks/useGetBlogImageSeo';
import { useDeleteBlogImageSeo } from '../hooks/useDeleteBlogImageSeo';
import type { IBlogImageSeoListItem } from '../interface/IBlogImageSeo';
import BlogImageSeoFilterList from './BlogImageSeoFilterList';
import CreateBlogImageSeoModal from '../modal/CreateBlogImageSeoModal';
import UpdateBlogImageSeoModal from '../modal/UpdateBlogImageSeoModal';
import { Plus } from 'lucide-react';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <BlogImageSeoFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-400 text-white rounded-full"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {isGetBlogSuccess ? (
          <Table<IBlogImageSeoListItem>
            columns={columns}
            data={blogImageSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={blogImageSeoData?.data?.totalPages}
            pages={{
              page: blogImageSeoData?.data?.currentPage || page,
              pageSize: blogImageSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={blogImageSeoData?.data?.totalRecords}
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
