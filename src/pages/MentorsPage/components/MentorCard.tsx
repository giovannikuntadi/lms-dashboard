import { ButtonSecondary } from '@/components/ButtonSecondary';
import { Icon } from '@/components/icons';
import type { Mentor } from '@/types/mentor';

interface MentorCardProps {
  mentor: Mentor;
  onClick: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, onClick }: MentorCardProps) {
  return (
    <div className="border-border-default bg-black-default flex flex-col rounded-xl border">
      <div className="h-40 w-135.5"></div>

      <div className="border-border-default flex flex-col gap-5 border-y px-7.5 py-5">
        <div className="relative -top-20">
          <div className="size-30">
            <img src={mentor.avatarUrl} alt="Mentor's avatar logo" className="rounded-full" />
          </div>
        </div>

        <div className="-mt-20 flex flex-col gap-4.5">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1.5">
                <span>
                  {mentor.firstName} {mentor.lastName}
                </span>
                <span>
                  <Icon.AccountVerified />
                </span>
              </div>
              <div className="text-btn-primary min-h-10">{mentor.shortDescription}</div>
            </div>
            <div>
              <img src={mentor.companyLogoUrl} alt="Mentor's company logo" />
            </div>
          </div>
          <div className="min-h-30">
            <p className="text-text-secondary">{mentor.longDescription}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <span>Expertise</span>
          <div className="flex gap-2">
            {mentor.expertises.map(expertise => (
              <span key={expertise} className="bg-border-default rounded-md px-2 py-1">
                {expertise}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex px-7.5 py-5">
        <ButtonSecondary className="flex flex-1 items-center justify-center" onClick={() => onClick(mentor)}>
          <Icon.EyeOpen />
          About Mentor
        </ButtonSecondary>
      </div>
    </div>
  );
}
