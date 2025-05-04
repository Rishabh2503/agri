import React, { createContext, useState, useContext } from 'react';

const CropContext = createContext();

export const CropProvider = ({ children }) => {
  const [predictedCrop, setPredictedCrop] = useState(null);
  const [soilData, setSoilData] = useState(null);

  return (
    <CropContext.Provider value={{ predictedCrop, setPredictedCrop, soilData, setSoilData }}>
      {children}
    </CropContext.Provider>
  );
};

export const useCrop = () => useContext(CropContext); 