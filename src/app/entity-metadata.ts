import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

export function activeFilter(entities: { active: boolean }[], search: boolean) {
  return entities.filter((e) => e.active === search);
}

const entityMetadata: EntityMetadataMap = {
  Todo: {
    filterFn: activeFilter,
  },
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
