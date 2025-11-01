interface MortgageInputs {
    propertyValue: number;
    depositPayment: number;
    mortgageTerm: number; // in years
    interestRate: number; // annual %
    annualIncome: number;
    otherIncome: number;
    creditScore: number;
  }
  
  interface MortgageResults {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    affordabilityWarning?: string;
  }
  
  function calculateMortgage(inputs: MortgageInputs): MortgageResults {
    const principal = inputs.propertyValue - inputs.depositPayment;
    const monthlyRate = inputs.interestRate / 100 / 12;
    const nPayments = inputs.mortgageTerm * 12;
  
    // Standard mortgage formula
    const monthlyPayment = 
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -nPayments));
    const totalPayment = monthlyPayment * nPayments;
    const totalInterest = totalPayment - principal;
  
    // Affordability check (optional)
    const maxAllowedPayment = (inputs.annualIncome + inputs.otherIncome) / 12 * 0.35;
    let affordabilityWarning;
    if (monthlyPayment > maxAllowedPayment) {
      affordabilityWarning = "Warning: Monthly payment exceeds 35% of your income!";
    }
  
    return { monthlyPayment, totalPayment, totalInterest, affordabilityWarning };
  }

  export { calculateMortgage };