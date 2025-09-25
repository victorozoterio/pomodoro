import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { NewCycleForm } from './components/NewCycleForm';
import { CountdownContainer } from './components/Countdown/styles';

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

// interface NewCycleFormData {
//   task: string;
//   minutesAmount: number;
// }

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalseconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);
        if (secondsDifference >= totalseconds) {
          setCycles(
            // cycles.map((cycle) => { evitar fazer isso
            (state) =>
              state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                  return { ...cycle, finishedDate: new Date() };
                } else {
                  return cycle;
                }
              }),
          );

          setAmountSecondsPassed(totalseconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000); // 1 segundo
    }

    // quando eu executar o useEffect dnv, ele vai limpar o intervalo que foi criado pelo useEffect anterior
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalseconds, activeCycleId, cycles]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      }),
    );
    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalseconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60); // sempre arredonda para baixo
  const secondsAmount = currentSeconds % 60; // pega a quantidade que sobra da divisão

  const minutes = String(minutesAmount).padStart(2, '0'); // preenche a string com '0' até ter 2 caracteres
  const seconds = String(secondsAmount).padStart(2, '0'); // preenche a string com '0' até ter 2 caracteres

  useEffect(() => {
    if (activeCycle) {
      document.title = `Pomodoro - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <CountdownContainer />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type='button'>
            <Play size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
