import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAlter({
  mutationFn,
  key,
  onSuccessCallback,
  onErrorCallback,
  invalidateQueries = true,
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      if (invalidateQueries && key) {
        queryClient.invalidateQueries({ queryKey: [key] });
      }

      // Call custom success callback if provided
      if (onSuccessCallback) {
        onSuccessCallback(data, variables);
      }
    },
    onError: (error, variables) => {
      // Call custom error callback if provided
      if (onErrorCallback) {
        onErrorCallback(error, variables);
      }
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
}
