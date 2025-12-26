// Iconos centralizados de Rantti
import { 
  ArrowRight, 
  Sparkles, 
  Menu, 
  LogOut, 
  Settings, 
  Package, 
  MessageSquare,
  X,
  Search,
  User,
  Upload,
  Handshake,
  PartyPopper,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";

// Re-exportar íconos de Lucide
export {
  ArrowRight,
  Sparkles,
  Menu,
  LogOut,
  Settings,
  Package,
  MessageSquare,
  X,
  Search,
  User,
  Upload,
  Handshake,
  PartyPopper,
  ShoppingCart,
  TrendingUp,
  CheckCircle2
};

// Tipos
export type { LucideIcon };

// Ícono Check SVG personalizado
export const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd"
    />
  </svg>
);

// Ícono Search SVG personalizado del Nav
export const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_307_198)">
      <path d="M10.0375 10.2838L10.2938 10.027C10.7003 9.6198 11.361 9.61907 11.7682 10.027L15.6434 13.9089C16.1207 14.387 16.1207 15.1639 15.6434 15.642C15.1661 16.12 14.3907 16.12 13.9134 15.642L10.0382 11.7601C9.63167 11.3528 9.63025 10.6917 10.0375 10.2838Z" fill="#0047FF"/>
      <path d="M9.82623 5.24227C11.1093 5.24227 12.1493 4.2004 12.1493 2.9152C12.1493 1.62999 11.1093 0.588135 9.82623 0.588135C8.54324 0.588135 7.50317 1.62999 7.50317 2.9152C7.50317 4.2004 8.54324 5.24227 9.82623 5.24227Z" fill="#0047FF"/>
      <path d="M5.93377 0.0204702C6.24113 -0.00203323 6.72718 -0.0398801 6.98553 0.131965C7.4001 0.408144 7.47158 0.99835 7.13461 1.36761C6.82011 1.71233 6.34527 1.60799 5.92866 1.65914C2.44969 2.08261 0.530995 5.98492 2.30775 9.02597C4.38778 12.5866 9.75584 12.0895 11.1415 8.20664C11.3855 7.5213 11.3508 7.07941 11.4386 6.40022C11.5264 5.72102 12.4771 5.47246 12.9039 6.05141C13.1674 6.40942 13.0295 7.28297 12.953 7.71463C12.7692 8.74877 12.3239 9.71028 11.698 10.5449L14.5571 13.4489C15.0432 14.2437 14.116 15.0876 13.3675 14.525L10.5533 11.7192C10.4849 11.7018 10.2194 11.9361 10.1398 11.9872C5.60701 14.927 -0.286926 11.5269 0.0112423 6.13836C0.184833 2.99093 2.77441 0.255734 5.93377 0.0204702Z" fill="#0047FF"/>
    </g>
    <defs>
      <clipPath id="clip0_307_198">
        <rect width="16" height="16" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

// Ícono User SVG personalizado del Nav
export const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_307_203)">
      <path d="M9.09311 17.9838C8.38463 18.0058 7.60588 18.0058 6.8974 17.9838C5.06588 17.9269 2.98962 17.7459 1.23071 17.1928C0.798598 17.0571 0.0936283 16.89 0.0374181 16.3716C-0.0433841 15.6294 0.00111568 14.2329 0.208391 13.5196C0.585468 12.2196 1.58554 11.1131 2.85027 10.6016C3.15005 10.481 3.96627 10.2166 4.25318 10.3326C4.52252 10.4416 4.92185 10.7686 5.23803 10.9194C7.04144 11.7788 9.13293 11.7475 10.9105 10.8405C11.1623 10.7118 11.516 10.4219 11.7361 10.3337C12.1554 10.1644 13.3615 10.677 13.755 10.9101C15.7622 12.0989 16.1486 14.1657 15.9542 16.3391C15.9039 16.897 15.2176 17.0489 14.7598 17.1939C13.0009 17.7472 10.9246 17.9269 9.09311 17.9838Z" fill="#0047FF"/>
      <path d="M8.38124 0C12.1626 0.317783 14.4836 4.31908 12.6849 7.71263C11.1192 10.6655 7.07553 11.4193 4.52265 9.22036C0.975549 6.16662 2.9148 0.396649 7.54863 0.0347938L7.60953 0H8.38124ZM10.5032 7.33106H5.48642C5.86584 8.3714 7.17975 8.76224 8.2091 8.70774C9.10612 8.66018 10.1905 8.22758 10.5032 7.33106Z" fill="#0047FF"/>
    </g>
    <defs>
      <clipPath id="clip0_307_203">
        <rect width="16" height="18" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);
