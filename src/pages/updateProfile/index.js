import React, { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el';
import UpdateForm from './UpdateForm';
import userIcon from '../../img/user_icon.svg';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/fetchUser';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const authState = useSelector(state => state.authReducer);
  const user = authState.user;

  useEffect(
    () => {
      const token = Cookies.get('access-token');
      console.log("ACCESS TOKEN:", token); 

      if (!token) {
        navigate('/');
      } else {
        dispatch(fetchUserProfile());
      }
    },
    [dispatch, navigate]
  );

  if (!user) {
    return <div className="p-10 text-lg">Loading profile...</div>;
  }

  return (
    <div>
      <div>
        <h1>Hello</h1>
      </div>
      <Sticky>
        {edit && <UpdateForm onChange={setEdit} />}
      </Sticky>
      <div className="p-9">
        <div className="p-9 shadow-lg rounded-2xl bg-[#68AC5D]">
          <h1 className="text-4xl text-white font-bold">Profile</h1>
          <p className="text-xl text-white font-semibold my-4">
            View and Edit your profile.
          </p>

          <div className="h-full">
            <div className="border-b-2 block md:bg-[#68ac5d] ">
              <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                <div className="flex justify-between">
                  <span className="text-xl font-semibold block">
                    Admin Profile
                  </span>
                  <button
                    onClick={() => setEdit(true)}
                    className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="w-full p-8 mx-2 flex justify-center">
                  <img
                    id="showImage"
                    className="max-w-xs w-64 items-center border"
                    src={user.profile_image || userIcon}
                    alt="profile"
                  />
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                <div className="rounded shadow p-6">
                  <div className="grid grid-cols-2 auto-cols-auto gap-4">
                    <Info label="First Name" value={user.first_name} />
                    <Info label="Last Name" value={user.last_name} />
                    <Info label="Email" value={user.email} />
                    <Info
                      label="Address"
                      value={user.address || 'No Address added yet'}
                    />
                    <Info
                      label="City"
                      value={user.city || 'No City added yet'}
                    />
                    <Info
                      label="State"
                      value={user.state || 'No State added yet'}
                    />
                    <Info
                      label="Pincode"
                      value={user.pin_code || 'No Pincode added yet'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) =>
  <div className="pb-6">
    <label className="font-semibold text-gray-700 block pb-1">
      {label}
    </label>
    <div className="bg-gray-200 flex">
      <p className="px-9 p-2 text-[#4f4f4f]">
        {value}
      </p>
    </div>
  </div>;

export default Profile;
