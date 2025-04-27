import { SwitchProps } from './types';

export function Switch({ isChecked, onChange, icon, activeColor, inactiveColor }: SwitchProps) {
  return (
    <label className="relative inline-block min-h-6 min-w-12 cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <div
        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
          isChecked ? activeColor : inactiveColor
        }`}
      />
      <span
        className={`absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-6`}
      >
        {icon && <div className="text-xs">{icon}</div>}
      </span>
    </label>
  );
}
