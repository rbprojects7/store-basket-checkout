import React, { useState, ChangeEvent } from 'react';

interface IFormCheckout {
    onSubmit: (value: string) => void;
    onChangeInput: (value: string) => void;
    inputId: string;
    defaultValue?: string;
    disabled?: boolean;
    submitButtonValue: string;
    label: string;
}

export const CheckoutForm = ({ onSubmit, onChangeInput, inputId, defaultValue = '', submitButtonValue, label, disabled = true }) => {
    const [inputValue, setInputValue] = useState('');
    const submitForm = (ev) => {
        ev.preventDefault();
        onSubmit(inputValue);
    }
    const inputOnChange = (value) => {
        setInputValue(value);
        onChangeInput(value);
    }
    return (
        <form onSubmit={submitForm}>
            <label htmlFor={inputId}>{label}</label>
            <input
                type="text"
                id={inputId}
                defaultValue={defaultValue}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => inputOnChange(ev.target.value)}
            />
            <button type="submit" disabled={disabled}>{submitButtonValue}</button>
        </form>
    );
}