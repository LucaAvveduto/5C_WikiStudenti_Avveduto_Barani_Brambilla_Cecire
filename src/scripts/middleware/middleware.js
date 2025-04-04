export const generateMiddleware = () => {
    return {
        login: async (username, password) => {
            try {
                const res = await fetch("");
                const data = await res.json();
            }
            catch (error) {
                console.error(error);
            }
        },
        register: async (user) => {
            
        }
    };
};