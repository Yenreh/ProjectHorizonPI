import { create } from 'zustand';

const useModelStore = create((set) => ({
  keysPressed: {},
  activeTab: 'definition',
  setActiveTab: (tab) => set(() => ({ activeTab: tab })),
  setKeyPressed: (key, isPressed) =>
    set((state) => ({
      keysPressed: { ...state.keysPressed, [key]: isPressed },
    })),
}));

export default useModelStore;
