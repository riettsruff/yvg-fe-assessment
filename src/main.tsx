import { createRoot } from 'react-dom/client';

import App from './app';
import './index.css';

if (typeof globalThis !== 'undefined') {
  const globalScope = globalThis as typeof globalThis & {
    __APP_IMPORT_META_ENV__?: ImportMetaEnv;
  };

  globalScope.__APP_IMPORT_META_ENV__ = import.meta.env;
}

createRoot(document.getElementById('root')!).render(<App />);
