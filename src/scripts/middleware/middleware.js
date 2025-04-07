export const generateMiddleware = () => {
    return {
        login: async (username, password) => {
            try {
                fetch("http://localhost:3000/src/wikistudentiAPI.php?id=2").then(a => a.json()).then(a => console.log(a))
            }
            catch (error) {
                console.error(error);
            }
        },
        register: async (user) => {

        }
    };
};