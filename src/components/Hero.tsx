import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Data from "./Data";
import { useState } from 'react';

import { motion} from "framer-motion"
import {PlaceholdersAndVanishInput} from './placeholders-and-vanish-input'
import {BackgroundBeams} from './background-beams'
import { useCourses } from './CourseContext';

interface HeroProps {
  onSearchSubmit: (searchValue: string) => void;
}

export default function Hero({onSearchSubmit}:HeroProps) {
    const { coursesMap, loading, error } = useCourses();
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!loading && !error) {
            if(coursesMap.has(searchValue)) {
                
            }
        }

        console.log('Form submitted with value:', searchValue);
        onSearchSubmit(searchValue);
        setSearchValue('');
    };

    const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
    const itemVariants = {
      hidden: { opacity: 0, y: 10 },
      visible
    };


  return (
    <div>
    <BackgroundBeams/>
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
          <Box
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
              <motion.div
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
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  textAlign="center"
                  color="text.secondary"
                  sx={{ alignSelf: 'center', fontSize: 'clamp(2rem, 6vw, 2rem)', marginTop:6}}
                >
                Search for a course.
                </Typography>
              </motion.div>
            </motion.article>
          </Box>
        </Stack>
        <div className="h-[5rem] flex flex-col justify-center  items-center px-4"/>
        <PlaceholdersAndVanishInput
            placeholders={[
              "CS 444",
              "ECE 358",
              "CO 466",
              "CS 492",
              "CS 486",
            ]}
            onChange={handleChange}
            onSubmit={onSubmit}
        />
       
      </Container>
    </Box>
    </div>
  );
}
