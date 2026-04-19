import { createContext, useContext } from 'react';

const AdminAPIContext = createContext(null);

export const AdminAPIProvider = AdminAPIContext.Provider;

export const useAdminAPIContext = () => {
    const ctx = useContext(AdminAPIContext);
    if (!ctx) throw new Error('useAdminAPIContext must be used within AdminAPIProvider');
    return ctx;
};

export default AdminAPIContext;
