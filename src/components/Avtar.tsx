import React, { useState } from "react";

interface AvatarProps {
  email: string;
  attemptsUsed: number;
  freeLimit: number;
  onLogout: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ email, attemptsUsed, freeLimit, onLogout }) => {
  const [open, setOpen] = useState(false);
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {/* Avatar Circle */}
      <div
        className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {initial}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border p-4 z-50">
          {/* Email */}
          <p className="font-medium text-gray-800 mb-2">{email}</p>

          {/* Free Searches Progress */}
          <div className="mb-3">
            <label className="text-sm text-gray-600">
              Free Searches: {attemptsUsed}/{freeLimit}
            </label>
            <progress
              className="w-full h-2 rounded-lg overflow-hidden"
              value={attemptsUsed}
              max={freeLimit}
            />
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
