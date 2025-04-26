export interface GrowthModel{
    appreciationRate: number,
    expenseIncreaseRate: number,
    rentGrowthRate: number,
    closingCostRate: number,
    costToSellRate: number
}

export function createDefaultGrowthModel(): GrowthModel {
    return {
      appreciationRate: 3,
      expenseIncreaseRate: 3,
      rentGrowthRate: 5,
      closingCostRate: 4,
      costToSellRate: 5.5
    };
}