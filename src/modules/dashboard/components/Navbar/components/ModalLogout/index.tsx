'use client';

import { Modal } from '@/modules/shared/components/Modal';
import { ConfirmLogoutModalProps } from './types'; // Importando o tipo

const ConfirmLogoutModal = ({ isOpen, onClose, handleLogout, email }: ConfirmLogoutModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="space-y-8 px-8 py-10 text-center text-gray-600">
        <div>
          <h1 className="mb-2 text-2xl font-bold">Tem certeza que deseja sair da conta?</h1>

          <h2 className="text-lg text-gray-500">Sair do CLient Manager como </h2>
          <h3 className="text-sm text-gray-400">{email}</h3>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer rounded-full bg-red-500/90 px-4 py-3 text-white transition hover:bg-red-500"
          >
            Confirmar
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

export default ConfirmLogoutModal;
