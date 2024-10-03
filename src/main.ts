import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// initialize .NET (async)
(async () => {
  // first build .NET with `dotnet publish dotnet/Wasm.csproj`
  const { dotnet } = await import(`../dotnet/bin/Release/net8.0/browser-wasm/AppBundle/_framework/dotnet.js` as string) as typeof import('./dotnet');

  const { getAssemblyExports, getConfig } = await dotnet
    .withResourceLoader((type, name, defaultUri) => {
      return 'dotnet/' + name;
    })
    .create();

  const config = getConfig();
  window.dotnet = await getAssemblyExports(config.mainAssemblyName!);
})();

declare global {
  interface Window {
      dotnet: any;
  }
}

// bootstarp Angular (default unchanged code)
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
