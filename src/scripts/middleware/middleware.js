export const generateMiddleware = () => {
    return {
    login: async (user) => {
      //login utente
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
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
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
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
        return resp;
      } catch (error) {
        return error;
      }
    },

    deleteUser: async(id) => {
      //rimozione utente
      try {
        const resp = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
            "method": "POST",
            "headers": {
              'Accept': 'application/json',
              "Content-Type": "application/json",
            },
            "body": JSON.stringify({
              "id": id,
              "action": "deleteUser"
            })
          })
          const res = await resp.json();
          return res;
      } catch (e) {
        return e;
      }
    },


    addArticle: async(article) => {
      //aggiunta articolo
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "headers": {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            "method": "POST",
            "body": JSON.stringify({
              "article": article,
              "action": "addArticle"
            })
        });
        const resp = await response.json();
        return resp;
      } catch (error) {
        return error;
      }
    },

    modifyUserData: async (user) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "user": user,
            "action": "modifyUserData",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    modifyRoles: async (user, roles) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "user": user,
            "role": roles,
            "action": "modifyRoles",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    approveDraft: async(article) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "article": article,
            "action": "approveDraft",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    discardDraft: async(article) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "article": article,
            "action": "discardDraft",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    resetDoc: async (doc, version) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "doc": doc,
            "version": version,
            "action": "resetDoc",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    addVersion: async(author, doc, version) => {
      try {
        const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "doc": doc,
            "version": version,
            "author": author,
            "action": "addVersion",
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },
    
    getDocs: async() => {
      try {
          const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php?act=docs", { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },

    getDoc: async(id) => {
      try {
          const response = await fetch(`http://localhost:3000/src/wikistudentiAPI.php?act='docs'&doc=${id}`, { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          console.log(response)
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },

    getDrafts: async() => {
      try {
          const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php?act=drafts", { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },

    getUsers: async() => {
      try {
          const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php?act=users", { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },


    getDraft: async(id) => {
      try {
          const response = await fetch(`http://localhost:3000/src/wikistudentiAPI.php?act='drafts'&draft=${id}`, { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },

    getVersionsByDoc: async(article, id) => {
      try {
          const response = await fetch(`http://localhost:8080/src/wikistudentiAPI.php?act=versions&article=${id}`, { 
              "method": "GET",
              "headers": {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json(); 
          return data; 
      } catch (e) {
          return e;
      }
    },


    sendMail: async(action, target) => {
      const response = await fetch("http://localhost:3000/src/wikistudentiAPI.php", {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          "body": JSON.stringify({
            "action": action,
            "email": target,
          }),
        });
        return await response.json();
      }
    };
};