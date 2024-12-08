import {HttpClient} from "@angular/common/http";
import {IModuleTranslationOptions, ModuleTranslateLoader} from "@larscom/ngx-translate-module-loader";
import {importProvidersFrom} from "@angular/core";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

export function ModuleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = 'assets/i18n';

  const options: IModuleTranslationOptions = {
    version: Date.now(),
    translateError: (error, path) => {
      console.log('Oops! an error occurred: ', {error, path});
    },
    modules: [
      // final url: ./assets/i18n/feature1/en.json
      {baseTranslateUrl},
      // {baseTranslateUrl, moduleName: 'feature1'},
    ],
    lowercaseNamespace: true,
  };
  return new ModuleTranslateLoader(http, options);
}

export const translateProviders = [
  importProvidersFrom(
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: ModuleHttpLoaderFactory,
      deps: [HttpClient],
    },
  })
),]
