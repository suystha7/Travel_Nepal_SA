import { useState, type FormEvent } from 'react';
import { CircleArrowLeft, Eye, EyeOff, Loader } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePassword } from '../hooks/useChangePassword';
import { FormikProvider } from 'formik';
import { useNavigate } from 'react-router';

export const ChangePasswordAdmin = () => {
  const formik = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative mx-auto w-full">
      <Card>
        <div
          onClick={() => navigate(-1)}
          className="top-3 left-3 absolute hover:bg-gray-200 p-2 rounded-full hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <CircleArrowLeft
            className={`w-6 h-6 text-secondary-500 transition-all duration-200 ${
              isHovered ? 'transform -translate-x-1' : ''
            }`}
          />
        </div>
        <CardHeader className="mt-12">
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    className={
                      formik.touched.oldPassword && formik.errors.oldPassword
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.oldPassword}</p>
                  )}
                </div>
              </div>

              {/* New Password and Confirm Password */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      className={
                        formik.touched.newPassword && formik.errors.newPassword
                          ? 'border-red-500 focus:border-red-500 pr-10'
                          : 'pr-10'
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                      onClick={handleClickShowPassword}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-secondary-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-secondary-500" />
                      )}
                    </Button>
                  </div>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      className={
                        formik.touched.confirmPassword && formik.errors.confirmPassword
                          ? 'border-red-500 focus:border-red-500 pr-10'
                          : 'pr-10'
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                      onClick={handleClickShowConfirmPassword}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4 text-secondary-500" />
                      ) : (
                        <Eye className="w-4 h-4 text-secondary-500" />
                      )}
                    </Button>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => formik.resetForm()}
                  className="hover:bg-red-50 border-red-600 text-red-600"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-primary-200 hover:bg-primary-500"
                  onClick={e => {
                    e.preventDefault();
                    const formEvent = {
                      preventDefault: () => {},
                      currentTarget: e.currentTarget,
                    } as unknown as FormEvent<HTMLFormElement>;
                    formik.handleSubmit(formEvent);
                  }}
                >
                  {formik.isSubmitting ? <Loader className="animate-spin" /> : 'Change Password'}
                </Button>
              </div>
            </form>
          </FormikProvider>
        </CardContent>
      </Card>
    </div>
  );
};
