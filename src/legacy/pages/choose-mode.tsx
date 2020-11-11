import React from 'react';
import { convertPage, PageType } from '../utilities/client-side';
import { useHistory as useRouter } from 'react-router-dom';
import {
  ChooseModePageComponent,
  ChooseModeForGame,
  ChooseModeForTutorial,
  ChooseModeForPuzzle,
} from '../page-components/choose-mode';

const ChooseModePageFromType: Record<string, ChooseModePageComponent> = {
  game: ChooseModeForGame,
  tutorial: ChooseModeForTutorial,
  puzzle: ChooseModeForPuzzle,
};

export interface Props {
  type?: string;
  redirect?: string;
}

const ChooseMode: PageType<Props> = ({ type = 'game', redirect = '/legacy' }) => {
  const router = useRouter();
  const leavePage = () => router.replace(redirect);
  const ChooseModePage = ChooseModePageFromType[type] || ChooseModeForGame;
  return <ChooseModePage router={router} leavePage={leavePage} />;
};

ChooseMode.getInitialProps = async ({
  query: { for: type, then: redirect },
}) => {
  return {
    type: type as string | undefined,
    redirect: redirect as string | undefined,
  };
};

export default convertPage(ChooseMode);
