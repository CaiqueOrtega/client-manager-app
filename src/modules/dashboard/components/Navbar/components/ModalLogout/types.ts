export interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
  email: string;
}
