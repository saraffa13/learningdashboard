import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { RootState } from '../../store/store';
import ProfileEditor from './ProfileEditor';

const Profile: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
   
  if (isEditing) {
   return <ProfileEditor setIsEditing={setIsEditing}/>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-purple-600 to-purple-800">
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-purple-50 transition-colors"
          >
            <FaEdit className="text-purple-600" />
          </button>
        </div>

        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-center -mt-20">
            <img
              src={profile.profilePicture}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <h1 className="text-2xl font-bold mt-4 text-purple-900">{profile.name}</h1>
            <p className="text-purple-600">{profile.occupation}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Contact Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-purple-700">
                    <FaEnvelope className="w-5 h-5 mr-2 text-purple-600" />
                    <span>{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center text-purple-700">
                      <FaPhone className="w-5 h-5 mr-2 text-purple-600" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.address.city && (
                    <div className="flex items-center text-purple-700">
                      <FaMapMarkerAlt className="w-5 h-5 mr-2 text-purple-600" />
                      <span>
                        {profile.address.city}, {profile.address.state}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Education</h2>
                <div className="flex items-center text-purple-700">
                  <FaGraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  <span>{profile.education || 'Not specified'}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Occupation</h2>
                <div className="flex items-center text-purple-700">
                  <FaBriefcase className="w-5 h-5 mr-2 text-purple-600" />
                  <span>{profile.occupation || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">About</h2>
                <p className="text-purple-700">{profile.bio || 'No bio added yet.'}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skills.length === 0 && (
                    <span className="text-purple-500">No skills added yet</span>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-purple-800">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length === 0 && (
                    <span className="text-purple-500">No interests added yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Social Links</h2>
            <div className="flex space-x-4">
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <FaGithub size={24} />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;