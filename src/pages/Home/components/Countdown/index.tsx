import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  return (
    <CountdownContainer>
      <span>CountdownContainer</span>
      <span>00</span>
      <Separator>:</Separator>
      <span>00</span>
      <span>00</span>
    </CountdownContainer>
  );
}
