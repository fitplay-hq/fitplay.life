import { ActiveLink } from './active-link';

interface NavItem {
  name: string;
  path: string;
}

interface NavLinksProps {
  items: readonly NavItem[];
  className?: string;
}

export function NavLinks({ items, className }: NavLinksProps) {
  return (
    <div className={className} role="menubar">
      {items.map((item) => (
        <ActiveLink 
          key={item.path}
          href={item.path}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50"
          activeClassName="text-emerald-600 bg-emerald-50 font-semibold"
          inactiveClassName="text-gray-700 hover:text-emerald-600"
        >
          {item.name}
        </ActiveLink>
      ))}
    </div>
  );
}
