import { FaEdit, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress, updateProfile, updateProfilePicture, updateSocialLinks } from "../../store/slices/profileSlice";
import { useState } from "react";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";

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

  const [errors, setErrors] = useState<any>({
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
    const newErrors:any = {
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

    const indianPhoneRegex1 = /^\+91 [6-9]\d{9}$/;
    const indianPhoneRegex2 = /^\+91[6-9]\d{9}$/;
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!(indianPhoneRegex1.test(formData.phone) || indianPhoneRegex2.test(formData.phone))) {
      newErrors.phone = 'Invalid Indian phone number';
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
    if(!valid){
        Object.keys(newErrors).forEach(key => {
          if (newErrors[key]) toast.error(newErrors[key]);
        })
    }
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
      toast.success('Data Saved Successfully.')
      setIsEditing(false);
    } else{
      
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
            <h2 className="text-2xl font-bold text-purple-900">Edit Profile</h2>
            <button
              onClick={() => setIsEditing(false)}
              className="text-purple-600 hover:text-purple-800 transition-colors"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={profile.profilePicture}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-200"
                />
                <label className="absolute bottom-0 right-0 bg-purple-700 p-2 rounded-full text-white cursor-pointer hover:bg-purple-800 transition-colors">
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
                <label className="block text-purple-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-purple-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-purple-700 text-sm font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                />
                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-purple-700 text-sm font-bold mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                />
                {errors.occupation && <p className="text-red-500 text-xs italic">{errors.occupation}</p>}
              </div>
            </div>

            <div>
              <label className="block text-purple-700 text-sm font-bold mb-2">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
              />
              {errors.education && <p className="text-red-500 text-xs italic">{errors.education}</p>}
            </div>

            <div>
              <label className="block text-purple-700 text-sm font-bold mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500 h-32"
              />
              {errors.bio && <p className="text-red-500 text-xs italic">{errors.bio}</p>}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-700 text-sm font-bold mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-purple-700 text-sm font-bold mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-purple-700 text-sm font-bold mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-purple-700 text-sm font-bold mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-800">Social Links</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaLinkedin className="mr-2 text-purple-600" />
                  <input
                    type="url"
                    name="socialLinks.linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={handleInputChange}
                    placeholder="LinkedIn URL"
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex items-center">
                  <FaGithub className="mr-2 text-purple-600" />
                  <input
                    type="url"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleInputChange}
                    placeholder="GitHub URL"
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex items-center">
                  <FaTwitter className="mr-2 text-purple-600" />
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleInputChange}
                    placeholder="Twitter URL"
                    className="shadow appearance-none border border-purple-200 rounded w-full py-2 px-3 text-purple-900 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded transition-colors"
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