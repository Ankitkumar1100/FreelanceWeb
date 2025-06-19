export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'client' | 'freelancer';
  bio?: string;
  skills?: string[];
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  location?: string;
  joinedDate: string;
  isOnline?: boolean;
  portfolio?: PortfolioItem[];
  completedJobs?: number;
  profileComplete?: boolean;
  // Client specific fields
  companySize?: string;
  industry?: string;
  website?: string;
  // Freelancer specific fields
  title?: string;
  languages?: string[];
  education?: Education[];
  certifications?: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
}

export interface Job {
  id: string;
  clientId: string;
  client: User;
  title: string;
  description: string;
  type: 'fixed' | 'hourly';
  budget: number;
  deadline: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  proposals: Proposal[];
  attachments?: string[];
  postedDate: string;
  category: string;
}

export interface Gig {
  id: string;
  freelancerId: string;
  freelancer: User;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  images: string[];
  packages: GigPackage[];
  tags: string[];
  rating: number;
  totalOrders: number;
  startingPrice: number;
  deliveryTime: number;
}

export interface GigPackage {
  id: string;
  name: 'basic' | 'standard' | 'premium';
  title: string;
  description: string;
  price: number;
  deliveryTime: number;
  features: string[];
  revisions: number;
}

export interface Proposal {
  id: string;
  freelancerId: string;
  freelancer: User;
  jobId: string;
  coverLetter: string;
  bidAmount: number;
  deliveryTime: number;
  attachments?: string[];
  status: 'pending' | 'accepted' | 'rejected';
  submittedDate: string;
}

export interface Order {
  id: string;
  clientId: string;
  freelancerId: string;
  client: User;
  freelancer: User;
  jobId?: string;
  gigId?: string;
  packageId?: string;
  title: string;
  description: string;
  amount: number;
  status: 'active' | 'delivered' | 'completed' | 'cancelled' | 'dispute';
  startDate: string;
  deliveryDate: string;
  deliverables?: string[];
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  orderId?: string;
  content: string;
  attachments?: string[];
  timestamp: string;
  isRead: boolean;
}

export interface Review {
  id: string;
  orderId: string;
  reviewerId: string;
  revieweeId: string;
  reviewer: User;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}