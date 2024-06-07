import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import './App.css';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState('');
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const clearItems = () => {
    setExpenses([]);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setIsEditing(true);
    setId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (isEditing) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount: parseFloat(amount) } : item;
        });
        setExpenses(newExpenses);
        setIsEditing(false);
      } else {
        const newExpense = {
          id: new Date().getTime(),
          charge,
          amount: parseFloat(amount),
        };
        setExpenses([...expenses, newExpense]);
      }
      setCharge('');
      setAmount('');
    }
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
  };

  return (
    <main className="App">
      <h1>예산 계산기</h1>
      <div>
        <ExpenseForm
          isEditing={isEditing}
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <ExpenseList
          clearItems={clearItems}
          initialExpenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
      <span className="total-expense">
        총지출: {expenses.reduce((acc, curr) => acc + curr.amount, 0)} 원
      </span>
    </main>
  );
}

export default App;