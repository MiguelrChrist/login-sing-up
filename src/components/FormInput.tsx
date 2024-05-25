import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, register, error }) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...register} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FormInput;
