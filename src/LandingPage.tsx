import React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import getLPTheme from '../src/getLPTheme';

interface LandingPageProps {
  setSearchCourse: (value: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setSearchCourse }) => {
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearchSubmit = (searchValue: string) => {
    setSearchCourse(searchValue);
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero onSearchSubmit={handleSearchSubmit} />
      <Box sx={{ bgcolor: 'background.default' }} />
    </ThemeProvider>
  );
};

export default LandingPage;
