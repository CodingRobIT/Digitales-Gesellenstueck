import React, { useEffect, useState } from 'react';
import { Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

interface User {
    id: string;
    username: string;
}

const UserDetailsContainer = styled(Box)({
    maxWidth: 600,
    margin: '0 auto',
    padding: '1rem',
});

const UserDetails = () => {
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        fetch('/api/users/me')
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error('Error fetching user details:', error));
    }, []);

    if (!userData) {
        return <Typography>Loading user details...</Typography>;
    }

    return (
        <UserDetailsContainer>
            <Box sx={{ marginTop: '1rem' }}>
                <Typography variant="body1" gutterBottom color="snow">
                    Dein User Name:
                </Typography>
                <Typography variant="body1" gutterBottom color="snow">
                    {userData.username}
                </Typography>
            </Box>
            <Typography variant="body1" gutterBottom color="snow" sx={{ marginTop: '1rem' }}>
                Deine User Id:
                <br />
                {userData.id}
            </Typography>
        </UserDetailsContainer>
    );
};

export default UserDetails;
