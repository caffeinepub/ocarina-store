import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Product } from '../backend';
import { toast } from 'sonner';

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Product Queries
export function useListProducts() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Array<[string, Product]>>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      price: bigint;
      imageReference: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createProduct(
        data.id,
        data.title,
        data.description,
        data.price,
        data.imageReference
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      console.error('Create product mutation error:', error);
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      description: string;
      price: bigint;
      imageReference: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProduct(
        data.id,
        data.title,
        data.description,
        data.price,
        data.imageReference
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error: any) => {
      console.error('Update product mutation error:', error);
    },
  });
}

