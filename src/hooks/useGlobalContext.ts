import React from 'react';
import { GlobalContext } from '../context';

export const useGlobalContext = () => React.useContext(GlobalContext);
