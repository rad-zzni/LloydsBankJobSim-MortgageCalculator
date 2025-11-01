import React, { useState } from 'react';
import './App.css';
// React Router imports removed
import FinishPage from './FinishPage';
import { calculateMortgage } from './mortgageCalculator';

interface MainUIProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {
  const [finished, setFinished] = React.useState(false);

  const [annualIncome, setAnnualIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [depositPayment, setDepositPayment] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");

  if (finished) {
    const results = calculateMortgage({
      annualIncome: Number(annualIncome),
      otherIncome: Number(otherIncome),
      creditScore: Number(creditScore),
      propertyValue: Number(propertyValue),
      depositPayment: Number(depositPayment),
      mortgageTerm: Number(mortgageTerm),
      interestRate: Number(interestRate),
    });
    return <FinishPage setFinished={setFinished} results={results} />;
  }

  return <MainUI
    setFinished={setFinished}
    annualIncome={annualIncome}
    setAnnualIncome={setAnnualIncome}
    otherIncome={otherIncome}
    setOtherIncome={setOtherIncome}
    creditScore={creditScore}
    setCreditScore={setCreditScore}
    propertyValue={propertyValue}
    setPropertyValue={setPropertyValue}
    depositPayment={depositPayment}
    setDepositPayment={setDepositPayment}
    mortgageTerm={mortgageTerm}
    setMortgageTerm={setMortgageTerm}
    interestRate={interestRate}
    setInterestRate={setInterestRate}
  />;

}

interface MainUIExtendedProps extends MainUIProps {
  annualIncome: string;
  setAnnualIncome: React.Dispatch<React.SetStateAction<string>>;
  otherIncome: string;
  setOtherIncome: React.Dispatch<React.SetStateAction<string>>;
  creditScore: string;
  setCreditScore: React.Dispatch<React.SetStateAction<string>>;
  propertyValue: string;
  setPropertyValue: React.Dispatch<React.SetStateAction<string>>;
  depositPayment: string;
  setDepositPayment: React.Dispatch<React.SetStateAction<string>>;
  mortgageTerm: string;
  setMortgageTerm: React.Dispatch<React.SetStateAction<string>>;
  interestRate: string;
  setInterestRate: React.Dispatch<React.SetStateAction<string>>;
}

function MainUI({
  setFinished,
  annualIncome,
  setAnnualIncome,
  otherIncome,
  setOtherIncome,
  creditScore,
  setCreditScore,
  propertyValue,
  setPropertyValue,
  depositPayment,
  setDepositPayment,
  mortgageTerm,
  setMortgageTerm,
  interestRate,
  setInterestRate
}: MainUIExtendedProps) {
  const [message1, setMessage1] = useState(""); 
  const [message2, setMessage2] = useState(""); 
  const [step2Visible, setStep2Visible] = useState(false); 

  // Validation error states
  const [annualIncomeError, setAnnualIncomeError] = useState<string | null>(null);
  const [otherIncomeError, setOtherIncomeError] = useState<string | null>(null);
  const [creditScoreError, setCreditScoreError] = useState<string | null>(null);
  const [propertyValueError, setPropertyValueError] = useState<string | null>(null);
  const [depositPaymentError, setDepositPaymentError] = useState<string | null>(null);
  const [mortgageTermError, setMortgageTermError] = useState<string | null>(null);
  const [interestRateError, setInterestRateError] = useState<string | null>(null);

  // Validation functions
  function validateAnnualIncome(val: string): string | null {
    if (!val.trim()) return "Annual income is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(val)) return "Enter a valid number.";
    if (parseFloat(val) <= 0) return "Annual income must be greater than 0.";
    return null;
  }
  function validateOtherIncome(val: string): string | null {
    if (!val.trim()) return "Other income is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(val)) return "Enter a valid number.";
    if (parseFloat(val) < 0) return "Other income must be zero or more.";
    return null;
  }
  function validateCreditScore(val: string): string | null {
    if (!val.trim()) return "Credit score is required.";
    if (!/^\d+$/.test(val)) return "Enter a valid integer.";
    const score = parseInt(val, 10);
    if (score < 300 || score > 850) return "Credit score must be between 300 and 850.";
    return null;
  }
  function validatePropertyValue(val: string): string | null {
    if (!val.trim()) return "Property value is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(val)) return "Enter a valid number.";
    if (parseFloat(val) <= 0) return "Property value must be greater than 0.";
    return null;
  }
  function validateDepositPayment(val: string): string | null {
    if (!val.trim()) return "Deposit payment is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(val)) return "Enter a valid number.";
    if (parseFloat(val) < 0) return "Deposit payment must be zero or more.";
    if (propertyValue && parseFloat(val) > parseFloat(propertyValue)) return "Deposit cannot exceed property value.";
    return null;
  }
  function validateMortgageTerm(val: string): string | null {
    if (!val.trim()) return "Mortgage term is required.";
    if (!/^\d+$/.test(val)) return "Enter a valid number of years.";
    const years = parseInt(val, 10);
    if (years < 1 || years > 40) return "Mortgage term must be between 1 and 40 years.";
    return null;
  }
  function validateInterestRate(val: string): string | null {
    if (!val.trim()) return "Interest rate is required.";
    if (!/^\d+(\.\d{1,2})?$/.test(val)) return "Enter a valid percentage.";
    const rate = parseFloat(val);
    if (rate <= 0 || rate > 100) return "Interest rate must be > 0% and ≤ 100%.";
    return null;
  }

  // Check validity of all step 1 and step 2 inputs
  const isStep1Valid =
    !validateAnnualIncome(annualIncome) &&
    !validateOtherIncome(otherIncome) &&
    !validateCreditScore(creditScore);
  const isStep2Valid =
    !validatePropertyValue(propertyValue) &&
    !validateDepositPayment(depositPayment) &&
    !validateMortgageTerm(mortgageTerm) &&
    !validateInterestRate(interestRate);

  const helpTexts = {
    income: "Enter your total annual income before taxes here.",
    otherIncome: "Include any additional sources of income like freelance work.",
    creditScore: "Your credit score is a number between 300-850 measuring creditworthiness.",
    propertyValue: "The total market price of the property you want to purchase.",
    depositPayment: "The upfront amount you pay toward the property before taking out the mortgage.",
    mortgageTerm: "The length of time over which you agree to repay the mortgage, usually in years.",
    interestRate: "The percentage charged by the lender on the amount you borrow, applied annually."
  };

  return (
    <div className="App">
      <header className="App-header" >
        <img onClick={()=> window.location.href = "https://www.lloydsbank.com/"} src="/images/lloydsLogo.png" alt="logo" />
        <h1 style={{ margin: 0, fontSize: 80 }}>Lloyds Bank's Mortgage Calculator</h1>
        <label onClick={() => window.location.href = "https://online.lloydsbank.co.uk/personal/logon/login.jsp"}> Log in? </label>
        <h2>Calculate in only 2 steps!</h2>
      </header>

      <div style={{textAlign: 'left', fontSize: 50, fontFamily: "GTUltra-Black", fontWeight: 'bolder', padding: '20px 100px', color: 'black'}}>
        Step 1<span style={{color: 'grey', fontSize: 40}}> of 2</span>
      </div>

      <div className='App-body-step2'> 
        <div className="Input-column">
          <label>
            Annual income(£):
            <button className="Help-button" onClick={() => setMessage1(helpTexts.income)}> ? </button>
          </label>
          <input
            type="text"
            value={annualIncome}
            onChange={e => {
              setAnnualIncome(e.target.value);
              setAnnualIncomeError(validateAnnualIncome(e.target.value));
            }}
            onBlur={e => setAnnualIncomeError(validateAnnualIncome(e.target.value))}
          />
          {annualIncomeError && <div style={{ color: 'red', fontSize: 18 }}>{annualIncomeError}</div>}

          <label>
            Other income(£):
            <button style={{ marginLeft: '6px' }} className="Help-button" onClick={() => setMessage1(helpTexts.otherIncome)}> ? </button>
          </label>
          <input
            type="text"
            value={otherIncome}
            onChange={e => {
              setOtherIncome(e.target.value);
              setOtherIncomeError(validateOtherIncome(e.target.value));
            }}
            onBlur={e => setOtherIncomeError(validateOtherIncome(e.target.value))}
          />
          {otherIncomeError && <div style={{ color: 'red', fontSize: 18 }}>{otherIncomeError}</div>}

          <label>
            Credit score:
            <button className="Help-button" onClick={() => setMessage1(helpTexts.creditScore)}> ? </button>
          </label>
          <input
            type="text"
            value={creditScore}
            onChange={e => {
              setCreditScore(e.target.value);
              setCreditScoreError(validateCreditScore(e.target.value));
            }}
            onBlur={e => setCreditScoreError(validateCreditScore(e.target.value))}
          />
          {creditScoreError && <div style={{ color: 'red', fontSize: 18 }}>{creditScoreError}</div>}

          <button
            className='Next-steps-button'
            style={{ marginTop: '20px' }}
            onClick={() => {
              // Validate all fields before proceeding
              const annualErr = validateAnnualIncome(annualIncome);
              const otherErr = validateOtherIncome(otherIncome);
              const creditErr = validateCreditScore(creditScore);
              setAnnualIncomeError(annualErr);
              setOtherIncomeError(otherErr);
              setCreditScoreError(creditErr);
              if (!annualErr && !otherErr && !creditErr) {
                setStep2Visible(true);
              }
            }}
            disabled={!isStep1Valid}
          >
            Next Step
          </button>
        </div>
        <div className='Message-box'>
          <span className='Message-box-header' style={{textAlign: 'center'}}> Your Helping Guide </span>
          <p style={{padding:'20px', fontSize: 27}}>
            {message1 || "If you’re unsure what a term means, click the red question-mark next to it for an explanation."}
          </p>
          <p style={{padding: '20px', fontSize: 23}}>
            If you require further assistance, please check out an extended guide by following this link: 
            <a href="https://www.gov.uk/support-for-mortgage-interest" target="_blank" rel="noopener noreferrer">
              https://www.gov.uk/support-for-mortgage-interest
            </a>
          </p>
        </div>
      </div>

      <hr style={{ margin: '40px 70px', border: '5px solid #ccc' }} />

      <div style={{opacity: step2Visible ? 1 : 0.25, textAlign: 'left', fontSize: 50, fontFamily: "GTUltra-Black", fontWeight: 'bolder', padding: '20px 100px', color: 'black'}}>
        Step 2<span style={{color: 'grey', fontSize: 40}}> of 2</span>
      </div>

      <div className='App-body-step2' style={{opacity: step2Visible ? 1 : 0.25}}> 
        <div className="Input-column">
          <label>
            Property value(£):
            <button disabled={!step2Visible} className="Help-button" onClick={() => setMessage2(helpTexts.propertyValue)}> ? </button>
          </label>
          <input
            disabled={!step2Visible}
            type="text"
            value={propertyValue}
            onChange={e => {
              setPropertyValue(e.target.value);
              setPropertyValueError(validatePropertyValue(e.target.value));
            }}
            onBlur={e => setPropertyValueError(validatePropertyValue(e.target.value))}
          />
          {propertyValueError && <div style={{ color: 'red', fontSize: 18 }}>{propertyValueError}</div>}

          <label>
            Deposit payment(£):
            <button disabled={!step2Visible} style={{ marginLeft: '6px' }} className="Help-button" onClick={() => setMessage2(helpTexts.depositPayment)}> ? </button>
          </label>
          <input
            disabled={!step2Visible}
            type="text"
            value={depositPayment}
            onChange={e => {
              setDepositPayment(e.target.value);
              setDepositPaymentError(validateDepositPayment(e.target.value));
            }}
            onBlur={e => setDepositPaymentError(validateDepositPayment(e.target.value))}
          />
          {depositPaymentError && <div style={{ color: 'red', fontSize: 18 }}>{depositPaymentError}</div>}

          <label>
            Mortgage term:
            <button disabled={!step2Visible} className="Help-button" onClick={() => setMessage2(helpTexts.mortgageTerm)}> ? </button>
          </label>
          <input
            disabled={!step2Visible}
            type="text"
            value={mortgageTerm}
            onChange={e => {
              setMortgageTerm(e.target.value);
              setMortgageTermError(validateMortgageTerm(e.target.value));
            }}
            onBlur={e => setMortgageTermError(validateMortgageTerm(e.target.value))}
          />
          {mortgageTermError && <div style={{ color: 'red', fontSize: 18 }}>{mortgageTermError}</div>}

          <label>
            Interest rate(%):
            <button disabled={!step2Visible} className="Help-button" onClick={() => setMessage2(helpTexts.interestRate)}> ? </button>
          </label>
          <input
            disabled={!step2Visible}
            type="text"
            value={interestRate}
            onChange={e => {
              setInterestRate(e.target.value);
              setInterestRateError(validateInterestRate(e.target.value));
            }}
            onBlur={e => setInterestRateError(validateInterestRate(e.target.value))}
          />
          {interestRateError && <div style={{ color: 'red', fontSize: 18 }}>{interestRateError}</div>}

          <button
            disabled={!step2Visible || !isStep2Valid}
            onClick={() => {
              // Validate all fields before finishing
              const propertyErr = validatePropertyValue(propertyValue);
              const depositErr = validateDepositPayment(depositPayment);
              const termErr = validateMortgageTerm(mortgageTerm);
              const rateErr = validateInterestRate(interestRate);
              setPropertyValueError(propertyErr);
              setDepositPaymentError(depositErr);
              setMortgageTermError(termErr);
              setInterestRateError(rateErr);
              if (!propertyErr && !depositErr && !termErr && !rateErr) {
                setFinished(true);
              }
            }}
            className='Next-steps-button'
            style={{ marginTop: '20px' }}
          >
            Finish
          </button>
        </div>
        <div className='Message-box'>
          <span className='Message-box-header' style={{textAlign: 'center'}}> Your Helping Guide </span>
          <p style={{padding:'20px', fontSize: 27}}>
            {message2 || "If you're unsure what a term means, click the red question-mark next to it for an explanation."}
          </p>
          <p style={{padding: '20px', fontSize: 23}}>
            If you require further assistance, please check out an extended guide by following this link: 
            <a href="https://www.gov.uk/support-for-mortgage-interest" target="_blank" rel="noopener noreferrer">
              https://www.gov.uk/support-for-mortgage-interest
            </a>
          </p>
        </div>
      </div>

      {/* <div className="Black-bottom"></div> */}
    </div>
  );
}

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainMortgageUI />} />
//         <Route path="/finish" element={<FinishPage />} />
//       </Routes>
//     </Router>
//   );
// }

export default App;
