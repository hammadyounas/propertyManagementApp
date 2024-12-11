import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { clientStatus, clientTypes, preferredCommunicationChannels } from "../constants/data";
import { getRequest, putRequest } from "../../../../libs/utils/request_handler";
import { getAllUsersByName } from "../../../../libs/api/users";

const useEditForm = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [clientType, setClientType] = useState("");
    const [salesPersonAssigned, setSalespersonAssigned] = useState([]);
    const [communicationChannels, setCommunicationChannels] = useState([]);
    const { push } = useRouter();
    const router = useRouter();
    const clientId = router.query.id;
    const [salesPersons, setSalesPersons] = useState([]);

    const { register, formState: { errors }, handleSubmit, control, getValues, setValue } = useForm();

    const fetchSalesPersons = async () => {
        try {
            const response = await getRequest("users");
            if (response) {
                const salesPersonsData = response.data.map((salesPerson) => ({
                    value: salesPerson._id,
                    label: salesPerson.name,
                }));
                console.log(salesPersonsData);
                setSalesPersons(salesPersonsData);
            }
        } catch (error) {
            toast.error("Failed to fetch sales persons.");
        }
    };
    useEffect(() => {
        if (!clientId) return;
    
        const fetchClientData = async () => {
            try {
                const response = await getRequest(`clients/${clientId}`);
                if (response) {
                    const clientData = response.data;
                    console.log(clientData);
        
                    const clientTypeOption = clientTypes.find(option => option.value === clientData.type);
                    const statusOption = clientStatus.find(option => option.value === clientData.status);
                    const preferredCommunicationChannelsOptions = preferredCommunicationChannels.filter(channel =>
                        clientData.preferredCommunicationChannel.includes(channel.value)
                    );

                    const salesPersonAssignedOptions = await getAllUsersByName(clientData.assignedSalesperson);
        
                    setClientType(clientTypeOption || {});
                    setStatus(statusOption || {});
                    setSalespersonAssigned(salesPersonAssignedOptions || []);  // Ensure proper assignment
                    setCommunicationChannels(preferredCommunicationChannelsOptions || []);
    
                    setValue("name", clientData.name);
                    setValue("email", clientData.email);
                    setValue("phoneNumber", clientData.phoneNumber);
                    setValue("address", clientData.address);
                    setValue("notes", clientData.notes);
                    setValue("assigned_salesperson", salesPersonAssignedOptions); // Properly set the salesperson
                    setValue("status", statusOption); 
                    setValue("type", clientTypeOption);
                    setValue("preferredCommunicationChannel", preferredCommunicationChannelsOptions);
                }
            } catch (error) {
                toast.error("Failed to fetch client data.");
            }
        };
    
        fetchClientData();
        fetchSalesPersons();
    }, [clientId, setValue]);
    
    
    const handleSelectStatus = (e) => setStatus(e);
    const handleSelectClientType = (e) => setClientType(e);
    const handleSelectAssignedSalesperson = (selectedValues) => setSalespersonAssigned(selectedValues);
    const handleSelectCommunicationChannel = (selectedValues) => setCommunicationChannels(selectedValues);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                type: clientType?.value || "",
                status: status?.value || "",
                preferredCommunicationChannel: communicationChannels.map((channel) => channel.value),
                assignedSalesperson: salesPersonAssigned?.map((salesPerson) => salesPerson.value) || [],
                notes: data.notes || "",
            };

            const response = await putRequest(`clients/${clientId}`, formData);

            if (response) {
                toast.success("Client updated successfully!");
                push("/clients");
            } else {
                toast.error("Failed to update client.");
                throw new Error("API response was invalid.");
            }
        } catch (error) {
            toast.error(error.message || "An error occurred during the update process.");
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        control,
        handleSubmit,
        onSubmit,
        errors,
        getValues,
        setValue,
        loading,
        push,
        status,
        handleSelectStatus,
        clientType,
        handleSelectClientType,
        salesPersonAssigned,
        handleSelectAssignedSalesperson,
        communicationChannels,
        handleSelectCommunicationChannel,
        clientStatus,
        clientTypes,
        preferredCommunicationChannels,
        salesPersons,
    };
};

export default useEditForm;
