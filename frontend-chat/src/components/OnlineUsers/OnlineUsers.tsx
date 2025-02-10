import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import React, { useEffect } from 'react';
import { fetchAllUsers } from '../../features/users/usersThunk.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import { apiURL } from '../../globalConstants.ts';


const OnlineUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const imageSrc = user?.image ? `${apiURL}/${user.image}` : NoPic;



  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return user &&(
    <div className="container mx-auto px-4">
      {user && (
        <div className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt={user.username}
              src={imageSrc}
              className="size-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">{user.displayName}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500"/>
              </div>
              <p className="text-xs/5 text-gray-500">Online</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;
