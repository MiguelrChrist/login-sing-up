import React,{ useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './LoginPage.css';

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string()
  .email('E-mail inválido')
  .required('Campo obrigatório'),
  password: yup.string()
  .min(6, 'A senha deve ter no mínimo 6 caracteres')
  .max(10, 'A senha deve ter no máximo 10 caracteres').required('Campo obrigatório'),
});

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await axios.get(`https://664e289efafad45dfadf3c5e.mockapi.io/users?email=${data.email}&password=${data.password}`);
      if (response.data.length > 0) {
        navigate('/home');
      } else {
        setError('Dados incorretos.');
      }
    } catch (err) {
      setError('Dados incorretos.');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Bem-vindo de volta!</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit(handleLogin)}>
          <FormInput type="email" placeholder="Email" register={register('email')} error={errors.email?.message} />
          <FormInput type="password" placeholder="Senha" register={register('password')} error={errors.password?.message} />
          <Button text="Login" onClick={handleSubmit(handleLogin)} />
        </form>
        <div className="signup-link">
          Não tem uma conta? <a href="/signup">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
