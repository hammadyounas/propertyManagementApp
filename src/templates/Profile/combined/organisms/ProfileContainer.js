import useProfile from "../../functional/organisms/useProfile"
import ProfileUI from "../../ui/organisms/ProfileUI";

const Profile = () => {
    const {
      loading,
      register,
      errors,
      handleSubmit,
      onSubmit,
      status,
      propertiesAssigned,
      user,
      isEditing,
      setIsEditing,
      handleFileChange,
      loadingAvatar,
      handleCancel,
    } = useProfile();
    return (
      <ProfileUI
        handleFileChange={handleFileChange}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        user={user}
        propertiesAssigned={propertiesAssigned}
        status={status}
        loading={loading}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        loadingAvatar={loadingAvatar}
        handleCancel={handleCancel}
      />
    );
}

export default Profile;