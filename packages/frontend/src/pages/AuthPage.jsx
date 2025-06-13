import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../components/common';
import { loginUser, registerUser, clearAuthError, resetRegistrationSuccess } from '../state/authSlice';
import { selectAuthLoading, selectAuthError, selectIsAuthenticated, selectRegistrationSuccess } from '../state/authSlice';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const registrationSuccess = useSelector(selectRegistrationSuccess);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mentors');
    }
    return () => {
      dispatch(clearAuthError());
      dispatch(resetRegistrationSuccess());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearAuthError());

    if (isLogin) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ full_name: name, email, password }));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    dispatch(clearAuthError());
    dispatch(resetRegistrationSuccess());
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="heading-lg text-text-primary mb-2">
            MentorIA
          </h1>
          <p className="body-md text-text-secondary">
            Tu compañero de estudio inteligente
          </p>
        </div>

        {/* Auth Toggle */}
        <div className="bg-surface rounded-lg p-1 flex">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md button-text transition-all duration-200 ${
              isLogin
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md button-text transition-all duration-200 ${
              !isLogin
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Auth Form */}
        <div className="bg-surface rounded-lg shadow-sm border border-gray-200 p-6">
          {registrationSuccess ? (
            <div className="text-center space-y-4">
              <h3 className="heading-sm text-green-600">¡Registro Exitoso!</h3>
              <p className="body-md text-text-secondary">
                Hemos creado tu cuenta. Por favor, inicia sesión para continuar.
              </p>
              <Button onClick={() => {
                setIsLogin(true);
                dispatch(resetRegistrationSuccess());
              }}
              className="w-full"
              >
                Ir a Iniciar Sesión
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                  <Input
                type="text"
                label="Nombre completo"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              )}
              <Input
                type="email"
                label="Correo electrónico"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Contraseña"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="body-sm text-red-500 text-center">{error.detail || 'An error occurred'}</p>}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !email || !password || (!isLogin && !name)}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Iniciando sesión...' : 'Registrando...'}
                  </div>
                ) : (
                  isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
                )}
              </Button>
            </form>
          )}

          {!registrationSuccess && (
            <div className="mt-6 text-center">
              <p className="body-sm text-text-secondary">
                {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              </p>
              <button
                onClick={toggleAuthMode}
                className="text-primary label hover:text-primary-600 transition-colors duration-200 mt-1"
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-text-secondary caption">
          <p>Al continuar, aceptas nuestros términos de servicio y política de privacidad</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 