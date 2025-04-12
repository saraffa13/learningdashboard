import { FaEdit, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, updateProfile, updateProfilePicture, updateSocialLinks } from "../../store/slices/profileSlice";
import { useState } from "react";
import { RootState } from "../../store/store";

const ProfileEditor: React.FC<any> = ({ setIsEditing }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    bio: profile.bio,
    education: profile.education,
    occupation: profile.occupation,
    address: { ...profile.address },
    socialLinks: { ...profile.socialLinks },
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    education: '',
    occupation: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
    },
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      bio: '',
      education: '',
      occupation: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      socialLinks: {
        linkedin: '',
        github: '',
        twitter: '',
      },
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
      valid = false;
    }

    if (!formData.education.trim()) {
      newErrors.education = 'Education is required';
      valid = false;
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      dispatch(updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        bio: formData.bio,
        education: formData.education,
        occupation: formData.occupation,
      }));
      dispatch(updateAddress(formData.address));
      dispatch(updateSocialLinks(formData.socialLinks));
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...(prev[parent]),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateProfilePicture(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={profile.profilePicture || 'https://microbiology.ucr.edu/sites/default/files/styles/form_preview/public/blank-profile-pic.png?itok=4teBBoet'}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer">
                  <FaEdit />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  
                />
                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  
                />
                {errors.occupation && <p className="text-red-500 text-xs italic">{errors.occupation}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                
              />
              {errors.education && <p className="text-red-500 text-xs italic">{errors.education}</p>}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32"
                
              />
              {errors.bio && <p className="text-red-500 text-xs italic">{errors.bio}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    
                  />
                  {errors.address.street && <p className="text-red-500 text-xs italic">{errors.address.street}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.address.city && <p className="text-red-500 text-xs italic">{errors.address.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.address.state && <p className="text-red-500 text-xs italic">{errors.address.state}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.address.zipCode && <p className="text-red-500 text-xs italic">{errors.address.zipCode}</p>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaLinkedin className="mr-2" />
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.socialLinks.linkedin && <p className="text-red-500 text-xs italic">{errors.socialLinks.linkedin}</p>}
                </div>
                <div className="flex items-center">
                  <FaGithub className="mr-2" />
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    placeholder="GitHub URL"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.socialLinks.github && <p className="text-red-500 text-xs italic">{errors.socialLinks.github}</p>}
                </div>
                <div className="flex items-center">
                  <FaTwitter className="mr-2" />
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleInputChange}
                    placeholder="Twitter URL"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"

                  />
                  {errors.socialLinks.twitter && <p className="text-red-500 text-xs italic">{errors.socialLinks.twitter}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;