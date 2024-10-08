'use server'

import { signIn, signOut } from '@/auth'
import { AppError } from '@/models/errors'
import { ActionResponse } from '@/models/server-action-response'

type SignInWithCredentialsResult = {
  status: 'success' | 'error'
  message?: string
}

export const signInWithCredentials = async (
  _: SignInWithCredentialsResult | null,
  formData: FormData
): Promise<ActionResponse> => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { status: 'error', message: '이메일과 비밀번호를 입력해주세요' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    })
  } catch {
    return {
      status: 'error',
      message: '올바른 이메일과 비밀번호를 입력해주세요'
    }
  }

  return { status: 'success', message: '로그인 성공' }
}

export const signOutWithForm = async () => {
  await signOut()
}
