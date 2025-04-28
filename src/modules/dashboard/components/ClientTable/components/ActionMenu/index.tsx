import { useState } from 'react';
import { Dropdown } from '@/modules/shared/components/Dropdown';
import { HiDotsHorizontal, HiTrash } from 'react-icons/hi';
import { useActionMenu } from './useActionMenu';
import { Status } from '@/lib/firebase/service/client/browser/types';
import { ActionMenuProps } from './types';
import { ConfirmDeleteModal } from '../ConfirmDeleteModal';

export function ActionMenu({ clientId, currentStatus }: ActionMenuProps) {
  const { handleUpdateStatus, handleDeleteClient } = useActionMenu();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDelete = () => {
    handleDeleteClient(clientId);
  };

  return (
    <>
      <Dropdown
        dropdownWidth="w-50"
        label={
          <span className="text-gray-500 hover:text-gray-700">
            <HiDotsHorizontal size={20} />
          </span>
        }
        items={[
          {
            id: 'toggleStatus',
            content: (
              <span className="text-gray-500">
                Alterar status para
                <span
                  className={`ml-1 ${currentStatus === Status.ACTIVE ? 'text-red-400' : 'text-teal-400'}`}
                >
                  {currentStatus === Status.INACTIVE ? 'ativo' : 'inativo'}
                </span>
              </span>
            ),
            onClick: () => handleUpdateStatus(clientId, currentStatus),
          },
          {
            id: 'delete',
            content: <span className="text-red-400">Excluir</span>,
            icon: <HiTrash className="text-red-400" size={18} />,
            onClick: openDeleteModal,
          },
        ]}
        separators={[1]}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
}
