"use client";

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

import { motion} from "framer-motion"
 
import { PlaceholdersAndVanishInput } from './placeholders-and-vanish-input';

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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("submitted");
    };

    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible
    };

    const placeholders = [
      "CS 444",
      "ECE 358",
      "CO 466",
      "CS 492",
      "CS 486",
    ];

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
          justifyContent: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={4} useFlexGap sx={{ width: { xs: '100%', sm: '70%' }, alignItems: 'center'}}>
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
            <motion.article
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 1 } }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
              <motion.p
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible
              }}
            >
                Plan your&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                  fontSize: 'clamp(4rem, 11vw, 5rem)',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                }}
              >
                future
              </Typography>
              </motion.p>

              <motion.p variants={itemVariants}>
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  sx={{ alignSelf: 'center', fontSize: 'clamp(2rem, 6vw, 2rem)', marginTop:6}}
                >
                Search for a course.
                </Typography>
              </motion.p>
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
            </motion.article>
          </Typography>
          {showData? <Data subject = {subject} code = {code}/> : null}
        </Stack>
       
      </Container>
    </Box>
  );
}
