import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export const useLoginForm = () => {

    const store = useStore();
    const router = useRouter();

    const {handleSubmit, isSubmitting, submitCount} = useForm();

    const { value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('This field is required!')
            .email('Incorrect email address!')
    );

    const passwordMinLength = 8;
    const { value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('This field is required!')
            .min(passwordMinLength, `At least ${passwordMinLength} symbols!`)
    );

    const isTooManyAttempts = computed(() => submitCount.value >= 3);

    watch(isTooManyAttempts, (val) => {
        if(val) {
            setTimeout(() => {
                submitCount.value = 0;
            },2000)
        }
    })

    const onSubmit = handleSubmit(async (values) => {

        try {
            await store.dispatch('auth/login', values);
            await router.push('/');
        } catch (e) {
            console.error(e.message);
        }
    });

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    }
}