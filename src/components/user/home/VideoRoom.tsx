import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';

function VideoRoom() {
    const { roomId } = useParams<{ roomId: string }>();
    const username = useSelector((store: RootState) => store.UserData.Username);
    const meetingContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const myMeeting = async () => {
            if (meetingContainerRef.current) {
                const appID = 2140659659;
                const serverSecret = 'd6d183d7cc9e5484c1d5cf4962a099b0';
                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID,
                    serverSecret,
                    roomId || '',
                    Date.now().toString(),
                    username || ''
                );
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zp.joinRoom({
                    container: meetingContainerRef.current,
                    scenario: {
                        mode: ZegoUIKitPrebuilt.VideoConference,
                    },
                });
            }
        };

        myMeeting();
    }, [roomId, username]);

    return (
        <div>
            <div ref={meetingContainerRef} style={{ width: '100%', height: '100vh' }} />
        </div>
    );
}

export default VideoRoom;
