import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import { useLogin } from '@/query/hooks/auth/useAuth'
import { loginSchema } from '@/validation/auth/auth.validator'
import { allowOnly } from '@/utils/allowOnly'
import { toast, Toaster } from 'sonner'
import { useAuth } from '@/context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { mutate: loginMutation, isPending } = useLogin()

  const formik = useFormik({
    initialValues: {
      mobile: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting, setStatus, setErrors }) => {
      setStatus(null)
      loginMutation(values, {
        onSuccess: () => {
          toast.success('Login Successful', { position: 'top-center' });
        },

        onError: (err) => {
          const response = err?.response?.data
          // Field-level errors from backend
          if (response?.errors) {
            setErrors(response.errors)
            return
          }

          // Form-level error
          setStatus(response?.message || 'Invalid mobile or password')
        },

        onSettled: () => {
          setSubmitting(false)
        },
      })
    },
  })

  /* ========================= */

  const {
    values,
    errors,
    touched,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto px-4 py-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Log In</h1>
        </div>

        {/* Login Form */}
        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Mobile */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="mobile"
                  type="text"
                  placeholder="+91 1234 567 8901"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                  onKeyDown={allowOnly.number}
                  maxLength={10}
                />
              </div>
              {touched.mobile && errors.mobile && (
                <p className="text-sm text-red-500">{errors.mobile}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                  maxLength={12}
                />
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Form-level API Error */}
            {status && (
              <p className="text-sm text-red-600 text-center">
                {status}
              </p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/auth/forgot-password')}
                className="text-sm text-primary font-semibold p-0 h-auto"
              >
                Forgot Password?
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-full font-bold text-base"
            >
              {isPending ? 'Logging in...' : 'Log In'}
            </Button>

          </form>
        </Card>

        {/* Sign Up */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Button
              variant="link"
              onClick={() => navigate('/auth/register')}
              className="text-primary font-semibold p-0 h-auto"
            >
              Sign Up
            </Button>
          </p>
        </div>

      </div>
      <Toaster/>
    </div>
  )
}

export default Login
