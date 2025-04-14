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
import Inquiry from '~/pages/menu/inquiry';
import Setting from '~/pages/menu/setting';
import NoticeList from '~/pages/menu/notice/list';
import NoticeContent from '~/pages/menu/notice/content';
import EventList from '~/pages/menu/event/list';
import EventContent from '~/pages/menu/event/content';
import SearchPage from '~/pages/search';
import Signup from '~/pages/signup';
import PasswordFind from '~/pages/passwordFind';
import MenuMain from '~/pages/menu/main';
import MyPageModification from '~/pages/mypage/myInfoModification';
import FollowPage from '~/pages/mypage/follow';

const stack = createNativeStackNavigator<RouteList>();

function BaseRouter() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
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
            header: () => <Header title="" leftButton={<BackButton />} />,
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
            header: () => (
              <Header title="1:1 문의" leftButton={<BackButton />} />
            ),
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

        <stack.Screen
          name="SearchPage"
          component={SearchPage}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: true,
            header: () => (
              <Header title="회원가입" leftButton={<BackButton />} />
            ),
          }}
        />

        <stack.Screen
          name="PasswordFind"
          component={PasswordFind}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="MenuMain"
          component={MenuMain}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="MyPageModification"
          component={MyPageModification}
          options={{
            headerShown: true,
            header: () => <Header title="" leftButton={<BackButton />} />,
          }}
        />

        <stack.Screen
          name="FollowPage"
          component={FollowPage}
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
