import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function useFetch({ queryFn, key, enabled = true }) {
  const { isPending, error, data } = useQuery({
    queryKey: [key],
    queryFn: queryFn,
    enabled,
  });

  return { isPending, error, data };
}
