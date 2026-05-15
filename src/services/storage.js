const STORAGE_KEY = 'prompty-data';

export const storageService = {
  getPrompts() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  savePrompts(prompts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  },

  addPrompt(prompt) {
    const prompts = this.getPrompts();
    prompts.unshift(prompt);
    this.savePrompts(prompts);
    return prompts;
  },

  updatePrompt(id, updates) {
    const prompts = this.getPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index !== -1) {
      prompts[index] = { ...prompts[index], ...updates, updatedAt: new Date().toISOString() };
    }
    this.savePrompts(prompts);
    return prompts;
  },

  deletePrompt(id) {
    const prompts = this.getPrompts().filter((p) => p.id !== id);
    this.savePrompts(prompts);
    return prompts;
  },

  toggleFavorite(id) {
    const prompts = this.getPrompts();
    const index = prompts.findIndex((p) => p.id === id);
    if (index !== -1) {
      prompts[index].isFavorite = !prompts[index].isFavorite;
    }
    this.savePrompts(prompts);
    return prompts;
  },
};
