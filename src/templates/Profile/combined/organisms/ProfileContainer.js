import useProfile from "../../functional/organisms/useProfile"
import ProfileUI from "../../ui/organisms/ProfileUI";

const Profile = () => {
    const {profileData, loading,  register,
        errors,
        handleSubmit,
        onSubmit,} = useProfile();
    return (
        <ProfileUI profileData={profileData} loading={loading} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register}/>
    );
}

export default Profile;