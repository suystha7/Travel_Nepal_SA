import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import { PlusCircle } from 'lucide-react';
import Modal from '@/components/Modal';
import { useGetTeam } from '../hooks/useGetTeam';
import type { ITeamListItem } from '../interface/ITeam';
import CreateTeamModal from '../modal/CreateTeamModal';
import UpdateTeamModal from '../modal/UpdateTeamModal';
import { useDeleteTeam } from '../hooks/useDeleteTeam';
import { getColumns } from './TeamColumns';
import DeleteModal from '@/components/DeleteModal';
import TeamFilterList from './TeamFilterList';

const TeamTable: React.FC = () => {
  const {
    teamData,
    isLoading: isGetTeamLoading,
    isSuccess: isGetTeamSuccess,
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
  } = useGetTeam();

  const { deleteModal, deleteIdState, isLoading: isDeleteLoading, handleDelete } = useDeleteTeam();

  const columns = getColumns({
    teamData,
    updateId,
    updateModal,
    deleteIdState,
    deleteModal,
  });

  return (
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-5 rounded-[8px] overflow-hidden">
      {/* Table Header */}
      <div className="flex justify-between items-center">
        <TeamFilterList setSearch={setSearch} search={search} />
        <button
          onClick={createModal.open}
          className="flex items-center gap-2 px-4 py-3 border-[0.6px] border-primary-500 rounded-md cursor-pointer"
        >
          <span className="text-primary-500 typography-semi-bold-extra-small">CREATE</span>
          <PlusCircle className="w-5 h-5 text-primary-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {isGetTeamSuccess ? (
          <Table<ITeamListItem>
            columns={columns}
            data={teamData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPage={teamData?.data?.totalPages}
            pages={{
              page: teamData?.data?.currentPage || page,
              pageSize: teamData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItem={teamData?.data?.totalRecords}
            maxHeight="400px"
          />
        ) : isGetTeamLoading ? (
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

      <Modal isOpen={createModal.isOpen} name="Create Team" onOpenChange={createModal.toggle}>
        <CreateTeamModal closeModal={createModal.close} />
      </Modal>

      <Modal isOpen={updateModal.isOpen} name="Update Team" onOpenChange={updateModal.toggle}>
        <UpdateTeamModal updateId={updateId.values} closeModal={updateModal.close} />
      </Modal>
    </div>
  );
};

export default TeamTable;
