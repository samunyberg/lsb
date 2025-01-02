import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { AppointmentWithData } from '@/lib/types';
import { cn } from 'clsx-tailwind-merge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AppointmentActionConfirmation, {
  AppointmentAction,
} from './AppointmentActionConfirmation';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentActionSection = ({ appointment }: Props) => {
  const router = useRouter();
  const [action, setAction] = useState<AppointmentAction>(null);
  const [showActionConfirmation, setShowActionConfirmation] = useState(false);

  const isPassedAppointment = () => appointment.dateTime < new Date();

  const getActions = () => {
    if (!isPassedAppointment) return null;

    switch (appointment.status) {
      case 'BOOKED':
        return [
          {
            label: 'Reschedule',
            onClick: () =>
              router.push(`/admin/appointments/${appointment.id}/reschedule`),
          },
          {
            label: 'Cancel',
            onClick: () => {
              setAction(() => 'cancel');
              setShowActionConfirmation(true);
            },
          },
        ];
      case 'AVAILABLE':
        return [
          {
            label: 'Book for client',
            onClick: () =>
              router.push(
                `/admin/appointments/${appointment.id}/book-for-client`
              ),
          },
          {
            label: 'Make unavailable',
            onClick: () => {
              setAction('make-unavailable');
              setShowActionConfirmation(true);
            },
          },
        ];
      case 'UNAVAILABLE':
        return [
          {
            label: 'Make available',
            onClick: () => {
              setAction('make-available');
              setShowActionConfirmation(true);
            },
          },
        ];
      default:
        return null;
    }
  };

  return (
    <>
      <Section title='Actions'>
        <div className='flex flex-col gap-4'>
          {getActions()?.map((action, index) => (
            <Button
              key={index}
              className={cn('border-accent', {
                'border-accentGreen': action.label === 'Make available',
                'border-accentOrange': action.label === 'Make unavailable',
                'border-accentRed': action.label === 'Cancel',
              })}
              onClick={() => action.onClick()}
            >
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </Section>
      <AppointmentActionConfirmation
        isVisible={showActionConfirmation}
        appointmentId={appointment.id}
        action={action}
        onClose={() => setShowActionConfirmation(false)}
      />
    </>
  );
};

export default AppointmentActionSection;
