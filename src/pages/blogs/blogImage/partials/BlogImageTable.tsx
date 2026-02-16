import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import type { IBlogImageListItem } from '../interface/IBlogImage';
import { useGetBlogImage } from '../hooks/useGetBlogImage';
import { useDeleteBlogImage } from '../hooks/useDeleteBlogImage';
import { getColumns } from './BlogImageColumns';
import DeleteModal from '@/components/DeleteModal';
import BlogImageFilterList from './BlogImageFilterList';
import CreateBlogImageModal from '../modal/CreateBlogImageModal';
import UpdateBlogImageModal from '../modal/UpdateBlogImageModal';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      <div className="flex justify-between items-center h-12 gap-4">
        <BlogImageFilterList setSearch={setSearch} search={search} />
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
          <Table<IBlogImageListItem>
            columns={columns}
            data={blogImageData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={blogImageData?.data?.totalPages}
            pages={{
              page: blogImageData?.data?.currentPage || page,
              pageSize: blogImageData?.data?.perPage || pageSize,
              setPage: setPage,
              setPageSize: setPageSize,
            }}
            totalItem={blogImageData?.data?.totalRecords}
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
