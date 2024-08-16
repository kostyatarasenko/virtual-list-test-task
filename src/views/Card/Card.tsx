import React from 'react';
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

type CardProps = {
  text: string;
}

const Card = ({ text }: CardProps) => {
  return (
    <StyledBox>
      <Typography variant="body1">{text}</Typography>
    </StyledBox>
  );
};

export default Card;
