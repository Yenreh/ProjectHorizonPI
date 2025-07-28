// stores/useUserStore.js
import { create } from "zustand";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const useUserStore = create((set) => ({
  // 🔹 Inicializar usuario (crear o restaurar)
  initUser: async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { exists: true, ...data };
    } else {
      const newUser = {
        name: user.displayName,
        email: user.email,
        score: 0,
        currentQuestion: 0,
        uid: user.uid,
        createdAt: new Date(),
      };
      await setDoc(userRef, newUser);
      return { exists: false, ...newUser };
    }
  },

  // 🔹 Actualizar progreso
  updateQuizProgress: async (uid, currentQuestion, score) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      currentQuestion,
      score,
    });
  },

  // 🔹 Obtener todos los usuarios
    fetchUsers: async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const usuarios = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    // 🔽 Ordenar por puntaje descendente
    const usuariosOrdenados = usuarios
        .filter((u) => typeof u.score === "number" && u.name) // aseguramos que tengan score y nombre
        .sort((a, b) => b.score - a.score)
        .map((u) => ({
        nombre: u.name,
        puntaje: u.score,
        }));

    return usuariosOrdenados;
    },
}));

export default useUserStore;
