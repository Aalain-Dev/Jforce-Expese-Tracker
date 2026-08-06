import React from 'react'
import ExpenseForm from '../../../Components/ExpenseForm'

const ExpensePage = () => {
  return (
    <>
        <div className="flex items-center flex-col justify-center  bg-gray-100">
            <p className="text-black-700 text-left mt-10 mb-10">
                Add The Required Expense Details Below and Click Submit to Add the Expense
            </p>
            <ExpenseForm onSubmit={(data) => console.log(data)} />
        </div>
    </>
  )
}

export default ExpensePage
