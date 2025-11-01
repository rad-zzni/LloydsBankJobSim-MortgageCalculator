import React, { useState } from 'react';
import './FinishPage.css';
// FinishPage.tsx
import App from './App';

interface FinishPageProps {
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  results: {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    affordabilityWarning?: string;
  };
}
/* Chatgpt's downloading ST-component */
const downloadTextFile = (results: {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  affordabilityWarning?: string;
}) => {
  const data =
`Lloyds Bank Mortgage Calculator Results

Monthly Payment: £${results.monthlyPayment.toFixed(2)}
Total Payment: £${results.totalPayment.toFixed(2)}
Total Interest: £${results.totalInterest.toFixed(2)}

${results.affordabilityWarning ? `${results.affordabilityWarning}` : ""}
`;

  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mortgage_results.txt';
  a.click();
  URL.revokeObjectURL(url);
};
/* Chatgpt's downloading ST-component */

function FinishPage( {setFinished, results}: FinishPageProps) {
  const [message3, setMessage3] = useState("");
  const helpTextsFinishPg = {
    monthlyPayment: "Your monthly payment is the fixed amount you pay each month toward your mortgage. It includes both the interest you owe for borrowing money and the portion that reduces your loan balance. It’s based on the property value, your deposit, the interest rate, and the loan term you entered.",
    totalPayment: "Your total payment is the sum of all monthly payments you’ll make over the full mortgage term. It shows how much you’ll pay in total, combining both the loan amount and all the interest charged across the years.",
    totalInterest: "Your total interest is the extra amount you’ll pay on top of the money you borrowed. It represents the cost of borrowing from the bank, calculated as the total payment minus the original loan amount, and depends on your rate, deposit, and repayment period."
  };

  return (
    <>
        <header className='App-header3'>
            <img onClick={()=> window.location.href = "https://www.lloydsbank.com/"} src="/images/lloydsLogo.png" alt="logo" />
            <h1>Results & Summary</h1>
            <label onClick={() => window.location.href = "https://online.lloydsbank.co.uk/personal/logon/login.jsp"}> Log in? </label>
        </header>
        <div className='Blue-card'> 
          <div className='column1'>
            <h1 style={{textAlign: 'center'}}> Your results:  </h1>
            {results.affordabilityWarning && (
            <div style={{color: '#d35050', fontWeight: 'bold', textAlign: 'center', fontSize: '30px', marginLeft: '20vw' , fontFamily: 'GTUltraUltra-Black'}}>
              {results.affordabilityWarning}
            </div>
          )}
            <h2> Monthly payments(£): <button className="Help-button" onClick={() => setMessage3(helpTextsFinishPg.monthlyPayment)}> ? </button></h2>
            <p> {results.monthlyPayment.toFixed(2)}£</p>
            <h2> Total payments(£): <button className="Help-button" onClick={() => setMessage3(helpTextsFinishPg.totalPayment)}> ? </button></h2>
            <p> {results.totalPayment.toFixed(2)}£</p>
            <h2> Total interest(£): <button className="Help-button" onClick={() => setMessage3(helpTextsFinishPg.totalInterest)}> ? </button></h2>
            <p> {results.totalInterest.toFixed(2)}£</p>
          </div>
          <div className='column2'> <div className='Message-box3'>
            <span className='Message-box-header3'> Your Helping Guide </span>
            <p style={{padding:'20px', fontSize: 27}}>
              {message3 || "If you’re unsure what a term means, click the red question-mark next to it for an explanation."}
            </p>
          </div> </div>
          <div className='column3'>
            <h1> Further Options </h1> <img src="/images/settings.png" alt="logo" style={{paddingBottom: '600px', height: '60px', width: '60px', marginLeft: '11vw', marginTop: '2vh'}}/>
            {/* <p> <span style={{fontWeight: 'bold'}}> Check out our other services here: </span> <br />  </p> */}
            <button style={{marginBottom: '-20px'}} onClick={()=>setFinished(false)}> Start over</button>
            <button onClick={() => downloadTextFile(results)}> Download results</button>
          </div>
        </div>
    </>
  );
}

export default FinishPage;