import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <input type="text" placeholder="Email" className="p-2 border border-gray-300 rounded-md w-full mb-4" />
      <input type="password" placeholder="Senha" className="p-2 border border-gray-300 rounded-md w-full mb-4" />
      <button className="mt-6 p-2 bg-blue-500 text-white rounded-md">
        Entrar
      </button>
    </div>
  );
};

export default Login;
