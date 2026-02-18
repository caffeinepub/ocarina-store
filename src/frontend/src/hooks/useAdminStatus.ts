import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export function useAdminStatus() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<boolean>({
    queryKey: ['isAdmin', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !!identity && !actorFetching,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isAdmin: query.data ?? false,
    isLoading: actorFetching || query.isLoading,
    error: query.error,
  };
}

