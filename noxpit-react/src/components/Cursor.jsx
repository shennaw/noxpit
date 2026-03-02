import { useCursor } from '../hooks/useCursor';

export default function Cursor() {
  const { cursorRef, ringRef } = useCursor();
  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
