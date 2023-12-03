import { create } from "zustand";

export const useProjects = create((set) => ({
	projects: [],
	setProjects: (_projects) => set(() => ({ projects: _projects })),
}));