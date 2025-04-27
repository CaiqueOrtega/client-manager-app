import { DropdownProps } from './types';
import { useDropdownController } from './useDropdown';

export function Dropdown({ label, items, separators = [], dropdownWidth = 'w-48' }: DropdownProps) {
  const { open, highlight, setHighlight, toggleOpen, ref } = useDropdownController(items);

  return (
    <div ref={ref} className="relative inline-block">
      <button type="button" aria-haspopup="true" aria-expanded={open} onClick={toggleOpen}>
        {label}
      </button>

      {open && (
        <ul
          role="menu"
          onMouseLeave={() => setHighlight(-1)}
          className={`absolute right-0 z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg ${dropdownWidth}`}
        >
          {items.map((item, i) => (
            <li key={item.id} className="text-gray-700">
              {separators.includes(i) && <hr className="border-gray-100" />}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  item.onClick?.();
                  if (!item.keepOpenOnClick) toggleOpen();
                }}
                onMouseEnter={() => setHighlight(i)}
                className={`flex w-full cursor-pointer items-center gap-2 p-4 text-left text-sm hover:bg-gray-100 focus:outline-none ${
                  highlight === i ? 'bg-gray-100' : ''
                } ${item.customClass || ''}`}
              >
                {item.icon && <span className="text-base">{item.icon}</span>}
                {item.content ?? <span className="text-gray-400 italic">No content</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
