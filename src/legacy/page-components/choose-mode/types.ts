import { PageProps } from '../../components';
import * as H from 'history';

type OmittedPagePropKeys = 'title';

export interface ChooseModePageProps
  extends Omit<PageProps, OmittedPagePropKeys> {
  router: H.History;
  leavePage: () => void;
}

export type ChooseModePageComponent<
  Super = React.FunctionComponent<ChooseModePageProps>
> = Super & {};
