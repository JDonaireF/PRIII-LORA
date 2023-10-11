import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('authenticated');

      if (!isAuthenticated) {
        router.push('/'); // Si no está autenticado, redirige a la página de inicio de sesión
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;