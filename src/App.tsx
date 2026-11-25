import React, { useState } from 'react';
import { DesktopFrame } from './components/DesktopFrame';
import { ScrollProgress } from './components/ScrollProgress';
import { AudioToggle } from './components/AudioToggle';
import { Scene0Preloader } from './components/scenes/Scene0Preloader';
import { Scene1Opening } from './components/scenes/Scene1Opening';
import { Scene2Invocation } from './components/scenes/Scene2Invocation';
import { Scene3InvitationText } from './components/scenes/Scene3InvitationText';
import { Scene4TheCouple } from './components/scenes/Scene4TheCouple';
import { Scene5WeddingDay } from './components/scenes/Scene5WeddingDay';
import { Scene6LightDiya } from './components/scenes/Scene6LightDiya';
import { Scene7FooterActions } from './components/scenes/Scene7FooterActions';
import { useAudio } from './hooks/useAudio';
import { inviteConfig } from './config/invite';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const audio = useAudio(inviteConfig.audio.src);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    audio.initAndPlay();
  };

  return (
    <>
      {/* Top Fixed Gold Scroll Progress Hairline */}
      <ScrollProgress />

      {/* Floating Audio Toggle (Silently hidden if audio file is missing) */}
      <AudioToggle audio={audio} />

      {/* Scene 0: Preloader Seal (Unlocks invitation on tap) */}
      <Scene0Preloader isOpen={isOpened} onOpen={handleOpenInvitation} />

      {/* Scene 1: Curtain Parting Reveal */}
      <Scene1Opening isOpen={isOpened} />

      {/* Desktop Centered Frame & Story Scenes */}
      <DesktopFrame>
        {/* Scene 2: Sacred Invocation (Midnight Indigo) */}
        <Scene2Invocation />

        {/* Scene 3: The Invitation Text & Family Hosts (Ivory) */}
        <Scene3InvitationText />

        {/* Scene 4: The Couple Hero Moment (Ivory) */}
        <Scene4TheCouple />

        {/* Scene 5: The Wedding Day & Venue (Ivory) */}
        <Scene5WeddingDay />

        {/* Scene 6: Light a Diya Interactive Finale (Midnight Indigo) */}
        <Scene6LightDiya />

        {/* Scene 7: Footer Actions & RSVP (Ivory) */}
        <Scene7FooterActions />
      </DesktopFrame>
    </>
  );
};

export default App;
