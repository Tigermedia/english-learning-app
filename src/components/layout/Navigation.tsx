import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  to: string;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'בית', emoji: '🏠' },
  { to: '/progress', label: 'התקדמות', emoji: '📊' },
  { to: '/achievements', label: 'הישגים', emoji: '🏆' },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center gap-1 px-4 py-2 rounded-xl
              transition-colors duration-200
              ${isActive ? 'text-primary' : 'text-text-light'}
            `}
          >
            {({ isActive }) => (
              <>
                <motion.span
                  className="text-2xl"
                  animate={isActive ? { scale: [1, 1.2, 1] } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  {item.emoji}
                </motion.span>
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 w-12 h-1 bg-primary rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
