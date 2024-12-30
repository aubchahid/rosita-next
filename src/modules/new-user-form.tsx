import { Button, Input } from "rizzui";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from "sonner";
import { apiClient } from "@/utils/api-client";

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  age: z.string().transform((val) => parseInt(val) || 0),
});

type FormData = z.infer<typeof userSchema>;

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post<{ id: string }>('/users/add', data).then(() => {
        toast.success('User created successfully');
      });
      reset();
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-4 mt-5">
        <div>
          <Input
            {...register('firstName')}
            placeholder="First name"
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
          )}
        </div>

        <div>
          <Input
            {...register('lastName')}
            placeholder="Last name"
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
          )}
        </div>

        <div>
          <Input
            {...register('email')}
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            {...register('age')}
            placeholder="Age"
            type="number"
          />
          {errors.age && (
            <span className="text-red-500 text-sm">{errors.age.message}</span>
          )}
        </div>
      </div>
      
      <Button
        size="lg"
        className="sticky bottom-0 z-10 mt-5 w-full"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Save User'}
      </Button>
    </form>
  );
}