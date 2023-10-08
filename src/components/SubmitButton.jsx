import { useNavigation } from 'react-router-dom';
export const SubmitButton = ({ text }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <button type="submit" className={`btn btn-ghost w-full  bg-primary text-white`} disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                    <span className="loading loading-spinner loading-lg"></span>
                    Đang gửi...
                </>
            ) : (
                text || 'submit'
            )}
        </button>
    );
};

export default SubmitButton;
