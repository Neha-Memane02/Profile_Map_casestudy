import React from 'react';
import { useForm } from 'react-hook-form';

const ProfileForm = ({ profile, onSubmit, onCancel }) => {
  const isEditMode = !!profile;
  
  const defaultValues = profile ? {
    ...profile,
    street: profile.address.street,
    city: profile.address.city,
    state: profile.address.state,
    zip: profile.address.zip,
    country: profile.address.country,
    lat: profile.address.lat,
    lng: profile.address.lng
  } : {
    name: '',
    photo: '',
    description: '',
    title: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    lat: '',
    lng: '',
    interests: '',
    skills: ''
  };
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  });
  
  const processFormData = (data) => {
    // Format the data before submission
    const formattedData = {
      ...data,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng)
      },
      interests: data.interests.split(',').map(item => item.trim()),
      skills: data.skills.split(',').map(item => item.trim())
    };
    
    // Remove the individual address fields from the top level
    delete formattedData.street;
    delete formattedData.city;
    delete formattedData.state;
    delete formattedData.zip;
    delete formattedData.country;
    delete formattedData.lat;
    delete formattedData.lng;
    
    if (isEditMode) {
      formattedData.id = profile.id;
    }
    
    onSubmit(formattedData);
  };
  
  return (
    <div className="profile-form-container">
      <h2>{isEditMode ? 'Edit Profile' : 'Create New Profile'}</h2>
      
      <form onSubmit={handleSubmit(processFormData)} className="profile-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input 
              id="name"
              type="text" 
              {...register('name', { required: 'Name is required' })} 
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="photo">Photo URL *</label>
            <input 
              id="photo"
              type="text" 
              {...register('photo', { required: 'Photo URL is required' })} 
            />
            {errors.photo && <span className="error-message">{errors.photo.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              id="title"
              type="text" 
              {...register('title')} 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea 
              id="description"
              {...register('description', { required: 'Description is required' })} 
              rows="4"
            ></textarea>
            {errors.description && <span className="error-message">{errors.description.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              {...register('email', { 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })} 
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              id="phone"
              type="text" 
              {...register('phone')} 
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Address Information</h3>
          
          <div className="form-group">
            <label htmlFor="street">Street Address *</label>
            <input 
              id="street"
              type="text" 
              {...register('street', { required: 'Street address is required' })} 
            />
            {errors.street && <span className="error-message">{errors.street.message}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input 
                id="city"
                type="text" 
                {...register('city', { required: 'City is required' })} 
              />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State/Province *</label>
              <input 
                id="state"
                type="text" 
                {...register('state', { required: 'State is required' })} 
              />
              {errors.state && <span className="error-message">{errors.state.message}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zip">ZIP/Postal Code</label>
              <input 
                id="zip"
                type="text" 
                {...register('zip')} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input 
                id="country"
                type="text" 
                {...register('country', { required: 'Country is required' })} 
              />
              {errors.country && <span className="error-message">{errors.country.message}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="lat">Latitude *</label>
              <input 
                id="lat"
                type="text" 
                {...register('lat', { 
                  required: 'Latitude is required',
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: 'Must be a valid number'
                  }
                })} 
              />
              {errors.lat && <span className="error-message">{errors.lat.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lng">Longitude *</label>
              <input 
                id="lng"
                type="text" 
                {...register('lng', { 
                  required: 'Longitude is required',
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: 'Must be a valid number'
                  }
                })} 
              />
              {errors.lng && <span className="error-message">{errors.lng.message}</span>}
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h3>Additional Information</h3>
          
          <div className="form-group">
            <label htmlFor="interests">Interests (comma-separated)</label>
            <input 
              id="interests"
              type="text" 
              {...register('interests')} 
              placeholder="Reading, Travel, Photography, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input 
              id="skills"
              type="text" 
              {...register('skills')} 
              placeholder="JavaScript, React, Design, etc."
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update Profile' : 'Create Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;