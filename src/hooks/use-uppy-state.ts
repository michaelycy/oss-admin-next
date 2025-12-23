import { Uppy, State, Meta, Body } from '@uppy/core';
import { useMemo } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';

export function useUppyState<T, TMeta extends Meta>(
  uppy: Uppy<TMeta>,
  selector: (state: State<TMeta, Body>) => T
) {
  const store = uppy.store;
  const subscribe = useMemo(() => store.subscribe.bind(store), [store]);
  const getSnapshot = useMemo(() => store.getState.bind(store), [store]);

  return useSyncExternalStoreWithSelector(subscribe, getSnapshot, getSnapshot, selector);
}
