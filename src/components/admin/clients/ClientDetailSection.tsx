import Section from '@/components/common/Section';
import { Client } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';

interface Props {
  client: Client;
}

const ClientDetailSection = ({ client }: Props) => {
  const items = [
    {
      label: 'ID',
      content: client.id,
    },
    {
      label: 'Name',
      content: formatName(client),
    },
    {
      label: 'Email',
      content: client.email,
    },
    {
      label: 'Phone',
      content: client.phone,
    },
  ];

  return (
    <Section title={formatName(client)}>
      <table className='w-full'>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <td className='p-2 text-sm font-semibold uppercase'>
                {item.label}
              </td>
              <td className='p-2'>{item.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default ClientDetailSection;
