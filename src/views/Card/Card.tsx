import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledBox = styled(Box)({
  borderRadius: '4px',
  border: `1px solid #e0e0e0`,
  padding: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80px',
  backgroundColor: '#fff',
});

interface CardProps {
  text: string;
}

const Card: FC<CardProps> = ({ text }) => {
  return (
    <StyledBox>
      <Typography variant="body1">{text}</Typography>
    </StyledBox>
  );
};

export default Card;
