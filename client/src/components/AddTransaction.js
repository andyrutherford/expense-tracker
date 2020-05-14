import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const context = useContext(GlobalContext);
  const { current } = context;

  const createTransactionHandler = (e) => {
    e.preventDefault();

    if (editMode) {
      const updates = { text, amount };
      context.editTransaction(current, updates);
      setEditMode(false);
    } else {
      const newTransaction = {
        id: Math.floor(Math.random() * 10000000),
        text,
        amount: parseInt(amount),
      };
      context.createTransaction(newTransaction);
      setEditMode(false);
    }

    setText('');
    setAmount(0);
  };

  useEffect(() => {
    if (current) {
      setEditMode(true);
      setText(current.text);
      setAmount(current.amount);
    }
  }, [current]);

  return (
    <>
      <h3>
        {editMode ? (
          'Edit'
        ) : (
          <span>
            <i className='fas fa-plus'></i> Add
          </span>
        )}{' '}
        transaction
      </h3>
      <form onSubmit={createTransactionHandler}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text...'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>
          <i className='fas fa-save'></i> Save transaction
        </button>
      </form>
    </>
  );
};
