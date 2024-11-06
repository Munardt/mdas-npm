import { normalize, strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  Source,
  url,
} from "@angular-devkit/schematics";

import { ComponentOptions } from "./component-options";

/**
 * Recebe as opções de criação do componente e cria o componente.
 * @param {ComponentOptions} _options Opções de criação do componente.
 * @returns {Rule} Templates de do componente, com os nomes corretos e salvos no local correto.
 */
export function autoCreateComponent(_options: ComponentOptions): Rule {
  return () => {
    const templates: Source[] = [];

    // Adiciona templates do componente
    const componentSource = apply(url("./schemas/components"), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: _options.name,
      }),
      move(normalize(`/${_options.path}/${strings.dasherize(_options.name)}`)),
    ]);
    templates.push(componentSource);

    // Se "main" for true, adiciona os templates de module e routes
    if (_options.main) {
      const moduleSource = apply(url("./schemas/modules"), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          name: _options.name,
        }),
        move(
          normalize(`/${_options.path}/${strings.dasherize(_options.name)}`)
        ),
      ]);
      templates.push(moduleSource);
    }

    // Se "ns" for true, adiciona os templates de serviço
    if (_options.ns) {
      const serviceSource = apply(url("./schemas/services"), [
        applyTemplates({
          classify: strings.classify,
          dasherize: strings.dasherize,
          name: _options.name,
        }),
        move(
          normalize(
            `src/app/shared/services/${strings.dasherize(_options.name)}`
          )
        ),
      ]);
      templates.push(serviceSource);
    }

    // return chain([mergeWith(mergeTemplates(templates))]);
    return chain(templates.map((template) => mergeWith(template)));
  };
}
