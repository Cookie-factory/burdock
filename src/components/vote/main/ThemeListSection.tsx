import React, {useState} from 'react';
import VStack from '~/components/common/view/VStack';
import ThemeItem from './ThemeItem';
import VoteModal from './VoteModal';
import {useGetRanking3PerThemes} from '~/apis/vote/hook';
import useNavigate from '~/hooks/navigator/useNavigation';

/**
 *@description 테마 리스트 뷰
 */
function ThemeListSection() {
  const {navigate} = useNavigate();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>();
  const [selectedThemeId, setSelectedThemeId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const {data, refetch} = useGetRanking3PerThemes();

  const onVoteModalOpen = (_id: string, _themeId: string) => {
    setIsOpen(true);
    setSelectedCandidateId(_id);
    setSelectedThemeId(_themeId);
  };

  return (
    <VStack>
      {data?.data.map(item => (
        <React.Fragment key={item.id}>
          <ThemeItem
            data={item}
            onVoteModalOpen={onVoteModalOpen}
            onMoveRankingPage={() =>
              navigate('VoteRankingList', {voteSubjectId: item.id})
            }
          />
        </React.Fragment>
      ))}

      <VoteModal
        voteSubjectId={selectedThemeId}
        type="THEME_VOTE"
        refetch={refetch}
        candidateId={selectedCandidateId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </VStack>
  );
}

export default ThemeListSection;
