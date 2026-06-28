import { useEffect, useRef } from "react";
import { createGame } from "../game/createGame";
import { detectDeviceLanguage, setLanguage } from "../localization/i18n";
import type Phaser from "phaser";

export default function App() {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameContainerRef.current || gameRef.current) {
      return;
    }

    setLanguage(detectDeviceLanguage());
    gameRef.current = createGame(gameContainerRef.current);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <main className="app-shell">
      <div className="home-screen">
        <section className="game-stage" ref={gameContainerRef} />
      </div>
    </main>
  );
}
