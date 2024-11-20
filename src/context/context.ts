import React from 'react';
import { GlobalState } from '../types';

export const GlobalContext = React.createContext<GlobalState>(Object.create({}));
