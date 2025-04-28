import { FaRegAddressCard, FaRegEnvelope, FaRegUser } from 'react-icons/fa6';
import { RiMenu3Line } from 'react-icons/ri';
import InputWithIcon from '@/modules/shared/components/InputWithIcon';
import SelectInputWithIcon from '@/modules/shared/components/SelectInputWithIcon';
import { useClientForm } from './useClientForm';

const ClientForm = ({ onClose }: { onClose: () => void }) => {
  const { formData, handleChange, plansOptions, handleSubmit, loading, error, formErrors } =
    useClientForm(onClose);

  return (
    <form className="px-8 py-10">
      <div className="space-y-4">
        <label htmlFor="name" className="block text-sm text-gray-500">
          Nome
          <InputWithIcon
            id="name"
            type="text"
            bgColor="bg-white"
            placeholder="Digite o nome"
            value={formData.name}
            onChange={handleChange}
            icon={FaRegUser}
            errorMessage={formErrors.name}
          />
        </label>
        <label htmlFor="email" className="block text-sm text-gray-500">
          Endereço de E-mail
          <InputWithIcon
            bgColor="bg-white"
            id="email"
            type="email"
            placeholder="Digite o e-mail"
            value={formData.email}
            onChange={handleChange}
            icon={FaRegEnvelope}
            errorMessage={formErrors.email}
          />
        </label>

        <label htmlFor="cnpj" className="block text-sm text-gray-500">
          CNPJ
          <InputWithIcon
            bgColor="bg-white"
            id="cnpj"
            type="text"
            placeholder="__.___.___/____-__"
            mask="__.___.___/____-__"
            value={formData.cnpj}
            onChange={handleChange}
            icon={FaRegAddressCard}
            errorMessage={formErrors.cnpj}
          />
        </label>

        <label htmlFor="subscriptionFee" className="block text-sm text-gray-500">
          Mensalidade
          <SelectInputWithIcon
            name="subscriptionFee"
            value={formData.subscriptionFee}
            options={plansOptions}
            onChange={handleChange}
            icon={RiMenu3Line}
          />
        </label>
      </div>

      {error && <div className="mt-4 text-xs text-red-600">*{error}</div>}

      <button
        type="submit"
        className={`mt-10 w-full rounded-full px-6 py-2 text-white ${loading ? 'cursor-not-allowed bg-teal-600/50' : 'bg-teal-600 hover:bg-teal-700'}`}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default ClientForm;
