import { MOCK_IMAGE_URL } from '../../../shared/data-access/constants/mock-data';
import { CatEntity } from '../models/cat.entity';

export const CAT_PLACEHOLDER: CatEntity = {
  id: 1,
  name: '呆呆貓',
  birth: '1995/12/11',
  avatar: [MOCK_IMAGE_URL],
};
