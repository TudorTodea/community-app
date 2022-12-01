import React, { useState, useEffect } from 'react'
import { Box, Flex, Center, chakra } from '@chakra-ui/react'
import axios from 'axios'

import { SearchIcon } from '@chakra-ui/icons'

import SearchResults from './SearchResults'

const Search = () => {
    const [queryText, setQueryText] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleChange = (e) => setQueryText(e.target.value)

    useEffect(() => {
        if (queryText === '') {

        } else {
            (async () => {

                const response = await axios.get(`http://localhost:5000/api/community/searchCommunities?Name=${queryText}`)
                setSearchResults(response.data)
            })()
        }
    }, [queryText])
    const setQueryTextFunction = (e) => {

        setQueryText('');
    }
    return (
        <Box
            sx={{
                rounded: 'lg',
                overflow: 'hidden',
                bg: 'transparent',
                shadow: 'lg',
                maxW: '600px',
                width: '100%',
                mt: '1rem',
                mx: 'auto',
                w: '275px',
            }}
        >
            <Flex pos='relative' align='strech'>
                <chakra.input
                    type=''
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck='false'
                    maxLength={64}
                    sx={{
                        w: '275px',
                        h: '38px',
                        pl: '38px',
                        fontWeight: 'medium',
                        outline: 0,
                        background: 'black',
                        color: 'white'
                    }}
                    placeholder='Search '
                    value={queryText}
                    onChange={handleChange}
                />

                <Center pos='absolute' left={3} h='38px'>
                    <SearchIcon color='teal.500' boxSize='20px' />
                </Center>
            </Flex>

            {queryText && (
                <Box maxH='70vh' p='0' px={2} overflowY='auto' style={{ position: 'absolute', zIndex: '1' }} sx={{ background: '#212529', rounded: 'lg', width: '275px' }} >
                    <Box>
                        <Box >
                            <SearchResults setQueryText={setQueryTextFunction} searchResults={searchResults} />
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Search