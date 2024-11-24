import { Provider } from '@nestjs/common';

type ModuleProvidersMap = {
  [key: string]: Provider<unknown>[];
};

export const AutoRegisteredProviders: ModuleProvidersMap = {};

export function registeredProvidersForModule(
  moduleName: string,
): Provider<unknown>[] {
  const providers = AutoRegisteredProviders[moduleName];

  if (providers === undefined) {
    return [];
  }

  return providers;
}
