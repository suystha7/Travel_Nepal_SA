import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IBlogListItem } from '../interface/IBlog';
import { useGetBlog } from '../hooks/useGetBlog';
import CreateBlogModal from '../modal/CreateBlogModal';
import UpdateBlogModal from '../modal/UpdateBlogModal';
import { useDeleteBlog } from '../hooks/useDeleteBlog';
import { getColumns } from './BlogColumns';
import DeleteModal from '@/components/DeleteModal';
import BlogFilterList from './BlogFilterList';  
import Header from './Header';

const BlogTable: React.FC = () => {
  const {
    blogData,
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
  } = useGetBlog();

  const { deleteModal, deleteIdState, isLoading: isDeleteLoading, handleDelete } = useDeleteBlog();

  const columns = getColumns({
    blogData,
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
          <BlogFilterList setSearch={setSearch} search={search} />
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
        {isGetBlogSuccess ? (
          <Table<IBlogListItem>
            columns={columns}
            data={blogData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={blogData?.data?.totalPages}
            pages={{
              page: blogData?.data?.currentPage || page,
              pageSize: blogData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={blogData?.data?.totalRecords}
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

      <Modal isOpen={createModal.isOpen} name="Create Blog" onOpenChange={createModal.toggle}>
        <CreateBlogModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Blog" onOpenChange={updateModal.toggle}>
        <UpdateBlogModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BlogTable;
