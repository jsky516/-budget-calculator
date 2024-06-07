import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({ clearItems, handleEdit, initialExpenses, handleDelete }) => {
  return (
    <>
      <ul className="list">
        {initialExpenses.map((expense) => (
          <ExpenseItem
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            key={expense.id}
            expense={expense}
          />
        ))}
      </ul>
      {initialExpenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          목록 지우기 <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;