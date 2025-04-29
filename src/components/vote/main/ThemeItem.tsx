import React from 'react';
import CustomText from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import VoteItem from './VoteItem';
import ActiveButton from '~/components/common/button/ActiveButton';
import {colors} from '~/constants/style';
import {Ranking3PerThemesItem} from '~/types/api/vote';
import {getRemainTimeFromNow} from '~/utils/time';

interface Props {
  data: Ranking3PerThemesItem;
  onVoteModalOpen: (id: string, voteSubjectId: string) => void;
  onMoveRankingPage: () => void;
}

/**
 *@description 테마투표 항목
 */
function ThemeItem({data, onVoteModalOpen, onMoveRankingPage}: Props) {
  return (
    <VStack
      pb={20}
      borderRadius={12}
      bgColor={colors.gray[0]}
      borderWidth={1}
      borderColor={colors.gray[30]}
      mb={12}>
      <VStack
        mb={24}
        alignItems="flex-start"
        borderTopLeftRadius={12}
        borderTopRightRadius={12}
        backgroundColor={'#1A1533'}
        px={20}
        py={18}>
        <CustomText mb={16} fontSize={11} color={colors.gray[0]}>
          {getRemainTimeFromNow(data.endAt)}
        </CustomText>

        <CustomText mb={6} fontSize={16} color={colors.gray[0]}>
          {data?.title ?? ''}
        </CustomText>

        <CustomText mb={22} color={colors.gray[10]}>
          {data.description ?? ''}
        </CustomText>
      </VStack>

      <VStack mb={26} px={20}>
        {data.topCandidates.map((item, index) => (
          <React.Fragment key={item.id}>
            <VoteItem
              onVoteModalOpen={(_id: string) => onVoteModalOpen(_id, data.id)}
              data={{
                id: item.id,
                totalVotes: item.totalVotes,
                name: item.character.name,
                sourceName: item.character.characterSource.name,
                rank: index + 1,
                profile: item.character.profile,
                voteSubjectId: data.id,
              }}
            />
          </React.Fragment>
        ))}
      </VStack>

      <VStack px={20}>
        <ActiveButton
          onPress={onMoveRankingPage}
          text={'투표 하러가기'}
          buttonType={'blue'}
        />
      </VStack>
    </VStack>
  );
}

export default ThemeItem;
