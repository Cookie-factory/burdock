import React, {useEffect, useState} from 'react';
import {useGetChatroomList} from '~/apis/chatroom/hook';
import Text from '~/components/common/text/Text';
import VStack from '~/components/common/view/VStack';
import WhiteSafeAreaView from '~/components/common/view/WhiteSafeAreaView';
import io from 'socket.io-client';
import Input from '~/components/common/input/Input';
import CenterButton from '~/components/common/button/CenterButton';
import {useGetMessageOnRoom} from '~/apis/message/hook';
import {MessageItem} from '~/types/api/message';
import HStack from '~/components/common/view/HStack';
import dayjs from 'dayjs';
import {useGetAuthInfo} from '~/apis/auth/hook';
import {Platform} from 'react-native';

function Inquiry() {
  const {data: getChatroomListData} = useGetChatroomList({
    type: 'INQUIRY',
  });

  const {data: getAuthInfoData} = useGetAuthInfo();

  const roomId = getChatroomListData?.data[0].id;

  const socket = io(
    Platform.OS === 'android'
      ? 'http://10.0.2.2:9090/chat'
      : 'http://localhost:9090/chat',
  ); // 서버주소가 http 프로토콜임을 유의

  const {refetch} = useGetMessageOnRoom(roomId);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageItem[]>([]);

  const onSendWhenEnter = (_message: string) => {
    if (_message === '') return;

    socket.emit('message', {
      chatRoomId: roomId,
      senderId: getAuthInfoData?.data.id,
      senderNickname: getAuthInfoData?.data.nickname,
      content: _message,
    }); // 클라이언트에서 서버로 이벤트를 발생시킨다

    setMessage('');
  };

  const onSendWhenClickButton = () => {
    if (message === '') return;

    socket.emit('message', {
      chatRoomId: roomId,
      senderId: getAuthInfoData?.data.id,
      senderNickname: getAuthInfoData?.data.nickname,
      content: message,
    }); // 클라이언트에서 서버로 이벤트를 발생시킨다

    setMessage('');
  };

  useEffect(() => {
    if (roomId) {
      refetch().then(({data}) => {
        //
        if (data?.statusCode === 200) {
          console.log('@@@ getMesssageOnRoomData');
          console.log(data.data);
          setMessageList(data?.data ?? []);
        }
      });
    }
  }, [roomId]);

  useEffect(() => {
    socket.emit('join_room', {
      roomId: roomId,
      userId: getAuthInfoData?.data.id,
    });

    // 서버로부터 메시지를 받았을 때
    socket.on('message', ({nickname, sender, content}) => {
      console.log('@@@ mE');
      console.log(content);
      setMessageList(prev => [
        ...prev,
        {
          content,
          sender: {nickname},
          createdAt: dayjs().format(),
        },
      ]);
    });

    // 컴포넌트가 unmount될 때 소켓 연결 닫기
    return () => {
      socket.disconnect();
    };
  }, [messageList, roomId, getAuthInfoData?.data]);

  return (
    <WhiteSafeAreaView>
      <VStack flex={1} px={20}>
        <Text mb={20}>1:1문의</Text>

        <Input
          label="입력"
          value={message}
          marginBottom={16}
          placeholder="메시지 입력"
          onChangeText={setMessage}
          onSubmitEditing={e => onSendWhenEnter(e.nativeEvent.text)}
        />

        <CenterButton onPress={onSendWhenClickButton}>
          <Text>전송</Text>
        </CenterButton>

        <VStack borderWidth={1} py={12}>
          {messageList.map((_message, i) => (
            <VStack borderWidth={1} py={10} key={i}>
              <HStack mb={4} justifyContent="space-between">
                <Text>{_message.sender.nickname}</Text>
                <Text>
                  {dayjs(_message.createdAt).format('YY.MM.DD hh:mm:ss')}
                </Text>
              </HStack>

              <HStack>
                <Text>{_message.content}</Text>
              </HStack>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </WhiteSafeAreaView>
  );
}

export default Inquiry;
