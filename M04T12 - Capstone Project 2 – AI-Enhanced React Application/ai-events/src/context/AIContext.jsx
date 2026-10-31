import {createContext, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {generateEventText} from '../services/aiService.js';

const AIContext = createContext(null);

const INITIAL = {
  status: 'idle', kind: null, draft: '', error: '', simulated: false,
};

export function AIProvider({children}) {
  const [state, setState] = useState(INITIAL);
  const controllerRef = useRef(null);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    setState(INITIAL);
  }, []);

  const generate = useCallback(async (kind, details) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({...INITIAL, status: 'loading', kind});
    try {
      const {text, simulated} =
          await generateEventText(kind, details, controller.signal);
      setState({status: 'success', kind, draft: text, error: '', simulated});
    } catch (error) {
      if (error.name === 'AbortError') return;
      setState({
        ...INITIAL,
        status: 'error',
        kind,
        error: error.message || 'Something went wrong. Try again.',
      });
    }
  }, []);

  const setDraft = useCallback(
      (draft) => setState((current) => ({...current, draft})), []);

  const value = useMemo(
      () => ({...state, generate, setDraft, reset}),
      [state, generate, setDraft, reset]);
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used inside AIProvider');
  return context;
}
