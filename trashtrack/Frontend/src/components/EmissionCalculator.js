import React, { useState } from 'react';
import planet from './Planet-cropped.svg'; // Adjust the path based on the actual location of your image file
// Constants
const GWP_CH4 = 28; // Methane (CH4) global warming potential
const GWP_N2O = 265; // Nitrous oxide (N2O) global warming potential
const GWP_C02 = 1; // CO2 emission factor (hypothetical value, adjust as needed)

// React component
const EmissionsCalculator = () => {
  const [wasteMass, setWasteMass] = useState(0);
  const [emissions, setEmissions] = useState(null);
  const [co2Content, setCO2Content] = useState(null);

  const calculateEmissions = (value) => {
    const wasteMassFloat = parseFloat(value);
    if (!isNaN(wasteMassFloat)) {
      // Calculate CH4 and N2O emissions
      const CH4Emissions = wasteMassFloat * 0.18;
      const N2OEmissions = wasteMassFloat * 0.0001;

      // Convert CH4 and N2O emissions to CO2e
      const CH4CO2e = CH4Emissions * GWP_CH4;
      const N2OCO2e = N2OEmissions * GWP_N2O;

      // Sum emissions from CH4 and N2O
      const totalEmissions = CH4CO2e + N2OCO2e;

      // Calculate CO2 content
      const CO2Emissions = wasteMassFloat * GWP_C02 * 0.82;

      setEmissions(totalEmissions.toFixed(2));
      setCO2Content(CO2Emissions.toFixed(2));
    } else {
      setEmissions(null);
      setCO2Content(null);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className=" bg-white  shadow-lg p-3" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
        <label className='text-lg font-semibold'>
          Enter the mass of waste generated (in kgs):
          <input
            className='px-4 border-2 border-solid border-gray-400 bg-blue-100 py-2'
            type="number"
            value={wasteMass}
            onChange={(e) => {
              setWasteMass(e.target.value);
              calculateEmissions(e.target.value);
            }}
            style={{ width: '100%', margin: '8px 0' }}
          />
        </label>

        {emissions !== null && (
          <p className="text-lg" style={{ marginTop: '10px' }}>
            Total equivalent greenhouse gas emissions from <b>{wasteMass} </b>kg of organic waste : <b>{emissions}</b>  kg CO<sub>2</sub> equivalents
          </p>
        )}

        

        <div className='text-center mt-4 text-green-700 font-semibold tracking-wide font-verdana text-4xl'>
          SAVE THE PLANET!
        </div>


        <div className='mt-7'>
          <img src={planet} alt="Planet" />
        </div>
      </div>
    </div>
  );
};

export default EmissionsCalculator;
