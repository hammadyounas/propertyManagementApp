import React, { useEffect, useState } from 'react'
import { getRequest } from '../../../../libs/utils/request_handler'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function useClientDetails() {
    const [clientData, setClientData] = useState();
    const router = useRouter();
    const clientId = router.query.id;
    // const {push} = useRouter();

    const fetchClientData = async () => {
        try {
            const response = await getRequest(`clients/${clientId}`);
            if (response) {
                setClientData(response.data);
                console.log(response.data)
            }
        } catch (error) {
            toast.error("Failed to fetch client data.");
        }
    }

    useEffect(() => {
        fetchClientData()
    }, [])

    const handleEdit = () => {
        router.push(`/clients/edit/${clientId}`);
    }

  return (
   { clientData, handleEdit }
  )
}
