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
          className="transition-colors hover:text-emerald-600"
          activeClassName="text-emerald-600 font-medium"
          inactiveClassName="text-foreground"
        >
          {item.name}
        </ActiveLink>
      ))}
    </div>
  );
}
