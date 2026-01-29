import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Props = { children: React.ReactNode; roles?: string[] };

export default function ProtectedRoute({ children, roles }: Props) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && roles.length > 0) {
    const role = ((user.role || (user as any).role_name) || '').toString().toLowerCase();
    const allowed = roles.some((r) => role.includes(r.toLowerCase()));
    if (!allowed) return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
