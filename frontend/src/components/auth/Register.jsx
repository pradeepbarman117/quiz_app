import { data, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { ArrowLeft, User, Lock, Phone } from 'lucide-react'
import { registrationSchema } from '@/validation/auth/auth.validator'
import { useRegister } from '@/query/hooks/auth/useAuth'
import { allowOnly } from '@/utils/allowOnly'
import { toast, Toaster } from 'sonner'

const Register = () => {
  const navigate = useNavigate()
  const { mutate: register } = useRegister()

  const formik = useFormik({
    initialValues: {
      username: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      full_name: ''
    },
    validationSchema: registrationSchema,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus(null)
      const { confirmPassword, ...payload } = values

      register(payload, {
        onSuccess: () => {
          toast.success('Account created successfully');
          setTimeout(() => {
            navigate('/auth/login')
          }, 2500)
        },
        onError: (err) => {
          setStatus(err?.response?.data?.message || 'Registration failed');
          toast.error(err?.response?.data?.message)
        },
        onSettled: () => setSubmitting(false),
      })
    },
  })

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
            onClick={() => navigate('/auth/login')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>

        {/* Register Form */}
        <Card className="p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  name="username"
                  type="text"
                  placeholder={'eg. user@123'}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
              {touched.username && errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="eg. Pradeep Barman"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                  onKeyDown={allowOnly.char}
                  maxLength="50"
                />
              </div>
              {touched.full_name && errors.full_name && (
                <p className="text-sm text-red-500">{errors.full_name}</p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="mobile"
                  name="mobile"
                  type="text"
                  maxLength={10}
                  placeholder="+91 1234567890"
                  inputMode="numeric"
                  value={values.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                  onKeyDown={allowOnly.number}
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
                />
              </div>
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Form-level error */}
            {status && (
              <p className="text-sm text-red-600 text-center">{status}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full font-bold text-base"
            >
              Create Account
            </Button>

          </form>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <Button
              variant="link"
              onClick={() => navigate('/auth/login')}
              className="text-primary font-semibold p-0 h-auto"
            >
              Log In
            </Button>
          </p>
        </div>

      </div>
      <Toaster position='top-center' />
    </div>
  )
}

export default Register
