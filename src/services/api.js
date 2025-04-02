// This is a mock API service using localStorage
// In a real application, this would make HTTP requests to your backend

// Simulate delay for API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const initialProfiles = [
  {
    id: '1',
    name: 'John Smith',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Software developer with 5+ years of experience in React and Node.js.',
    title: 'Senior Developer',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Tech Blvd',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194
    },
    interests: ['Coding', 'Hiking', 'Photography'],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'UX designer specializing in user research and interface design.',
    title: 'Senior UX Designer',
    email: 'sarah.johnson@example.com',
    phone: '(555) 987-6543',
    address: {
      street: '456 Design Ave',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060
    },
    interests: ['Art', 'Travel', 'Cooking'],
    skills: ['UI/UX', 'Figma', 'Adobe XD', 'User Research']
  },
  {
    id: '3',
    name: 'Michael Chen',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Data scientist with expertise in machine learning and AI.',
    title: 'Data Scientist',
    email: 'michael.chen@example.com',
    phone: '(555) 456-7890',
    address: {
      street: '789 Analytics Dr',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA',
      lat: 41.8781,
      lng: -87.6298
    },
    interests: ['AI', 'Chess', 'Running'],
    skills: ['Python', 'TensorFlow', 'Data Analysis', 'Statistics']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    description: 'Marketing specialist with focus on digital campaigns and SEO.',
    title: 'Marketing Manager',
    email: 'emily.rodriguez@example.com',
    phone: '(555) 789-0123',
    address: {
      street: '321 Market St',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      country: 'USA',
      lat: 25.7617,
      lng: -80.1918
    },
    interests: ['Marketing', 'Social Media', 'Beach Volleyball'],
    skills: ['SEO', 'Content Marketing', 'Google Analytics', 'Social Media']
  }
];

// Initialize localStorage with mock data if empty
const initializeData = () => {
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(initialProfiles));
  }
};

// Fetch all profiles
export const fetchProfiles = async () => {
  initializeData();
  await delay(500); // Simulate network delay
  
  try {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    return profiles;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw new Error('Failed to fetch profiles');
  }
};

// Fetch single profile by ID
export const fetchProfileById = async (id) => {
  initializeData();
  await delay(300); // Simulate network delay
  
  try {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const profile = profiles.find(p => p.id === id);
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    return profile;
  } catch (error) {
    console.error(`Error fetching profile ${id}:`, error);
    throw new Error('Failed to fetch profile');
  }
};

// Create a new profile
export const createProfile = async (profileData) => {
  initializeData();
  await delay(700); // Simulate network delay
  
  try {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = (Math.max(...profiles.map(p => parseInt(p.id)), 0) + 1).toString();
    
    const newProfile = {
      ...profileData,
      id: newId
    };
    
    const updatedProfiles = [...profiles, newProfile];
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    
    return newProfile;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw new Error('Failed to create profile');
  }
};

// Update an existing profile
export const updateProfile = async (id, profileData) => {
  initializeData();
  await delay(700); // Simulate network delay
  
  try {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const index = profiles.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Profile not found');
    }
    
    const updatedProfile = {
      ...profileData,
      id // Ensure ID remains the same
    };
    
    const updatedProfiles = [
      ...profiles.slice(0, index),
      updatedProfile,
      ...profiles.slice(index + 1)
    ];
    
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    
    return updatedProfile;
  } catch (error) {
    console.error(`Error updating profile ${id}:`, error);
    throw new Error('Failed to update profile');
  }
};

// Delete a profile
export const deleteProfile = async (id) => {
  initializeData();
  await delay(500); // Simulate network delay
  
  try {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const updatedProfiles = profiles.filter(p => p.id !== id);
    
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    
    return { success: true };
  } catch (error) {
    console.error(`Error deleting profile ${id}:`, error);
    throw new Error('Failed to delete profile');
  }
};