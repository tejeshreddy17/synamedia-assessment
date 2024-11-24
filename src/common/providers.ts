import { AutoRegisteredProviders } from "./auto-registered-providers";

export const AutoRegisterProvider = (moduleName: string): ClassDecorator => {
  return (target: any) => {
    const providers = AutoRegisteredProviders[moduleName];
    if (providers === undefined) {
      AutoRegisteredProviders[moduleName] = [target];
    } else {
      providers.push(target);
    }
  };
};
