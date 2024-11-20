import '@testing-library/jest-dom';

global.URL.createObjectURL = jest.fn(() => 'download-link');
global.URL.revokeObjectURL = jest.fn();
