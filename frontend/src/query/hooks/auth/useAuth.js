import authServices from "@/services/auth.services"
import { setToken } from "@/utils/tokenManager";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
    // Implementation of the useLogin hook
    return useMutation({
        mutationFn: authServices.login,
        onSuccess: (data) => {
            if (data?.data?.data?.token) {
                setToken('session_token', data?.data?.data?.token)
            }
        },
    });
}


const useRegister = () => {
    return useMutation({
        mutationFn: authServices.register,
    })
}

export { useLogin, useRegister }