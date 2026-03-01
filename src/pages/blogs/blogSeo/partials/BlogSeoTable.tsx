import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import type { IBlogSeoListItem } from '../interface/IBlogSeo';
import CreateBlogModal from '../modal/CreateBlogSeoModal';
import { getColumns } from './BlogSeoColumns';
import DeleteModal from '@/components/DeleteModal';
import BlogSeoFilterList from './BlogSeoFilterList';
import { useGetBlogSeo } from '../hooks/useGetBlogSeo';
import { useDeleteBlogSeo } from '../hooks/useDeleteBlogSeo';
import UpdateBlogSeoModal from '../modal/UpdateBlogSeoModal';
import { Plus } from 'lucide-react';
import Header from './Header';

const BlogSeoTable: React.FC = () => {
  const {
    blogSeoData,
    isLoading: isGetBlogSeoLoading,
    isSuccess: isGetBlogSeoSuccess,
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
  } = useGetBlogSeo();

  const { deleteModal, deleteIdState, isLoading: isDeleteLoading, handleDelete } = useDeleteBlogSeo();

  const columns = getColumns({
    blogSeoData,
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
          <BlogSeoFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-500 text-white rounded-md"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isGetBlogSeoSuccess ? (
          <Table<IBlogSeoListItem>
            columns={columns}
            data={blogSeoData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={blogSeoData?.data?.totalPages}
            pages={{
              page: blogSeoData?.data?.currentPage || page,
              pageSize: blogSeoData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={blogSeoData?.data?.totalRecords}
          />
        ) : isGetBlogSeoLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create Blog Seo" onOpenChange={createModal.toggle}>
        <CreateBlogModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Blog Seo" onOpenChange={updateModal.toggle}>
        <UpdateBlogSeoModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BlogSeoTable;
