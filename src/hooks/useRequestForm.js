import {useField, useForm} from "vee-validate";
import * as yup from "yup";

export const useRequestForm = (fn) => {
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            status: 'active',
        }
    });

    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField(
        'fio',
        yup.string()
            .trim()
            .required('Поле обязательно!')
    );
    const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField(
        'phone',
        yup.string()
            .trim()
            .required('Поле обязательно!')
    );
    const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
        'amount',
        yup.number()
            .required('Поле обязательно!')
            .min(0, 'Сумма не может быть меньше 0')
    );
    const {value: status} = useField('status');

    const onSubmit = handleSubmit(fn);

    return {
        status,
        isSubmitting,
        onSubmit,
        fio,
        fError,
        fBlur,
        phone,
        pError,
        pBlur,
        amount,
        aError,
        aBlur
    }

}