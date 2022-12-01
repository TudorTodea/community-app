import React from 'react'
import { Box, Image, Grid, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SearchResults = ({ searchResults, setQueryText }) => {
    const navigate = useNavigate();
    return (
        <Grid gridRowGap='1rem' sx={{ color: 'white', w: '100%', marginTop: '5px', marginBottom: '5px' }} >
            {searchResults.map((e) => {
                return (
                    <Box

                        key={e.Name}
                        _hover={{
                            borderRadius: '5px',
                            background: '#313638',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        p='.5rem 1rem'
                        onClick={() => { navigate(`/community/${e.Name}`); setQueryText() }}
                    >
                        <Grid
                            sx={{
                                gridTemplateColumns: '50px 1fr',
                                gridColumnGap: '1rem',
                                height: '50px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box>
                                <Image
                                    src={e.avatar}
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        objectFit: 'cover',
                                        borderRadius: 'full'
                                    }}
                                />
                            </Box>

                            <VStack align=''>
                                <Text noOfLines={1} align='center' sx={{ marginTop: '10px' }}>{e.Name}</Text>
                            </VStack>
                        </Grid>
                    </Box>
                )
            })}
        </Grid>
    )
}

export default SearchResults