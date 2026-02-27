import Table from '@/components/Table';
import React from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ErrorMessage from '@/components/ErrorMessage';
import Modal from '@/components/Modal';
import { useGetTeam } from '../hooks/useGetTeam';
import type { ITeamListItem } from '../interface/ITeam';
import CreateTeamModal from '../modal/CreateTeamModal';
import UpdateTeamModal from '../modal/UpdateTeamModal';
import { useDeleteTeam } from '../hooks/useDeleteTeam';
import { getColumns } from './TeamColumns';
import DeleteModal from '@/components/DeleteModal';
import TeamFilterList from './TeamFilterList';
import { Plus } from 'lucide-react';
import Header from './Header';

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
    <div className="flex flex-col flex-1 gap-6 bg-white container-shadow mt-4 px-6 py-4 rounded-[8px] overflow-y-scroll">
     <div className="flex items-center justify-between">
        <Header />

        <div className="flex justify-end gap-2 items-center">
          <TeamFilterList setSearch={setSearch} search={search} />
          <button
            onClick={createModal.open}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary-400 text-white rounded-full"
          >
            <Plus className="w-5 h-5" />
            <span className="typography-semi-bold-extra-small">Add</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isGetTeamSuccess ? (
          <Table<ITeamListItem>
            columns={columns}
            data={teamData?.data?.records || []}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalPages={teamData?.data?.totalPages}
            pages={{
              page: teamData?.data?.currentPage || page,
              pageSize: teamData?.data?.perPage || pageSize,
              setPage,
              setPageSize,
            }}
            totalItems={teamData?.data?.totalRecords}
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
