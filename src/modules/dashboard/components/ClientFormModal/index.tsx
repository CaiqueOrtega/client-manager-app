import { Modal } from '@/modules/shared/components/Modal';
import { IoClose } from 'react-icons/io5';
import ClientForm from './components/ClientForm';

const ClientFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>
          <header className="flex items-center justify-between bg-teal-600 px-6 py-4 text-white">
            <h1 className="text-xl font-bold">Cadastrar Cliente</h1>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-teal-500"
            >
              <IoClose size={20} />
            </button>
          </header>

          <ClientForm onClose={onClose} />
        </div>
      </Modal>
    </div>
  );
};

export default ClientFormModal;
