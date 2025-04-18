export const generateMiddleware = () => {
    return {
    login: async (user) => {
      //login utente
      try {
        const response = await fetch("http://localhost:8080/src/wikistudentiAPI.php", {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              "method": "POST",
              "body": JSON.stringify({
                "user": user,
                "action": "login"
              })
        });
        const resp = await response.json();
        console.log(resp)
        return resp;
      } catch (error) {
        console.error(error);
      }
    },
    register: async (user) => {
      //registrazione utente
      try {
        const response = await fetch("http://localhost:8080/src/wikistudentiAPI.php", {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              "method": "POST",
              "body": JSON.stringify({
                "user": user,
                "action": "register"
              })
        });
        const resp = await response.json();
        console.log(resp)
        return resp;
      } catch (error) {
        console.error(error);
      }
    },

    load: () => {
      try {
        return new Promise((resolve, reject) => {
          fetch("/bookings")
            .then((r) => r.json())
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } catch (e) {
        console.error(e);
      }
    },

    delete: (id) => {
      //rimozione utente
      try {
        return new Promise((resolve, reject) => {
          fetch("/delete/" + id, {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((r) => r.json())
            .then((data) => {
              return resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } catch (e) {
        console.error(e);
      }
    },
    insert: (article) => {
      //aggiunta articolo
      const body = article;
      const fetchOptions = {
        method: "post",
        body: body,
      };

      try {
        return new Promise((resolve, reject) => {
          fetch("/insert", fetchOptions)
            .then((r) => r.json())
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } catch (e) {
        console.error(e);
      }
    },

    modificaDati: async (user) => {
      
    },

    modificaRuoli: async (user) => {},

    approvazione: async (article) => {},

    ripristino: async (version) => {
      
    },

    richiestaDati: async () => {
      try {
          const response = await fetch("/dati", { 
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          console.error(e);
      }
  },
  };
};
