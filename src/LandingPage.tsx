import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import getLPTheme from '../src/getLPTheme';
import { useNavigate} from 'react-router-dom';

export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const LPtheme = createTheme(getLPTheme(mode));

    const toggleColorMode = () => {
      setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }
    const navigate = useNavigate();
    const handleSearchSubmit = (searchValue: string) => {
      navigate(`/playground?search=${searchValue}`);
    }

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero onSearchSubmit={handleSearchSubmit} />
      <Box sx={{ bgcolor: 'background.default' }} />
    </ThemeProvider>
  );
}
