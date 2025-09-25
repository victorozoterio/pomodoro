import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor='task'>Vou trabalhar em</label>
      <TaskInput
        id='task'
        list='task-suggestions'
        placeholder='Dê um nome para o seu projeto'
        disabled={!!activeCycle} // !! converte o valor para booleano, se tiver algo ele retorna true
        {...register('task')}
      />

      <datalist id='task-suggestions'>
        <option value='Projeto 1' />
        <option value='Projeto 2' />
        <option value='Projeto 3' />
        <option value='Projeto 4' />
        <option value='Projeto 5' />
      </datalist>

      <label htmlFor='minutesAmount'>durante</label>
      <MinutesAmountInput
        type='number'
        id='minutesAmount'
        placeholder='00'
        disabled={!!activeCycle} // !! converte o valor para booleano, se tiver algo ele retorna true
        step={5}
        min={5}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  );
}
