import React, { useState, useEffect } from 'react';
import { useLayoutEffect, useRef } from 'react';
import './index.css';
import './App.css';

import { useSettings } from './modules/hooks/useSettings.js';
import { useCelebration } from './modules/hooks/useCelebration.js';
import { useBackground } from './modules/hooks/useBackground.js';
import { useTasks } from './modules/utils/tasks.js';
import useRainbowMode from "./modules/hooks/useRainbowMode";
import useNotification from './modules/hooks/useNotification.js';
import useKonamiCode from './modules/hooks/useKonamiCode.js';

import {
  IconButton,
  StarfieldBackground,
  GradientBackground,
  GradientSwitcher,
  Settings,
  TaskList,
  TaskForm,
  AppContainer,
  RainbowBackground,
  NotificationBubble,
  RandomEventsMenu,
} from './components/ui';

import {
  EmojiDisintegrateView,
  GojoLevitateView,
  NyanCatView,
  AnthonySmileView,
  BSODView,
  FruitNinja,
  PatrolCat,
  RainCloudFollower,
  WhackAMole,
  CookieClickerPopup,
  MbappeCringeView
} from './components/features';

export default function App() {
  
  const [showSettings, setShowSettings] = useState(false);
  const [rainbowMode, setRainbowMode] = useRainbowMode();
  const { message, visible, notify } = useNotification();
  const unlocked = useKonamiCode(() => notify("Secret Unlocked!"));

  const [showRandomEvents, setShowRandomEvents] = useState(false);

  const settings = useSettings();
  const {
    enableBlyaaat, setEnableBlyaaat,
    enableGetOut,  setEnableGetOut,
    soundVolume,   setSoundVolume,
    enableDeleteEmoji, setEnableDeleteEmoji,
    enableNyan, setEnableNyan,
    enableGojo,  setEnableGojo,
    enableAnthonySmile, setEnableAnthonySmile,
  } = settings;

  const { showCelebration, currentCelebration, triggerCelebration, setShowCelebration } =
    useCelebration(settings);
  
  const { bgGradient, bgGradientName, showGradientPicker, setBgGradient, setBgGradientName, setShowGradientPicker } =
    useBackground();

  const { tasks, newTitle, setNewTitle, addTask, toggleTask, deleteTask } =
    useTasks(triggerCelebration, settings);

  const panelRef = useRef(null);
  const [panelBounds, setPanelBounds] = useState({ right: 0, bottom: 0 });

  // when incremented, fires a new fruit burst
  const [fruitTrigger, setFruitTrigger] = useState(0);

  const [cloudTrigger, setCloudTrigger] = useState(0);

  const [cookieTrigger, setCookieTrigger] = useState(0);

  const [moleTrigger, setMoleTrigger] = useState(0);

  const [showMbappe, setShowMbappe] = useState(false);

  // Has BSOD already been shown this session?
  const [bsodShown, setBsodShown] = useState(false)

  const [showBSOD, setShowBSOD] = useState(false);

  function handleAddTask() {
    addTask();
    // Show BSOD on the first addTask() call each page load
    if (!bsodShown) {
      setShowBSOD(true);
      setBsodShown(true);
    }
  }

  // Handle rainbow mode toggle
  function handleRainbowToggle() {
    setRainbowMode(!rainbowMode);
    notify(`Rainbow Mode: ${!rainbowMode ? "ON" : "OFF"}`);
  }

  function previewFruit()    { setFruitTrigger(t => t + 1); }
  function previewCloud()    { setCloudTrigger(c => c + 1);}
  function previewCookie()   { setCookieTrigger(c => c + 1); }
  function previewWhack()    { setMoleTrigger(m => m + 1); }
  
  // measure panel on mount, resize, and tasks change
  useLayoutEffect(() => {
    function updateBounds() {
      if (panelRef.current) {
        const { right, bottom } = panelRef.current.getBoundingClientRect();
        setPanelBounds({ right, bottom });
      }
    }
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, [tasks]); // re-run when tasks (and thus panel height) change

  // Random FruitNinja auto‐trigger every 25–40 seconds
  useEffect(() => {
    let timerId;

    function scheduleNext() {
      // pick a random delay between 20s and 25s
      const delay = Math.random() * (25000 - 20000) + 20000;
      timerId = setTimeout(() => {
        setFruitTrigger((t) => t + 1);  // fire the burst
        scheduleNext();                // schedule again
      }, delay);
    }

    scheduleNext();                     // kick it off on mount
    return () => clearTimeout(timerId);// clean up on unmount
  }, []); // run once

  // Render
  return (
    <>

      {showBSOD && (
        <BSODView
          duration={7000}             // show for 7 seconds
          onDone={() => setShowBSOD(false)}
        />
      )}

      {/* Only one background at a time */}
      {rainbowMode
        ? <RainbowBackground />
        : <GradientBackground colors={bgGradient} />
      }
      
      <StarfieldBackground />

      {/* Gradient picker */}
      <IconButton
        icon="🪣"
        onClick={() => setShowGradientPicker(true)}
        style={{ position: 'fixed', top: 35, right: 95, zIndex: 10 }}
      />
      {showGradientPicker && (
        <GradientSwitcher
          current={bgGradient}
          onChange={(colors, name) => {
            setBgGradient(colors);
            setBgGradientName(name);
            setShowGradientPicker(false);
          }}
          onClose={() => setShowGradientPicker(false)}
        />
      )}

      {/* Settings */}
      <IconButton
        icon="⚙️"
        onClick={() => setShowSettings(true)}
        style={{ position: 'fixed', top: 36, right: 50, zIndex: 10 }}
      />
      {showSettings && (
        <Settings
          enableBlyaaat={enableBlyaaat}
          setEnableBlyaaat={setEnableBlyaaat}
          enableGetOut={enableGetOut}
          setEnableGetOut={setEnableGetOut}
          soundVolume={soundVolume}
          setSoundVolume={setSoundVolume}
          enableDeleteEmoji={enableDeleteEmoji}
          setEnableDeleteEmoji={setEnableDeleteEmoji}
          enableNyan={enableNyan}
          setEnableNyan={setEnableNyan}
          enableGojo={enableGojo}
          setEnableGojo={setEnableGojo}
          enableAnthonySmile={enableAnthonySmile}
          setEnableAnthonySmile={setEnableAnthonySmile}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Bottom‐right toolbar */}
      <div style={{
        position: "fixed",
        top: 37, right: 190,
        display: "flex",
        gap: 20,
        zIndex: 10
      }}>
        {unlocked && (
          <>
            <IconButton icon="❔" onClick={() => setShowRandomEvents(true)} />
            <IconButton icon="👟" onClick={() => setShowMbappe(true)} />
            <IconButton icon="🎮" onClick={previewWhack} />
            <IconButton icon="🌈" active={rainbowMode} onClick={handleRainbowToggle} />
          </>
        )}
      </div>

      <NotificationBubble visible={visible} message={message} />
      
      {/* Random Events Menu */}
      {showRandomEvents && (
        <RandomEventsMenu
          onClose={() => setShowRandomEvents(false)}
          previewFruit={previewFruit}
          previewCloud={previewCloud}
          previewCookie={previewCookie}
        />
      )}

      {/* Celebration overlays */}
      {showCelebration && (() => {
        switch (currentCelebration) {
          case 'emoji':
            return <EmojiDisintegrateView duration={1330} onDone={() => setShowCelebration(false)} />;
          case 'nyan':
            return <NyanCatView soundVolume={soundVolume} onDone={() => setShowCelebration(false)} />;
          case 'gojo':
            return <GojoLevitateView duration={10000} soundVolume={soundVolume} onDone={() => setShowCelebration(false)} />;
          case 'anthonySmile':
            return <AnthonySmileView soundVolume={soundVolume} duration={2000} onDone={() => setShowCelebration(false)} />;
          default:
            return null;
        }
      })()}

      {/* Mbappé cringe video */}
      {showMbappe && (
        <MbappeCringeView onDone={() => setShowMbappe(false)} />
      )}

      <div ref={panelRef}>
        <AppContainer bgGradientName={bgGradientName}>
          
          <h1>Goofy To-Do</h1>
          
            <TaskForm
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              addTask={handleAddTask}
            />

            <TaskList 
              tasks={tasks} 
              toggleTask={toggleTask} 
              deleteTask={deleteTask} 
            />
          
        </AppContainer>
      </div>

      <PatrolCat
        margin={20}
        duration={4000}
        panelBounds={panelBounds}
        floorOffset={128}
      />
      
      <FruitNinja
        panelBounds={panelBounds}
        trigger={fruitTrigger}
        margin={20}
      />

      <RainCloudFollower trigger={cloudTrigger} toolbarOffset={60}/>

      <CookieClickerPopup
        trigger={cookieTrigger}
        panelBounds={panelBounds}
        margin={20}
        topOffset={80}
        duration={5000}
        onDone={() => {}}
      />

      <WhackAMole
        trigger={moleTrigger}
        onDone={() => {}}
        holeCount={6}
        spawnMin={500}
        spawnMax={1200}
      />


    </>
  );

}
