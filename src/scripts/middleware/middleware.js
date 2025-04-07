export const generateMiddleware = () => {
<<<<<<< HEAD
    return {
        login: async (username, password) => {  //login utente
            try {
                fetch("http://localhost:3000/src/wikistudentiAPI.php?id=2").then(a => a.json()).then(a => console.log(a))
            }
            catch (error) {
                console.error(error);
            }
        },
=======
  return {
    login: async (username, password) => {
      //login utente
      try {
        const response = await fetch("http://localhost:8080/src/wikistudentiAPI.php", {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              "method": "POST",
              "body": JSON.stringify({
                "username": username,
                "password": password
              })
        });
        const resp = await response.json();
        return resp;
      } catch (error) {
        console.error(error);
      }
    },
>>>>>>> da61f6c4759259a28c78c79ef533d99bec5202fc

    register: async (user) => {
      //registrazione utente
    },

<<<<<<< HEAD
    load: ()=>{
        try {
            return new Promise((resolve, reject) => {
                fetch("/bookings").then(r => r.json()).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })  
=======
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
>>>>>>> da61f6c4759259a28c78c79ef533d99bec5202fc
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

    modificaDati: async (user) => {},

    modificaRuoli: async (user) => {},

    approvazione: async (article) => {},

    ripristino: async (version) => {},

    richiestaDati: async () => {},
  };
};
