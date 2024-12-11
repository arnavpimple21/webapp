// src/components/ApiTest.js
import { useState } from 'react'; // Only import useState, not React

import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

const App = () => {
  const initialValues = {
    CNT_CHILDREN: '',
    AMT_INCOME_TOTAL: '',
    AMT_CREDIT: '',
    AMT_ANNUITY: '',
    REGION_POPULATION_RELATIVE: '',
    DAYS_BIRTH: '',
    DAYS_EMPLOYED: '',
    DAYS_REGISTRATION: '',
    DAYS_ID_PUBLISH: '',
    OWN_CAR_AGE: '',
    CNT_FAM_MEMBERS: '',
    REGION_RATING_CLIENT: '',
    HOUR_APPR_PROCESS_START: '',
    EXT_SOURCE_1: '',
    EXT_SOURCE_2: '',
    EXT_SOURCE_3: '',
    APARTMENTS_AVG: '',
    BASEMENTAREA_AVG: '',
    YEARS_BEGINEXPLUATATION_AVG: '',
    YEARS_BUILD_AVG: '',
    COMMONAREA_AVG: '',
    ENTRANCES_AVG: '',
    FLOORSMAX_AVG: '',
    LANDAREA_AVG: '',
    NONLIVINGAREA_AVG: '',
    OBS_30_CNT_SOCIAL_CIRCLE: '',
    DAYS_LAST_PHONE_CHANGE: '',
    AMT_REQ_CREDIT_BUREAU_YEAR: '',
    CREDIT_INCOME_PERCENT: '',
    ANNUITY_INCOME_PERCENT: '',
    CREDIT_TERM: '',
    DAYS_EMPLOYED_PERCENT: ''
  };

  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/predict', values);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  return (
    <div>
      <h1>Loan Prediction Form</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {Object.keys(initialValues).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
                <Field id={key} name={key} type="text" />
                <ErrorMessage name={key} component="div" />
              </div>
            ))}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {prediction && (
        <div>
          <h2>Prediction Result</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
