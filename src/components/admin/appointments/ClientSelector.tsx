'use client';

import CustomInput from '@/components/common/forms/CustomInput';
import { Client } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useMemo, useState } from 'react';

interface Props {
  clients: Client[];
  onSelect: (client: Client) => void;
}

const ClientSelector = ({ clients, onSelect }: Props) => {
  const [email, setEmail] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.email.toLowerCase().includes(email.toLowerCase())
    );
  }, [email, clients]);

  return (
    <div>
      <CustomInput
        id='clientEmail'
        label='Search by email...'
        value={email}
        onChange={handleChange}
      />
      {email && (
        <div className='flex flex-col shadow'>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div
                key={client.id}
                className='flex cursor-pointer flex-col border border-black/10 bg-bgSoft p-3'
                onClick={() => {
                  onSelect(client);
                  setEmail('');
                }}
              >
                <span className='font-semibold'>{formatName(client)}</span>
                <span className='text-sm '>{client.email}</span>
              </div>
            ))
          ) : (
            <div className='border-black/10 bg-bgSoft p-3 '>
              No clients found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSelector;
