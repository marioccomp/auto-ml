import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, FormControl, SegmentedControl, Stack, TextInput } from '@primer/react'

import { navigateTo, routes } from '../../../app/routes'
import type { AuthFeedback, AuthMode } from '../types'

const submitLabel = {
  login: 'Entrar',
  register: 'Registrar',
} satisfies Record<AuthMode, string>

const routeByMode = {
  login: routes.login,
  register: routes.register,
} satisfies Record<AuthMode, string>

const formShellClassName =
  "grid w-full gap-[var(--space-5)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[clamp(var(--space-5),5vw,var(--space-7))] text-[var(--color-text)] shadow-[var(--shadow-lg)] [--button-invisible-bgColor-active:var(--color-surface-subtle)] [--button-invisible-bgColor-hover:var(--color-surface-muted)] [--button-primary-bgColor-active:var(--color-action-active)] [--button-primary-bgColor-hover:var(--color-action-hover)] [--button-primary-bgColor-rest:var(--color-action)] [--button-primary-borderColor-hover:var(--color-action-border)] [--button-primary-borderColor-rest:var(--color-action-border)] [--button-primary-fgColor-rest:var(--color-action-text)] [&_input]:!bg-[var(--color-field-bg)] [&_input]:!text-[var(--color-field-text)] [&_input]:!shadow-none [&_input::placeholder]:!text-[var(--color-text-muted)] [&_label]:!text-[var(--color-text)] [&_[class*='Label']]:!text-[var(--color-text)] [&_[class*='TextInput']]:!border-[var(--color-border)] [&_[class*='TextInput']]:!bg-[var(--color-field-bg)] [&_[class*='TextInput']]:!text-[var(--color-field-text)] [&>:first-child]:!border-[var(--color-border)] [&>:first-child]:!bg-[var(--color-segment-bg)] [&>:first-child_button]:!text-[var(--color-segment-text)] [&>:first-child_span]:!text-[var(--color-segment-text)] [&>:first-child_button[aria-checked='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-current='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-pressed='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[aria-selected='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[data-selected='true']]:!bg-[var(--color-segment-active-bg)] [&>:first-child_button[data-selected]]:!bg-[var(--color-segment-active-bg)]"

type AuthFormProps = {
  mode: AuthMode
}

export function AuthForm({ mode }: AuthFormProps) {
  const [feedback, setFeedback] = useState<AuthFeedback | null>(null)

  function handleModeChange(index: number) {
    const nextMode: AuthMode = index === 0 ? 'login' : 'register'

    if (nextMode === mode) {
      return
    }

    setFeedback(null)
    navigateTo(routeByMode[nextMode])
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setFeedback({
      variant: 'success',
      message: mode === 'login' ? 'Login pronto.' : 'Registro pronto.',
    })
  }

  function handleGuestAccess() {
    setFeedback({
      variant: 'guest',
      message: 'Modo visitante ativo.',
    })
  }

  return (
    <div className={formShellClassName}>
      <SegmentedControl aria-label="Modo de autenticacao" fullWidth onChange={handleModeChange}>
        <SegmentedControl.Button selected={mode === 'login'}>Login</SegmentedControl.Button>
        <SegmentedControl.Button selected={mode === 'register'}>Registro</SegmentedControl.Button>
      </SegmentedControl>

      <form className="grid gap-[var(--space-4)]" onSubmit={handleSubmit}>
        {mode === 'register' ? (
          <FormControl required>
            <FormControl.Label>Username</FormControl.Label>
            <TextInput autoComplete="username" block name="username" size="large" type="text" />
          </FormControl>
        ) : null}

        <FormControl required>
          <FormControl.Label>{mode === 'login' ? 'Username ou email' : 'Email'}</FormControl.Label>
          <TextInput
            autoComplete={mode === 'login' ? 'username' : 'email'}
            block
            name={mode === 'login' ? 'login' : 'email'}
            size="large"
            type={mode === 'login' ? 'text' : 'email'}
          />
        </FormControl>

        <FormControl required>
          <FormControl.Label>Senha</FormControl.Label>
          <TextInput
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            block
            name="password"
            size="large"
            type="password"
          />
        </FormControl>

        <Stack gap="condensed">
          <Button block className="justify-center" type="submit" variant="primary">
            {submitLabel[mode]}
          </Button>

          {mode === 'login' ? (
            <Button
              block
              className="justify-center !text-[var(--color-text)]"
              type="button"
              variant="invisible"
              onClick={handleGuestAccess}
            >
              Continuar como visitante
            </Button>
          ) : null}
        </Stack>
      </form>

      {feedback ? (
        <p
          className={
            feedback.variant === 'success'
              ? 'm-0 rounded-[var(--radius-md)] border border-[var(--color-success-border)] bg-[var(--color-success-muted)] px-[var(--space-4)] py-[var(--space-3)] text-sm leading-[1.45] text-[var(--color-success-text)]'
              : 'm-0 rounded-[var(--radius-md)] border border-[var(--color-accent-border)] bg-[var(--color-accent-muted)] px-[var(--space-4)] py-[var(--space-3)] text-sm leading-[1.45] text-[var(--color-accent-text)]'
          }
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  )
}
