import { usePostDataMutation } from '@/api/api';
import type { ApiResponse } from '@/api/api.error';
import handleErrors from '@/api/api.error';
import { Endpoints } from '@/api/endpoints';
import { showErrorMessage, showSuccessMessage } from '@/utils/toast';
import { useFormik } from 'formik';
import type { ILoginData } from '../interface/ILogin';
import { setCookie } from '@/utils/cookie';
import { COOKIE_CONFIG } from '@/constants/paths';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export type loginFormField = Yup.InferType<typeof LoginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();

  const [login, { isError: isLoginError, isLoading: isLoginLoading, isSuccess: isLoginSuccess }] =
    usePostDataMutation();

  const initialValues: loginFormField = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = (await login({
          url: Endpoints.auth.login,
          data: values,
        })) as ApiResponse;

        if (res?.error?.data?.errors) {
          handleErrors(res, formik.setErrors);
        }

        if (res?.data?.message) showSuccessMessage(res.data.message);
        if (res?.error?.data?.message) showErrorMessage(res.error.data.message);

        if (res?.data) {
          const response = res.data as ILoginData;

          if (response.statusCode === 200) {
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const user_id = response?.data?.user?.id;

            if (!accessToken || !refreshToken) {
              showErrorMessage('Invalid token response');
              return;
            }
            setCookie({
              cookieName: COOKIE_CONFIG.accessToken,
              value: String(accessToken),
              expiresIn: COOKIE_CONFIG.accessTokenExpiryDuration,
              secure: false,
              sameSite: 'Lax',
            });

            // console.log(response);

            setCookie({
              cookieName: COOKIE_CONFIG.refreshToken,
              value: String(refreshToken),
              expiresIn: COOKIE_CONFIG.refreshTokenExpiryDuration,
              secure: false,
              sameSite: 'Lax',
            });

            setCookie({
              cookieName: COOKIE_CONFIG.user_id,
              value: String(user_id),
              expiresIn: COOKIE_CONFIG.accessTokenExpiryDuration,
              secure: false,
              sameSite: 'Lax',
            });
            navigate('/location/country', { replace: true });
          }
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik, isLoginError, isLoginLoading, isLoginSuccess };
};
