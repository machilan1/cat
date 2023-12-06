import { CatEntity } from '@cat/shared';
import { AdoptionEntity } from './adoption-entity';

export interface CatWithAdoption extends CatEntity {
  adoption: AdoptionEntity;
}
