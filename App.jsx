// src/components/ApiTest.js
import { useState } from 'react'; // Only import useState, not React

import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';

const App = () => {
  const initialValues = {
    Gender: '1',
    Married: '1',
    Dependents: '',
    Education: '0',
    Self_Employed: '1',
    Property_Area: '0',
    LoanAmount: '',
    Loan_Amount_Term: '',
    Credit_History: '1',
    ApplicantIncome: '',
    CoapplicantIncome: ''
  };

  const [prediction, setPrediction] = useState(null);

  const handleSubmit = (values) => {
    // Prepare the data to send to the backend
    const formData = {
      features: [
        values.Gender,
        values.Married,
        values.Dependents,
        values.Education,
        values.Self_Employed,
        values.Property_Area,
        values.LoanAmount,
        values.Loan_Amount_Term,
        values.Credit_History,
        values.ApplicantIncome,
        values.CoapplicantIncome
      ]
    };

    // Make a POST request to the Flask API
    axios.post('http://127.0.0.1:5000/predict', formData)

      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error('Error fetching prediction:', error);
        setPrediction(null);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.LoanAmount) {
      errors.LoanAmount = 'Loan Amount is required';
    }
    if (!values.ApplicantIncome) {
      errors.ApplicantIncome = 'Applicant Income is required';
    }
    return errors;
  };

  return (
    <div className="form-container bg-orange-300 p-12 md:p-14 lg:p-16 xl:p-20">
      <section>
        <h1 className="text-3xl font-bold text-center text-black">Loan Application Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validate}
        >
          <Form>
            {/* Form fields */}
            <div className="form-group">
              <label htmlFor="Gender">Gender:</label>
              <Field as="select" name="Gender" id="Gender">
                <option value="1">Male</option>
                <option value="0">Female</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="Married">Married:</label>
              <Field as="select" name="Married" id="Married">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="Dependents">Dependents:</label>
              <Field type="number" name="Dependents" id="Dependents" />
            </div>

            <div className="form-group">
              <label htmlFor="Education">Education:</label>
              <Field as="select" name="Education" id="Education">
                <option value="0">Graduate</option>
                <option value="1">Not Graduate</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="Self_Employed">Self Employed:</label>
              <Field as="select" name="Self_Employed" id="Self_Employed">
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="Property_Area">Property Area:</label>
              <Field as="select" name="Property_Area" id="Property_Area">
                <option value="0">Urban</option>
                <option value="1">Semiurban</option>
                <option value="2">Rural</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="LoanAmount">Loan Amount:</label>
              <Field type="number" name="LoanAmount" id="LoanAmount" />
              <ErrorMessage name="LoanAmount" component="div" style={{ color: 'red' }} />
            </div>

            <div className="form-group">
              <label htmlFor="Loan_Amount_Term">Loan Amount Term:</label>
              <Field type="number" name="Loan_Amount_Term" id="Loan_Amount_Term" />
            </div>

            <div className="form-group">
              <label htmlFor="Credit_History">Credit History:</label>
              <Field as="select" name="Credit_History" id="Credit_History">
                <option value="1">Good</option>
                <option value="0">Bad</option>
              </Field>
            </div>

            <div className="form-group">
              <label htmlFor="ApplicantIncome">Applicant Income:</label>
              <Field type="number" name="ApplicantIncome" id="ApplicantIncome" />
              <ErrorMessage name="ApplicantIncome" component="div" style={{ color: 'red' }} />
            </div>

            <div className="form-group">
              <label htmlFor="CoapplicantIncome">Coapplicant Income:</label>
              <Field type="number" name="CoapplicantIncome" id="CoapplicantIncome" />
            </div>

            {/* Submit button */}
            <button type="submit">Submit</button>
          </Form>
        </Formik>

        {/* Show Prediction result */}
        {prediction !== null && (
          <div>
            <h2>Prediction Result:</h2>
            <p>{prediction}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
