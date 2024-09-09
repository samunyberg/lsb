import useLanguage from '@/hooks/useLanguage';
import { z } from 'zod';

const useLocalisedFormSchema = () => {
  const { getLabel } = useLanguage();

  const validPhone = new RegExp('^\\d{10}$');
  const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

  const registerFormSchema = z
    .object({
      registerEmail: z
        .string()
        .min(1, getLabel('validation.required'))
        .email(getLabel('validation.invalid_email')),
      registerPassword: z
        .string()
        .min(1, getLabel('validation.required'))
        .min(8, getLabel('validation.password_min_length'))
        .max(50, getLabel('validation.password_max_length'))
        .regex(validPassword, getLabel('validation.password_requirements')),
      confirmPassword: z.string(),
      firstName: z
        .string()
        .min(1, getLabel('validation.required'))
        .min(3, getLabel('validation.first_name_too_short'))
        .max(50, getLabel('validation.first_name_too_long')),
      lastName: z
        .string()
        .min(1, getLabel('validation.required'))
        .min(3, getLabel('validation.last_name_too_short'))
        .max(50, getLabel('validation.last_name_too_long')),
      phone: z.string().regex(validPhone, getLabel('validation.invalid_phone')),
    })
    .refine((data) => data.registerPassword === data.confirmPassword, {
      message: getLabel('validation.passwords_do_not_match'),
      path: ['confirmPassword'],
    });

  const editAccountSchema = z.object({
    email: z.string().email(getLabel('validation.invalid_email')),
    firstName: z
      .string()
      .min(1, getLabel('validation.required'))
      .min(3, getLabel('validation.first_name_too_short'))
      .max(50, getLabel('validation.first_name_too_long')),
    lastName: z
      .string()
      .min(1, getLabel('validation.required'))
      .min(3, getLabel('validation.last_name_too_short'))
      .max(50, getLabel('validation.last_name_too_long')),
    phone: z.string().regex(validPhone, getLabel('validation.invalid_phone')),
  });

  const forgottenPasswordFormSchema = z.object({
    email: z.string().email(`${getLabel('validation.invalid_email')}`),
  });

  const resetPasswordFormSchema = z
    .object({
      password: z
        .string()
        .min(8, getLabel('validation.password_min_length'))
        .max(50, getLabel('validation.password_max_length'))
        .regex(validPassword, getLabel('validation.password_requirements')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getLabel('validation.passwords_do_not_match'),
      path: ['confirmPassword'],
    });

  const changePasswordFormSchema = z
    .object({
      oldPassword: z.string(),
      newPassword: z
        .string()
        .min(8, getLabel('validation.password_min_length'))
        .max(50, getLabel('validation.password_max_length'))
        .regex(validPassword, getLabel('validation.password_requirements')),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: getLabel('validation.passwords_do_not_match'),
      path: ['confirmNewPassword'],
    });

  const adminNoteSchema = z.object({
    adminNote: z.string().min(3).max(500),
  });

  const styleSchema = z.object({
    name: z.string().min(3).max(50),
    description_en: z.string().min(3).max(255),
    description_fi: z.string().min(3).max(255),
  });

  const serviceSchema = z.object({
    name_en: z.string().min(3).max(50),
    name_fi: z.string().min(3).max(50),
    description_en: z.string().min(3).max(255),
    description_fi: z.string().min(3).max(255),
    price: z.number().min(1).max(500),
  });

  const adminBookingFormSchema = z.object({
    email: z.string().email(getLabel('validation.invalid_email')),
    firstName: z
      .string()
      .min(1, getLabel('validation.required'))
      .min(3, getLabel('validation.first_name_too_short'))
      .max(50, getLabel('validation.first_name_too_long')),
    lastName: z
      .string()
      .min(1, getLabel('validation.required'))
      .min(3, getLabel('validation.last_name_too_short'))
      .max(50, getLabel('validation.last_name_too_long')),
    phone: z.string().regex(validPhone, getLabel('validation.invalid_phone')),
  });

  return {
    registerFormSchema,
    editAccountSchema,
    forgottenPasswordFormSchema,
    resetPasswordFormSchema,
    changePasswordFormSchema,
    adminNoteSchema,
    styleSchema,
    serviceSchema,
    adminBookingFormSchema,
  };
};

export default useLocalisedFormSchema;
