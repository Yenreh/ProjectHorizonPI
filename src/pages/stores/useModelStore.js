import { create } from 'zustand';

const useModelStore = create((set) => ({
  keysPressed: {},
  setKeyPressed: (key, isPressed) =>
    set((state) => ({
      keysPressed: { ...state.keysPressed, [key]: isPressed },
    })),
}));

export default useModelStore;
