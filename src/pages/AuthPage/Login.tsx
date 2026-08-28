import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/icons';

import bannerSignIn from '@/assets/images/banner-sign-in.svg';

import { loginSchema, type LoginInput } from '@/schemas/loginSchema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuthErrorMessage } from '@/lib/firebase/firebaseErrors';
import { auth } from '@/lib/firebase/firebase';

export function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginInput) => signInWithEmailAndPassword(auth, email, password),
    onError: error => {
      const message = getFirebaseAuthErrorMessage(error);
      setError('root', { message });
    },
  });

  const onSubmit = useCallback(
    (data: LoginInput) => {
      loginMutation.mutate(data);
    },
    [loginMutation],
  );

  const handleClickShowOrHidePassword = useCallback(() => {
    setIsShowPassword(prev => !prev);
  }, []);

  return (
    <div className="grid grid-cols-2 max-lg:flex">
      <div className="mx-auto mt-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-border-default flex flex-col items-center justify-center rounded-xl border p-6"
        >
          <h2 className="pb-4 text-2xl font-semibold">Sign In</h2>
          {errors.root && <span className="rounded-md bg-red-300 px-5 py-2 text-red-500">{errors.root?.message}</span>}
          <div className="flex w-87.5 flex-col gap-5">
            <div className="flex flex-col gap-2.5 pt-5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                className="border-border-default rounded-md border px-3.25 py-2.25 text-[13px] leading-0 font-medium outline-0"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors && <span className="text-sm text-red-500">{errors.email?.message}</span>}
            </div>
            <div className="flex flex-col gap-2.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="border-border-default flex items-center rounded-md border">
                <input
                  type={!isShowPassword ? 'password' : 'text'}
                  className="flex-1 px-3.25 py-2.25 text-[13px] leading-0 font-medium outline-0"
                  placeholder="Enter your password"
                  {...register('password')}
                />
                <span className="cursor-pointer" onClick={handleClickShowOrHidePassword}>
                  {isShowPassword ? <Icon.EyeOpen /> : <Icon.EyeClosed />}
                </span>
              </div>
              {errors && <span className="text-sm text-red-500">{errors.password?.message}</span>}
            </div>
            <div className="pb-2.5">
              <button
                type="submit"
                className="bg-btn-primary w-87.5 flex-1 cursor-pointer rounded-md px-10 py-[7.5px] text-center text-[13px] font-medium hover:bg-blue-700"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="pt-6 max-lg:hidden">
        <div className="border-border-default flex max-h-185.75 flex-col rounded-xl border">
          <div className="flex flex-col gap-4 p-16">
            <div>
              <Icon.KodingupSignInLogo />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-semibold">Secure Access Portal</h1>
              <p className="w-90 text-[16px] leading-normal font-medium">
                Continue your learning journey and master the skills that matter.
              </p>
            </div>
          </div>
          <img src={bannerSignIn} alt="banner sign in" className="h-100 object-cover" />
        </div>
      </div>
    </div>
  );
}
