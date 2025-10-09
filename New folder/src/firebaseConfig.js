// src/firebaseConfig.js
// Mock Firebase for local testing

export const auth = {
    currentUser: { email: "test@example.com" },
    signInWithEmailAndPassword: async () => ({ user: { email: "admin@example.com" } }),
    signOut: async () => {}
  };
  
  export const db = {
    collection: () => ({
      doc: () => ({
        set: async () => console.log("Mock upload complete"),
        get: async () => ({ exists: true, data: () => ({ name: "Test User", certificate: "mock.pdf" }) }),
      }),
    }),
  };
  
  export const storage = {
    ref: () => ({
      child: () => ({
        put: async () => console.log("Mock file uploaded"),
        getDownloadURL: async () => "mock-url.pdf",
      }),
    }),
  };
  