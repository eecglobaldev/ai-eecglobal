import { 
  Plane, 
  BookUser, 
  Check, 
  Send, 
  Sparkles, 
  AlertCircle, 
  MapPin, 
  Clock, 
  Banknote, 
  GraduationCap, 
  User, 
  Users,
  Bot, 
  Languages,
  Search,
  Globe,
  ArrowRight,
  Wallet,
  Camera,
  ShieldCheck,
  BedDouble,
  Trash2,
  Copy,
  FileText,
  RefreshCw,
  MessageSquare,
  Landmark,
  LocateFixed,
  Calendar,
  ExternalLink,
  Share2,
  Mail,
  Smartphone,
  Sun,
  Moon,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Lock,
  Scale,
  Gavel,
  Siren,
  BookOpen,
  Compass,
  Anchor,
  Map as LucideMap,
  ScrollText,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Building,
  HelpCircle,
  CheckCircle2,
  X,
  Navigation,
  Star
} from 'lucide-react';

// Re-exporting with original names to maintain compatibility with existing components
// while using the high-quality Lucide library.

export const PlaneIcon = Plane;
export const PassportIcon = BookUser; // Best fit for passport
export const CheckIcon = Check;
export const SendIcon = Send;
export const SparklesIcon = Sparkles;
export const AlertCircleIcon = AlertCircle;
export const MapPinIcon = MapPin;
export const ClockIcon = Clock;
export const BanknoteIcon = Banknote;
export const GraduationCapIcon = GraduationCap;
export const UserIcon = User;
export const UsersIcon = Users;
export const BotIcon = Bot;
export const TranslateIcon = Languages;
export const SearchIcon = Search;
export const GlobeIcon = Globe;
export const ArrowRightIcon = ArrowRight;
export const WalletIcon = Wallet;
export const CameraIcon = Camera;
export const ShieldIcon = ShieldCheck;
export const HotelIcon = BedDouble;
export const TrashIcon = Trash2;
export const CopyIcon = Copy;
export const FileTextIcon = FileText;
export const RefreshIcon = RefreshCw;
export const ChatIcon = MessageSquare;
export const GovIcon = Landmark;
export const LocateIcon = LocateFixed;
export const CalendarIcon = Calendar;
export const ExternalLinkIcon = ExternalLink;
export const ShareIcon = Share2;
export const MailIcon = Mail;
export const PhoneIcon = Smartphone;
export const SunIcon = Sun;
export const MoonIcon = Moon;
export const InstagramIcon = Instagram;
export const FacebookIcon = Facebook;
export const LinkedInIcon = Linkedin;
export const YoutubeIcon = Youtube;
export const LockIcon = Lock;
export const ScaleIcon = Scale;
export const GavelIcon = Gavel;
export const SirenIcon = Siren;
export const BookOpenIcon = BookOpen;
export const CompassIcon = Compass;
export const AnchorIcon = Anchor;
export const MapIcon = LucideMap;
export const ScrollTextIcon = ScrollText;
export const LandmarkIcon = Landmark;
export const ChevronDownIcon = ChevronDown;
export const ChevronUpIcon = ChevronUp;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRightIcon = ChevronRight;
export const XIcon = X;
export const NavigationIcon = Navigation;
export const StarIcon = Star;

// Direct exports for components/GEOSection.tsx
export { 
  ShieldCheck, 
  MapPin, 
  Building, 
  Users, 
  Clock, 
  Globe, 
  HelpCircle, 
  CheckCircle2,
  X, 
  Navigation 
};

// Custom WhatsApp Icon since it's a brand logo
export const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);