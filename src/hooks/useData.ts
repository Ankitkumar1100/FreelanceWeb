import { useState, useEffect } from 'react';
import { Job, Gig, User, Category, Order, Message, Review } from '../types';

// Mock data
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Programming & Tech',
    icon: 'Code',
    subcategories: ['Web Development', 'Mobile Apps', 'Desktop Applications', 'DevOps']
  },
  {
    id: '2',
    name: 'Graphics & Design',
    icon: 'Palette',
    subcategories: ['Logo Design', 'Web Design', 'Print Design', 'Illustration']
  },
  {
    id: '3',
    name: 'Digital Marketing',
    icon: 'Megaphone',
    subcategories: ['Social Media', 'SEO', 'Content Marketing', 'Email Marketing']
  },
  {
    id: '4',
    name: 'Writing & Translation',
    icon: 'PenTool',
    subcategories: ['Content Writing', 'Copywriting', 'Translation', 'Proofreading']
  }
];

const mockFreelancers: User[] = [
  {
    id: '3',
    email: 'mike.designer@example.com',
    name: 'Mike Chen',
    role: 'freelancer',
    bio: 'Creative UI/UX designer with a passion for creating beautiful and functional digital experiences.',
    skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
    hourlyRate: 60,
    rating: 4.8,
    totalReviews: 189,
    location: 'Austin, TX',
    joinedDate: '2020-07-22',
    isOnline: false,
    completedJobs: 156,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    profileComplete: true
  },
  {
    id: '4',
    email: 'alex.writer@example.com',
    name: 'Alex Rodriguez',
    role: 'freelancer',
    bio: 'Professional content writer and copywriter with expertise in tech, finance, and lifestyle niches.',
    skills: ['Content Writing', 'Copywriting', 'SEO Writing', 'Blog Writing'],
    hourlyRate: 45,
    rating: 4.7,
    totalReviews: 98,
    location: 'Miami, FL',
    joinedDate: '2021-03-10',
    isOnline: true,
    completedJobs: 87,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    profileComplete: true
  }
];

