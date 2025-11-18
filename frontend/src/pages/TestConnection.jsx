import { useState } from 'react';
import api from '../services/api';

export default function TestConnection() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    setResult('Probando conexión...');
    
    try {
      console.log('🔍 Testing API URL:', import.meta.env.VITE_API_URL);
      const response = await api.get('/health');
      console.log('✅ Response:', response.data);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('❌ Error:', error);
      setResult(`Error: ${error.message}\n\n${JSON.stringify(error.response?.data || error, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    setResult('Probando registro...');
    
    try {
      const testUser = {
        username: `test${Date.now()}`,
        password: 'test123456'
      };
      
      console.log('🔍 Testing register with:', testUser);
      const response = await api.post('/auth/register', testUser);
      console.log('✅ Response:', response.data);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('❌ Error:', error);
      setResult(`Error: ${error.message}\n\n${JSON.stringify(error.response?.data || error, null, 2)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test de Conexión</h1>
        
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border mb-6">
          <h2 className="text-xl font-bold mb-4">Información</h2>
          <div className="space-y-2 text-sm">
            <p><strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'NO CONFIGURADA'}</p>
            <p><strong>Mode:</strong> {import.meta.env.MODE}</p>
            <p><strong>Dev:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}</p>
            <p><strong>Prod:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={testHealth}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Probar /api/health'}
          </button>

          <button
            onClick={testRegister}
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Probar Registro'}
          </button>
        </div>

        {result && (
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <h2 className="text-xl font-bold mb-4">Resultado:</h2>
            <pre className="text-sm overflow-auto bg-dark-bg p-4 rounded">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
