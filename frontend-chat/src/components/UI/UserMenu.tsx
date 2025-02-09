import { IUser } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/UsersSlice.ts';
import { logout } from '../../features/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../globalConstants.ts';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const imageSrc = user.image ? `${apiURL}/${user.image}` : NoPic;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };


  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };


  return user && (
    <>
      <div className="relative">
        <button
          onClick={handleClick}
          className="flex items-center px-4 py-2 bg-transparent text-gray-800 hover:text-gray-600 transition"
        >
          Hello, {user.displayName}!
          <img
            src={imageSrc}
            className="w-10 h-10 rounded-full ml-3 border border-gray-300"
            alt={user.username}
          />
        </button>

        {anchorEl && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

    </>
  );
};

export default UserMenu;