const mockJobs: Job[] = [
  {
    id: '1',
    clientId: '2',
    client: {
      id: '2',
      email: 'client@test.com',
      name: 'Tech Startup Inc.',
      role: 'client',
      joinedDate: '2023-01-15',
      rating: 4.7,
      totalReviews: 23,
      completedJobs: 15,
      avatar: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced developer to build a modern e-commerce website with React and Stripe integration. The site should be fully responsive and include admin panel functionality.',
    type: 'fixed',
    budget: 3500,
    deadline: '2024-03-15',
    skills: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    status: 'open',
    proposals: [],
    postedDate: '2024-01-15',
    category: 'Programming & Tech'
  },
  {
    id: '2',
    clientId: '2',
    client: {
      id: '2',
      email: 'client@test.com',
      name: 'Tech Startup Inc.',
      role: 'client',
      joinedDate: '2023-01-15',
      rating: 4.7,
      totalReviews: 23,
      completedJobs: 15,
      avatar: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    title: 'Mobile App UI/UX Design',
    description: 'Need a talented designer to create modern, user-friendly UI/UX for our mobile application. Should include wireframes, mockups, and interactive prototypes.',
    type: 'fixed',
    budget: 2200,
    deadline: '2024-02-28',
    skills: ['UI/UX Design', 'Figma', 'Mobile Design', 'Prototyping'],
    status: 'open',
    proposals: [],
    postedDate: '2024-01-20',
    category: 'Graphics & Design'
  },
  {
    id: '3',
    clientId: '5',
    client: {
      id: '5',
      email: 'marketing@company.com',
      name: 'Digital Marketing Agency',
      role: 'client',
      joinedDate: '2022-08-10',
      rating: 4.5,
      totalReviews: 45,
      completedJobs: 32,
      avatar: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    title: 'Content Writing for Tech Blog',
    description: 'Seeking experienced tech writers to create engaging blog posts about emerging technologies, AI, and software development trends.',
    type: 'hourly',
    budget: 35,
    deadline: '2024-04-01',
    skills: ['Content Writing', 'Tech Writing', 'SEO', 'Research'],
    status: 'open',
    proposals: [],
    postedDate: '2024-01-25',
    category: 'Writing & Translation'
  }
];

const mockGigs: Gig[] = [
  {
    id: '1',
    freelancerId: '1',
    freelancer: {
      id: '1',
      email: 'freelancer@test.com',
      name: 'Sarah Johnson',
      role: 'freelancer',
      bio: 'Full-stack developer with 5+ years of experience',
      skills: ['React', 'Node.js', 'TypeScript'],
      hourlyRate: 75,
      rating: 4.9,
      totalReviews: 127,
      location: 'San Francisco, CA',
      joinedDate: '2020-01-15',
      isOnline: true,
      completedJobs: 156,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    title: 'I will develop a modern React web application',
    description: 'Professional React development services with clean code, responsive design, and modern best practices.',
    category: 'Programming & Tech',
    subcategory: 'Web Development',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    packages: [
      {
        id: '1',
        name: 'basic',
        title: 'Basic Package',
        description: 'Simple React component or small feature',
        price: 150,
        deliveryTime: 3,
        features: ['1 React Component', 'Basic Styling', '1 Revision'],
        revisions: 1
      },
      {
        id: '2',
        name: 'standard',
        title: 'Standard Package',
        description: 'Complete page or multiple components',
        price: 400,
        deliveryTime: 7,
        features: ['Full Page Development', 'Responsive Design', '3 Revisions', 'Basic SEO'],
        revisions: 3
      },
      {
        id: '3',
        name: 'premium',
        title: 'Premium Package',
        description: 'Full application with backend integration',
        price: 800,
        deliveryTime: 14,
        features: ['Full App Development', 'Backend Integration', 'Database Setup', 'Unlimited Revisions', 'Documentation'],
        revisions: -1
      }
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Modern'],
    rating: 4.9,
    totalOrders: 127,
    startingPrice: 150,
    deliveryTime: 3
  },
  {
    id: '2',
    freelancerId: '3',
    freelancer: mockFreelancers[0],
    title: 'I will design stunning UI/UX for your mobile app',
    description: 'Create beautiful, user-friendly mobile app designs that convert users and provide excellent user experience.',
    category: 'Graphics & Design',
    subcategory: 'UI/UX Design',
    images: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    packages: [
      {
        id: '4',
        name: 'basic',
        title: 'Basic Design',
        description: '5 screens with basic wireframes',
        price: 200,
        deliveryTime: 5,
        features: ['5 App Screens', 'Basic Wireframes', '2 Revisions'],
        revisions: 2
      },
      {
        id: '5',
        name: 'standard',
        title: 'Complete Design',
        description: '10 screens with interactive prototype',
        price: 450,
        deliveryTime: 10,
        features: ['10 App Screens', 'Interactive Prototype', 'Style Guide', '4 Revisions'],
        revisions: 4
      },
      {
        id: '6',
        name: 'premium',
        title: 'Full App Design',
        description: 'Complete app design with all screens and assets',
        price: 800,
        deliveryTime: 15,
        features: ['Unlimited Screens', 'Interactive Prototype', 'Complete Style Guide', 'All Assets', 'Unlimited Revisions'],
        revisions: -1
      }
    ],
    tags: ['UI Design', 'UX Design', 'Mobile App', 'Figma'],
    rating: 4.8,
    totalOrders: 89,
    startingPrice: 200,
    deliveryTime: 5
  }
];

export const useData = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Load mock data
    setCategories(mockCategories);
    setJobs(mockJobs);
    setGigs(mockGigs);
    setFreelancers(mockFreelancers);
    setOrders([]);
    setMessages([]);
    setReviews([]);
  }, []);

  return {
    categories,
    jobs,
    gigs,
    freelancers,
    orders,
    messages,
    reviews,
    setJobs,
    setGigs,
    setOrders,
    setMessages,
    setReviews
  };
};