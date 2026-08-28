import { ButtonSecondary } from '@/components/ButtonSecondary';
import { Icon } from '@/components/icons';

export function MentorSkeleton() {
  return (
    <div className="border-border-default bg-black-default flex flex-col rounded-xl border">
      <div className="h-40 w-135.5"></div>

      <div className="border-border-default flex flex-col gap-5 border-y px-7.5 py-5">
        <div className="relative -top-20">
          <div className="bg-text-secondary size-30 animate-pulse rounded-full"></div>
        </div>

        <div className="-mt-20 flex flex-col gap-4.5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="bg-text-secondary h-6 w-20 animate-pulse"></div>
              <div className="bg-text-secondary h-6 w-45 animate-pulse"></div>
            </div>
            <div className="bg-text-secondary size-12.5 animate-pulse"></div>
          </div>
          <div className="bg-text-secondary min-h-30 animate-pulse"></div>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="bg-text-secondary h-5 w-15 animate-pulse"></span>
          <div className="flex gap-2">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index} className="bg-text-secondary h-6 w-20 animate-pulse"></span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex px-7.5 py-5">
        <ButtonSecondary className="flex flex-1 items-center justify-center">
          <Icon.EyeOpen />
          About Mentor
        </ButtonSecondary>
      </div>
    </div>
  );
}
