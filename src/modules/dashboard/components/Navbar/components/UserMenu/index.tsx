'use client';
import { FaChevronDown } from 'react-icons/fa6';
import Image from 'next/image';
import { UserMenuProps, fontSizeClasses, DEFAULT_SIZE, DEFAULT_FONT_SIZE } from './types';
import { Dropdown } from '@/modules/shared/components/Dropdown';
import { FaEye, FaEyeSlash, FaSignOutAlt } from 'react-icons/fa';
import ConfirmLogoutModal from '../ModalLogout';
import { getInitials } from '@/modules/dashboard/components/Navbar/utils/getInitials';
import { Switch } from '@/modules/shared/components/Switch';
import { useDashboardContext } from '@/modules/dashboard/context/DashboardProvider';
import { useAuthContext } from '@/modules/dashboard/context/AuthProvider';
import { useModal } from '@/modules/shared/components/Modal/useModal';

export function UserMenu({ fontSize = DEFAULT_FONT_SIZE, size = DEFAULT_SIZE }: UserMenuProps) {
  const { user, loading, error, logout } = useAuthContext();
  const {
    navbarProps: { showDashboardInfo, setShowDashboardInfo },
  } = useDashboardContext();
  const { isOpen, openModal, closeModal } = useModal();

  if (loading) return <LoadingUserMenu />;
  if (error) return <div>Erro: {error}</div>;
  if (!user) return null;

  return (
    <>
      <ConfirmLogoutModal
        email={user.email!}
        isOpen={isOpen}
        onClose={() => closeModal()}
        handleLogout={logout}
      />

      <Dropdown
        dropdownWidth="w-52"
        label={
          <div className="flex cursor-pointer items-center justify-center gap-2 transition-all duration-300 hover:scale-98">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="User profile"
                width={size}
                height={size}
                className="rounded-full object-cover"
              />
            ) : (
              <div
                style={{ width: `${size}px`, height: `${size}px` }}
                className={`flex items-center justify-center rounded-full bg-gray-200 ${fontSizeClasses[fontSize]} font-extrabold text-gray-500`}
              >
                {getInitials(user.displayName)}
              </div>
            )}

            <div className="flex flex-col text-left leading-tight">
              <span className="truncate text-sm font-semibold text-white">{user.displayName}</span>
              <span className="-mt-0.5 flex items-center gap-1 text-xs text-gray-200">
                Meus Ajustes
                <FaChevronDown size={10} />
              </span>
            </div>
          </div>
        }
        items={[
          {
            id: 'dashboard-info',
            content: (
              <label className="flex w-full cursor-pointer items-center justify-between gap-2 text-gray-500">
                <span>Informações</span>
                <Switch
                  isChecked={showDashboardInfo}
                  onChange={() => setShowDashboardInfo((prev) => !prev)}
                  icon={
                    showDashboardInfo ? (
                      <FaEye className="text-teal-700" />
                    ) : (
                      <FaEyeSlash className="text-gray-500" />
                    )
                  }
                  activeColor="bg-teal-600"
                  inactiveColor="bg-gray-300"
                />
              </label>
            ),
            keepOpenOnClick: true,
          },
          {
            id: 'logout',
            icon: <FaSignOutAlt />,
            content: 'Sair da conta',
            onClick: () => openModal(),
            customClass: 'text-red-600',
          },
        ]}
        separators={[2]}
      />
    </>
  );
}

export function LoadingUserMenu() {
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ width: `${DEFAULT_SIZE}px`, height: `${DEFAULT_SIZE}px` }}
        className="animate-pulse rounded-full bg-gray-200"
      />

      <div className="flex animate-pulse flex-col space-y-1 leading-tight">
        <div className="h-4 w-24 rounded bg-gray-200"></div>
        <div className="h-3 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
