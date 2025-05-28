import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from '../utils/axios';

export const getEquips = async () => {
  try {
    return await axios.get('/api/equipment');
  } catch (error) {
    console.log('Error while calling getEquips API', error);
  }
};

export const getBrands = async () => {
  try {
    return await axios.get('/api/brand/');
  } catch (error) {
    console.log('Error while calling getEquips API', error);
  }
};
// /api/brand/

export const getEquip = async (id) => {
  try {
    return await axios.get(`/api/equipment/${id}`);
  } catch (error) {
    console.log('Error while calling getEquip API', error);
  }
};

export const getEquipsList = async () => {
  try {
    return await axios.get('/api/equipment_type');
  } catch (error) {
    console.log('Error while calling getEquipsList API', error);
  }
};

export const createEquipmentReport = async ({
  equipment,
  report_reason,
  description
}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access-token')}`
    };
    return await instance.post(
      '/enquiry/report-equipment',
      {
        equipment,
        report_reason,
        description
      },
      { headers }
    );
  } catch (error) {
    console.log('Error while calling createBooking API', error);
  }
};

export const createEquipment = async (equipmentData) => {
  try {
    const response = await axiosInstance.post('/equipment/create-equipment', equipmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateEquipment = async (id, equipmentData) => {
  try {
    const response = await axiosInstance.put(`/equipment/update-equipment/${id}`, equipmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteEquipment = async (id) => {
  try {
    const response = await axiosInstance.delete(`/equipment/delete-equipment/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getShopEquipment = async (shopId) => {
  try {
    const response = await axiosInstance.get(`/equipment/get-shop-equipment/${shopId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Booking api

// export const getBookings = async () => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get('/api/booking' , { headers });
//     } catch(error) {
//         console.log('Error while calling getBookings API', error);
//     }
// }

// export const getBookingDetail = async (id) => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get(`/api/booking/detail/${id}` , { headers });
//     } catch(error) {
//         console.log('Error while calling getBookingDetail API', error);
//     }
// }

// export const updateBooking = async (data, id) => {
//     try {
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `"Bearer ${Cookies.get('access-token')}`
//         };
//         return await axios.get(`/api/booking/update/${id}` , { data }, { headers });
//     } catch(error) {
//         console.log('Error while calling getBookingDetail API', error);
//     }
// }

//  Feedback
export const submitFeedback = async ({ name, phone_number, description }) => {
  try {
    return await axios.post('/enquiry/feedback', {
      name,
      phone_number,
      description
    });
  } catch (error) {
    console.log('Error while calling submitFeedback API', error);
  }
};
