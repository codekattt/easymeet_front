import { useRouter } from 'next/router';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import * as S from './googleAuth.styles';

import { firebaseApp } from '../../../../commons/libraries/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

export default function GoogleLoginButton(): JSX.Element {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (value: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(
      validateEmail(value) ? '' : '올바른 이메일 형식으로 입력해주세요.',
    );
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget.value);
    updateButtonState(email, event.currentTarget.value);
  };

  const updateButtonState = (email: string, password: string): void => {
    setIsButtonDisabled(email.trim() === '' || password.trim() === '');
  };

  const onClickLogin = async (): Promise<void> => {
    if (!validateEmail(email) || password.trim() === '') {
      alert('올바른 이메일 주소와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      alert('로그인 성공!');
      router.push('/'); // 로그인 성공 후 페이지 리다이렉션
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('INVALID_LOGIN_CREDENTIALS')
      ) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const onClickGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // 로그인한 사용자 정보
      alert(`구글 로그인 성공! 환영합니다, ${user.displayName}`);
      router.push('/leader?step=create'); // 로그인 성공 후 페이지 리다이렉션
    } catch (error) {
      console.error(error);
      alert('구글 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <S.Wrapper>
        <h1>로그인</h1>
        <S.Input
          type="text"
          onChange={onChangeEmail}
          placeholder="이메일을 입력하세요. (example@example.com)"
          value={email}
        />
        {emailError && <S.Message>{emailError}</S.Message>}
        <S.Input
          type="password"
          onChange={onChangePassword}
          placeholder="비밀번호를 입력하세요."
        />
        <S.Button onClick={onClickLogin} disabled={isButtonDisabled}>
          이메일로 로그인
        </S.Button>
        <S.GoogleButton onClick={onClickGoogleLogin}>
          구글로 로그인
        </S.GoogleButton>
      </S.Wrapper>
    </>
  );
}
