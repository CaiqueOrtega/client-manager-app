import { Modal } from '@/modules/shared/components/Modal';

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="space-y-6 p-12 text-center">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-600">Tem certeza que deseja excluir?</h3>
          <p className="mb-4 text-gray-500">Esta ação não pode ser desfeita.</p>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <button
            className="w-full cursor-pointer rounded-full bg-red-500/90 px-4 py-3 text-white transition hover:bg-red-500"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Excluir
          </button>
          <button
            className="w-full cursor-pointer rounded-full border border-gray-300 px-4 py-3 text-gray-600 transition hover:bg-gray-100"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
