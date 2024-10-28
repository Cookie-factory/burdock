import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CommunityList from '~/pages/community/list';
import CommunityContent from '~/pages/community/content';
import CommunityRegister from '~/pages/community/register';
import Login from '~/pages/login';
import {RouteList} from '~/types/navigator';
import Header from '~/components/common/header/Header';
import BackButton from '~/components/common/button/BackButton';
import TabRouter from './TabRouter';
import Inquiry from '~/pages/mypage/inquiry';
import Setting from '~/pages/mypage/setting';
import NoticeList from '~/pages/mypage/notice/list';
import NoticeContent from '~/pages/mypage/notice/content';
import EventList from '~/pages/mypage/event/list';
import EventContent from '~/pages/mypage/event/content';

const stack = createNativeStackNavigator<RouteList>();

function BaseRouter() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            header: () => <Header title="로그인" />,
          }}
        />

        <stack.Screen
          name="tab"
          component={TabRouter}
          options={{
            headerShown: false,
          }}
        />

        <stack.Screen
          name="CommunityList"
          component={CommunityList}
          options={{
            headerShown: true,
            header: () => (
              <Header title="커뮤니티" leftButton={<BackButton />} />
            ),
          }}
        />
        <stack.Screen
          name="CommunityRegister"
          component={CommunityRegister}
          options={{
            headerShown: true,
            header: () => (
              <Header title="게시글 등록" leftButton={<BackButton />} />
            ),
          }}
        />
        <stack.Screen
          name="CommunityContent"
          component={CommunityContent}
          options={{
            headerShown: true,
            header: () => (
              <Header title="게시글 내용" leftButton={<BackButton />} />
            ),
          }}
        />
        <stack.Screen
          name="Inquiry"
          component={Inquiry}
          options={{
            headerShown: true,
            header: () => <Header title="1:1 문의" />,
          }}
        />

        <stack.Screen
          name="Setting"
          component={Setting}
          options={{
            headerShown: true,
            header: () => <Header title="설정" />,
          }}
        />

        <stack.Screen
          name="NoticeList"
          component={NoticeList}
          options={{
            headerShown: true,
            header: () => (
              <Header title="공지사항" leftButton={<BackButton />} />
            ),
          }}
        />

        <stack.Screen
          name="NoticeContent"
          component={NoticeContent}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="EventList"
          component={EventList}
          options={{
            headerShown: true,
            header: () => <Header title="이벤트" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="EventContent"
          component={EventContent}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseRouter;
