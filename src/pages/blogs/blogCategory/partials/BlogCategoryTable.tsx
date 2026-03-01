import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import type { IBlogCategoryListItem } from '../interface/IBlogCategory';
import { useGetBlogCategory } from '../hooks/useGetBlogCategory';
import { useDeleteBlogCategory } from '../hooks/useDeleteBlogCategory';
import { getColumns } from './BlogCategoryColumns';
import DeleteModal from '@/components/DeleteModal';
import BlogCategoryFilterList from './BlogCategoryFilterList';
import CreateBlogCategoryModal from '../modal/CreateBlogCategoryModal';
import UpdateBlogCategoryModal from '../modal/UpdateBlogCategoryModal';
import { Plus } from 'lucide-react';
import Header from './Header';

const BlogCategoryTable: React.FC = () => {
  const {
    blogCategoryData,
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
  } = useGetBlogCategory();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteBlogCategory();

  const columns = getColumns({
    blogCategoryData,
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
          <BlogCategoryFilterList setSearch={setSearch} search={search} />
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
          <Table<IBlogCategoryListItem>
            columns={columns}
            data={blogCategoryData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={blogCategoryData?.data?.totalPages}
            pages={{
              page: blogCategoryData?.data?.currentPage || page,
              pageSize: blogCategoryData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={blogCategoryData?.data?.totalRecords}
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

      <Modal
        isOpen={createModal.isOpen}
        name="Create Blog Category"
        onOpenChange={createModal.toggle}
      >
        <CreateBlogCategoryModal closeModal={createModal.close} />
      </Modal>

      <Modal
        isOpen={updateModal.isOpen}
        name="Update Blog Category"
        onOpenChange={updateModal.toggle}
      >
        <UpdateBlogCategoryModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BlogCategoryTable;
