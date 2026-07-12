import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, FormControl, SegmentedControl, Stack, TextInput } from '@primer/react'

import type { AuthFeedback, AuthMode } from '../types'
import './AuthForm.css'

const submitLabel = {
  login: 'Entrar',
  register: 'Registrar',
} satisfies Record<AuthMode, string>

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [feedback, setFeedback] = useState<AuthFeedback | null>(null)

  function handleModeChange(index: number) {
    setMode(index === 0 ? 'login' : 'register')
    setFeedback(null)
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
    <div className="auth-form">
      <SegmentedControl aria-label="Modo de autenticacao" fullWidth onChange={handleModeChange}>
        <SegmentedControl.Button selected={mode === 'login'}>Login</SegmentedControl.Button>
        <SegmentedControl.Button selected={mode === 'register'}>Registro</SegmentedControl.Button>
      </SegmentedControl>

      <form className="auth-form__fields" onSubmit={handleSubmit}>
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
          <Button block className="auth-form__submit" type="submit" variant="primary">
            {submitLabel[mode]}
          </Button>

          {mode === 'login' ? (
            <Button
              block
              className="auth-form__guest"
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
        <p className={`auth-form__feedback auth-form__feedback--${feedback.variant}`}>
          {feedback.message}
        </p>
      ) : null}
    </div>
  )
}
