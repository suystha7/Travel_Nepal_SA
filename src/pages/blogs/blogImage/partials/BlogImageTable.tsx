import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import type { IBlogImageListItem } from '../interface/IBlogImage';
import { useGetBlogImage } from '../hooks/useGetBlogImage';
import { useDeleteBlogImage } from '../hooks/useDeleteBlogImage';
import { getColumns } from './BlogImageColumns';
import DeleteModal from '@/components/DeleteModal';
import BlogImageFilterList from './BlogImageFilterList';
import CreateBlogImageModal from '../modal/CreateBlogImageModal';
import UpdateBlogImageModal from '../modal/UpdateBlogImageModal';
import { Plus } from 'lucide-react';
import Header from './Header';

const BlogImageTable: React.FC = () => {
  const {
    blogImageData,
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
  } = useGetBlogImage();

  const {
    deleteModal,
    deleteIdState,
    isLoading: isDeleteLoading,
    handleDelete,
  } = useDeleteBlogImage();

  const columns = getColumns({
    blogImageData,
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
          <BlogImageFilterList setSearch={setSearch} search={search} />
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
          <Table<IBlogImageListItem>
            columns={columns}
            data={blogImageData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={blogImageData?.data?.totalPages}
            pages={{
              page: blogImageData?.data?.currentPage || page,
              pageSize: blogImageData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItems={blogImageData?.data?.totalRecords}
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

      <Modal isOpen={createModal.isOpen} name="Create Blog Image" onOpenChange={createModal.toggle}>
        <CreateBlogImageModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Blog Image" onOpenChange={updateModal.toggle}>
        <UpdateBlogImageModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default BlogImageTable;
