import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCrop } from '../../context/CropContext'; // adjust path if different
import { useNavigate } from 'react-router-dom';
import rice from '../../img/crop/rice.jpg';
import wheat from '../../img/crop/wheat.jpg';
import maize from '../../img/crop/any.png';
import cotton from '../../img/crop/cotton.jpg';
import orange from '../../img/crop/oranges.jpg';
import defaultImage from '../../img/crop/any.png';
const cropImages = {
  rice: rice,
  wheat: wheat,
  maize: maize,
  cotton: cotton,
  orange: orange
};

const CropRecommendation = () => {
  const [form, setForm] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    Temperature: '',
    Humidity: '',
    Ph: '',
    Rainfall: ''
  });

  const [lastInput, setLastInput] = useState({});
  const { setPredictedCrop, setSoilData } = useCrop();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cropImages = {
    rice: rice,
    wheat: wheat,
    maize: maize,
    cotton: cotton,
    orange: orange,
    default: defaultImage
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        'https://krishimart-ml-crop.onrender.com/predict',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Nitrogen: Number(form.Nitrogen),
            Phosphorus: Number(form.Phosphorus),
            Potassium: Number(form.Potassium),
            Temperature: Number(form.Temperature),
            Humidity: Number(form.Humidity),
            Ph: Number(form.Ph),
            Rainfall: Number(form.Rainfall)
          })
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data); // Log the entire response for debugging
      const cropName = (data.predicted_crop ? data.predicted_crop.toLowerCase() : '');
      setResult(cropName);
      setPredictedCrop(cropName); // set in context
      setSoilData(form); // save form data in context

      // Update last input state with current form values
      setLastInput({ ...form });

      // Reset the form values
      setForm({
        Nitrogen: '',
        Phosphorus: '',
        Potassium: '',
        Temperature: '',
        Humidity: '',
        Ph: '',
        Rainfall: ''
      });

      console.log(data.message); // Log the message for debugging
    } catch (err) {
      setError('Failed to get crop recommendation. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const goToListingPage = () => {
    navigate('/add-product');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-6 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
          🌿 Crop Recommendation
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, value]) =>
            <input
              key={key}
              type="number"
              name={key}
              value={value}
              placeholder={key.toUpperCase()}
              onChange={handleChange}
              className="px-4 py-1 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
        >
          {loading ? 'Processing...' : 'Recommend Crop'}
        </button>

        {loading &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-6 text-green-600 font-semibold"
          >
            Processing your request...
          </motion.div>}

        {error &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 p-6 rounded-2xl shadow-xl border border-red-200 text-center mt-6"
          >
            <h2 className="text-2xl font-semibold text-red-700">
              {error}
            </h2>
          </motion.div>}

        {result &&
          !error &&
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-xl border border-green-200 text-center mt-6"
          >
            <div className="flex  justify-center gap-4">
              <div className="flex flex-col sm:w-1/2 mt-6 sm:mt-0">
                <table className="min-w-full table-auto border-collapse bg-green-50 rounded-lg shadow-lg">
                  <thead>
                    <tr className="text-green-700">
                      <th className="py-3 px-6 text-left text-sm font-semibold border-b border-green-200">
                        Property
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold border-b border-green-200">
                        Filled Info
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(lastInput).map(([key, value]) =>
                      <tr key={key} className="border-b hover:bg-green-100">
                        <td className="py-3 px-6 text-sm text-gray-700">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </td>
                        <td className="py-3 px-6 text-sm text-gray-700">
                          {value}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col  justify-center">
                <h2 className="text-2xl font-semibold text-green-700">
                  Recommended Crop: <span className="uppercase">{result}</span>
                </h2>
                <img
                  src={cropImages[result] || cropImages.default}
                  alt={result}
                  className="w-full max-w-sm mx-auto mt-4 rounded-xl shadow-md"
                />
              </div>
            </div>

            <button
              onClick={goToListingPage}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
            >
              Continue to Add Listing
            </button>
          </motion.div>}
      </div>
    </div>
  );
};

export default CropRecommendation;
