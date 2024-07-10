import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Data from "./Data";
import { useState } from 'react';

export default function Hero() {
    const [showData, setData] = React.useState(false)
    const [subject, setSubject] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [input, setInput] = useState<string>('');

    const handleClick = () => {
      const regex = /^([a-zA-Z]+)\s+(\d+)$/;
      const match = input.match(regex);

      if (match) {
        setSubject(match[1]);
        setCode(match[2]);
        setData(true);
        setInput('');
      } else {
        setData(false);
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setInput(event.target.value);
    }

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(4.5rem, 11vw, 5rem)',
              fontFamily: 'sans-serif',
            }}
          >
            Plan your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontFamily: 'sans-serif',
                fontSize: 'clamp(4rem, 11vw, 5rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              future
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Search for a course.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Course code"
              placeholder="CS 444"
              value = {input}
              onChange={handleChange}
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Course code',
              }}
            />
            <Button variant="contained" color="primary" onClick = {handleClick}>
              Search
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
          </Typography>
          {showData? <Data subject = {subject} code = {code}/> : null}
        </Stack>
       
      </Container>
    </Box>
  );
}
