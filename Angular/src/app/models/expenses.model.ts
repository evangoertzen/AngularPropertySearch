export interface ExpensesModel {
    vacancy_rate: number,
    maintenance_rate: number,
    management_fee_rate: number,
    insurance_dol: number,
    utilities_dol: number,
    misc_expenses_dol: number,
    capex_rate: number
}

export function  createDefaultExpenses(): ExpensesModel {
    return {
        vacancy_rate: 5,
        maintenance_rate: 3,
        management_fee_rate: 10,
        insurance_dol: 0,
        utilities_dol: 0,
        misc_expenses_dol: 0,
        capex_rate: 2
    }
}