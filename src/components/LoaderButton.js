import React from 'react';
import { Button } from 'react-bootstrap';
import { FiRefreshCcw } from 'react-icons/fi';

export default function LoaderButton({
  isLoading,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <FiRefreshCcw className="spinning" />}
      {props.children}
    </Button>
  );
}