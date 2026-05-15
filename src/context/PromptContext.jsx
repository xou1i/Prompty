import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { storageService } from '../services/storage';
import { generateId } from '../lib/utils';

const PromptContext = createContext(null);

const initialState = {
  prompts: [],
  searchQuery: '',
  activeCategory: 'all',
  toasts: [],
  mobileMenuOpen: false,
};

function promptReducer(state, action) {
  switch (action.type) {
    case 'SET_PROMPTS':
      return { ...state, prompts: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.payload };
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.payload] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };
    case 'SET_MOBILE_MENU_OPEN':
      return { ...state, mobileMenuOpen: action.payload };
    default:
      return state;
  }
}

export function PromptProvider({ children }) {
  const [state, dispatch] = useReducer(promptReducer, initialState);

  useEffect(() => {
    const prompts = storageService.getPrompts();
    dispatch({ type: 'SET_PROMPTS', payload: prompts });
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = generateId();
    dispatch({ type: 'ADD_TOAST', payload: { id, message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3000);
  }, []);

  const addPrompt = useCallback((promptData) => {
    const prompt = {
      id: generateId(),
      ...promptData,
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const prompts = storageService.addPrompt(prompt);
    dispatch({ type: 'SET_PROMPTS', payload: prompts });
    return prompt;
  }, []);

  const updatePrompt = useCallback((id, updates) => {
    const prompts = storageService.updatePrompt(id, updates);
    dispatch({ type: 'SET_PROMPTS', payload: prompts });
  }, []);

  const deletePrompt = useCallback((id) => {
    const prompts = storageService.deletePrompt(id);
    dispatch({ type: 'SET_PROMPTS', payload: prompts });
  }, []);

  const toggleFavorite = useCallback((id) => {
    const prompts = storageService.toggleFavorite(id);
    dispatch({ type: 'SET_PROMPTS', payload: prompts });
  }, []);

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  const setActiveCategory = useCallback((category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const copyPrompt = useCallback((content) => {
    navigator.clipboard.writeText(content);
  }, []);

  const getFilteredPrompts = useCallback(() => {
    let filtered = state.prompts;

    if (state.activeCategory === 'favorites') {
      filtered = filtered.filter((p) => p.isFavorite);
    } else if (state.activeCategory !== 'all') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === state.activeCategory.toLowerCase()
      );
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }

    return filtered;
  }, [state.prompts, state.activeCategory, state.searchQuery]);

  const setMobileMenuOpen = useCallback((isOpen) => {
    dispatch({ type: 'SET_MOBILE_MENU_OPEN', payload: isOpen });
  }, []);

  const getAnalytics = useCallback(() => {
    const prompts = state.prompts;
    const total = prompts.length;
    const favorites = prompts.filter((p) => p.isFavorite).length;

    const categoryCounts = prompts.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    const mostUsed = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weeklyActivity = prompts.filter((p) => new Date(p.createdAt) >= weekAgo).length;

    return {
      total,
      favorites,
      mostUsedCategory: mostUsed ? mostUsed[0] : 'N/A',
      weeklyActivity,
    };
  }, [state.prompts]);

  const value = {
    ...state,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    setSearchQuery,
    setActiveCategory,
    copyPrompt,
    getFilteredPrompts,
    getAnalytics,
    showToast,
    setMobileMenuOpen,
  };

  return <PromptContext.Provider value={value}>{children}</PromptContext.Provider>;
}

export function usePrompts() {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
}
