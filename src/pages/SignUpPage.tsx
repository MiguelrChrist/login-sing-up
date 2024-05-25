import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignUpFormInputs {
  email: string;
  password: string;
}

const schema: yup.ObjectSchema<SignUpFormInputs> = yup.object().shape({
  email: yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório')
    .test('min-chars-before-at', 'O email deve ter entre 3 a 5 caracteres antes do símbolo "@"', (value) => {
      const [localPart] = value?.split('@') || [];
      return localPart.length >= 3 && localPart.length <= 50;
    })
    .max(50, 'O email deve ter no máximo 50 caracteres antes do símbolo "@"'),
  password: yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .max(10, 'A senha deve ter no máximo 10 caracteres')
    .required('Campo obrigatório'),
});


const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (data: SignUpFormInputs) => {
    try {
      console.log('Creating user');
      const createResponse = await axios.post('https://664e289efafad45dfadf3c5e.mockapi.io/users', data);
      console.log('User creation response:', createResponse);

      navigate('/login');
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Erro ao criar usuário.');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Criar uma conta</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit(handleSignUp)}>
          <FormInput type="email" placeholder="Email" register={register('email')} error={errors.email?.message} />
          <FormInput type="password" placeholder="Senha" register={register('password')} error={errors.password?.message} />
          <Button text="Sign-up" onClick={handleSubmit(handleSignUp)} />
        </form>
        <div className="signup-link">
          Já tem uma conta? <a href="/login">Entrar</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
