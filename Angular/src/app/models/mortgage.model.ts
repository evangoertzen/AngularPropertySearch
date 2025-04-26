export interface MortgageModel{
    interestRate: number,
    loanTerm: number,
    downPaymentPercentage: number
}

export function createDefaultMortgageModel(): MortgageModel {
    return {
      interestRate: 6.7,
      loanTerm: 30,
      downPaymentPercentage: 20,
    };
}